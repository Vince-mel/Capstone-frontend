import { CATEGORY_LIST_ENDPOINT } from "../../../constants/routes";
import axios from "../../../utils/axiosInstance";
import { Category } from "../../../types/types"; 

export const fetchCategoryList = async (): Promise<Category[]> => {
    const response = await axios.get(CATEGORY_LIST_ENDPOINT);
    return response.data;
};
