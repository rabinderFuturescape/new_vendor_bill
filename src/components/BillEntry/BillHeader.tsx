
import React from 'react';
import { UseFormReturn } from "react-hook-form";
import { BillEntryFormData } from "./schema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { VendorCombobox } from "./VendorCombobox";
import { PurchaseOrderSelect } from "./components/PurchaseOrderSelect";
import { DateField } from "./components/DateField";
import { PurchaseTypeSelect } from "./components/PurchaseTypeSelect";

interface BillHeaderProps {
  form: UseFormReturn<BillEntryFormData>;
}

export function BillHeader({ form }: BillHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="vendorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vendor Name*</FormLabel>
              <VendorCombobox 
                value={field.value} 
                onChange={(value, gstNumber, applyRcm) => {
                  field.onChange(value);
                  form.setValue('gstNumber', gstNumber);
                  form.setValue('applyRcm', applyRcm);
                }} 
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gstNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GST Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter GST number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purchaseOrderNo"
          render={() => <PurchaseOrderSelect form={form} />}
        />

        <FormField
          control={form.control}
          name="billNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bill Number*</FormLabel>
              <FormControl>
                <Input placeholder="Enter bill number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="billDate"
          render={() => <DateField form={form} name="billDate" label="Bill Date" required />}
        />

        <FormField
          control={form.control}
          name="paymentDueDate"
          render={() => <DateField form={form} name="paymentDueDate" label="Payment Due Date" />}
        />
      </div>

      <FormField
        control={form.control}
        name="purchaseType"
        render={() => <PurchaseTypeSelect form={form} />}
      />
    </div>
  );
}
