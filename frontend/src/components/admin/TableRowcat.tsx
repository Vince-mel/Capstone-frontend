import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { ERR_MSG } from "../../constants/common";
import { CATEGORY_LIST_ENDPOINT } from "../../constants/routes";
import { useAppDispatch } from "../../redux/app/hooks";
import { removeCategoryFromList } from "../../redux/features/categories/categoryListslice";
import { Category } from "../../types/types";
import axios from "../../utils/axiosInstance";
interface IProps {
    data: Category;
}
function TableRowcat({ data }: IProps) {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const handleDelete = async (id: number | undefined) => {
        try {
            setLoading(true);
            await (
                await axios.delete(`${CATEGORY_LIST_ENDPOINT}${id}`)
            ).data;
            toast.success("Categoria eliminata");
            dispatch(removeCategoryFromList(id));
        } catch (error: any) {
            setLoading(false);
            toast.error(error?.message || ERR_MSG);
        }
    };
    return (
        <div>
            <div>
                <div className=" pd grid grid-cols-3   lg:grid-cols-5">
                    <div className="border border-white bg-gray-100 text-gray-700 py-3 text-center overflow-auto">
                        <p>{data.categoryId}</p>
                    </div>
                    <div className=" hidden lg:block border border-white bg-gray-100 text-gray-700 py-3 text-center overflow-auto">
                        <p>{data.categoryTitle}</p>
                    </div>
                    <div className="border border-white bg-gray-100 text-gray-700 py-3 text-center  overflow-auto">
                        <p>{data.categoryDescription}</p>
                    </div>
                   
                        
                    

                    <div className="border border-white bg-gray-100 text-gray-700 py-3 text-center overflow-auto  flex justify-center ">
                        <button
                            disabled={loading}
                            className="p-0 flex items-center gap-2 bg-rose-500 text-white py-1 px-2 rounded hover:bg-red-700 disabled:bg-gray-200"
                            // loading={loading}
                            onClick={() => handleDelete(data.categoryId)}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-4 border-rose-500 border-dotted rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>
                                        <FaTrashAlt />
                                    </span>
                                    <span>Elimina</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableRowcat;
