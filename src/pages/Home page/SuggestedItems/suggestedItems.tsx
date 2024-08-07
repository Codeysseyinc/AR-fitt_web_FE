/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CategorySidebar from "./components/categorySidebar";
import ItemCard from "../../../components/atomicComponents/ItemCard";
import { RootState } from "../../../redux/rootReducer";
import { setSelectedCategory } from "../../../redux/main/mainActions";
import PantsItemsData from "../../../utils/constants/JSON/pantsInventory.json";
import ShirtsItemsData from "../../../utils/constants/JSON/shirtsInventory.json";
import LipstickItemsData from "../../../utils/constants/JSON/lipstickInventory.json";
import ApparelCategoryData from "../../../utils/constants/JSON/apparelsCategories.json";
import CosmeticCategoryData from "../../../utils/constants/JSON/cosmeticCategories.json";

const SuggestedItems: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCategory = useSelector(
    (state: RootState) => state.main.selectedCategory
  );
  const [items, setItems] = useState<any>();
  const [categories, setCategories] = useState<{ [key: string]: any }>({});

  const isEmpty = (obj: any) =>
    Object.keys(obj).length === 0 && obj.constructor === Object;
  const capitalizeFirstChar = (str: any) => {
    if (typeof str !== "string" || str.length === 0) {
      return str; // Return the string as is if it's not a string or is empty
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const updateQueryParams = (type: string, category: any) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("type", type);
    searchParams.set("categoryName", category.name);
    searchParams.set("categoryId", category.id);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };
  const initializeCategories = (
    apparelCategory: any,
    cosmeticCategory: any
  ) => {
    const newCategories: { [key: string]: any } = {};
    if (apparelCategory && apparelCategory.length > 0) {
      newCategories["Apparel"] = apparelCategory;
    }
    if (cosmeticCategory && cosmeticCategory.length > 0) {
      newCategories["Cosmetics"] = cosmeticCategory;
    }
    setCategories(newCategories);
  };
  const setDefaultCategory = (apparelCategory: any, cosmeticCategory: any) => {
    const defaultCategory =
      (apparelCategory &&
        apparelCategory.length > 0 && {
          type: "Apparel",
          category: apparelCategory[0],
        }) ||
      (cosmeticCategory &&
        cosmeticCategory.length > 0 && {
          type: "Cosmetics",
          category: cosmeticCategory[0],
        });

    if (defaultCategory) {
      updateQueryParams(defaultCategory?.type, defaultCategory?.category);
      dispatch(setSelectedCategory(defaultCategory));
    }
  };
  const setCategoryFromQueryParams = (
    apparelCategory: any,
    cosmeticCategory: any,
    queryParamType: string | null,
    queryParamCategory: string | null,
    queryParamId: string | null
  ) => {
    const typeCategories = queryParamType ? categories[queryParamType] : null;
    if (typeCategories && queryParamCategory && queryParamId) {
      // First Validate
      const validCategory = typeCategories.find(
        (item: any) =>
          item.id === queryParamId && item.name === queryParamCategory
      );
      if (validCategory) {
        dispatch(
          setSelectedCategory({
            type: queryParamType,
            category: {
              id: queryParamId,
              name: queryParamCategory,
            },
          })
        );
        return;
      }
    }
    if (typeCategories) {
      const typeFromQueryParam = capitalizeFirstChar(queryParamType);
      const defaultCategory = typeCategories[0];

      if (defaultCategory) {
        dispatch(
          setSelectedCategory({
            type: typeFromQueryParam,
            category: {
              id: defaultCategory.id,
              name: defaultCategory.name,
            },
          })
        );
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("type", typeFromQueryParam);
        searchParams.set("categoryName", defaultCategory.name);
        searchParams.set("categoryId", defaultCategory.id);
        navigate(`${location.pathname}?${searchParams.toString()}`);
        return;
      }
    }
    setDefaultCategory(apparelCategory, cosmeticCategory);
  };

  const handleTypeCategory = (type: string) => {
    let defaultCategory: any;
    if (type === "Apparel") {
      defaultCategory = {
        type: "Apparel",
        category: categories[type][0],
      };
    } else if (type === "Cosmetics") {
      defaultCategory = {
        type: "Cosmetics",
        category: categories[type][0],
      };
    }
    updateQueryParams(type, defaultCategory.category);
    dispatch(setSelectedCategory(defaultCategory));
  };
  const handleCategory = (category: any) => {
    const selected_category = {
      type: capitalizeFirstChar(category?.type),
      category: category,
    };
    updateQueryParams(selectedCategory.type, category);
    dispatch(setSelectedCategory(selected_category));
  };
  // ? Dummy Function
  // TODO: Remove this and integ api
  const getItems = (category: any) => {
    if (category?.category?.name === "Shirts") {
      return ShirtsItemsData;
    } else if (category?.category?.name === "Pants") {
      return PantsItemsData;
    } else if (category?.category?.name === "Lipsticks") {
      return LipstickItemsData;
    } else return null;
  };

  useEffect(() => {
    initializeCategories(ApparelCategoryData, CosmeticCategoryData);
  }, []);

  useEffect(() => {
    if (!isEmpty(categories)) {
      const queryParams = new URLSearchParams(location.search);
      const queryParamType = queryParams.get("type");
      const queryParamCategory = queryParams.get("categoryName");
      const queryParamId = queryParams.get("categoryId");

      setCategoryFromQueryParams(
        ApparelCategoryData,
        CosmeticCategoryData,
        queryParamType,
        queryParamCategory,
        queryParamId
      );
    }
  }, [categories]);

  useEffect(() => {
    if (selectedCategory) {
      const response = getItems(selectedCategory);
      setItems(response);
    }
  }, [selectedCategory]);

  return (
    <Grid
      container
      className="w-full flex max-mui_sm:flex-col max-mui_sm:gap-0 gap-4"
    >
      {/* The sidebar */}
      <CategorySidebar
        categories={categories}
        handleTypeCategory={handleTypeCategory}
        handleCategory={handleCategory}
      />
      {/* The suggested items section */}
      <Grid item xs={12} md={7} lg={8.5} className="p-0 m-0">
        <h1 className="font-Dhurjati text-[220%] font-normal text-gray-300 leading-[1] p-0 my-4">
          Suggested Items
        </h1>
        {/* Grid Rows */}
        <Grid
          container
          gap={2}
          className="flex flex-wrap w-full max-mui_md:justify-center"
        >
          {items?.map((item: any, index: React.Key | null | undefined) => (
            <Grid
              item
              key={index}
              className="w-[100%] mui_sm:w-[45%] mui_md:w-[48%] mui_lg:w-[32%] min-h-[320px]"
            >
              <ItemCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SuggestedItems;
