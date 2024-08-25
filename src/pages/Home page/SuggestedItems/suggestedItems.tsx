/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CategorySidebar from "./components/categorySidebar";
import ItemCard from "../../../components/atomicComponents/ItemCard";
import { RootState } from "../../../redux/rootReducer";
import { setSelectedCategory } from "../../../redux/main/mainActions";
import { useQuery } from "react-query";
import dashboardService from "../../../services/dashboard.service";
import CONSTANTS from "../../../utils/constants/CONSTANTS";

const SuggestedItems: React.FC = () => {
  // React Hooks
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const typeQueryParamTrigger = queryParams.get("type");
  // Redux Store Variables
  const selectedCategory = useSelector(
    (state: RootState) => state.main.selectedCategory
  );
  // State Variables
  const [items, setItems] = useState<any>();
  const [categories, setCategories] = useState<{ [key: string]: any }>({});
  // Helper Functions
  const isEmpty = (obj: any) =>
    Object.keys(obj).length === 0 && obj.constructor === Object;
  const capitalizeFirstChar = (str: any) => {
    if (typeof str !== "string" || str.length === 0) {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  // For initializing the data the following functions get executed
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
        category: firstArray[0],
      };
      if (defaultCategory && defaultCategory?.category) {
        dispatch(setSelectedCategory(defaultCategory));
        updateQueryParams(defaultCategory);
      }
    }
  };
  // Sets the initial category value in the selected category state variable
  const setCategoryFromQueryParams = (
    queryParamType: string | null,
    queryParamCategory: string | null,
    queryParamId: string | null
  ) => {
    // Holds the categories for the specified type; i.e all categories for apparels etc
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
    } else if (typeCategories) {
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
  // On Selecting Category From Sidebar these function triggers
  const updateQueryParams = (_category: any) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("type", capitalizeFirstChar(_category?.type));
    searchParams.set("categoryName", _category.name);
    searchParams.set("categoryId", _category.id);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };
  const handleTypeCategory = (_type: string) => {
    if (categories[_type].length > 0) {
      const defaultCategory = {
        type: _type,
        category: categories[_type][0],
      };
      updateQueryParams(categories[_type][0]);
      dispatch(setSelectedCategory(defaultCategory));
    }
  };
  const handleCategory = (_category: any) => {
    const selected_category = {
      type: capitalizeFirstChar(_category?.type),
      category: _category,
    };
    updateQueryParams(_category);
    dispatch(setSelectedCategory(selected_category));
  };
  // API CALL - Use Query React Hook Api Call to get all categories
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
  // API CALL - Use Query React Hook Api Call to get all inventory for specified category
  const useGetInventory = (categoryId: string) => {
    return useQuery(
      ["getInventory", categoryId],
      async () => await dashboardService.getInventory(categoryId, dispatch),
      {
        enabled: false,
        onSuccess: (response) => {
          const inventoryResponse = response?.data?.message;
          setItems(inventoryResponse);
        },
        onError: (error) => {
          console.log(
            "XX => Error Occured While Fetching Inventory For Category: ",
            selectedCategory
          );
        },
      }
    );
  };
  const { refetch: getInventory } = useGetInventory(
    selectedCategory?.category?.id
  );
  // On Mount API Call triggered to get all categories
  useEffect(() => {
    getApparelCategories();
    getCosmeticsCategories();
  }, []);
  // On categories state variable change update the query params
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
  }, [categories, typeQueryParamTrigger]);
  // On selected category change get the respective items
  useEffect(() => {
    if (selectedCategory) {
      getInventory();
    }
  }, [selectedCategory]);
  // JSX
  return (
    <Grid
      container
      className="w-full flex max-mui_sm:flex-col max-mui_sm:gap-0 gap-4 pb-10"
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
          {items?.length > 0 ? (
            items?.map((item: any, index: React.Key | null | undefined) => (
              <Grid
                item
                key={index}
                className="w-[100%] mui_sm:w-[45%] mui_md:w-[48%] mui_lg:w-[32%] min-h-[320px]"
              >
                <ItemCard item={item} />
              </Grid>
            ))
          ) : (
            <p>Oops, Currently there are no items for the selected category</p>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SuggestedItems;
