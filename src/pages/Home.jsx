import { memo, useState } from "react";
import Sidebar from "../components/home/SideBar";
import TopBar from "../components/home/TopBar";
import CreatePost from "../components/home/CreatePost";
import PostCard from "../components/home/PostCard";
import MobileBottomNav from "../components/home/MobileBottomNav";
import bgImage from '../assets/images/pixora_landing_bg.png'
import { useEffect } from "react";
import { api } from '../config/axios.js'
import { useDispatch, useSelector } from "react-redux";
import { setCreatePost, setPosts } from "../redux/features/userSlice.js";
import { toast } from "react-toastify";
import { Loader2 } from 'lucide-react'


const Home = memo(() => {
    const posts = useSelector(state => state.posts);
    const createPost = useSelector(state => state.createPost);
    const dispatch = useDispatch();
    const madeChanges = useSelector(state => state.madeChanges);

    const scrollToElement = () => {
        const url = window.location.href;
        if (url.includes("#")) {
            const getIndex = url.indexOf("#");
            const getElementId = url.slice(getIndex + 1);
            const element = document.getElementById(getElementId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get('/post/get-all-posts');
                if (res.status === 200) {
                    dispatch(setPosts(res.data.posts.reverse()));

                }
            }
            catch (err) {
                toast.error('somthing went wrong! please try again.')

            }
        })();

        return () => {
            dispatch(setPosts(null))
        }

    }, [madeChanges])


    const [activePage, setActivePage] =
        useState("Home");


    const handleNavigation = (page) => {
        setActivePage(page);
        window.location.href = `/${page}`

    };



    return (
        <main
            className="
            relative
            flex
            min-h-screen
            items-center
            justify-center
            bg-[#05031a]
          text-white
          "

        >


            <div
                className="
              fixed
              inset-0
              bg-cover
              bg-center
              bg-no-repeat
            "
                style={{
                    backgroundImage:
                        `url(${bgImage})`,
                }}
            />

            <div
                className="
              fixed
              inset-0
              bg-[#05031a]
            "
            />



            <div
                className="
              fixed
              inset-0
              bg-linear-to-b
              from-[#05031a]/90
              via-[#080523]/60
              to-[#05031a]/95
            "
            />


            <div
                className="
              relative
              z-10
              w-full
        
            "
            >


                <Sidebar
                    activePage={activePage}
                    onNavigate={handleNavigation}
                />

                <div
                    className="
          min-h-screen
          lg:ml-65
        ">
                    <TopBar
                        onCreatePost={() =>
                            dispatch(setCreatePost(true))
                        }
                    />

                    <main
                        className="
            mx-auto
            w-full
            max-w-275
            px-5
            py-7
            pb-24
            sm:px-8
            lg:px-10
          "
                    >

                        <div className="
              mb-7
              flex
              items-end
              justify-between
            "
                        >  <div>
                                <p className="
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-violet-400/70
                "
                                >
                                    Your feed
                                </p>
                            </div>
                        </div>



                        <div className="space-y-6">

                            {posts === null && <div className="w-full h-[58vh] flex justify-center items-center gap-2"><Loader2 size={35} className='inline-block animate-spin' /><span>Loading...</span></div>}

                            {posts?.length === 0 && <p className="text-center text-md uppercase tracking-wide h-[58vh] flex justify-center items-center w-full text-violet-400">No Posts !</p>}

                            {posts?.map((post, index) => (
                                <PostCard
                                    key={post._id}
                                    post={post}
                                    scrollToElement={index === posts?.length - 1 ? scrollToElement : null}
                                />
                            ))}
                        </div>
                    </main>
                </div>



                <MobileBottomNav
                    handleOpen={() => dispatch(setCreatePost(true))}
                    activePage={activePage}
                    onNavigate={handleNavigation}
                />


                <CreatePost
                    open={createPost}
                    onClose={() =>
                        dispatch(setCreatePost(false))
                    }
                />
            </div>
        </main>
    );
});

export default Home;