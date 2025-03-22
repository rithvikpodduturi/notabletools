
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserProfile from "@/components/user/UserProfile";

const Profile = () => {
  const { userId } = useParams();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <UserProfile userId={userId} />
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
