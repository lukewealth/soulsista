/**
 * Donation API Service
 * 
 * Handles all donation-related API operations for the Soulsysta Initiative.
 */

import { apiClient, ApiResponse } from './client';
import { AllyDonation } from '../../types';
import { API_ENDPOINTS } from '../../constants';

// ============================================================================
// Types
// ============================================================================

export interface CreateDonationRequest {
  tierName: string;
  amountUSD: number;
  frequency: 'one_time' | 'monthly';
  donorName: string;
  donorEmail: string;
  dedicatedTo?: string;
  paymentMethod: 'stripe' | 'paystack' | 'flutterwave';
}

export interface CreateDonationResponse {
  donation: AllyDonation;
  paymentUrl?: string;
  paymentIntent?: string;
  taxReceipt?: string;
}

export interface GetDonationsResponse {
  donations: AllyDonation[];
  total: number;
  totalAmount: number;
}

export interface CancelSubscriptionRequest {
  reason?: string;
}

// ============================================================================
// API Functions
// ============================================================================

/**
 * Create a new donation
 */
export const createDonation = async (
  data: CreateDonationRequest
): Promise<ApiResponse<CreateDonationResponse>> => {
  return apiClient.post<CreateDonationResponse>(API_ENDPOINTS.DONATIONS, data);
};

/**
 * Get all donations (admin)
 */
export const getDonations = async (
  params?: {
    page?: number;
    limit?: number;
    frequency?: string;
  }
): Promise<ApiResponse<GetDonationsResponse>> => {
  return apiClient.get<GetDonationsResponse>(API_ENDPOINTS.DONATIONS, params);
};

/**
 * Get donation by ID
 */
export const getDonationById = async (
  id: string
): Promise<ApiResponse<{ donation: AllyDonation }>> => {
  return apiClient.get<{ donation: AllyDonation }>(`${API_ENDPOINTS.DONATIONS}/${id}`);
};

/**
 * Get donation statistics
 */
export const getDonationStats = async (): Promise<
  ApiResponse<{
    totalDonations: number;
    totalAmount: number;
    monthlyRecurring: number;
    oneTimeDonations: number;
  }>
> => {
  return apiClient.get<{
    totalDonations: number;
    totalAmount: number;
    monthlyRecurring: number;
    oneTimeDonations: number;
  }>(`${API_ENDPOINTS.DONATIONS}/stats`);
};

/**
 * Cancel monthly subscription
 */
export const cancelSubscription = async (
  id: string,
  data: CancelSubscriptionRequest
): Promise<ApiResponse<{ donation: AllyDonation }>> => {
  return apiClient.post<{ donation: AllyDonation }>(
    `${API_ENDPOINTS.DONATIONS}/${id}/cancel`,
    data
  );
};

/**
 * Update donation amount (for monthly subscriptions)
 */
export const updateDonationAmount = async (
  id: string,
  amountUSD: number
): Promise<ApiResponse<{ donation: AllyDonation }>> => {
  return apiClient.patch<{ donation: AllyDonation }>(`${API_ENDPOINTS.DONATIONS}/${id}/amount`, {
    amountUSD,
  });
};

/**
 * Get tax receipt for donation
 */
export const getTaxReceipt = async (
  id: string
): Promise<ApiResponse<{ receiptUrl: string; receiptNumber: string }>> => {
  return apiClient.get<{ receiptUrl: string; receiptNumber: string }>(
    `${API_ENDPOINTS.DONATIONS}/${id}/receipt`
  );
};

/**
 * Get impact report for donations
 */
export const getImpactReport = async (): Promise<
  ApiResponse<{
    livesImpacted: number;
    booksDonated: number;
    workshopsHeld: number;
    communitiesReached: number;
  }>
> => {
  return apiClient.get<{
    livesImpacted: number;
    booksDonated: number;
    workshopsHeld: number;
    communitiesReached: number;
  }>(`${API_ENDPOINTS.DONATIONS}/impact`);
};
