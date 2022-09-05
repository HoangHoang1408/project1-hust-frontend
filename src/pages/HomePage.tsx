import { useNavigate } from "react-router-dom";
import FeatureSection from "../components/HomePage/FeatureSection";
import HeroSection from "../components/HomePage/HeroSection";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="flex flex-col space-y-8 bg-white">
      <HeroSection />
      <FeatureSection />
    </div>
  );
};

export default HomePage;
