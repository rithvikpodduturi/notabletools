
import { Link } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/animations/FadeIn";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="container-custom">
          <FadeIn>
            <div className="max-w-md mx-auto text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">
                Sign in to your account to continue
              </p>
            </div>
            <AuthForm />
            
            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                By signing in, you agree to our{" "}
                <Link to="/terms" className="text-brand-orange hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-brand-orange hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
