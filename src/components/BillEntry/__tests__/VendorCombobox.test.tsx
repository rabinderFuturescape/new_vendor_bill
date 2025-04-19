
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VendorCombobox } from '../VendorCombobox';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the vendors API
vi.mock('@/services/vendors', () => ({
  vendorsApi: {
    getAll: vi.fn().mockResolvedValue([
      { value: '1', label: 'Test Vendor', gstNumber: '123456', applyRcm: false }
    ]),
    create: vi.fn()
  }
}));

describe('VendorCombobox', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  it('renders the component', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <VendorCombobox value="" onChange={() => {}} />
      </QueryClientProvider>
    );
    
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Select vendor...')).toBeInTheDocument();
  });
});
