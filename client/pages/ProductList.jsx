import React, { useState } from "react";
import AnimationWrapper from "../src/common/AnimationWrapper";
import Footer from "../src/components/Footer";
import Products from "../src/components/Products";
import { Select, Option } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";

const ProductList = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2] || ""; // Handle empty category
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(""); // Set default sort as null or ""

  const handleFilters = (value, filterType) => {
    setFilters({
      ...filters,
      [filterType]: value,
    });
  };

  return (
    <AnimationWrapper>
      <div className="pt-20 px-6">
        <h1 className="text-4xl font-bold p-5 ml-4 capitalize">
          Dresses: {category ? category : "All"}
        </h1>

        <div className="md:w-full md:max-w-5xl mx-auto flex flex-col md:flex-row justify-between md:px-6 md:py-4 md:space-x-4">
          <div className="flex flex-col gap-4 md:w-1/2">
            <span className="text-xl font-semibold mr-5 mb-2 md:mb-0">
              Filter Products:
            </span>
            <div className="w-full md:w-72 cursor-pointer hover:bg-gray-400">
              <Select
                onChange={(value) => handleFilters(value, "color")}
                name="color"
                label="Color"
                className="cursor-pointer"
              >
                <Option value="">Default</Option>
                <Option value="white">White</Option>
                <Option value="black">Black</Option>
                <Option value="red">Red</Option>
                <Option value="blue">Blue</Option>
                <Option value="yellow">Yellow</Option>
                <Option value="green">Green</Option>
              </Select>
            </div>
            <div className="w-full md:w-72 cursor-pointer hover:bg-gray-400">
              <Select
                onChange={(value) => handleFilters(value, "size")}
                name="size"
                label="Size"
                className="cursor-pointer"
              >
                <Option value="">Default</Option>
                <Option value="XS">XS</Option>
                <Option value="S">S</Option>
                <Option value="M">M</Option>
                <Option value="L">L</Option>
                <Option value="XL">XL</Option>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:w-1/2">
            <span className="text-xl font-semibold mr-5 mb-2 md:mb-0">
              Sort:
            </span>
            <div className="w-full md:w-72">
              <Select
                onChange={(value) => setSort(value)}
                name="newest"
                label="Newest"
                className="cursor-pointer"
              >
                <Option value="">Default</Option>
                <Option value="asc">Price (lowest)</Option>
                <Option value="desc">Price (highest)</Option>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <Products
        category={category}
        filters={filters}
        sort={sort || "newest"} // Handle default sort
      />
      <Footer />
    </AnimationWrapper>
  );
};

export default ProductList;
