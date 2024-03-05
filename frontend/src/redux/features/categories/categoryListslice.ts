import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ERR_MSG } from "../../../constants/common";
import { Category} from "../../../types/types";
import { RootState } from "../../app/store";
import { fetchCategoryList } from "./categoryListApi";

interface ListCategory {
    isError: boolean;
    isLoading: boolean;
    error: string | undefined;
    categoryList: Category[] | [];
}
const initialState: ListCategory = {
    isError: false,
    isLoading: false,
    categoryList: [],
    error: "",
};

export const getCategoryList = createAsyncThunk<Category[]>(
    "category/allCategoryList", 
    async () => {
      const list = await fetchCategoryList(); 
      return list;
    }
  );


const categoryListSlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        removeCategoryFromList: (state, action) => {
            state.categoryList = state.categoryList.filter(
                (item) => item.categoryId !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryList.pending, (state: ListCategory) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(getCategoryList.fulfilled, (state: ListCategory, action) => {
                state.isError = false;
                state.isLoading = false;
                state.error = "";
                state.categoryList = action.payload;
            })
            .addCase(getCategoryList.rejected, (state: ListCategory, action) => {
                state.isError = true;
                state.isLoading = false;
                state.error = action.error?.message || ERR_MSG;
            });
    },
});
export const { removeCategoryFromList } = categoryListSlice.actions;
export const selectCategoryList = (state: RootState) => state.categoryList;
export default categoryListSlice.reducer;
