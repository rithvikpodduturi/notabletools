
import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { ProductFormValues } from "../ProductSubmissionForm";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, X, Mail, User, LinkIcon } from "lucide-react";

interface MakersStepProps {
  form: UseFormReturn<ProductFormValues>;
}

const MakersStep: React.FC<MakersStepProps> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "makers",
  });

  const addMaker = () => {
    append({ name: "", email: "", avatar: "" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Makers</h2>
        <p className="text-sm text-muted-foreground">
          Add the team members who built this product
        </p>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <Card key={field.id} className="relative">
            {index > 0 && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => remove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            
            <CardContent className="p-4 pt-4">
              <div className="flex items-start gap-4">
                <div className="pt-2">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={field.avatar} alt={field.name || "Maker"} />
                    <AvatarFallback>
                      {field.name ? field.name.charAt(0).toUpperCase() : "?"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="flex-grow grid gap-4">
                  <FormField
                    control={form.control}
                    name={`makers.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maker Name *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="John Doe" {...field} className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`makers.${index}.email`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="john@example.com" 
                              {...field} 
                              className="pl-10"
                              type="email"
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          We'll send an invitation to collaborate on this product
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`makers.${index}.avatar`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Avatar URL</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="https://example.com/avatar.jpg" 
                              {...field} 
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={addMaker}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add Another Maker
        </Button>
      </div>
    </div>
  );
};

export default MakersStep;
