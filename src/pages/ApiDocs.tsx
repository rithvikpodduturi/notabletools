
import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/animations/FadeIn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Code } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ApiDocs = () => {
  const { isAuthenticated } = useAuth();
  const [section, setSection] = useState<string>("overview");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="container-custom">
          <FadeIn>
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Code className="h-8 w-8 text-brand-orange" />
                <h1 className="text-3xl md:text-4xl font-bold">Developer API</h1>
              </div>
              
              <p className="text-lg text-muted-foreground mb-8">
                Build applications on top of our platform with our RESTful API.
                Access product data, collections, and more.
              </p>
              
              {!isAuthenticated && (
                <Card className="mb-8">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                      <p className="text-muted-foreground">
                        Sign in to get your API keys and start building
                      </p>
                      <Button>Sign In to Get API Keys</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <div className="grid md:grid-cols-[250px_1fr] gap-8">
                <div className="space-y-2">
                  <div 
                    className={`p-3 cursor-pointer rounded-md ${section === 'overview' ? 'bg-muted' : 'hover:bg-muted/50'}`}
                    onClick={() => setSection('overview')}
                  >
                    Overview
                  </div>
                  <div 
                    className={`p-3 cursor-pointer rounded-md ${section === 'authentication' ? 'bg-muted' : 'hover:bg-muted/50'}`}
                    onClick={() => setSection('authentication')}
                  >
                    Authentication
                  </div>
                  <div 
                    className={`p-3 cursor-pointer rounded-md ${section === 'products' ? 'bg-muted' : 'hover:bg-muted/50'}`}
                    onClick={() => setSection('products')}
                  >
                    Products API
                  </div>
                  <div 
                    className={`p-3 cursor-pointer rounded-md ${section === 'comments' ? 'bg-muted' : 'hover:bg-muted/50'}`}
                    onClick={() => setSection('comments')}
                  >
                    Comments API
                  </div>
                  <div 
                    className={`p-3 cursor-pointer rounded-md ${section === 'collections' ? 'bg-muted' : 'hover:bg-muted/50'}`}
                    onClick={() => setSection('collections')}
                  >
                    Collections API
                  </div>
                  <div 
                    className={`p-3 cursor-pointer rounded-md ${section === 'webhooks' ? 'bg-muted' : 'hover:bg-muted/50'}`}
                    onClick={() => setSection('webhooks')}
                  >
                    Webhooks
                  </div>
                  <div 
                    className={`p-3 cursor-pointer rounded-md ${section === 'widgets' ? 'bg-muted' : 'hover:bg-muted/50'}`}
                    onClick={() => setSection('widgets')}
                  >
                    Embeddable Widgets
                  </div>
                  <div 
                    className={`p-3 cursor-pointer rounded-md ${section === 'api-keys' ? 'bg-muted' : 'hover:bg-muted/50'}`}
                    onClick={() => setSection('api-keys')}
                  >
                    API Key Management
                  </div>
                </div>
                
                <div>
                  {section === 'overview' && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Overview</h2>
                      <p className="mb-4">
                        Our RESTful API provides programmatic access to products, collections, comments, and other data.
                        The API is organized around REST principles and returns JSON-encoded responses.
                      </p>
                      
                      <h3 className="text-xl font-medium mt-6 mb-3">Base URL</h3>
                      <div className="bg-muted p-3 rounded-md font-mono text-sm mb-4">
                        https://api.yourdomain.com/v1
                      </div>
                      
                      <h3 className="text-xl font-medium mt-6 mb-3">Rate Limits</h3>
                      <p className="mb-4">
                        The API has a rate limit of 100 requests per minute per API key.
                        Rate limit information is included in the response headers.
                      </p>
                      
                      <h3 className="text-xl font-medium mt-6 mb-3">Error Handling</h3>
                      <p className="mb-4">
                        The API returns standard HTTP status codes to indicate success or failure.
                        Error responses include a JSON object with more details.
                      </p>
                      
                      <div className="bg-muted p-3 rounded-md font-mono text-sm mb-4">
                        {`{
  "error": {
    "code": "validation_error",
    "message": "The product name is required",
    "details": [
      {"field": "name", "message": "This field is required"}
    ]
  }
}`}
                      </div>
                    </div>
                  )}
                  
                  {section === 'authentication' && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Authentication</h2>
                      <p className="mb-4">
                        All API requests require authentication using an API key.
                        You can manage your API keys in the developer dashboard.
                      </p>
                      
                      <h3 className="text-xl font-medium mt-6 mb-3">API Key Authentication</h3>
                      <p className="mb-4">
                        Include your API key in the request headers:
                      </p>
                      
                      <div className="bg-muted p-3 rounded-md font-mono text-sm mb-4">
                        X-API-Key: your_api_key
                      </div>
                      
                      <h3 className="text-xl font-medium mt-6 mb-3">Example Request</h3>
                      <div className="bg-muted p-3 rounded-md font-mono text-sm mb-4">
                        {`curl -X GET \\
  https://api.yourdomain.com/v1/products \\
  -H "X-API-Key: your_api_key" \\
  -H "Content-Type: application/json"`}
                      </div>
                    </div>
                  )}
                  
                  {section === 'products' && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Products API</h2>
                      <p className="mb-4">
                        The Products API allows you to retrieve product information and manage products.
                      </p>
                      
                      <h3 className="text-xl font-medium mt-6 mb-3">List Products</h3>
                      <div className="bg-muted p-3 rounded-md font-mono text-sm mb-4">
                        GET /products
                      </div>
                      
                      <h3 className="text-xl font-medium mt-6 mb-3">Get Product</h3>
                      <div className="bg-muted p-3 rounded-md font-mono text-sm mb-4">
                        GET /products/:id
                      </div>
                      
                      <h3 className="text-xl font-medium mt-6 mb-3">Create Product</h3>
                      <div className="bg-muted p-3 rounded-md font-mono text-sm mb-4">
                        POST /products
                      </div>
                      
                      <h3 className="text-xl font-medium mt-6 mb-3">Update Product</h3>
                      <div className="bg-muted p-3 rounded-md font-mono text-sm mb-4">
                        PUT /products/:id
                      </div>
                      
                      <h3 className="text-xl font-medium mt-6 mb-3">Response Format</h3>
                      <div className="bg-muted p-3 rounded-md font-mono text-sm mb-4">
                        {`{
  "product": {
    "id": "1",
    "name": "Product Name",
    "tagline": "Short description",
    "description": "Full description",
    "upvotes": 120,
    "launchDate": "2023-08-15T10:00:00Z",
    "makers": [
      {
        "id": "1",
        "name": "John Doe",
        "avatar": "https://..."
      }
    ]
  }
}`}
                      </div>
                    </div>
                  )}
                  
                  {(section === 'comments' || section === 'collections' || section === 'webhooks' || section === 'api-keys') && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4">{section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')} API</h2>
                      <p className="mb-4">
                        Documentation for this section is under development. 
                        Refer to the API overview for general principles that apply to all endpoints.
                      </p>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <p className="text-muted-foreground">
                            Want to help improve our documentation? <a href="#" className="text-brand-orange hover:underline">Contact us</a>
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  
                  {section === 'widgets' && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Embeddable Widgets</h2>
                      <p className="mb-4">
                        Showcase your ProductHunt presence on your website with our embeddable widgets.
                      </p>
                      
                      <h3 className="text-xl font-medium mt-6 mb-3">Product Card Widget</h3>
                      <p className="mb-4">
                        Display your product with upvote count and launch date.
                      </p>
                      
                      <Card className="mb-6">
                        <CardHeader>
                          <CardTitle>Product Card Widget</CardTitle>
                          <CardDescription>Display your product information</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="border border-dashed border-gray-300 p-6 rounded-md flex items-center justify-center">
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Product Widget Preview</p>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <p className="text-sm text-muted-foreground mb-2">Embed code:</p>
                            <div className="bg-muted p-3 rounded-md font-mono text-sm mb-4">
                              {`<script src="https://yourdomain.com/widgets/product.js" data-product-id="123"></script>`}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <h3 className="text-xl font-medium mt-6 mb-3">Upvote Button Widget</h3>
                      <p className="mb-4">
                        Add an upvote button to your website.
                      </p>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Upvote Button Widget</CardTitle>
                          <CardDescription>Let users upvote directly from your site</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="border border-dashed border-gray-300 p-6 rounded-md flex items-center justify-center">
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Upvote Widget Preview</p>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <p className="text-sm text-muted-foreground mb-2">Embed code:</p>
                            <div className="bg-muted p-3 rounded-md font-mono text-sm mb-4">
                              {`<script src="https://yourdomain.com/widgets/upvote.js" data-product-id="123"></script>`}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApiDocs;
