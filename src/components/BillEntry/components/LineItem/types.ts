
import { UseFormReturn } from "react-hook-form";
import { BillEntryFormData } from "../../schema";
import { Account } from "../../types";

export interface LineItemProps {
  index: number;
  form: UseFormReturn<BillEntryFormData>;
  onRemove: () => void;
  accounts: Account[];
  showRemoveButton: boolean;
}

export interface FormFieldProps {
  index: number;
  form: UseFormReturn<BillEntryFormData>;
}

