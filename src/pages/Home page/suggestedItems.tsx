// Suggested Items Page
import React from "react";
import { Grid, Typography } from "@mui/material";
import ItemCard from "../../components/atomicComponents/ItemCard";

const SuggestedItems: React.FC = () => {
  const categories = [
    {
      Apparels: [
        "T-shirts",
        "Jackets",
        "Button ups",
        "Jeans",
        "Cargo",
        "Khakis",
      ],
    },
    {
      Cosmetics: ["Lipsticks", "Eye Shadows", "Blush", "Foundation"],
    },
  ];
  const items = Array.from({ length: 8 }, (_, index) => ({
    productName: `Product Name`,
    brandName: `Brand`,
  }));

  return (
    <Grid container className="flex gap-4">
      {/* The sidebar */}
      <Grid
        item
        xs={3}
        className="bg-gray-100 rounded-xl py-4 px-6 flex flex-col"
      >
        <Typography
          variant="h6"
          className="font-Dhurjati text-[220%] font-normal text-gray-300 leading-[1]"
        >
          Filters
        </Typography>
        <hr className="my-2 bg-gray-200 w-full h-[2px] border-none" />
        <Typography
          variant="h6"
          className="font-Dhurjati font-md text-[180%] text-gray-300 leading-[1]"
        >
          Categories
        </Typography>
        {categories.map((category, index) => (
          <div key={index} className="mt-4">
            {Object.entries(category).map(([categoryName, items]) => (
              <div key={categoryName}>
                <Typography
                  variant="body1"
                  className="font-Dhurjati font-thin text-[150%] text-gray-300 leading-[1] cursor-pointer"
                >
                  {categoryName}
                </Typography>
                <ul className="pl-4 list-none">
                  {items.map((item: string) => (
                    <li key={item} className="pt-2">
                      <Typography
                        variant="body2"
                        className="font-Dhurjati font-thin text-[150%] text-gray-300 leading-[1] cursor-pointer"
                      >
                        {item}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </Grid>
      {/* The suggested items section */}
      <Grid item xs={8.5} className="">
        <h1 className="font-Dhurjati text-[220%] font-normal text-gray-300 leading-[1]">
          Suggested Items
        </h1>
        {/* Grid Rows */}
        <Grid className="flex flex-col gap-8 mt-4">
          {Array.from({ length: items.length / 3 }, (_, rowIndex) => (
            <Grid key={rowIndex} className="flex justify-between">
              {/* Grid Cols */}
              {Array.from({ length: 3 }, (_, colIndex) => (
                <ItemCard
                  key={rowIndex * 3 + colIndex}
                  productName={items[rowIndex * 3 + colIndex].productName}
                  brandName={items[rowIndex * 3 + colIndex].brandName}
                />
              ))}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SuggestedItems;
