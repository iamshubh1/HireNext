import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className=" mx-auto px-4 py-2 rounded-full bg-[#F0F0FF] text-[#2648F0] text-base font-medium">
          Where Innovation Meets Hiring? HireNext.
        </span>
        <h1 className="my-3 text-4xl font-bold">
          Explore Jobs,
          <br /> Apply Quickly &{" "}
          <span className="text-[#DE4A82]">Secure Your Future.</span>
        </h1>
        <div
          className="my-2 text-center leading-snug tracking-tight animate-[float_5s_ease-in-out_infinite]"
          style={{
            animationName: "float",
            animationDuration: "5s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
          }}
        >
          <p className="text-xl md:text-2xl font-semibold text-gray-800">
            Rethink Hiring. Redefine Success. Recruit Smarter.
          </p>
          <p className="text-xl md:text-2xl font-semibold text-blue-600">
            Step Into What’s Next with HireNext.
          </p>

          <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  `}</style>
        </div>

        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Your dream role is just a search away…"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#2648F0] hover:bg-[#0B1EE6] text-white"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
