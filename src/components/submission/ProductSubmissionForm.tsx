
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BasicInfoStep from "./steps/BasicInfoStep";
import MediaStep from "./steps/MediaStep";
import CategoryStep from "./steps/CategoryStep";
import MakersStep from "./steps/MakersStep";
import LaunchStep from "./steps/LaunchStep";
import PreviewStep from "./steps/PreviewStep";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Eye, Save, Clock, Send } from "lucide-react";

// Define the form schema with Zod
const productSchema = z.object({
  // Basic Info
  name: z.string().min(3, { message: "Product name must be at least 3 characters" }),
  tagline: z.string().min(5, { message: "Tagline must be at least 5 characters" }).max(120, { message: "Tagline must be less than 120 characters" }),
  description: z.string().min(30, { message: "Description must be at least 30 characters" }),
  websiteUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  appStoreUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  playStoreUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  pricing: z.string().min(1, { message: "Please select a pricing model" }),
  
  // Media
  images: z.array(z.object({
    src: z.string(),
    alt: z.string(),
  })).min(1, { message: "Please upload at least one image" }),
  
  // Categories & Tags
  category: z.string().min(1, { message: "Please select a category" }),
  tags: z.array(z.string()).min(1, { message: "Please add at least one tag" }),
  
  // Makers
  makers: z.array(z.object({
    name: z.string(),
    email: z.string().email(),
    avatar: z.string().optional(),
  })).min(1, { message: "Please add at least one maker" }),
  
  // Launch
  launchType: z.enum(["now", "scheduled"]),
  scheduledDate: z.date().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

const steps = [
  { id: "basic-info", label: "Basic Info" },
  { id: "media", label: "Media" },
  { id: "category", label: "Category & Tags" },
  { id: "makers", label: "Makers" },
  { id: "launch", label: "Launch" },
  { id: "preview", label: "Preview" },
];

const ProductSubmissionForm = () => {
  const [activeStep, setActiveStep] = useState("basic-info");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      tagline: "",
      description: "",
      websiteUrl: "",
      appStoreUrl: "",
      playStoreUrl: "",
      pricing: "",
      images: [],
      category: "",
      tags: [],
      makers: [{ name: "", email: "", avatar: "" }],
      launchType: "now",
    },
    mode: "onChange",
  });
  
  const { formState } = form;
  
  const goToNextStep = () => {
    const currentIndex = steps.findIndex((step) => step.id === activeStep);
    if (currentIndex < steps.length - 1) {
      setActiveStep(steps[currentIndex + 1].id);
    }
  };
  
  const goToPreviousStep = () => {
    const currentIndex = steps.findIndex((step) => step.id === activeStep);
    if (currentIndex > 0) {
      setActiveStep(steps[currentIndex - 1].id);
    }
  };
  
  const saveAsDraft = () => {
    const values = form.getValues();
    localStorage.setItem("productDraft", JSON.stringify(values));
    
    toast({
      title: "Draft saved",
      description: "Your product submission has been saved as a draft",
    });
  };
  
  const handleSubmit = async (values: ProductFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Here, you would typically send the form data to your backend
      console.log("Submitting product:", values);
      
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Product submitted successfully",
        description: values.launchType === "now" 
          ? "Your product is now in the moderation queue" 
          : "Your product will launch on the scheduled date",
      });
      
      // Clear draft from localStorage
      localStorage.removeItem("productDraft");
      
      // Reset form
      form.reset();
      setActiveStep("basic-info");
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your product",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <Tabs value={activeStep} onValueChange={setActiveStep} className="w-full">
        <TabsList className="grid grid-cols-6 mb-8">
          {steps.map((step) => (
            <TabsTrigger key={step.id} value={step.id} disabled={isSubmitting}>
              {step.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <TabsContent value="basic-info">
                <BasicInfoStep form={form} />
              </TabsContent>
              
              <TabsContent value="media">
                <MediaStep form={form} />
              </TabsContent>
              
              <TabsContent value="category">
                <CategoryStep form={form} />
              </TabsContent>
              
              <TabsContent value="makers">
                <MakersStep form={form} />
              </TabsContent>
              
              <TabsContent value="launch">
                <LaunchStep form={form} />
              </TabsContent>
              
              <TabsContent value="preview">
                <PreviewStep formValues={form.getValues()} />
              </TabsContent>
              
              <div className="flex justify-between mt-8">
                <div>
                  {activeStep !== "basic-info" && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={goToPreviousStep}
                      disabled={isSubmitting}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                    </Button>
                  )}
                </div>
                
                <div className="space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={saveAsDraft}
                    disabled={isSubmitting}
                  >
                    <Save className="mr-2 h-4 w-4" /> Save Draft
                  </Button>
                  
                  {activeStep === "preview" ? (
                    <Button
                      type="submit"
                      disabled={!formState.isValid || isSubmitting}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {isSubmitting ? "Submitting..." : "Submit Product"}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={goToNextStep}
                      disabled={isSubmitting}
                    >
                      {activeStep === "launch" ? (
                        <>
                          <Eye className="mr-2 h-4 w-4" /> Preview
                        </>
                      ) : (
                        <>
                          Next <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default ProductSubmissionForm;
