
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormFieldProps } from "./types";
import { calculateGSTAmounts } from "../../utils/calculations";

export function GSTRateField({ index, form }: FormFieldProps) {
  const handleGSTChange = (value: string) => {
    const amount = form.getValues(`lineItems.${index}.amount`) || 0;
    const gstType = form.getValues("gst");
    
    const { igst, cgst, sgst, total } = calculateGSTAmounts(amount, value, gstType);
    
    form.setValue(`lineItems.${index}.gst`, value);
    form.setValue(`lineItems.${index}.igst`, igst);
    form.setValue(`lineItems.${index}.cgst`, cgst);
    form.setValue(`lineItems.${index}.sgst`, sgst);
    form.setValue(`lineItems.${index}.total`, total);
  };

  return (
    <FormField
      control={form.control}
      name={`lineItems.${index}.gst`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>GST Rate (%)</FormLabel>
          <Select
            onValueChange={(value) => {
              handleGSTChange(value);
            }}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select GST rate" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="0">0%</SelectItem>
              <SelectItem value="5">5%</SelectItem>
              <SelectItem value="12">12%</SelectItem>
              <SelectItem value="18">18%</SelectItem>
              <SelectItem value="28">28%</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
