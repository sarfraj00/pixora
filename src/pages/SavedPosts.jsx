import React, { useEffect, useState } from 'react'
import { api } from '../config/axios';
import SavedPostsHeader from '../components/savedPosts/SavedPostsHeader.jsx';
import SavedPostsGrid from '../components/savedPosts/SavedPostsGrid.jsx';
import { toast } from 'react-toastify'
import { setCreatePost, setUserData } from '../redux/features/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/home/SideBar.jsx';
import TopBar from '../components/home/TopBar.jsx';
import MobileBottomNav from '../components/home/MobileBottomNav.jsx';
import CreatePost from '../components/home/CreatePost.jsx';

const SavedPosts = ({
    onPostClick,
    onUnsave,
}) => {

    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const [activePage, setActivePage] = useState("Saved");
    const createPost = useSelector(state => state.createPost);

    const handleNavigation = (page) => {
        setActivePage(page);
        window.location.href = `/${page}`

    };

    const madeSavedChanges = useSelector(state => state.madeSavedChanges);

    useEffect(() => {

        (async () => {
            try {
                const res = await api.get('/post/get-saved-posts');
                if (res.status === 200) {
                    setPosts(res.data.savedPosts);
                }
            }
            catch (err) {
                toast.error('something went wrong! please try again.')
            }
            finally {
                setLoading(false)
            }
        })();
        window.scrollTo({ behavior: 'smooth', top: '0px' })
    }, [madeSavedChanges]);

    return (

        <div>
            <div
                className="
              fixed
             inset-0
              bg-cover
              bg-center
              bg-no-repeat
              z-0
            "
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
            z-0
            "
            />

            <Sidebar
                activePage={activePage}
                onNavigate={handleNavigation}
            />

            
            <main className="min-h-screen lg:ml-65">
                <TopBar
                    onCreatePost={() =>
                        dispatch(setCreatePost(true))
                    }
                />

                <div className="w-full px-4 pb-10 sm:px-6 lg:px-8 z-10">
                    <div className="mx-auto w-full max-w-350 relative text-white">
                        <SavedPostsHeader count={posts.length} />

                        <SavedPostsGrid
                            posts={posts}
                            loading={loading}
                            onPostClick={onPostClick}
                            onUnsave={onUnsave}
                        />
                    </div>
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

            </main>
        </div>
    );
};

export default SavedPosts;