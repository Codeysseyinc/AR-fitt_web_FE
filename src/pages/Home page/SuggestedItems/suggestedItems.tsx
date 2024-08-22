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
import { useQuery } from "react-query";
import dashboardService from "../../../services/dashboard.service";
import CONSTANTS from "../../../utils/constants/CONSTANTS";

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
  const initializeCategories = (category: any, categoryType: string) => {
    const newCategories: { [key: string]: any } = {};
    if (category && category.length > 0) {
      newCategories[categoryType] = category;
    }
    setCategories((prevData) => ({
      ...prevData,
      [categoryType]: newCategories[categoryType],
    }));
  };
  const setDefaultCategory = () => {
    if (categories || Object.keys(categories).length > 0) {
      const [firstKey, firstArray] = Object.entries(categories)[0];
      const defaultCategory = {
        type: firstKey,
        category: firstArray,
      };
      if (defaultCategory && defaultCategory?.category) {
        updateQueryParams(defaultCategory?.type, defaultCategory?.category);
        dispatch(setSelectedCategory(defaultCategory));
      }
    }
  };
  const setCategoryFromQueryParams = (
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
    setDefaultCategory();
  };
  const handleTypeCategory = (type: string) => {
    if (categories[type].length > 0) {
      const defaultCategory = {
        type: type,
        category: categories[type][0],
      };
      updateQueryParams(type, defaultCategory.category);
      dispatch(setSelectedCategory(defaultCategory));
    }
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

  const useGetCategories = (type: string) => {
    return useQuery(
      ["getCategories", type],
      async () => await dashboardService.getCategories(type, dispatch),
      {
        enabled: false,
        onSuccess: (response) => {
          const categoriesResponse = response?.data?.message;
          // TODO: Remove the ternary
          initializeCategories(
            categoriesResponse,
            type === "apparel" ? "Apparel" : "Cosmetics"
          );
        },
        onError: (error) => {
          console.log(
            "XX => Error Occured While Fetching Categories For Type: ",
            type
          );
        },
      }
    );
  };
  const { refetch: getApparelCategories } = useGetCategories(CONSTANTS.APPAREL);
  const { refetch: getCosmeticsCategories } = useGetCategories(
    CONSTANTS.COSMETICS
  );

  useEffect(() => {
    getApparelCategories();
    getCosmeticsCategories();
  }, []);

  useEffect(() => {
    if (!isEmpty(categories)) {
      const queryParams = new URLSearchParams(location.search);
      const queryParamType = queryParams.get("type");
      const queryParamCategory = queryParams.get("categoryName");
      const queryParamId = queryParams.get("categoryId");

      setCategoryFromQueryParams(
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
