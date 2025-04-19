
import React, { useEffect } from 'react';
import { UseFormReturn } from "react-hook-form";
import { BillEntryFormData } from "../../types";
import { calculateFinalAmount } from "../../utils/calculations";
import { BillAmounts } from "./BillAmounts";
import { Adjustments } from "./Adjustments";
import { FinalDetails } from "./FinalDetails";

interface PaymentSectionProps {
  form: UseFormReturn<BillEntryFormData>;
}

export function PaymentSection({ form }: PaymentSectionProps) {
  const totalBillAmount = form.watch("totalBillAmount");
  const deductTds = form.watch("deductTds");
  const applyRoundOff = form.watch("applyRoundOff");
  const poAmount = form.watch("poAmount") || 0;

  useEffect(() => {
    const { roundOff, grandTotal } = calculateFinalAmount(
      totalBillAmount,
      deductTds,
      applyRoundOff
    );

    form.setValue("purchaseOrderAmount", grandTotal);
    form.setValue("difference", totalBillAmount - poAmount);
  }, [totalBillAmount, deductTds, applyRoundOff, poAmount, form]);

  return (
    <div className="space-y-6">
      <BillAmounts form={form} />
      <Adjustments form={form} />
      <FinalDetails form={form} />
    </div>
  );
}
