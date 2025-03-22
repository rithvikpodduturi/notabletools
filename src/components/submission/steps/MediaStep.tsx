
import React, { useState } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { ProductFormValues } from "../ProductSubmissionForm";
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl,
  FormMessage, 
  FormDescription 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Image, Plus, X, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaStepProps {
  form: UseFormReturn<ProductFormValues>;
}

const MediaStep: React.FC<MediaStepProps> = ({ form }) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploading(true);
    
    // Normally you would upload these to your server or a storage service
    // For this example, we'll create object URLs
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          append({
            src: event.target.result as string,
            alt: file.name,
          });
        }
      };
      reader.readAsDataURL(file);
    });
    
    setUploading(false);
    toast({
      title: "Images uploaded",
      description: `${files.length} image(s) added successfully`,
    });
    
    // Reset the input
    e.target.value = "";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Media</h2>
        <p className="text-sm text-muted-foreground">
          Upload images and screenshots of your product
        </p>
      </div>

      <div>
        <FormLabel className="block mb-2">Product Images *</FormLabel>
        <FormDescription className="mb-4">
          Upload at least one image. The first image will be used as the thumbnail.
        </FormDescription>
        
        <div className="flex items-center justify-center w-full">
          <label 
            htmlFor="image-upload" 
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 border-muted-foreground/25 hover:bg-muted"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">PNG, JPG or GIF (MAX. 5MB)</p>
            </div>
            <Input 
              id="image-upload" 
              type="file" 
              accept="image/*" 
              multiple 
              className="hidden" 
              onChange={handleImageUpload}
              disabled={uploading}
            />
          </label>
        </div>
        
        {fields.length === 0 && (
          <FormMessage>
            Please upload at least one image
          </FormMessage>
        )}
        
        {fields.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {fields.map((field, index) => (
              <Card key={field.id} className="overflow-hidden group relative">
                <div className="aspect-video relative">
                  <img
                    src={field.src}
                    alt={field.alt}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => remove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-3">
                  <FormField
                    control={form.control}
                    name={`images.${index}.alt`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            placeholder="Image description" 
                            {...field} 
                            className="text-sm"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            ))}
            
            <Card className="flex items-center justify-center border-dashed h-full min-h-[180px]">
              <label 
                htmlFor="add-more-images" 
                className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
              >
                <Plus className="h-8 w-8 mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Add More</p>
                <Input 
                  id="add-more-images" 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  className="hidden" 
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </label>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaStep;
