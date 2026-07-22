/**
 * Contact API Service
 * 
 * Handles all contact-related API operations including contact forms and speaking inquiries.
 */

import { apiClient, ApiResponse } from './client';
import { ContactEnquiry } from '../../types';
import { API_ENDPOINTS } from '../../constants';

// ============================================================================
// Types
// ============================================================================

export interface SubmitContactRequest {
  type: 'general' | 'speaking' | 'volunteer' | 'partnership' | 'therapy';
  name: string;
  email: string;
  organization?: string;
  message: string;
}

export interface SubmitContactResponse {
  enquiry: ContactEnquiry;
  autoReply?: boolean;
}

export interface GetEnquiriesResponse {
  enquiries: ContactEnquiry[];
  total: number;
}

export interface NewsletterSubscriptionRequest {
  email: string;
  name?: string;
}

export interface NewsletterSubscriptionResponse {
  success: boolean;
  message: string;
  subscriptionId?: string;
}

// ============================================================================
// API Functions
// ============================================================================

/**
 * Submit contact form
 */
export const submitContactForm = async (
  data: SubmitContactRequest
): Promise<ApiResponse<SubmitContactResponse>> => {
  return apiClient.post<SubmitContactResponse>(API_ENDPOINTS.CONTACT, data);
};

/**
 * Submit speaking inquiry
 */
export const submitSpeakingInquiry = async (
  data: SubmitContactRequest & {
    eventType?: string;
    eventDate?: string;
    audienceSize?: number;
    budget?: string;
  }
): Promise<ApiResponse<SubmitContactResponse>> => {
  return apiClient.post<SubmitContactResponse>(`${API_ENDPOINTS.CONTACT}/speaking`, data);
};

/**
 * Get all enquiries (admin)
 */
export const getEnquiries = async (
  params?: {
    page?: number;
    limit?: number;
    type?: string;
    status?: string;
  }
): Promise<ApiResponse<GetEnquiriesResponse>> => {
  return apiClient.get<GetEnquiriesResponse>(API_ENDPOINTS.CONTACT, params);
};

/**
 * Get enquiry by ID
 */
export const getEnquiryById = async (
  id: string
): Promise<ApiResponse<{ enquiry: ContactEnquiry }>> => {
  return apiClient.get<{ enquiry: ContactEnquiry }>(`${API_ENDPOINTS.CONTACT}/${id}`);
};

/**
 * Update enquiry status
 */
export const updateEnquiryStatus = async (
  id: string,
  status: 'pending' | 'in_progress' | 'resolved' | 'closed'
): Promise<ApiResponse<{ enquiry: ContactEnquiry }>> => {
  return apiClient.patch<{ enquiry: ContactEnquiry }>(`${API_ENDPOINTS.CONTACT}/${id}/status`, {
    status,
  });
};

/**
 * Subscribe to newsletter
 */
export const subscribeToNewsletter = async (
  data: NewsletterSubscriptionRequest
): Promise<ApiResponse<NewsletterSubscriptionResponse>> => {
  return apiClient.post<NewsletterSubscriptionResponse>(API_ENDPOINTS.NEWSLETTER, data);
};

/**
 * Unsubscribe from newsletter
 */
export const unsubscribeFromNewsletter = async (
  email: string
): Promise<ApiResponse<{ success: boolean; message: string }>> => {
  return apiClient.post<{ success: boolean; message: string }>(
    `${API_ENDPOINTS.NEWSLETTER}/unsubscribe`,
    { email }
  );
};

/**
 * Get newsletter statistics (admin)
 */
export const getNewsletterStats = async (): Promise<
  ApiResponse<{
    totalSubscribers: number;
    activeSubscribers: number;
    unsubscribed: number;
    openRate: number;
    clickRate: number;
  }>
> => {
  return apiClient.get<{
    totalSubscribers: number;
    activeSubscribers: number;
    unsubscribed: number;
    openRate: number;
    clickRate: number;
  }>(`${API_ENDPOINTS.NEWSLETTER}/stats`);
};
