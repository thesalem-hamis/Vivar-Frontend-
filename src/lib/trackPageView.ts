import { supabase } from '@/lib/supabase/client'

export function trackPageView() {
  const path = window.location.pathname

  supabase
    .from('page_views')
    .insert({
      page_path: path,
      user_agent: navigator.userAgent,
    })
    .then(({ error }) => {
      if (error) console.error('Failed to track page view:', error)
    })
}

// NEW: Track property view specifically
export function trackPropertyView(propertyId: string) {
  supabase
    .from('property_views')
    .insert({
      property_id: propertyId,
      viewer_name: null,
      viewer_email: null,
      viewer_phone: null,
    })
    .then(({ error }) => {
      if (error) console.error('Failed to track property view:', error)
    })
}