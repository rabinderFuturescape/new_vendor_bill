
import * as z from "zod";

export const billEntrySchema = z.object({
  vendorId: z.string({
    required_error: "Please select a vendor.",
  }),
  gstNumber: z.string().optional(),
  purchaseOrderNo: z.string().optional(),
  billNo: z.string().min(1, "Bill number is required"),
  billDate: z.date({
    required_error: "Bill date is required.",
  }),
  paymentDueDate: z.date().optional(),
  purchaseType: z.enum(["CASH", "CREDIT"]),
  gst: z.enum(["IGST", "CGST_SGST"]).default("CGST_SGST"),
  lineItems: z.array(z.object({
    particular: z.string().min(1, "Description is required"),
    expenseAccount: z.string().min(1, "Expense account is required"),
    amount: z.number().min(0, "Amount must be positive"),
    hsnSac: z.string().optional(),
    gst: z.string().optional(),
    sgst: z.number().default(0),
    cgst: z.number().default(0),
    igst: z.number().default(0),
    total: z.number().default(0),
  })).min(1, "At least one line item is required"),
  purchaseOrderAmount: z.number().default(0),
  totalBillAmount: z.number().default(0),
  tdsRate: z.string().optional(),
  deductTds: z.number().default(0),
  applyRoundOff: z.boolean().default(false),
  applyRcm: z.boolean().default(false),
  uploadedBill: z.string().optional(),
  status: z.enum(["UNAPPROVED", "APPROVED", "REJECTED"]).default("UNAPPROVED"),
  billableToMembers: z.boolean().default(false),
  description: z.string().optional(),
  poAmount: z.number().default(0),
  difference: z.number().default(0),
});

export type BillEntryFormData = z.infer<typeof billEntrySchema>;
