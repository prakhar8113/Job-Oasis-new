import { useEffect, useState } from "react";
import { Label } from "./ui/label.jsx";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group.jsx";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice.js";

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Banglore", "Hyderabad", "Pune", "Mumbai", "Chennai"],
  },
  {
    fitlerType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Data Science",
      "Graphic Designer",
      "Full Stack ",
      "Data Analyst",
      "AI engineer",
      "Machine Learning",
      "UX/UI Designer",
    ],
  },
  {
    fitlerType: "Salary",
    array: ["0lakhs to 6lakhs", "7lakhs to 13lakh", "14lakh to 20lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
    console.log(selectedValue);
  }, [selectedValue, dispatch]);
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {fitlerData.map((data, index) => (
          <div key={index}>
            <h1 className="font-bold text-lg">{data.fitlerType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `r${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 my-2" key={idx}>
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
