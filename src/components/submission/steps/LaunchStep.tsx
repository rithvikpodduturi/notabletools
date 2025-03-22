
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "../ProductSubmissionForm";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface LaunchStepProps {
  form: UseFormReturn<ProductFormValues>;
}

const LaunchStep: React.FC<LaunchStepProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Launch Settings</h2>
        <p className="text-sm text-muted-foreground">
          Choose when your product will be visible to the community
        </p>
      </div>

      <div className="space-y-6">
        <FormField
          control={form.control}
          name="launchType"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel>Launch Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-3"
                >
                  <div className="flex items-start space-x-3 space-y-0">
                    <RadioGroupItem value="now" id="launch-now" />
                    <div className="grid gap-1.5">
                      <Label htmlFor="launch-now" className="font-medium">
                        Submit for review now
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Your product will be reviewed by moderators and published once approved
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 space-y-0">
                    <RadioGroupItem value="scheduled" id="launch-scheduled" />
                    <div className="grid gap-1.5">
                      <Label htmlFor="launch-scheduled" className="font-medium">
                        Schedule for later
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Your product will be reviewed but won't be published until the specified date
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("launchType") === "scheduled" && (
          <FormField
            control={form.control}
            name="scheduledDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Launch Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
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
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your product will be published on this date after approval
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <div className="bg-muted/50 rounded-lg p-4 border border-muted">
          <div className="flex gap-3 items-start">
            <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h3 className="font-medium">Moderation Process</h3>
              <p className="text-sm text-muted-foreground mt-1">
                All products go through a moderation process to ensure quality and that they meet our community guidelines. 
                This typically takes 1-2 business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchStep;
