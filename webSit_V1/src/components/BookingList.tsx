import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Users, Mail, Phone } from 'lucide-react'

interface Booking {
  id: string
  tourId: string
  customerName: string
  email: string
  phone: string
  date: string
  guests: number
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled'
  specialRequests?: string
}

interface Tour {
  id: string
  title: string
  description: string
  price: number
  duration: string
  maxGuests: number
  image: string
  features: string[]
}

interface BookingListProps {
  bookings: Booking[]
  tours: Tour[]
  onUpdateBooking: (bookingId: string, status: Booking['status']) => void
  onNavigateToBooking: (bookingId: string) => void
  onDeleteBooking: (bookingId: string) => void
}

export function BookingList({
  bookings,
  tours,
  onUpdateBooking,
  onNavigateToBooking,
  onDeleteBooking,
}: BookingListProps) {
  if (bookings.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">No bookings found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => {
        const tour = tours.find((t) => t.id === booking.tourId)
        return (
          <Card key={booking.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">
                {tour?.title || 'Unknown Tour'}
              </CardTitle>
              <Badge
                variant={
                  booking.status === 'confirmed'
                    ? 'default'
                    : booking.status === 'cancelled'
                    ? 'destructive'
                    : 'secondary'
                }
              >
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.customerName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(booking.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="text-sm text-muted-foreground">
                    {booking.guests} guests · ${booking.totalPrice}
                  </div>
                  <div className="flex gap-2">
                    {booking.status === 'pending' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onUpdateBooking(booking.id, 'confirmed')}
                        >
                          Confirm
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onUpdateBooking(booking.id, 'cancelled')}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onNavigateToBooking(booking.id)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDeleteBooking(booking.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
} 