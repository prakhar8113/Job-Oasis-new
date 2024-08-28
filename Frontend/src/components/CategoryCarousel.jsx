import { setSearchedQuery } from "@/redux/jobSlice.js";
import { Button } from "./ui/button.jsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "Full Stack ",
  "Data Analyst",
  "AI engineer",
  "Machine Learning",
  "UX/UI Designer",
];

const CategoryCarousel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((item, index) => (
            <CarouselItem className="md:basis-1/2 lg-basis-1/3" key={index}>
              <Button
                onClick={() => searchJobHandler(item)}
                className="rounded-full"
              >
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
