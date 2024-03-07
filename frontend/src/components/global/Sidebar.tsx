import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CATEGORY } from "../../constants/routes";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
    getCategory,
    selectCategory,
} from "../../redux/features/categories/categorySlice";
import Message from "./Message";
import Title from "./Title";

const Sidebar = () => {
    return (
        <div className="w-full h-full py-8 text-center px-3 mb-10 lg:px-3 lg:py-3">
            <Title title="Categorie:" />
            <CategoryButton />
            
        </div>
      
    );
};

export default Sidebar;

const CategoryButton = () => {
    const { catId } = useParams();
    const router = useNavigate();
    const { categories, error, isError, isLoading } =
        useAppSelector(selectCategory);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(getCategory());
        }
    }, [categories.length, dispatch]);

    const handleCategory = (id: number) => {
        router(`${CATEGORY}/${id}`);
    };

    let showCategory = null;
    if (isLoading)
        showCategory = <div className="h-16 bg-slate-200 animate-pulse"></div>;
    if (!isLoading && error)
        showCategory = <Message error={isError} message={error} />;
    if (!isLoading && categories.length > 0 && !error) {
        const regularStyle =
            "text-sm rounded-md text-gray-500 px-2 py-1 mt-2 ml-1 bg-transparent outline-none border border-gray-300 hover:cursor-pointer hover:border-blue-500 transition-all hover:text-blue-500";
        const activeStyle =
            "text-sm rounded-md text-blue-500 px-2 py-1 mt-2 ml-1 bg-transparent outline-none border border-blue-300 hover:cursor-pointer hover:border-blue-500 transition-all hover:text-blue-500";
        showCategory = categories.map((item) => (
            <button
                key={item.categoryId}
                className={
                    catId && Number(catId) === item.categoryId
                        ? activeStyle
                        : regularStyle
                }
                onClick={() => handleCategory(item.categoryId)}
            >
                {item.categoryTitle}
            </button>
        ));
    }

    
return (
    <div className="text-gray-1000 text-m">
    {showCategory}
{/*     <div className="border-b text-center text-gray-1000 ">
  

    <div className="mt-24 ">Contatti:</div>
    
    <div className="flex  items-center justify-center gap-2">
        <a href="https://www.linkedin.com/in/vincenzo-melillo-developer/" target="_blank" rel="noopener noreferrer">
            LinkedIn
        </a>
        <a href="https://github.com/Vince-mel" target="_blank" rel="noopener noreferrer">
            Github
        </a>
    </div>

    <div className="mt-1 mb-2">
        <p>copyright&copy;Vincenzo M.</p>
    </div>  
    </div>  */}
    </div>


);
};

