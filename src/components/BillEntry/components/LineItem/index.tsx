
import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { calculateGSTAmounts } from "../../utils/calculations";
import { LineItemProps } from "./types";
import { GSTFields } from "./GSTFields";
import { GSTRateField } from "./GSTRateField";

export function LineItem({ index, form, onRemove, accounts, showRemoveButton }: LineItemProps) {
  const gstType = form.watch("gst");

  const handleAmountChange = (amount: number, gstRate: string) => {
    const { igst, cgst, sgst, total } = calculateGSTAmounts(amount, gstRate, gstType);
    form.setValue(`lineItems.${index}.igst`, igst);
    form.setValue(`lineItems.${index}.cgst`, cgst);
    form.setValue(`lineItems.${index}.sgst`, sgst);
    form.setValue(`lineItems.${index}.total`, total);
  };

  return (
    <div className="grid gap-4 p-4 border rounded-lg transition-smooth">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name={`lineItems.${index}.particular`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter item description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`lineItems.${index}.expenseAccount`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.value} value={account.value}>
                      {account.label}
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
          name={`lineItems.${index}.amount`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) => {
                    const amount = parseFloat(e.target.value);
                    field.onChange(amount);
                    handleAmountChange(amount, form.getValues(`lineItems.${index}.gst`));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`lineItems.${index}.hsnSac`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>HSN/SAC</FormLabel>
              <FormControl>
                <Input placeholder="Enter HSN/SAC" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <GSTRateField index={index} form={form} />
        <GSTFields index={index} form={form} />

        <FormField
          control={form.control}
          name={`lineItems.${index}.total`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total</FormLabel>
              <FormControl>
                <Input type="number" readOnly {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {showRemoveButton && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="flex items-center gap-2 text-destructive hover:text-destructive/90"
        >
          <Trash2 className="h-4 w-4" />
          Remove Item
        </Button>
      )}
    </div>
  );
}

