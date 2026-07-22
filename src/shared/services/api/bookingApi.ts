/**
 * Booking API Service
 * 
 * Handles all booking-related API operations.
 */

import { apiClient, ApiResponse } from './client';
import { BookingRecord } from '../../types';
import { API_ENDPOINTS } from '../../constants';

// ============================================================================
// Types
// ============================================================================

export interface CreateBookingRequest {
  serviceId: string;
  practitionerId: string;
  date: string;
  timeSlot: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  questionnaire: {
    intentReason: string;
    emotionalStateScore: number;
    sessionMode: 'online' | 'in_person';
    goals: string[];
  };
}

export interface CreateBookingResponse {
  booking: BookingRecord;
  whatsappUrl: string;
  googleCalendarUrl: string;
}

export interface GetBookingsResponse {
  bookings: BookingRecord[];
  total: number;
}

export interface UpdateBookingStatusRequest {
  status: 'confirmed' | 'completed' | 'cancelled';
}

// ============================================================================
// API Functions
// ============================================================================

/**
 * Create a new booking
 */
export const createBooking = async (
  data: CreateBookingRequest
): Promise<ApiResponse<CreateBookingResponse>> => {
  return apiClient.post<CreateBookingResponse>(API_ENDPOINTS.BOOKINGS, data);
};

/**
 * Get all bookings (admin)
 */
export const getBookings = async (
  params?: {
    page?: number;
    limit?: number;
    status?: string;
  }
): Promise<ApiResponse<GetBookingsResponse>> => {
  return apiClient.get<GetBookingsResponse>(API_ENDPOINTS.BOOKINGS, params);
};

/**
 * Get booking by ID
 */
export const getBookingById = async (
  id: string
): Promise<ApiResponse<{ booking: BookingRecord }>> => {
  return apiClient.get<{ booking: BookingRecord }>(`${API_ENDPOINTS.BOOKINGS}/${id}`);
};

/**
 * Update booking status
 */
export const updateBookingStatus = async (
  id: string,
  data: UpdateBookingStatusRequest
): Promise<ApiResponse<{ booking: BookingRecord }>> => {
  return apiClient.patch<{ booking: BookingRecord }>(`${API_ENDPOINTS.BOOKINGS}/${id}/status`, data);
};

/**
 * Cancel booking
 */
export const cancelBooking = async (
  id: string
): Promise<ApiResponse<{ booking: BookingRecord }>> => {
  return apiClient.post<{ booking: BookingRecord }>(`${API_ENDPOINTS.BOOKINGS}/${id}/cancel`);
};

/**
 * Get available time slots for a date
 */
export const getAvailableTimeSlots = async (
  date: string,
  practitionerId: string
): Promise<ApiResponse<{ timeSlots: string[] }>> => {
  return apiClient.get<{ timeSlots: string[] }>(`${API_ENDPOINTS.BOOKINGS}/available-slots`, {
    date,
    practitionerId,
  });
};

/**
 * Check if time slot is available
 */
export const checkTimeSlotAvailability = async (
  date: string,
  timeSlot: string,
  practitionerId: string
): Promise<ApiResponse<{ available: boolean }>> => {
  return apiClient.get<{ available: boolean }>(`${API_ENDPOINTS.BOOKINGS}/check-availability`, {
    date,
    timeSlot,
    practitionerId,
  });
};
