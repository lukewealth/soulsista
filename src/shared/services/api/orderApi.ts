/**
 * Order API Service
 * 
 * Handles all order-related API operations for book purchases.
 */

import { apiClient, ApiResponse } from './client';
import { OrderRecord } from '../../types';
import { API_ENDPOINTS } from '../../constants';

// ============================================================================
// Types
// ============================================================================

export interface CreateOrderRequest {
  bookId: string;
  format: 'hardcover' | 'digital' | 'bundle';
  quantity: number;
  guestName: string;
  guestEmail: string;
  guestAddress?: string;
  paymentMethod: 'stripe' | 'paystack' | 'flutterwave';
}

export interface CreateOrderResponse {
  order: OrderRecord;
  paymentUrl?: string;
  paymentIntent?: string;
}

export interface GetOrdersResponse {
  orders: OrderRecord[];
  total: number;
}

export interface UpdateOrderStatusRequest {
  status: 'processing' | 'shipped' | 'delivered';
  trackingNumber?: string;
}

// ============================================================================
// API Functions
// ============================================================================

/**
 * Create a new order
 */
export const createOrder = async (
  data: CreateOrderRequest
): Promise<ApiResponse<CreateOrderResponse>> => {
  return apiClient.post<CreateOrderResponse>(API_ENDPOINTS.ORDERS, data);
};

/**
 * Get all orders (admin)
 */
export const getOrders = async (
  params?: {
    page?: number;
    limit?: number;
    status?: string;
  }
): Promise<ApiResponse<GetOrdersResponse>> => {
  return apiClient.get<GetOrdersResponse>(API_ENDPOINTS.ORDERS, params);
};

/**
 * Get order by ID
 */
export const getOrderById = async (
  id: string
): Promise<ApiResponse<{ order: OrderRecord }>> => {
  return apiClient.get<{ order: OrderRecord }>(`${API_ENDPOINTS.ORDERS}/${id}`);
};

/**
 * Update order status
 */
export const updateOrderStatus = async (
  id: string,
  data: UpdateOrderStatusRequest
): Promise<ApiResponse<{ order: OrderRecord }>> => {
  return apiClient.patch<{ order: OrderRecord }>(`${API_ENDPOINTS.ORDERS}/${id}/status`, data);
};

/**
 * Get order tracking information
 */
export const getOrderTracking = async (
  id: string
): Promise<ApiResponse<{ trackingNumber?: string; status: string; estimatedDelivery?: string }>> => {
  return apiClient.get<{ trackingNumber?: string; status: string; estimatedDelivery?: string }>(
    `${API_ENDPOINTS.ORDERS}/${id}/tracking`
  );
};

/**
 * Request refund for order
 */
export const requestRefund = async (
  id: string,
  reason: string
): Promise<ApiResponse<{ order: OrderRecord; refundId: string }>> => {
  return apiClient.post<{ order: OrderRecord; refundId: string }>(
    `${API_ENDPOINTS.ORDERS}/${id}/refund`,
    { reason }
  );
};

/**
 * Download digital book (for digital format orders)
 */
export const downloadDigitalBook = async (
  orderId: string
): Promise<ApiResponse<{ downloadUrl: string; expiresAt: string }>> => {
  return apiClient.get<{ downloadUrl: string; expiresAt: string }>(
    `${API_ENDPOINTS.ORDERS}/${orderId}/download`
  );
};
