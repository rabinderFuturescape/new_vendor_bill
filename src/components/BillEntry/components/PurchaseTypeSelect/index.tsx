
import React from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { BillEntryFormData } from "../../schema";

interface PurchaseTypeSelectProps {
  form: UseFormReturn<BillEntryFormData>;
}

export function PurchaseTypeSelect({ form }: PurchaseTypeSelectProps) {
  return (
    <FormItem className="space-y-3">
      <FormLabel>Purchase Type</FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={(value) => form.setValue('purchaseType', value as 'CASH' | 'CREDIT')}
          defaultValue={form.watch('purchaseType')}
          className="flex items-center space-x-4"
        >
          <FormItem className="flex items-center space-x-2">
            <FormControl>
              <RadioGroupItem value="CASH" />
            </FormControl>
            <FormLabel className="font-normal">Cash</FormLabel>
          </FormItem>
          <FormItem className="flex items-center space-x-2">
            <FormControl>
              <RadioGroupItem value="CREDIT" />
            </FormControl>
            <FormLabel className="font-normal">Credit</FormLabel>
          </FormItem>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
