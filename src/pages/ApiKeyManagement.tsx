
import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/animations/FadeIn";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clipboard, Key, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const ApiKeyManagement = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [newKeyName, setNewKeyName] = useState('');
  const [showNewKey, setShowNewKey] = useState(false);
  const [newKey, setNewKey] = useState('');
  
  // Mock API keys - in a real app, these would come from an API call
  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'Development', key: 'ph_dev_123456', createdAt: '2023-06-15T14:30:00Z' },
    { id: '2', name: 'Production', key: 'ph_prod_654321', createdAt: '2023-07-20T09:15:00Z' },
  ]);
  
  React.useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access API key management",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [isAuthenticated, navigate, toast]);
  
  const createApiKey = () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Validation Error",
        description: "API key name is required",
        variant: "destructive",
      });
      return;
    }
    
    // Generate a random key - in a real app, this would be handled by the backend
    const genKey = `ph_dev_${Math.random().toString(36).substring(2, 15)}`;
    
    const newApiKey = {
      id: (apiKeys.length + 1).toString(),
      name: newKeyName,
      key: genKey,
      createdAt: new Date().toISOString(),
    };
    
    setApiKeys([...apiKeys, newApiKey]);
    setNewKey(genKey);
    setShowNewKey(true);
    setNewKeyName('');
    
    toast({
      title: "API Key Created",
      description: "Your new API key has been created",
    });
  };
  
  const deleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    
    toast({
      title: "API Key Deleted",
      description: "Your API key has been deleted",
    });
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    
    toast({
      title: "Copied to Clipboard",
      description: "API key copied to clipboard",
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="container-custom">
          <FadeIn>
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Key className="h-8 w-8 text-brand-orange" />
                <h1 className="text-3xl md:text-4xl font-bold">API Key Management</h1>
              </div>
              
              <p className="text-lg text-muted-foreground mb-8">
                Create and manage API keys to access our developer API.
              </p>
              
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Your API Keys</CardTitle>
                      <CardDescription>
                        Create and manage your API keys for accessing the developer API
                      </CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Create New Key
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create API Key</DialogTitle>
                          <DialogDescription>
                            Give your API key a descriptive name for easy identification
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <label className="text-sm font-medium mb-2 block">
                            API Key Name
                          </label>
                          <Input
                            placeholder="e.g. Development, Production, etc."
                            value={newKeyName}
                            onChange={(e) => setNewKeyName(e.target.value)}
                          />
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setNewKeyName('')}>
                            Cancel
                          </Button>
                          <Button onClick={createApiKey}>
                            Create Key
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  {showNewKey && (
                    <Card className="bg-muted mb-6">
                      <CardHeader>
                        <CardTitle className="text-lg">Your New API Key</CardTitle>
                        <CardDescription>
                          Make sure to copy your API key now. You won't be able to see it again!
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          <Input value={newKey} readOnly className="font-mono" />
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => copyToClipboard(newKey)}
                          >
                            <Clipboard className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" onClick={() => setShowNewKey(false)}>
                          Done
                        </Button>
                      </CardFooter>
                    </Card>
                  )}
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>API Key</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {apiKeys.map((apiKey) => (
                        <TableRow key={apiKey.id}>
                          <TableCell className="font-medium">{apiKey.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <code className="bg-muted px-1 py-0.5 rounded font-mono">
                                {apiKey.key.substring(0, 10)}...
                              </code>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8" 
                                onClick={() => copyToClipboard(apiKey.key)}
                              >
                                <Clipboard className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(apiKey.createdAt)}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => deleteApiKey(apiKey.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>API Documentation</CardTitle>
                  <CardDescription>
                    Learn how to use our API with comprehensive documentation
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p>
                    Our API documentation provides detailed information about endpoints,
                    authentication, request/response formats, and example code snippets.
                  </p>
                  <Button onClick={() => navigate('/api-docs')} className="self-start">
                    View API Documentation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApiKeyManagement;
