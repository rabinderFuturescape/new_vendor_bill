import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { BillHeader } from "./BillHeader";
import { LineItems } from "./LineItems";
import { PaymentSection } from "./components/PaymentSection";
import { billEntrySchema, type BillEntryFormData } from "./schema";

export function BillEntry() {
  const { toast } = useToast();
  const form = useForm<BillEntryFormData>({
    resolver: zodResolver(billEntrySchema),
    defaultValues: {
      vendorId: "",
      gstNumber: "",
      purchaseOrderNo: "",
      billNo: "",
      billDate: new Date(),
      paymentDueDate: undefined,
      purchaseType: "CASH",
      lineItems: [
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
        }
      ],
      purchaseOrderAmount: 0,
      totalBillAmount: 0,
      tdsRate: "",
      deductTds: 0,
      applyRoundOff: false,
      applyRcm: false,
      uploadedBill: "",
      status: "UNAPPROVED",
      billableToMembers: false,
      description: "",
    },
  });

  function onSubmit(values: BillEntryFormData) {
    console.log(values);
    toast({
      title: "Bill saved successfully",
      description: `Bill #${values.billNo} has been saved.`,
    });
  }

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <Card className="transition-smooth hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">New Vendor Bill</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <BillHeader form={form} />
              <Separator />
              <LineItems form={form} />
              <Separator />
              <PaymentSection form={form} />
              <div className="flex justify-end space-x-4">
                <Button variant="outline" type="button">Cancel</Button>
                <Button type="submit">Save Bill</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
