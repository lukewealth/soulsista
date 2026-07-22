/**
 * API Client Configuration
 * 
 * Centralized API client with base configuration, error handling, and request/response interceptors.
 */

import { API_ENDPOINTS, ERROR_MESSAGES } from '../../constants';

// ============================================================================
// Types
// ============================================================================

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: Record<string, any>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface ApiRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string | number | boolean>;
}

// ============================================================================
// Configuration
// ============================================================================

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const DEFAULT_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json',
};

// ============================================================================
// API Client
// ============================================================================

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string = API_BASE_URL, headers: Record<string, string> = DEFAULT_HEADERS) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = headers;
  }

  /**
   * Build URL with query parameters
   */
  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    return url.toString();
  }

  /**
   * Handle API errors
   */
  private async handleError(response: Response): Promise<ApiError> {
    let errorData: any;
    
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: response.statusText };
    }

    return {
      message: errorData.message || ERROR_MESSAGES.GENERIC_ERROR,
      status: response.status,
      code: errorData.code,
      details: errorData.details,
    };
  }

  /**
   * Make HTTP request
   */
  async request<T>(
    endpoint: string,
    config: ApiRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { method = 'GET', headers = {}, body, params } = config;

    const url = this.buildUrl(endpoint, params);
    const requestHeaders = { ...this.defaultHeaders, ...headers };

    try {
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const error = await this.handleError(response);
        return { success: false, error };
      }

      const data = await response.json();
      
      return {
        success: true,
        data: data.data || data,
        meta: data.meta,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          message: ERROR_MESSAGES.NETWORK_ERROR,
          status: 0,
          code: 'NETWORK_ERROR',
        },
      };
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PATCH', body });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// ============================================================================
// Export Singleton Instance
// ============================================================================

export const apiClient = new ApiClient();

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Check if response is successful
 */
export const isSuccess = <T>(response: ApiResponse<T>): response is ApiResponse<T> & { data: T } => {
  return response.success && response.data !== undefined;
};

/**
 * Extract data from response or throw error
 */
export const extractData = <T>(response: ApiResponse<T>): T => {
  if (!isSuccess(response)) {
    throw new Error(response.error?.message || ERROR_MESSAGES.GENERIC_ERROR);
  }
  return response.data;
};

/**
 * Format API error for display
 */
export const formatApiError = (error: ApiError): string => {
  if (error.status === 0) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }
  
  if (error.status === 400) {
    return ERROR_MESSAGES.VALIDATION_ERROR;
  }
  
  if (error.status === 401 || error.status === 403) {
    return 'Authentication required. Please log in.';
  }
  
  if (error.status === 404) {
    return 'Resource not found.';
  }
  
  if (error.status >= 500) {
    return 'Server error. Please try again later.';
  }
  
  return error.message || ERROR_MESSAGES.GENERIC_ERROR;
};
