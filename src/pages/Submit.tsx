
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductSubmissionForm from "@/components/submission/ProductSubmissionForm";

const Submit = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Submit Your Product</h1>
        <p className="text-muted-foreground mb-8">
          Share your product with our community and get valuable feedback
        </p>
        <ProductSubmissionForm />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Submit;
