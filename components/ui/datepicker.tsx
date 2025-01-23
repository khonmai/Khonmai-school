"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./input";

interface DatePickerProps {
  onSelected: (date: Date) => void;
  date_value?: Date;
}

export function DatePicker({ onSelected, date_value }: DatePickerProps) {
  const [date, setDate] = React.useState<Date>();
  const [dateValue, setDateValue] = React.useState("");
  const [isDate, setIsDate] = React.useState(true);

  const handleKeyDownDateInput = (e: React.KeyboardEvent) => {
    setIsDate(true);
    if (e.key === "Enter") {
      try {
        handleSelected(new Date(format(dateValue, "yyyy-MM-dd")));
      } catch (error) {
        setIsDate(false);
        handleSelected(new Date());
      }
    }
  };

  const handleSelected = (_d: Date) => {
    onSelected(_d);
    setDate(_d);
  };

  if (date_value && !dateValue) {
    setTimeout(() => {
      handleSelected(date_value);
    }, 0);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "min-w-[180px] justify-start text-left font-normal w-full",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "yyyy-MMM-dd") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
      >
        Form
        <Input
          className={cn(
            "text-center",
            isDate ? "hsl(240 5.9% 90%)" : "border-red-600"
          )}
          type="text"
          placeholder={format(new Date(), "yyyy-MM-dd")}
          onKeyDown={(e) => {
            handleKeyDownDateInput(e);
          }}
          onChange={(e) => {
            setDateValue(e.target.value);
          }}
          value={dateValue}
          maxLength={10}
        />
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              handleSelected(d ?? new Date());
              if (d) {
                setDateValue(format(d ?? "", "yyyy-MM-dd"));
              } else {
                setDateValue("");
              }
            }}
            defaultMonth={date}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
