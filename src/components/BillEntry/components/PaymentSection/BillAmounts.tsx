
import React from 'react';
import { UseFormReturn } from "react-hook-form";
import { BillEntryFormData } from "../../types";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface BillAmountsProps {
  form: UseFormReturn<BillEntryFormData>;
}

export function BillAmounts({ form }: BillAmountsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <FormField
        control={form.control}
        name="totalBillAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Total Bill Amount*</FormLabel>
            <FormControl>
              <Input type="number" readOnly {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="poAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>PO Amount</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                {...field} 
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  field.onChange(value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="difference"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Difference</FormLabel>
            <FormControl>
              <Input type="number" readOnly {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
