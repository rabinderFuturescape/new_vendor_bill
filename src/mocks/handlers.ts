
import { http, HttpResponse } from 'msw'
import { Vendor } from '@/components/BillEntry/types/vendor'

// Mock vendor data
const mockVendors: Vendor[] = [
  { 
    value: "1", 
    label: "Acme Corp", 
    gstNumber: "29AADCB2230M1ZA", 
    applyRcm: true,
    address: "123 Business Park, Mumbai",
    email: "accounts@acme.com",
    contactNumber: "+919876543210"
  },
  { 
    value: "2", 
    label: "Globex Corporation", 
    gstNumber: "27AAACR5055K1ZK", 
    applyRcm: false,
    address: "456 Tech Hub, Bangalore",
    email: "billing@globex.com",
    contactNumber: "+919876543211"
  },
  { value: "3", label: "Soylent Corp", gstNumber: "07AAECS2994N1ZA", applyRcm: true },
  { value: "4", label: "Initech", gstNumber: "33AAACC4175D1ZK", applyRcm: false },
  { value: "5", label: "Umbrella Corporation", gstNumber: "19AAACI5642R1ZD", applyRcm: true },
];

// Define handlers for API endpoints
export const handlers = [
  // GET /api/vendors
  http.get('/api/vendors', () => {
    return HttpResponse.json({
      data: mockVendors,
      message: 'Vendors retrieved successfully'
    })
  }),

  // POST /api/vendors
  http.post('/api/vendors', async ({ request }) => {
    const newVendorData = await request.json() as Omit<Vendor, 'value'>;
    const createdVendor: Vendor = {
      ...newVendorData,
      value: (mockVendors.length + 1).toString()
    }
    
    mockVendors.push(createdVendor)
    
    return HttpResponse.json({
      data: createdVendor,
      message: 'Vendor created successfully'
    }, { status: 201 })
  }),
  
  // PUT /api/vendors/:id
  http.put('/api/vendors/:id', async ({ params, request }) => {
    const { id } = params
    const updatedData = await request.json() as Partial<Vendor>
    
    const vendorIndex = mockVendors.findIndex(vendor => vendor.value === id)
    if (vendorIndex === -1) {
      return new HttpResponse(null, { status: 404 })
    }
    
    const updatedVendor: Vendor = { 
      ...mockVendors[vendorIndex], 
      ...updatedData 
    }
    mockVendors[vendorIndex] = updatedVendor
    
    return HttpResponse.json({
      data: updatedVendor,
      message: 'Vendor updated successfully'
    })
  }),
  
  // DELETE /api/vendors/:id
  http.delete('/api/vendors/:id', ({ params }) => {
    const { id } = params
    const vendorIndex = mockVendors.findIndex(vendor => vendor.value === id)
    
    if (vendorIndex === -1) {
      return new HttpResponse(null, { status: 404 })
    }
    
    mockVendors.splice(vendorIndex, 1)
    
    return new HttpResponse(null, { status: 204 })
  }),
]
