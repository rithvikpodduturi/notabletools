
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserSettings from "@/components/user/UserSettings";

const Settings = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <UserSettings />
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
