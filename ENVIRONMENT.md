# Environment Variables Documentation

## API Configuration

### VITE_API_URL
- **Description**: Base URL for the backend API
- **Required**: Yes
- **Default**: `http://localhost:3001/api`
- **Example**: `https://api.soulsysta.com/api`

### VITE_WHATSAPP_NUMBER
- **Description**: WhatsApp contact number for booking confirmations
- **Required**: Yes
- **Default**: `+2348068679674`
- **Example**: `+2348068679674`

## Payment Gateway Configuration (Future)

### VITE_STRIPE_PUBLIC_KEY
- **Description**: Stripe public key for payment processing
- **Required**: No (future implementation)
- **Example**: `pk_test_...`

### VITE_PAYSTACK_PUBLIC_KEY
- **Description**: Paystack public key for Nigerian payment processing
- **Required**: No (future implementation)
- **Example**: `pk_test_...`

### VITE_FLUTTERWAVE_PUBLIC_KEY
- **Description**: Flutterwave public key for African payment processing
- **Required**: No (future implementation)
- **Example**: `FLWPUBK_TEST-...`

## Analytics Configuration (Future)

### VITE_PLAUSIBLE_DOMAIN
- **Description**: Domain for Plausible Analytics
- **Required**: No (future implementation)
- **Example**: `soulsysta.com`

### VITE_SENTRY_DSN
- **Description**: Sentry DSN for error tracking
- **Required**: No (future implementation)
- **Example**: `https://...@sentry.io/...`

## Feature Flags (Future)

### VITE_ENABLE_CMS
- **Description**: Enable CMS integration
- **Required**: No
- **Default**: `false`
- **Example**: `true`

### VITE_ENABLE_MEMBERSHIP
- **Description**: Enable membership features
- **Required**: No
- **Default**: `false`
- **Example**: `true`

## Development Configuration

### VITE_DISABLE_HMR
- **Description**: Disable Hot Module Replacement (for AI Studio)
- **Required**: No
- **Default**: `false`
- **Example**: `true`

## Setup Instructions

### 1. Create .env file
```bash
cp .env.example .env
```

### 2. Configure required variables
Edit `.env` and set the required values:
```bash
VITE_API_URL=https://api.soulsysta.com/api
VITE_WHATSAPP_NUMBER=+2348068679674
```

### 3. Restart development server
```bash
npm run dev
```

## Backend API Endpoints

The following endpoints need to be implemented in the backend:

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get all bookings (admin)
- `GET /api/bookings/:id` - Get booking by ID
- `PATCH /api/bookings/:id/status` - Update booking status
- `POST /api/bookings/:id/cancel` - Cancel booking
- `GET /api/bookings/available-slots` - Get available time slots
- `GET /api/bookings/check-availability` - Check time slot availability

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get all orders (admin)
- `GET /api/orders/:id` - Get order by ID
- `PATCH /api/orders/:id/status` - Update order status
- `GET /api/orders/:id/tracking` - Get order tracking
- `POST /api/orders/:id/refund` - Request refund
- `GET /api/orders/:id/download` - Download digital book

### Donations
- `POST /api/donations` - Create donation
- `GET /api/donations` - Get all donations (admin)
- `GET /api/donations/:id` - Get donation by ID
- `GET /api/donations/stats` - Get donation statistics
- `POST /api/donations/:id/cancel` - Cancel subscription
- `PATCH /api/donations/:id/amount` - Update donation amount
- `GET /api/donations/:id/receipt` - Get tax receipt
- `GET /api/donations/impact` - Get impact report

### Contact
- `POST /api/contact` - Submit contact form
- `POST /api/contact/speaking` - Submit speaking inquiry
- `GET /api/contact` - Get all enquiries (admin)
- `GET /api/contact/:id` - Get enquiry by ID
- `PATCH /api/contact/:id/status` - Update enquiry status

### Newsletter
- `POST /api/newsletter` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter
- `GET /api/newsletter/stats` - Get newsletter statistics (admin)

## API Response Format

All API responses should follow this format:

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

Error responses:

```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "status": 400,
    "code": "VALIDATION_ERROR",
    "details": { ... }
  }
}
```

## Security Considerations

1. **Never commit .env file** - Add to .gitignore
2. **Use HTTPS in production** - All API calls should use HTTPS
3. **Validate all inputs** - Backend should validate all request data
4. **Rate limiting** - Implement rate limiting on all endpoints
5. **CORS configuration** - Configure CORS to allow only trusted origins
6. **Authentication** - Implement JWT or session-based authentication for admin endpoints
7. **Input sanitization** - Sanitize all user inputs to prevent XSS
8. **CSRF protection** - Implement CSRF tokens for state-changing operations

## Testing

### Local Testing
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd frontend
npm run dev
```

### API Testing with curl
```bash
# Create booking
curl -X POST http://localhost:3001/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "serviceId": "somatic-psychotherapy",
    "practitionerId": "merit-nene-chuks",
    "date": "2026-07-25",
    "timeSlot": "10:30 AM",
    "guestName": "John Doe",
    "guestEmail": "john@example.com",
    "guestPhone": "+2348068679674",
    "questionnaire": {
      "intentReason": "Seeking clarity",
      "emotionalStateScore": 5,
      "sessionMode": "online",
      "goals": ["Identity & Inner Authority"]
    }
  }'

# Get bookings
curl http://localhost:3001/api/bookings

# Get booking by ID
curl http://localhost:3001/api/bookings/SSL-123456
```

## Troubleshooting

### CORS Errors
- Ensure backend CORS configuration allows frontend origin
- Check `VITE_API_URL` is correct

### Network Errors
- Verify backend server is running
- Check firewall settings
- Verify API URL is accessible

### Authentication Errors
- Ensure JWT tokens are being sent in Authorization header
- Check token expiration
- Verify user has required permissions

## Support

For API integration issues:
- Email: dev@soulsysta.com
- GitHub: https://github.com/soulsysta/collective/issues
