
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdjustmentsProps {
  form: UseFormReturn<BillEntryFormData>;
}

const TDS_RATES = [
  { label: "1%", value: "1" },
  { label: "2%", value: "2" },
  { label: "5%", value: "5" },
  { label: "10%", value: "10" },
];

export function Adjustments({ form }: AdjustmentsProps) {
  const totalBillAmount = form.watch("totalBillAmount");

  const handleTdsRateChange = (value: string) => {
    const percentage = parseFloat(value);
    const tdsAmount = (totalBillAmount * percentage) / 100;
    form.setValue("deductTds", tdsAmount);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="tdsRate"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>TDS Rate (%)</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  handleTdsRateChange(value);
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select TDS Rate" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TDS_RATES.map((rate) => (
                    <SelectItem key={rate.value} value={rate.value}>
                      {rate.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deductTds"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>TDS Amount</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  {...field} 
                  readOnly
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="applyRoundOff"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>Apply Round Off?</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="applyRcm"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>Apply RCM?</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
