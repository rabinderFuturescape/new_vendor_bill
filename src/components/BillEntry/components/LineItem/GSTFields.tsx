
import React from "react";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormFieldProps } from "./types";

export function GSTFields({ index, form }: FormFieldProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <FormField
        control={form.control}
        name={`lineItems.${index}.sgst`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>SGST</FormLabel>
            <FormControl>
              <Input type="number" readOnly {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`lineItems.${index}.cgst`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>CGST</FormLabel>
            <FormControl>
              <Input type="number" readOnly {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`lineItems.${index}.igst`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>IGST</FormLabel>
            <FormControl>
              <Input type="number" readOnly {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}

