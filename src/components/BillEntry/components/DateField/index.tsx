
import React from 'react';
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { BillEntryFormData } from "../../schema";

interface DateFieldProps {
  form: UseFormReturn<BillEntryFormData>;
  name: 'billDate' | 'paymentDueDate';
  label: string;
  required?: boolean;
}

export function DateField({ form, name, label, required }: DateFieldProps) {
  const value = form.watch(name);
  
  return (
    <FormItem>
      <FormLabel>{label}{required && '*'}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              className={cn(
                "w-full pl-3 text-left font-normal",
                !value && "text-muted-foreground"
              )}
            >
              {value ? (
                format(value, "MM/dd/yyyy")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => form.setValue(name, date)}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
}
