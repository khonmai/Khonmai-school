"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "./scroll-area";

interface ComboboxProps {
  label?: string;
  datas?: Record<string, string>[];
  onSelected: (val: any) => void;
  data_value: string;
}

export function Combobox({
  label,
  datas = [],
  onSelected,
  data_value,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  if (data_value && !value) {
    setTimeout(() => {
      setValue(data_value);
    }, 0);
  }

  if (!data_value) {
    setTimeout(() => {
      setValue("");
    }, 0);
  }

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[100%] justify-between"
        >
          {value &&
          datas.length > 0 &&
          datas.find((data) => data.value === value)
            ? datas.find((data) => data.value === value)?.label
            : "Select " + label + "..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`w-[100%] h-[300px] p-0`}>
        <Command>
          <CommandInput placeholder={`Search ${label}...`} />
          <ScrollArea>
            <CommandEmpty>No data found.</CommandEmpty>
            <CommandGroup>
              {datas.map((data) => (
                <CommandItem
                  key={data?.value}
                  value={data?.label}
                  onSelect={() => {
                    setValue("");
                    onSelected("");
                    if (data?.value !== value) {
                      setValue(data?.value);
                      onSelected(data?.value);
                    }
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === data.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {data.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
