import React, { useState } from 'react'
import { Search, DollarSign, Users, Printer } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookingList } from '@/components/BookingList'
import { TourManagement } from '@/components/TourManagement'
import { Button } from '@/components/ui/button'

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

interface AdminDashboardProps {
  bookings: Booking[]
  tours: Tour[]
  onUpdateBooking: (bookingId: string, status: Booking['status']) => void
  onNavigateToBooking: (bookingId: string) => void
  onAddTour: (tour: Tour) => void
  onEditTour: (tour: Tour) => void
  onDeleteTour: (tourId: string) => void
  onDeleteBooking: (bookingId: string) => void
}

export function AdminDashboard({
  bookings,
  tours,
  onUpdateBooking,
  onNavigateToBooking,
  onAddTour,
  onEditTour,
  onDeleteTour,
  onDeleteBooking,
}: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'bookings' | 'tours'>('bookings')

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tours.find((tour) => tour.id === booking.tourId)?.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0)
  const totalGuests = bookings.reduce((sum, booking) => sum + booking.guests, 0)

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="relative w-64">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookings.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGuests}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue={activeTab} className="space-y-4" onValueChange={v => setActiveTab(v as any)}>
        <TabsList>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="tours">Tours</TabsTrigger>
        </TabsList>
        <TabsContent value="bookings">
          <div className="flex justify-end mb-2">
            <Button variant="outline" onClick={handlePrint} className="flex items-center gap-2">
              <Printer className="h-4 w-4" /> Print Bookings
            </Button>
          </div>
          <BookingList
            bookings={filteredBookings}
            tours={tours}
            onUpdateBooking={onUpdateBooking}
            onNavigateToBooking={onNavigateToBooking}
            onDeleteBooking={onDeleteBooking}
          />
        </TabsContent>
        <TabsContent value="tours">
          <div className="flex justify-end mb-2">
            <Button variant="outline" onClick={handlePrint} className="flex items-center gap-2">
              <Printer className="h-4 w-4" /> Print Tours
            </Button>
          </div>
          <TourManagement
            tours={tours}
            onAddTour={onAddTour}
            onEditTour={onEditTour}
            onDeleteTour={onDeleteTour}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
} 