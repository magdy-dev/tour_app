import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, Pencil, Trash2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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

interface TourManagementProps {
  tours: Tour[]
  onAddTour: (tour: Tour) => void
  onEditTour: (tour: Tour) => void
  onDeleteTour: (tourId: string) => void
}

export function TourManagement({ tours, onAddTour, onEditTour, onDeleteTour }: TourManagementProps) {
  const [showAdd, setShowAdd] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState<Partial<Omit<Tour, 'features'>> & { features?: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.price || !form.duration || !form.maxGuests || !form.image) return
    onAddTour({
      id: Math.random().toString(36).substr(2, 9),
      title: form.title,
      description: form.description || '',
      price: Number(form.price),
      duration: form.duration,
      maxGuests: Number(form.maxGuests),
      image: form.image,
      features: form.features ? form.features.split(',').map((f: string) => f.trim()) : [],
    } as Tour)
    setForm({})
    setShowAdd(false)
  }

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editId || !form.title || !form.price || !form.duration || !form.maxGuests || !form.image) return
    onEditTour({
      id: editId,
      title: form.title,
      description: form.description || '',
      price: Number(form.price),
      duration: form.duration,
      maxGuests: Number(form.maxGuests),
      image: form.image,
      features: form.features ? form.features.split(',').map((f: string) => f.trim()) : [],
    } as Tour)
    setForm({})
    setEditId(null)
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button variant="outline" onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Tour
        </Button>
      </div>
      {showAdd && (
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input name="title" placeholder="Title" value={form.title || ''} onChange={handleChange} required />
          <Input name="price" placeholder="Price" type="number" value={form.price || ''} onChange={handleChange} required />
          <Input name="duration" placeholder="Duration" value={form.duration || ''} onChange={handleChange} required />
          <Input name="maxGuests" placeholder="Max Guests" type="number" value={form.maxGuests || ''} onChange={handleChange} required />
          <Input name="image" placeholder="Image URL" value={form.image || ''} onChange={handleChange} required />
          <Input name="features" placeholder="Features (comma separated)" value={form.features || ''} onChange={handleChange} />
          <Input name="description" placeholder="Description" value={form.description || ''} onChange={handleChange} />
          <Button type="submit" className="col-span-1 md:col-span-2">Add</Button>
        </form>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <Card key={tour.id}>
            <div className="relative">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <Badge className="absolute top-4 right-4">
                ${tour.price} per person
              </Badge>
            </div>
            <CardHeader>
              <CardTitle>{tour.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {editId === tour.id ? (
                <form onSubmit={handleEdit} className="space-y-2">
                  <Input name="title" placeholder="Title" value={form.title || ''} onChange={handleChange} required />
                  <Input name="price" placeholder="Price" type="number" value={form.price || ''} onChange={handleChange} required />
                  <Input name="duration" placeholder="Duration" value={form.duration || ''} onChange={handleChange} required />
                  <Input name="maxGuests" placeholder="Max Guests" type="number" value={form.maxGuests || ''} onChange={handleChange} required />
                  <Input name="image" placeholder="Image URL" value={form.image || ''} onChange={handleChange} required />
                  <Input name="features" placeholder="Features (comma separated)" value={form.features || ''} onChange={handleChange} />
                  <Input name="description" placeholder="Description" value={form.description || ''} onChange={handleChange} />
                  <div className="flex gap-2">
                    <Button type="submit" size="sm">Save</Button>
                    <Button type="button" size="sm" variant="outline" onClick={() => { setEditId(null); setForm({}); }}>Cancel</Button>
                  </div>
                </form>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-4">{tour.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>Max {tour.maxGuests} guests</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tour.features.map((feature, index) => (
                      <Badge key={index} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => { setEditId(tour.id); setForm({ ...tour, features: tour.features.join(', ') }); }}>
                      <Pencil className="h-4 w-4" /> Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => onDeleteTour(tour.id)}>
                      <Trash2 className="h-4 w-4" /> Delete
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 