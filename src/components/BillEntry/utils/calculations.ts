export const calculateGSTAmounts = (amount: number, gstRate: string, gstType: "IGST" | "CGST_SGST") => {
  const rate = parseFloat(gstRate) || 0;
  const gstAmount = (amount * rate) / 100;
  
  if (gstType === "IGST") {
    return {
      igst: gstAmount,
      cgst: 0,
      sgst: 0,
      total: amount + gstAmount
    };
  } else {
    const halfGst = gstAmount / 2;
    return {
      igst: 0,
      cgst: halfGst,
      sgst: halfGst,
      total: amount + gstAmount
    };
  }
};

export const calculateTotalBillAmount = (lineItems: any[]) => {
  if (!lineItems?.length) return 0;
  
  return lineItems.reduce((sum, item) => {
    const itemTotal = parseFloat(item.total) || 0;
    return sum + itemTotal;
  }, 0);
};

export const calculateRoundOff = (amount: number): number => {
  const roundedAmount = Math.round(amount);
  return roundedAmount - amount;
};

export const calculateFinalAmount = (
  lineItemsTotal: number,
  tdsAmount: number,
  applyRoundOff: boolean
): {
  subTotal: number;
  tdsDeduction: number;
  roundOff: number;
  grandTotal: number;
} => {
  const subTotal = lineItemsTotal;
  const tdsDeduction = tdsAmount || 0;
  
  let grandTotal = subTotal - tdsDeduction;
  let roundOff = 0;
  
  if (applyRoundOff) {
    roundOff = calculateRoundOff(grandTotal);
    grandTotal = Math.round(grandTotal);
  }

  return {
    subTotal,
    tdsDeduction,
    roundOff,
    grandTotal
  };
};
