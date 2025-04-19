
import React from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { purchaseOrders } from "./constants";
import { UseFormReturn } from "react-hook-form";
import { BillEntryFormData } from "../../schema";

interface PurchaseOrderSelectProps {
  form: UseFormReturn<BillEntryFormData>;
}

export function PurchaseOrderSelect({ form }: PurchaseOrderSelectProps) {
  return (
    <FormItem>
      <FormLabel>PO/WO (Optional)</FormLabel>
      <Select 
        onValueChange={(value) => form.setValue('purchaseOrderNo', value)}
        value={form.watch('purchaseOrderNo')}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select PO/WO" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {purchaseOrders.map((po) => (
            <SelectItem key={po.value} value={po.value}>
              {po.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
}
