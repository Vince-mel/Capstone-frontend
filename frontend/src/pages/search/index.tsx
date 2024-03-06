import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "../../components/global/Container";
import Message from "../../components/global/Message";
import Title from "../../components/global/Title";
import HorizontalLoader from "../../components/loader/HorizontalLoader";
import RecommendedCard from "../../components/story/RecommendedCard";
import { ERR_MSG } from "../../constants/common";
import { SEARCH_POST_ENDPOINT } from "../../constants/routes";
import { Post } from "../../types/types";
import axios from "../../utils/axiosInstance";
import Sidebar from "../../components/global/Sidebar";
import Footer from "../../components/global/footer";



const Search = () => {
    const { search } = useLocation();
    const query = search.slice(1);

    const [postBySearch, setPostBySearch] = useState<Post[] | []>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async (query: string) => {
            try {
                setIsLoading(true);
                setIsLoading(false);
                setError("");
                const res = await (
                    await axios.get(`${SEARCH_POST_ENDPOINT}/${query}`)
                ).data;
                setPostBySearch(res);
                setIsLoading(false);
                setIsLoading(false);
                setError("");
            } catch (error: any) {
                setIsLoading(false);
                setIsLoading(false);

                setError(
                    typeof error === "string"
                        ? error
                        : error?.message
                        ? error?.message
                        : ERR_MSG
                );
            }
        };

        if (query.split("=")[0] === "query" && query.split("=")[1]) {
            fetchData(query.split("=")[1]);
        }
    }, [query]);

    let showSearchedPost = null;
    if (isLoading) {
        showSearchedPost = <HorizontalLoader />;
    }
    if (!isLoading && error) {
        showSearchedPost = <Message message={error} error={true} />;
    }
    if (!isLoading && !error && postBySearch.length === 0) {
        showSearchedPost = <Message message="Nessun Articolo trovato" />;
    }
    if (!isLoading && !error && postBySearch.length > 0) {
        showSearchedPost = (
            <div>
                {postBySearch.map((item) => (
                    <RecommendedCard key={item.id} data={item} />
                ))}
            </div>
        );
    }
    return (
        <Container>
           <div className="flex flex-col items-center min-h-screen">
            <div className="pt-24 w-full mb-10 md:w-9/12">
            <div className="border-b-2 text-center border-gray-400 mb-16">
            <Title
          title={`Risultati per "${query.split("=")[1].replaceAll("+", " ")}"`}
                />
            </div>
            <div className="pt-18">{showSearchedPost}</div>
                </div>

                <Sidebar/> 
                
                </div>
                <Footer/>
             
        </Container>
    );
};

export default Search;
