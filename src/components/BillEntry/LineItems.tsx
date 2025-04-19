import React, { useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LineItemsProps } from "./types";
import { LineItem } from "./components/LineItem";
import { calculateGSTAmounts, calculateTotalBillAmount } from "./utils/calculations";

const accounts = [
  { label: "Office Supplies", value: "101" },
  { label: "Consulting Services", value: "102" },
  { label: "Utilities", value: "103" },
  { label: "Rent", value: "104" },
  { label: "Insurance", value: "105" },
];

export function LineItems({ form }: LineItemsProps) {
  const lineItems = form.watch("lineItems");
  const gstType = form.watch("gst");

  const updateTotalBillAmount = () => {
    const totalAmount = calculateTotalBillAmount(lineItems);
    form.setValue("totalBillAmount", totalAmount);
  };

  // Watch for changes in line items and update total
  useEffect(() => {
    updateTotalBillAmount();
  }, [JSON.stringify(lineItems)]);

  // Recalculate GST when GST type changes
  useEffect(() => {
    lineItems.forEach((_, index) => {
      const amount = form.getValues(`lineItems.${index}.amount`) || 0;
      const gstRate = form.getValues(`lineItems.${index}.gst`) || "0";
      const { igst, cgst, sgst, total } = calculateGSTAmounts(amount, gstRate, gstType);
      
      form.setValue(`lineItems.${index}.igst`, igst);
      form.setValue(`lineItems.${index}.cgst`, cgst);
      form.setValue(`lineItems.${index}.sgst`, sgst);
      form.setValue(`lineItems.${index}.total`, total);
    });
    updateTotalBillAmount();
  }, [gstType]);

  const addLineItem = () => {
    const currentItems = form.getValues("lineItems");
    form.setValue("lineItems", [
      ...currentItems,
      { 
        particular: "", 
        expenseAccount: "",
        amount: 0,
        hsnSac: "",
        gst: "",
        sgst: 0,
        cgst: 0,
        igst: 0,
        total: 0
      },
    ]);
    updateTotalBillAmount();
  };

  const removeLineItem = (index: number) => {
    const currentItems = form.getValues("lineItems");
    form.setValue(
      "lineItems",
      currentItems.filter((_, i) => i !== index)
    );
    updateTotalBillAmount();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Line Items</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addLineItem}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      <div className="space-y-4">
        {lineItems.map((_, index) => (
          <LineItem
            key={index}
            index={index}
            form={form}
            onRemove={() => removeLineItem(index)}
            accounts={accounts}
            showRemoveButton={lineItems.length > 1}
          />
        ))}
      </div>
    </div>
  );
}
