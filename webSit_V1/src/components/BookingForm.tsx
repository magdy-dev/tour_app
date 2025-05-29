import React, { useState, useEffect } from 'react'
import { Calendar, Clock, Users, CreditCard, Mail, Phone, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from "@/components/ui/badge";
import { useTranslation } from 'react-i18next';

interface Tour {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  maxGuests: number;
  image: string;
  features: string[];
}

interface BookingFormProps {
  tour: Tour;
  onSubmit: (data: BookingFormData) => void;
  onCancel: () => void;
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
  specialRequests: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  guests?: string;
}

export function BookingForm({ tour, onSubmit, onCancel }: BookingFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: 1,
    specialRequests: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('validation.nameRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('validation.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('validation.emailInvalid');
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('validation.phoneRequired');
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = t('validation.phoneInvalid');
    }

    if (!formData.date) {
      newErrors.date = t('validation.dateRequired');
    } else if (new Date(formData.date) < new Date(today)) {
      newErrors.date = t('validation.dateInvalid');
    }

    if (formData.guests < 1) {
      newErrors.guests = t('validation.guestsMin');
    } else if (formData.guests > tour.maxGuests) {
      newErrors.guests = t('validation.guestsMax', { max: tour.maxGuests });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Booking submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) || 1 : value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const totalPrice = tour.price * formData.guests;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{t('booking.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t('booking.name')}</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={t('booking.namePlaceholder')}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`pl-9 ${errors.name ? 'border-red-500' : ''}`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-red-500 mt-1">
                    {errors.name}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('booking.email')}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t('booking.emailPlaceholder')}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`pl-9 ${errors.email ? 'border-red-500' : ''}`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-red-500 mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t('booking.phone')}</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder={t('booking.phonePlaceholder')}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={`pl-9 ${errors.phone ? 'border-red-500' : ''}`}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="text-sm text-red-500 mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">{t('booking.date')}</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="date"
                  name="date"
                  type="date"
                  min={today}
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className={`pl-9 ${errors.date ? 'border-red-500' : ''}`}
                  aria-invalid={!!errors.date}
                  aria-describedby={errors.date ? 'date-error' : undefined}
                />
                {errors.date && (
                  <p id="date-error" className="text-sm text-red-500 mt-1">
                    {errors.date}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="guests">{t('booking.guests')}</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="guests"
                  name="guests"
                  type="number"
                  min="1"
                  max={tour.maxGuests}
                  value={formData.guests}
                  onChange={handleChange}
                  required
                  className={`pl-9 ${errors.guests ? 'border-red-500' : ''}`}
                  aria-invalid={!!errors.guests}
                  aria-describedby={errors.guests ? 'guests-error' : undefined}
                />
                {errors.guests && (
                  <p id="guests-error" className="text-sm text-red-500 mt-1">
                    {errors.guests}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialRequests">{t('booking.specialRequests')}</Label>
              <Input
                id="specialRequests"
                name="specialRequests"
                type="text"
                placeholder={t('booking.specialRequestsPlaceholder')}
                value={formData.specialRequests}
                onChange={handleChange}
                className="pl-9"
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">{tour.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">
                  {t('booking.maxGuests', { max: tour.maxGuests })}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">{t('booking.totalPrice')}:</span>
              </div>
              <span className="text-lg font-semibold">${totalPrice}</span>
            </div>
            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                disabled={isSubmitting}
              >
                {t('booking.cancel')}
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? t('booking.submitting') : t('booking.confirm')}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 