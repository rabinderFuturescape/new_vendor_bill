
import * as React from "react";
import { Check, ChevronsUpDown, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useVendors } from "./hooks/useVendors";
import { VendorRegistrationForm } from "./components/VendorRegistrationForm";
import { useToast } from "@/hooks/use-toast";
import { vendorsApi } from "@/services/vendors";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface VendorComboboxProps {
  value: string;
  onChange: (value: string, gstNumber: string, applyRcm: boolean) => void;
}

export function VendorCombobox({ value, onChange }: VendorComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);
  const { data: vendors = [], isLoading } = useVendors();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const createVendorMutation = useMutation({
    mutationFn: (data: { name: string; gstNumber: string; applyRcm: boolean }) => {
      return vendorsApi.create({
        label: data.name,
        gstNumber: data.gstNumber || "",
        applyRcm: data.applyRcm,
      });
    },
    onSuccess: (newVendor) => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      
      // Update the form with the new vendor
      onChange(newVendor.value, newVendor.gstNumber, newVendor.applyRcm);
      
      setShowDialog(false);
      toast({
        title: "Success",
        description: "New vendor added successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add vendor: " + error.message,
        variant: "destructive",
      });
    },
  });

  const handleNewVendor = (data: { name: string; gstNumber: string; applyRcm: boolean }) => {
    createVendorMutation.mutate(data);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={isLoading}
          >
            {value
              ? vendors.find((vendor) => vendor.value === value)?.label
              : "Select vendor..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
          sideOffset={5}
        >
          <Command>
            <CommandInput placeholder="Search vendors..." className="h-9" />
            <CommandList>
              <CommandEmpty className="py-4">
                <div className="flex flex-col items-center gap-2">
                  <p>No vendor found.</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => {
                      setOpen(false);
                      setShowDialog(true);
                    }}
                  >
                    <UserPlus className="h-4 w-4" />
                    Add New Vendor
                  </Button>
                </div>
              </CommandEmpty>
              <CommandGroup>
                {vendors.map((vendor) => (
                  <CommandItem
                    key={vendor.value}
                    onSelect={() => {
                      onChange(vendor.value, vendor.gstNumber, vendor.applyRcm);
                      setOpen(false);
                    }}
                    className="cursor-pointer hover:bg-accent"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === vendor.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {vendor.label}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setOpen(false);
                    setShowDialog(true);
                  }}
                  className="cursor-pointer hover:bg-accent"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add New Vendor
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Vendor</DialogTitle>
          </DialogHeader>
          <VendorRegistrationForm
            onSubmit={handleNewVendor}
            onCancel={() => setShowDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
