
import React from "react";
import { ProductFormValues } from "../ProductSubmissionForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Edit, Clock, ThumbsUp, MessageSquare, Link as LinkIcon } from "lucide-react";

interface PreviewStepProps {
  formValues: ProductFormValues;
}

const PreviewStep: React.FC<PreviewStepProps> = ({ formValues }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Preview Your Product</h2>
        <p className="text-sm text-muted-foreground">
          This is how your product will appear to the community
        </p>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <div className="bg-muted/30 p-6">
          <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-8">
            {/* Left column - Product details */}
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                {formValues.images.length > 0 && (
                  <img 
                    src={formValues.images[0].src} 
                    alt={formValues.images[0].alt}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                )}
                <div>
                  <h1 className="text-2xl font-bold">{formValues.name}</h1>
                  <p className="text-muted-foreground">{formValues.tagline}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formValues.tags.map(tag => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="about" className="w-full">
                <TabsList>
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="pt-4">
                  <div className="prose prose-sm max-w-none">
                    {formValues.description.split('\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="gallery" className="pt-4">
                  {formValues.images.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {formValues.images.map((image, i) => (
                        <div key={i} className="rounded-md overflow-hidden aspect-video bg-muted">
                          <img 
                            src={image.src} 
                            alt={image.alt} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No images uploaded</p>
                  )}
                </TabsContent>
              </Tabs>
              
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>0</span>
                </Button>
                
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  <span>0</span>
                </div>
              </div>
            </div>
            
            {/* Right column - Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-4 space-y-4">
                  {formValues.websiteUrl && (
                    <Button variant="outline" className="w-full gap-2">
                      <LinkIcon className="h-4 w-4" />
                      <span>Visit Website</span>
                    </Button>
                  )}
                  
                  {formValues.makers.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Maker{formValues.makers.length > 1 ? 's' : ''}</h3>
                      <div className="space-y-2">
                        {formValues.makers.map((maker, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={maker.avatar} alt={maker.name} />
                              <AvatarFallback>{maker.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{maker.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {formValues.category && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Category</h3>
                      <Badge variant="secondary">
                        {formValues.category}
                      </Badge>
                    </div>
                  )}
                  
                  {formValues.pricing && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Pricing</h3>
                      <p className="text-sm capitalize">{formValues.pricing}</p>
                    </div>
                  )}
                  
                  {formValues.launchType === "scheduled" && formValues.scheduledDate && (
                    <div className="bg-muted/50 p-3 rounded-md flex gap-2 items-center text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="font-medium">Scheduled for</span>
                        <div className="text-muted-foreground">
                          {format(formValues.scheduledDate, "MMMM d, yyyy")}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 border rounded-lg p-4">
        <div className="flex gap-3 items-start">
          <Edit className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <h3 className="font-medium">Ready to submit?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Review your product information carefully before submitting. Once submitted, you'll be able to make minor edits, but major changes will require resubmission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewStep;
