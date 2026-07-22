/**
 * API Services Index
 * 
 * Central export point for all API service modules.
 */

// Client
export { apiClient, isSuccess, extractData, formatApiError } from './client';
export type { ApiError, ApiResponse, ApiRequestConfig } from './client';

// Booking API
export {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
  getAvailableTimeSlots,
  checkTimeSlotAvailability,
} from './bookingApi';
export type {
  CreateBookingRequest,
  CreateBookingResponse,
  GetBookingsResponse,
  UpdateBookingStatusRequest,
} from './bookingApi';

// Order API
export {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getOrderTracking,
  requestRefund,
  downloadDigitalBook,
} from './orderApi';
export type {
  CreateOrderRequest,
  CreateOrderResponse,
  GetOrdersResponse,
  UpdateOrderStatusRequest,
} from './orderApi';

// Donation API
export {
  createDonation,
  getDonations,
  getDonationById,
  getDonationStats,
  cancelSubscription,
  updateDonationAmount,
  getTaxReceipt,
  getImpactReport,
} from './donationApi';
export type {
  CreateDonationRequest,
  CreateDonationResponse,
  GetDonationsResponse,
  CancelSubscriptionRequest,
} from './donationApi';

// Contact API
export {
  submitContactForm,
  submitSpeakingInquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
  getNewsletterStats,
} from './contactApi';
export type {
  SubmitContactRequest,
  SubmitContactResponse,
  GetEnquiriesResponse,
  NewsletterSubscriptionRequest,
  NewsletterSubscriptionResponse,
} from './contactApi';
