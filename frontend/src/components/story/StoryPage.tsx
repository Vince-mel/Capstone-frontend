import { useEffect, useState } from "react";
import { ERR_MSG } from "../../constants/common";
import { PRIMARY } from "../../constants/theme";
import { Comment, Post, User } from "../../types/types";
import axios from "../../utils/axiosInstance";

import moment from "moment";
import { toast } from "react-toastify";
import {
    BLOG_IMAGE_ENDPOINT,
    COMMENT_ENDPOINT,
    RELATED_POST_BY_CATEGORY_ENDPOINT,
    DELETE_COMMENT_ENDPOINT,
} from "../../constants/routes";
import Avatar from "../global/Avatar";
import Button from "../global/Button";
import CategoryBtn from "../global/CategoryBtn";
import Comments from "../global/Comments";
import Message from "../global/Message";
import HorizontalLoader from "../loader/HorizontalLoader";
import RecommendedCard from "./RecommendedCard";
interface IProps {
    data: Post | null;
    loading: boolean;
    error: string;
    setData: Function;
    user: User | null;
}
const StoryPage = ({ data, loading, error, setData, user }: IProps) => {
    
    const [related, setRelated] = useState<Post[] | []>([]);
    const [relatedLoading, setRelatedLoading] = useState(false);

    
    const [comment, setComment] = useState("");
    const [cmntLoading, setCmntLoading] = useState(false);


   /*  ELIMINARE COMMENTI */

   const handleDeleteComment = async (commentId: number) => {
    try {
        setCmntLoading(true);
        await axios.delete(`${DELETE_COMMENT_ENDPOINT}/${commentId}`);
        if (data) {
            const updatedComments = data.comments.filter(comment => comment.id !== commentId);
            setData({ ...data, comments: updatedComments });
            toast.success("Commento eliminato!");
        }
    } catch (error: any) {
        toast.error(
            typeof error === "string" ? error : error?.message || "An error occurred"
        );
    } finally {
        setCmntLoading(false);
    }
};

















    const postUserComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (comment && user?.name && user?.id) {
            try {
                setCmntLoading(true);
                let body = {
                    content: comment,
                    userName: user?.name,
                    userId: user?.id,
                };

                const res = await (
                    await axios.post(
                        `${COMMENT_ENDPOINT}/${data?.id}/comment`,
                        JSON.stringify(body)
                    )
                ).data;

                if (data?.comments) {
                    setData({
                        ...data,
                        comments: [res, ...data.comments].sort(
                            (a, b) => b.id - a.id
                        ),
                    });
                }

                setCmntLoading(false);
                toast.success("Comment posted!");
                setComment("");
            } catch (error: any) {
                setCmntLoading(false);
                toast.error(
                    typeof error === "string"
                        ? error
                        : error?.message
                        ? error?.message
                        : ERR_MSG
                );
                setComment("");
            }
        }
    };




    const renderComments = (comments: Comment[]) => {
        return comments.length > 0 ? comments.map((comment) => (
            <div key={comment.id} className="flex justify-between items-center my-2">
                <Comments
                    content={comment.content}
                    name={comment.userName}
                />
                {user && user.id === comment.userId && (
                    <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-1 rounded"
                        disabled={cmntLoading}
                    >
                        Elimina
                    </button>
                )}
            </div>
        )) : <Message message="No comments yet." />;
    };
  
   
   
   
   
   
   
    let showContent = null;
    if (loading) {
        showContent = <ShowLoader />;
    }

    if (!loading && error) {
        showContent = <Message message={error} error={true} />;
    }

    if (!loading && !error && data !== null) {
        showContent = (
            <div>
                <div className=" flex justify-between items-end border-b-2 border-gray-400  pb-4 mb-8">
                    <div className="flex items-center ">
                        <div className=" mr-3 ">
                            <Avatar
                                size="h-16 w-16 md:h-16 md:w-16 bg-rose-700"
                                name={data.users.name}
                                textSize=" text-2xl  lg:text-4xl"
                            />
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold  text-gray-500">
                                @{data.users.name}
                            </h3>
                            {/* Todo: Change to published Date */}
                            <p className="text-gray-400  text-sm ">
                                Pubblicato:{" "}
                                <span className="font-semibold">
                                    {moment(data.addedDate).format(
                                        "DD MMM, YY"
                                    )}
                                </span>
                            </p>
                        </div>
                    </div>
                    <CategoryBtn
                        color={PRIMARY}
                        name={data.category.categoryTitle}
                    />
                </div>

                <h1 className="font-bold text-xl sm:text-2xl md:text-3xl mt-4 mb-8">
                    {data.title}
                </h1>
                <div className="w-full bg-gray-500">
                    <img
                        src={BLOG_IMAGE_ENDPOINT + data.imageName}
                        alt={data.title}
                        className="object-cover w-full h-[55vh]"
                    />
                </div>

                <div className="pb-12 mt-10">
                    <div
                        dangerouslySetInnerHTML={{ __html: data.content }}
                    ></div>
                </div>
           {/*  BOX COMMENTI */}
                <div className="bg-gray-100 p-8">
                    <div className=" w-4/4 sm:w-3/4 ">
                        <div className="h-[100px]  ">
                            <textarea
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                                placeholder="Inserisci un commento"
                                className="w-full h-full outline-none rounded-md  shadow-sm border-2 border-gray-200 px-2 py-3  appearance-none focus-within:border-blue-600"
                            />
                        </div>
                        <Button
                            className="bg-gray-700 hover:text-white transition-all py-1 px-3 rounded-full my-3 w-6/6  sm:w-2/6 shadow-none text-black"
                            title="Commenta"
                            onClick={postUserComment}
                            loading={cmntLoading}
                            disabled={!comment || cmntLoading}
                            bg="  hover:bg-gray-700 border border-gray-700 "
                        />
                    </div>
                </div>

                {/* Comments */}
                <div className="my-8 border-b border-gray-300">
                    <h2 className="text-xl bl-2 font-semibold">Commenti</h2>
                    <div className="ml-8 mt-4">
                        <div>{renderComments(data.comments)}</div>
                    </div>
                </div>
            </div>
        );
    }

    
    useEffect(() => {
        const fetchRelated = async () => {
            if (data?.category?.categoryId) {
                try {
                    setRelatedLoading(true);
                    const fullStory = await (
                        await axios.get(
                            `${RELATED_POST_BY_CATEGORY_ENDPOINT}/${data?.category?.categoryId}/posts`
                        )
                    ).data;
                    setRelated(
                        fullStory
                            .filter((item: any) => item.id !== data.id)
                            .slice(0, 4)
                    );
                    setRelatedLoading(false);
                } catch (error: any) {
                    setRelatedLoading(false);
                }
            }
        };

        fetchRelated();
    }, [data?.category?.categoryId, data?.id]);

    let showRelatedContent = null;
    if (relatedLoading) {
        showRelatedContent = <HorizontalLoader />;
    }
    if (!relatedLoading && related.length > 0) {
        showRelatedContent = (
            <div>
                {related.map((item) => (
                    <RecommendedCard key={item.id} data={item} />
                ))}
            </div>
        );
    }
    if (!relatedLoading && related.length === 0) {
        showRelatedContent = (
            <Message error={false} message="No recommendation available " />
        );
    }

    return (
        <div className="min-h-screen pt-24 ">
            <div>{showContent}</div>

            <h1 className="text-2xl font-semibold mt-16 my-4">
                Raccomandati per te:
            </h1>
            {showRelatedContent}
        </div>
    );
};

export default StoryPage;

const ShowLoader = () => {
    return (
        <div>
            <div className="flex items-center ">
                <div className="h-16 w-16 md:h-16 md:w-16 rounded-full mr-3  bg-slate-200 animate-pulse"></div>
                <div>
                    <div className=" bg-slate-200 animate-pulse text-xl font-semibold  text-gray-500 h-8"></div>
                    {/* */}
                    <p className=" h-6  text-sm  bg-slate-200 animate-pulse w-full"></p>
                </div>
            </div>
            <div className="   w-full h-[55vh] bg-slate-200 animate-pulse mt-4 "></div>

            <div>
                <div className="bg-slate-200 h-8 animate-pulse mt-4 "></div>
                <div className="bg-slate-200 h-4 animate-pulse mt-4 "></div>
                <div className="bg-slate-200 h-10 animate-pulse mt-4 "></div>
            </div>
        </div>
    );
};
