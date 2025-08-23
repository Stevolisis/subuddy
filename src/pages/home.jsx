import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-zinc-900 min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl text-center space-y-8">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Welcome to <span style={{ color: "#efe000" }}>SubBuddy</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto">
          Share and join subscriptions effortlessly. Save money on your favorite
          services by connecting with a community of trusted users.
        </p>

        {/* CTA */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className="flex items-center gap-2 font-semibold transition-all duration-200"
            style={{
              backgroundColor: "#efe000",
              color: "#000",
              border: "none",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#d4c700";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#efe000";
            }}
            onClick={() => navigate("/subscriptions")}
          >
            Explore Subscriptions
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Optional highlight */}
        <p className="text-sm text-zinc-400">
          Start saving today — find your perfect subscription buddy.
        </p>
      </div>
    </div>
  );
};

export default Home;
