import { supabase } from './client'

type PropertyCallback = (payload: any) => void
type BookingCallback = (payload: any) => void
type ReviewCallback = (payload: any) => void

// Subscribe to property changes (replaces Socket.io property events)
export function subscribeToProperties(
  onCreated?: PropertyCallback,
  onUpdated?: PropertyCallback,
  onDeleted?: PropertyCallback
) {
  const channel = supabase
    .channel('properties-changes')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'properties' },
      (payload) => onCreated?.(payload.new)
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'properties' },
      (payload) => onUpdated?.(payload.new)
    )
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'properties' },
      (payload) => onDeleted?.({ id: payload.old.id })
    )
    .subscribe()

  // Return unsubscribe function
  return () => {
    supabase.removeChannel(channel)
  }
}

// Subscribe to booking changes
export function subscribeToBookings(
  onCreated?: BookingCallback,
  onUpdated?: BookingCallback,
  onDeleted?: BookingCallback
) {
  const channel = supabase
    .channel('bookings-changes')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'bookings' },
      (payload) => onCreated?.(payload.new)
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'bookings' },
      (payload) => onUpdated?.(payload.new)
    )
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'bookings' },
      (payload) => onDeleted?.({ id: payload.old.id })
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}

// Subscribe to review changes
export function subscribeToReviews(
  onCreated?: ReviewCallback,
  onUpdated?: ReviewCallback,
  onDeleted?: ReviewCallback
) {
  const channel = supabase
    .channel('reviews-changes')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'reviews' },
      (payload) => onCreated?.(payload.new)
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'reviews' },
      (payload) => onUpdated?.(payload.new)
    )
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'reviews' },
      (payload) => onDeleted?.({ id: payload.old.id })
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}