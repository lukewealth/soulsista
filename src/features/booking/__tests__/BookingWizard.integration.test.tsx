import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookingWizard } from '../components/BookingWizard';
import { SERVICES, PRACTITIONERS } from '../../../data/mockData';

describe('BookingWizard Integration', () => {
  const mockOnClose = vi.fn();
  const mockOnBookingComplete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render booking wizard when open', () => {
    render(
      <BookingWizard
        isOpen={true}
        onClose={mockOnClose}
        onBookingComplete={mockOnBookingComplete}
      />
    );

    expect(screen.getByText(/reserve your ritual/i)).toBeInTheDocument();
  });

  it('should not render when closed', () => {
    render(
      <BookingWizard
        isOpen={false}
        onClose={mockOnClose}
        onBookingComplete={mockOnBookingComplete}
      />
    );

    expect(screen.queryByText(/reserve your ritual/i)).not.toBeInTheDocument();
  });

  it('should show service selection in step 1', () => {
    render(
      <BookingWizard
        isOpen={true}
        onClose={mockOnClose}
        onBookingComplete={mockOnBookingComplete}
      />
    );

    expect(screen.getByText(/select your desired ritual/i)).toBeInTheDocument();
    expect(screen.getByText(/choose sanctuary environment/i)).toBeInTheDocument();
  });

  it('should navigate to next step when continuing', async () => {
    const user = userEvent.setup();
    
    render(
      <BookingWizard
        isOpen={true}
        onClose={mockOnClose}
        onBookingComplete={mockOnBookingComplete}
      />
    );

    const continueButton = screen.getByRole('button', { name: /select practitioner/i });
    await user.click(continueButton);

    await waitFor(() => {
      expect(screen.getByText(/select your guide/i)).toBeInTheDocument();
    });
  });

  it('should allow selecting a practitioner', async () => {
    const user = userEvent.setup();
    
    render(
      <BookingWizard
        isOpen={true}
        onClose={mockOnClose}
        onBookingComplete={mockOnBookingComplete}
      />
    );

    // Navigate to step 2
    await user.click(screen.getByRole('button', { name: /select practitioner/i }));

    // Select a practitioner
    const practitionerCard = screen.getByText(PRACTITIONERS[0].name);
    await user.click(practitionerCard);

    // Continue to next step
    await user.click(screen.getByRole('button', { name: /select date & time/i }));

    await waitFor(() => {
      expect(screen.getByText(/select date & time slot/i)).toBeInTheDocument();
    });
  });

  it('should validate guest details before submission', async () => {
    const user = userEvent.setup();
    
    render(
      <BookingWizard
        isOpen={true}
        onClose={mockOnClose}
        onBookingComplete={mockOnBookingComplete}
      />
    );

    // Navigate through steps to guest details
    await user.click(screen.getByRole('button', { name: /select practitioner/i }));
    await user.click(screen.getByRole('button', { name: /select date & time/i }));
    await user.click(screen.getByRole('button', { name: /guest details/i }));

    // Try to submit without filling required fields
    const submitButton = screen.getByRole('button', { name: /confirm reservation/i });
    expect(submitButton).toBeDisabled();

    // Fill in required fields
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');

    // Submit button should now be enabled
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('should call onBookingComplete when booking is confirmed', async () => {
    const user = userEvent.setup();
    
    render(
      <BookingWizard
        isOpen={true}
        onClose={mockOnClose}
        onBookingComplete={mockOnBookingComplete}
      />
    );

    // Navigate through all steps
    await user.click(screen.getByRole('button', { name: /select practitioner/i }));
    await user.click(screen.getByRole('button', { name: /select date & time/i }));
    await user.click(screen.getByRole('button', { name: /guest details/i }));

    // Fill guest details
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/whatsapp/i), '+2348068679674');

    // Submit
    await user.click(screen.getByRole('button', { name: /confirm reservation/i }));

    // Check if booking was completed
    await waitFor(() => {
      expect(mockOnBookingComplete).toHaveBeenCalled();
    });

    // Verify booking record structure
    const bookingRecord = mockOnBookingComplete.mock.calls[0][0];
    expect(bookingRecord).toHaveProperty('id');
    expect(bookingRecord).toHaveProperty('serviceId');
    expect(bookingRecord).toHaveProperty('practitionerId');
    expect(bookingRecord).toHaveProperty('date');
    expect(bookingRecord).toHaveProperty('timeSlot');
    expect(bookingRecord).toHaveProperty('guestName', 'John Doe');
    expect(bookingRecord).toHaveProperty('guestEmail', 'john@example.com');
    expect(bookingRecord).toHaveProperty('status', 'confirmed');
  });

  it('should show confirmation screen after successful booking', async () => {
    const user = userEvent.setup();
    
    render(
      <BookingWizard
        isOpen={true}
        onClose={mockOnClose}
        onBookingComplete={mockOnBookingComplete}
      />
    );

    // Navigate and complete booking
    await user.click(screen.getByRole('button', { name: /select practitioner/i }));
    await user.click(screen.getByRole('button', { name: /select date & time/i }));
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.click(screen.getByRole('button', { name: /confirm reservation/i }));

    // Check for confirmation screen
    await waitFor(() => {
      expect(screen.getByText(/reservation confirmed/i)).toBeInTheDocument();
      expect(screen.getByText(/your journey begins/i)).toBeInTheDocument();
    });
  });

  it('should provide WhatsApp and Calendar links in confirmation', async () => {
    const user = userEvent.setup();
    
    render(
      <BookingWizard
        isOpen={true}
        onClose={mockOnClose}
        onBookingComplete={mockOnBookingComplete}
      />
    );

    // Complete booking
    await user.click(screen.getByRole('button', { name: /select practitioner/i }));
    await user.click(screen.getByRole('button', { name: /select date & time/i }));
    await user.click(screen.getByRole('button', { name: /guest details/i }));
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.click(screen.getByRole('button', { name: /confirm reservation/i }));

    await waitFor(() => {
      // Check for integration links
      expect(screen.getByRole('link', { name: /add to google calendar/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /notify via whatsapp/i })).toBeInTheDocument();
    });

    // Verify WhatsApp link contains correct number
    const whatsappLink = screen.getByRole('link', { name: /notify via whatsapp/i });
    expect(whatsappLink).toHaveAttribute('href', expect.stringContaining('2348068679674'));
  });

  it('should close wizard and reset state when close button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <BookingWizard
        isOpen={true}
        onClose={mockOnClose}
        onBookingComplete={mockOnBookingComplete}
      />
    );

    // Navigate to guest details step
    await user.click(screen.getByRole('button', { name: /select practitioner/i }));
    await user.click(screen.getByRole('button', { name: /select date & time/i }));
    await user.click(screen.getByRole('button', { name: /guest details/i }));

    // Fill some data
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');

    // Close wizard
    await user.click(screen.getByRole('button', { name: /close/i }));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should use initial service ID when provided', () => {
    const initialServiceId = SERVICES[1].id;
    
    render(
      <BookingWizard
        isOpen={true}
        initialServiceId={initialServiceId}
        onClose={mockOnClose}
        onBookingComplete={mockOnBookingComplete}
      />
    );

    // Check if the correct service is selected
    const serviceSelect = screen.getByRole('combobox');
    expect(serviceSelect).toHaveValue(initialServiceId);
  });
});
