import CategoryCarousel from "./CategoryCarousel.jsx";
import Footer from "./shared/Footer.jsx";
import HeroSection from "./HeroSection.jsx";
import LatestJobs from "./LatestJobs.jsx";
import NavBar from "./shared/NavBar.jsx";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useGetAllJobs from "@/hooks/useGetAllJobs.jsx";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);
  return (
    <div>
      <NavBar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
