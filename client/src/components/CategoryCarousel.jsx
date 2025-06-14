import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
  "💻 Frontend Developer",
  "🖥️ Backend Developer",
  "🧑‍💻 Software Development Engineer",
  "🌐 FullStack Developer",
  "☁️ Cloud Architect",
  "🧠 AI/ML Engineer",
  "📱 Mobile Developer",
  "🔒 Cybersecurity Analyst",
  "⚙️ DevOps Engineer",
  "📈 Digital Marketer",
  "🔗 Blockchain Developer",
  "🧭 Product Manager",
  "✍️ Tech Content Writer",
];


const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#2648F0]">Explore Job Categories</h2>
      <Carousel className="relative">
        <CarouselContent className="flex gap-6">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 flex justify-center"
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                className="rounded-full px-6 py-3 bg-gradient-to-r from-[#2648F0] to-[#DE4A82] text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 -translate-x-6" />
        <CarouselNext className="right-0 translate-x-6" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
