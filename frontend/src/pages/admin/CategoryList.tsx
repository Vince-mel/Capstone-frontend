import { useEffect } from "react";
import TableRowcat from "../../components/admin/TableRowcat";

import Container from "../../components/global/Container";
import Message from "../../components/global/Message";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
    getCategoryList,
    selectCategoryList,
} from "../../redux/features/categories/categoryListslice";
import { Category } from "../../types/types";
import TableHeaderCat from "../../components/admin/TableHeaderCat";

const CategoryList = () => {
    const dispatch = useAppDispatch();
    const { error, isError, isLoading, categoryList} = useAppSelector(selectCategoryList); // Assicurati che questo corrisponda al tuo RootState
  
  

    useEffect(() => {
        dispatch(getCategoryList());
    }, [dispatch]);

    let showCategoryList = null;

    if (isLoading) {
        showCategoryList = (
            <div>
                {[1, 2, 3, 4, 5].map((item) => (
                    <div
                        key={item}
                        className="w-full h-16 bg-slate-200 animate-pulse mb-4=2"
                    ></div>
                ))}
            </div>
        );
    }
    if (!isLoading && isError) {
        showCategoryList = <Message error={true} message={error} />;
    }
    if (!isLoading && categoryList.length > 0) {
        showCategoryList = (
            <div>
                {categoryList.map((item: Category) => (
                    <TableRowcat key={item.categoryId} data={item} />
                ))}
            </div>
        );
    }

    if (!isLoading && categoryList.length === 0 && !isError) {
        showCategoryList = <Message error={false} message="Non ci sono Categorie " />;
    }
    return (
        <Container>
            <div className="py-24">
                <h1 className=" text-2xl text-primary  font-bold mb-20 mx-20">
                    Tutte le Categorie:
                </h1>
                <TableHeaderCat />

                <div>{showCategoryList}</div>
            </div>
        </Container>
    );
};

export default CategoryList;
