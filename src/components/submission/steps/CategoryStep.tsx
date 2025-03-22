
import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Tag } from "lucide-react";

interface CategoryStepProps {
  form: UseFormReturn<ProductFormValues>;
}

const categories = [
  { value: "productivity", label: "Productivity" },
  { value: "design", label: "Design Tools" },
  { value: "marketing", label: "Marketing" },
  { value: "development", label: "Development" },
  { value: "finance", label: "Finance" },
  { value: "social", label: "Social" },
  { value: "health", label: "Health & Fitness" },
  { value: "education", label: "Education" },
  { value: "entertainment", label: "Entertainment" },
  { value: "ai", label: "AI & Machine Learning" },
  { value: "other", label: "Other" },
];

const CategoryStep: React.FC<CategoryStepProps> = ({ form }) => {
  const [newTag, setNewTag] = useState("");
  
  const addTag = () => {
    if (!newTag.trim()) return;
    
    const currentTags = form.getValues("tags") || [];
    const normalizedTag = newTag.trim().toLowerCase();
    
    // Prevent duplicate tags
    if (!currentTags.includes(normalizedTag)) {
      form.setValue("tags", [...currentTags, normalizedTag], { shouldValidate: true });
    }
    
    setNewTag("");
  };
  
  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags") || [];
    form.setValue(
      "tags", 
      currentTags.filter((tag) => tag !== tagToRemove),
      { shouldValidate: true }
    );
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Category & Tags</h2>
        <p className="text-sm text-muted-foreground">
          Help users discover your product with relevant categories and tags
        </p>
      </div>

      <div className="grid gap-6">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category *</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select the primary category for your product
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags *</FormLabel>
              <div className="flex flex-wrap gap-2 mb-3">
                {field.value?.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs gap-1 py-1 px-3">
                    {tag}
                    <button 
                      type="button" 
                      onClick={() => removeTag(tag)}
                      className="ml-1 rounded-full hover:bg-muted-foreground/20 p-1"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {tag}</span>
                    </button>
                  </Badge>
                ))}
                
                {field.value?.length === 0 && (
                  <div className="text-sm text-muted-foreground">
                    No tags added yet
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <FormControl>
                  <div className="relative flex-grow">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter a tag"
                      className="pl-10"
                    />
                  </div>
                </FormControl>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addTag}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
              
              <FormDescription>
                Add relevant tags to help users discover your product
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default CategoryStep;
