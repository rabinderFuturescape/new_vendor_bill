
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { billEntrySchema } from "./schema";

export type BillEntryFormData = z.infer<typeof billEntrySchema>;

export interface Account {
  label: string;
  value: string;
}

export interface LineItemsProps {
  form: UseFormReturn<BillEntryFormData>;
}
