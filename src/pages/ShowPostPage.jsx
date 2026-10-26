import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../config/axios';
import Loader from '../utils/Loader.jsx';
import { formatPostTime } from '../utils/formattedTime.js';
import defaultAvatar from '../assets/images/defaultAvatar.png'
import Navbar from '../components/landingPageComponents/Navbar.jsx';
import { toast, ToastContainer } from 'react-toastify'
import { Bookmark, Heart, MessageCircle, Send, ImageOff, ArrowLeft } from 'lucide-react';
import { env } from '../config/env.js';
import axios from 'axios';



const PostUnavailable = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 z-2">
            <div className="w-full max-w-md rounded-2xl bg-base-100 p-8 text-center shadow-lg border border-gray-700 bg-[#210831 shadow-[#20072b]">

                {/* Icon */}
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-base-200">
                    <ImageOff
                        size={38}
                        strokeWidth={1.5}
                        className="text-base-content/60"
                    />
                </div>

                {/* Heading */}
                <h1 className="text-2xl font-bold text-base-content">
                    Post unavailable
                </h1>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-base-content/70">
                    This post may have been deleted by its owner
                    or is no longer available.
                </p>

                {/* Action */}
                <button
                    onClick={() => navigate("/home")}
                    className="btn btn-primary mt-6 gap-2 rounded-xl"
                >
                    <ArrowLeft size={18} />
                    Back to Home
                </button>

            </div>
        </div>
    );
};




const ShowPostPage = () => {
    const { postPublicId } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({ post: {}, commentsOnPost: {} });


    const navigate = useNavigate()

    const handleSignUp = () => {
        navigate('/signup')
    };

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get(`/post/get-specific-post?postPublicId=${postPublicId}`);
                if (res.status === 200) {
                    setData({ post: res.data.post, commentsOnPost: res.data.commentsOnPost });
                    try {
                        const authorizeRes = await api.get('/auth/regenerate-access-token');
                        if (authorizeRes.status === 200) {
                            window.location.href = `/home/#${postPublicId}`
                        }
                    }
                    catch (err) {

                        if (axios.isAxiosError(err)) toast.info("You are not logged in.");
                        else toast.error('something went wrong! please try again')

                    }
                }
            }
            catch (err) {
                setError('something went wrong! please try again.')
            }
            finally {
                setLoading(false);
            }
        })()
    }, [])



    const handleClick = async () => {
        toast.info('Log in or sign up now to unlock this feature and start your activity.');
        return;
    }

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <main
            className="
                relative flex min-h-screen
                flex-col overflow-hidden
                bg-[#090718] text-white
              " >
            <div
                className="
                  fixed inset-0
                  bg-cover bg-center
                  bg-no-repeat
                "

            />

            <div
                className="
                  fixed inset-0
                  bg-linear-to-r
                  from-[#090718]/99
                  via-[#110925]/99
                  to-[#100721]/99
                "
            />


            <div
                className="
                  fixed -left-40 top-1/3
                  size-125
                  rounded-full
                  bg-violet-600/10
                  blur-[130px]
                "
            />

            <div
                className="
                  fixed -right-40 bottom-0
                  size-125
                  rounded-full
                  bg-fuchsia-600/10
                  blur-[130px]
                "
            />
            <PostUnavailable />
        </main>

    }

    return (
        <main
            className="
                relative flex min-h-screen
                flex-col overflow-hidden
                bg-[#090718] text-white
              "
        >
            <ToastContainer />

            <div
                className="
                  fixed inset-0
                  bg-cover bg-center
                  bg-no-repeat
                "

            />

            <div
                className="
                  fixed inset-0
                  bg-linear-to-r
                  from-[#090718]/99
                  via-[#110925]/99
                  to-[#100721]/99
                "
            />


            <div
                className="
                  fixed -left-40 top-1/3
                  size-125
                  rounded-full
                  bg-violet-600/10
                  blur-[130px]
                "
            />

            <div
                className="
                  fixed -right-40 bottom-0
                  size-125
                  rounded-full
                  bg-fuchsia-600/10
                  blur-[130px]
                "
            />
            <Navbar onSignUp={handleSignUp} />

            <div className="w-full h-screen flex justify-center items-center ">

                <div className='w-140 backdrop-blur-2xl rounded-sm bg-[#18082A] p-3 text-green-200 z-1 shadow-[#1B0C30] shadow-xl'>
                    <div
                        className="
                        flex
                        items-center
                        px-5
                        cursor-pointer
                        sm:px-6"

                    >
                        <img
                            onClick={handleClick}
                            src={data?.post?.userId?.profile?.avatarUrl || defaultAvatar}
                            alt={data?.post?.userId?.fullName}
                            className="
                            size-11
                            rounded-full
                            object-cover
                            ring-2
                            object-top
                            ring-violet-500/20
                        "
                        />

                        <div className="ml-3 " onClick={handleClick}>
                            <p className="text-sm font-semibold text-white">
                                {data?.post?.userId?.fullName}
                            </p>

                            <p className="mt-0.5 text-xs text-white/35">
                                {data?.post?.userId?.userName} ·{" "}
                                {formatPostTime(data?.post?.createdAt)}
                            </p>
                        </div>


                    </div>

                    <div className="px-5 pb-4 pt-2 sm:px-6">
                        <p className="text-[15px] leading-6 text-white/80">
                            {data?.post?.postCaption || ""}
                        </p>
                    </div>

                    <div className="relative w-full overflow-hidden">
                        <img
                            src={data?.post?.postUrl}
                            className="
                     h-120
                     rounded-sm
                     w-full
                     transition
                     duration-500
                     object-cover
                     hover:scale-[1.02]
                   "
                        />

                    </div>

                    {/* actions */}

                    <div
                        className="
                        flex
                        items-center
                        border-t
                        border-white/3
                        pt-4
                         "
                    >


                        <button
                            className={`
                            group
                            flex
                            items-center
                            gap-2
                            text-white/45
                            transition
                             hover:text-white
                            `}
                            onClick={handleClick}
                        >
                            <Heart
                                size={21}

                                className="
                                group-active:scale-125
                                cursor-pointer
                            "

                            />

                            <span className="text-sm">
                                {data?.post?.likes?.length}
                            </span>
                        </button>

                        {/* Comment */}

                        <button
                            className="
                            ml-7
                            flex
                            items-center
                            gap-2
                            text-white/45
                            transition
                            hover:text-white
                            cursor-pointer
                            "
                            onClick={handleClick}
                        >
                            <MessageCircle size={21} />

                            <span className="text-sm">
                                {data?.commentsOnPost?.length}
                            </span>
                        </button>

                        {/* Share */}

                        <button
                            className="
                            ml-7
                            text-white/45
                            transition
                            hover:text-white
                            cursor-pointer
                            "
                            onClick={() => { window.navigator.share({ title: "Pixora", text: `${env.viteClientUri}/post/${postPublicId}` }) }}
                        >
                            <Send size={20} />
                        </button>

                        <button
                            onClick={handleClick}
                            className={`
                                ml-auto
                                cursor-pointer
                                text-white/45
                                transition
                              hover:text-white
                                `}>

                            <Bookmark
                                size={21}

                            />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ShowPostPage
