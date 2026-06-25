import { supabase } from './client'

async function isAdmin(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  const { data } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', user.id)
    .single()

  return !!data
}

async function requireAdmin() {
  if (!await isAdmin()) {
    throw new Error('Unauthorized: Admin access required')
  }
}

// ==========================================
// USERS (Registered profiles)
// ==========================================

export async function getAllUsers() {
  await requireAdmin()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getUserById(userId: string) {
  await requireAdmin()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) throw error
  return data
}

export async function deleteUser(userId: string) {
  await requireAdmin()
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId)
  if (error) throw error
  return { success: true }
}

// ==========================================
// PAGE VIEWS (Anonymous visitors)
// ==========================================

export async function getVisitorStats() {
  await requireAdmin()

  const { count: totalViews } = await supabase
    .from('page_views')
    .select('*', { count: 'exact', head: true })

  const today = new Date().toISOString().split('T')[0]
  const { count: todayViews } = await supabase
    .from('page_views')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', today)

  const { count: thisWeekViews } = await supabase
    .from('page_views')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

  return {
    totalViews: totalViews || 0,
    todayViews: todayViews || 0,
    thisWeekViews: thisWeekViews || 0,
  }
}

// ==========================================
// PROPERTIES
// ==========================================

export async function createProperty(data: {
  title: string
  description?: string
  price: number
  type?: string
  bedrooms?: number
  bathrooms?: number
  area_sqft?: number
  latitude: number
  longitude: number
  address?: string
  city?: string
  state?: string
  country?: string
}) {
  await requireAdmin()

  const { data: { user } } = await supabase.auth.getUser()

  const { data: property, error } = await supabase
    .from('properties')
    .insert({
      agent_id: user!.id,
      title: data.title,
      description: data.description || null,
      price: data.price,
      property_type: 'house',
      listing_type: data.type || 'sale',
      bedrooms: data.bedrooms || 0,
      bathrooms: data.bathrooms || 0,
      area_sqft: data.area_sqft || null,
      location: `POINT(${data.longitude} ${data.latitude})`,
      address: data.address || null,
      city: data.city || null,
      state: data.state || null,
      country: data.country || null,
      status: 'available'
    } as any)
    .select()
    .single()

  if (error) throw error
  return property
}

// For public users — they can see available properties (no admin check)
export async function getPublicProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select('*, property_images(*)')
    .eq('status', 'available')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

// For admin — sees all properties including sold/rented
export async function getAllProperties() {
  await requireAdmin()
  const { data, error } = await supabase
    .from('properties')
    .select('*, property_images(*)')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

// Get single property (public)
export async function getPropertyById(propertyId: string) {
  const { data, error } = await supabase
    .from('properties')
    .select('*, property_images(*)')
    .eq('id', propertyId)
    .single()
  if (error) throw error
  return data
}

export async function deleteProperty(propertyId: string) {
  await requireAdmin()

  const { data: images } = await supabase
    .from('property_images')
    .select('file_path')
    .eq('property_id', propertyId)

  if (images && images.length > 0) {
    const paths = (images as any[]).map((img: any) => img.file_path)
    await supabase.storage.from('property-images').remove(paths)
  }

  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', propertyId)
  if (error) throw error
  return { success: true }
}

export async function updateProperty(propertyId: string, data: {
  title: string
  description?: string
  price: number
  listing_type?: string
  bedrooms?: number
  bathrooms?: number
  area_sqft?: number
  address?: string
  city?: string
  state?: string
  country?: string
  status?: string
}) {
  await requireAdmin()

  const { data: property, error } = await supabase
    .from('properties')
    .update({
      title: data.title,
      description: data.description || null,
      price: data.price,
      listing_type: data.listing_type || 'sale',
      bedrooms: data.bedrooms ?? 0,
      bathrooms: data.bathrooms ?? 0,
      area_sqft: data.area_sqft ?? null,
      address: data.address || null,
      city: data.city || null,
      state: data.state || null,
      country: data.country || null,
      status: data.status || 'available',
    } as any)
    .eq('id', propertyId)
    .select('*, property_images(*)')
    .single()

  if (error) throw error
  return property
}

// ==========================================
// BOOKINGS
// ==========================================

export async function getAllBookings() {
  await requireAdmin()
  const { data, error } = await supabase
    .from('bookings')
    .select('*, properties(title)')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function deleteBooking(bookingId: string) {
  await requireAdmin()
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId)
  if (error) throw error
  return { success: true }
}

// ==========================================
// REVIEWS
// ==========================================

export async function getAllReviews() {
  await requireAdmin()
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function deleteReview(reviewId: string) {
  await requireAdmin()
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId)
  if (error) throw error
  return { success: true }
}

// ==========================================
// AUTH
// ==========================================

export async function adminLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error

  const isAdminUser = await isAdmin()
  if (!isAdminUser) {
    await supabase.auth.signOut()
    throw new Error('Unauthorized: Admin access required')
  }

  return { user: data.user, session: data.session }
}

export async function adminLogout() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
  return { success: true }
}

// ==========================================
// DASHBOARD
// ==========================================

export async function getDashboardStats() {
  await requireAdmin()
  const [
    { count: usersCount },
    { count: propertiesCount },
    { count: bookingsCount },
    { count: reviewsCount },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('properties').select('*', { count: 'exact', head: true }),
    supabase.from('bookings').select('*', { count: 'exact', head: true }),
    supabase.from('reviews').select('*', { count: 'exact', head: true }),
  ])

  const visitorStats = await getVisitorStats()

  return {
    users: usersCount || 0,
    properties: propertiesCount || 0,
    bookings: bookingsCount || 0,
    reviews: reviewsCount || 0,
    totalViews: visitorStats.totalViews,
    todayViews: visitorStats.todayViews,
    thisWeekViews: visitorStats.thisWeekViews,
  }
}

// ==========================================
// IMAGES
// ==========================================

export async function uploadPropertyImages(
  propertyId: string,
  files: File[],
  primaryFileIndex: number = 0
) {
  await requireAdmin()
  const uploadedImages: any[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const fileExt = file.name.split('.').pop()
    const filePath = `${propertyId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('property-images')
      .upload(filePath, file, { cacheControl: '3600', upsert: false })
    if (uploadError) throw uploadError

    const { data: urlData } = supabase.storage
      .from('property-images')
      .getPublicUrl(filePath)

    const { data: image, error: dbError } = await supabase
      .from('property_images')
      .insert({
        property_id: propertyId,
        url: urlData.publicUrl,
        file_path: filePath,
        is_primary: i === primaryFileIndex,
        order_index: i,
      } as any)
      .select()
      .single()
    if (dbError) throw dbError
    uploadedImages.push(image)
  }
  return uploadedImages
}

export async function getPropertyImages(propertyId: string) {
  const { data, error } = await supabase
    .from('property_images')
    .select('*')
    .eq('property_id', propertyId)
    .order('order_index', { ascending: true })
  if (error) throw error
  return data
}

export async function deletePropertyImage(imageId: string) {
  await requireAdmin()
  const { data: image, error: fetchError } = await supabase
    .from('property_images')
    .select('file_path')
    .eq('id', imageId)
    .single()
  if (fetchError) throw fetchError

  const img = image as any
  await supabase.storage.from('property-images').remove([img.file_path])

  const { error: dbError } = await supabase
    .from('property_images')
    .delete()
    .eq('id', imageId)
  if (dbError) throw dbError
  return { success: true }
}

export function getImagePublicUrl(filePath: string): string {
  const { data } = supabase.storage.from('property-images').getPublicUrl(filePath)
  return data.publicUrl
}