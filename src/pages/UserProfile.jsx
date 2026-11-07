import { useEffect, useState } from 'react'
import { useParams, } from 'react-router-dom'
import { api } from '../config/axios';
import axios from 'axios';
import { toast } from 'react-toastify';
import UserNotFound from '../components/userProfile/UserNotFound.jsx';
import SideBar from '../components/home/SideBar.jsx';
import TopBar from '../components/home/TopBar.jsx';
import MobileBottomNav from '../components/home/MobileBottomNav.jsx';
import ProfileHeader from "../components/userProfile/ProfileHeader.jsx";
import ProfilePosts from "../components/userProfile/ProfilePosts.jsx";
import { useDispatch, useSelector } from 'react-redux'
import { setAnotherUserPostsData, setAnotherUserProfileData } from '../redux/features/userSlice.js'
import bgImage from '../assets/images/pixora_landing_bg.png'
import CreatePost from '../components/home/CreatePost.jsx'
import Loader from '../utils/Loader.jsx'

const UserProfile = () => {

    const { username } = useParams();
    const [status, setStatus] = useState('pending');
    const dispatch = useDispatch()

    const [activePage, setActivePage] = useState("Explore");

    const [createPostOpen, setCreatePostOpen] = useState(false);

    const userProfile = useSelector(state => state.anotherUserProfileData);
    const userPosts = useSelector(state => state.anotherUserPostsData);


    const [checkFollowing, setCheckFollowing] = useState({
        checkYouFollowTheUser: null,
        checkUserFollowsYou: null
    });


    const handleSetFollowing = ()=>{
        setCheckFollowing({...checkFollowing,checkYouFollowTheUser:!checkFollowing.checkYouFollowTheUser})
    }

    useEffect(() => {
        (async () => {
            try {

                const res = await api.get('/auth/get-me');
                if (res.status === 200 && res.data.user.userName === username) {
                    setStatus('success');
                    window.location.href = '/profile';
                }
            }
            catch (err) {
                toast.error('somthing went wrong! please try again.');
            }
        })()
    }, [])


    const handleNavigation = (page) => {
        setActivePage(page);
        window.location.href = `/${page}`

    };

    const [followersAndfollowingStat, setFollowersAndFollowingStat] = useState({ followers: [], following: [], totalPosts: null });

    const statsChanges = useSelector(state => state.statsChanges);

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get(`/user/${username}`);
                if (res.status === 200) {
                    setCheckFollowing({ checkYouFollowTheUser: res?.data?.checkFollowing, checkUserFollowsYou: res?.data?.checkUserFollowingYou });
                    dispatch(setAnotherUserProfileData(res?.data?.user))
                    const postsRes = await api.get(`/user/get-user-posts/${res?.data?.user?._id}`);
                    if (postsRes.status === 200) {

                        setFollowersAndFollowingStat({ followers: postsRes?.data?.followers, following: postsRes?.data?.following, totalPosts: postsRes?.data?.posts?.length })
                        dispatch(setAnotherUserPostsData(postsRes?.data?.posts));
                        setStatus('success');
                    }
                }
            }
            catch (err) {
                if (axios.isAxiosError(err)) {
                    toast.error(err?.response?.data?.message);
                    setStatus('failed');
                    return;
                }
                setStatus('failed');
                toast.error('somthing went wrong! please try again.');

            }

        })();

    }, [statsChanges])


    useEffect(() => {
        return () => {
            dispatch(setAnotherUserProfileData(null));
            dispatch(setAnotherUserPostsData(null));
        }
    }, []);

    const user = useSelector(state => state.userData);


    if (status === 'failed') {
        return <div> <UserNotFound username={username} /> </div>
    }



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
            z-0
            "
            />

            {status === "pending" && <Loader />}

            <SideBar
                activePage={activePage}
                onNavigate={handleNavigation}
            />

            {/* Main */}
            <main className="min-h-screen lg:ml-65">
                <TopBar
                    onCreatePost={() =>
                        setCreatePostOpen(true)
                    }
                />

                <div className="w-full px-4 pb-10 sm:px-6 lg:px-8 z-10 mb-10">
                    <div className="mx-auto w-full max-w-350 relative">
                        <ProfileHeader user={userProfile} checkFollowing={checkFollowing} stats={followersAndfollowingStat} handleSetFollowing={handleSetFollowing}/>


                        <ProfilePosts posts={userPosts} />
                    </div>
                </div>

                <MobileBottomNav
                    handleOpen={() => setCreatePostOpen(true)}
                    activePage={activePage}
                    onNavigate={handleNavigation}
                />



                <CreatePost
                    open={createPostOpen}
                    onClose={() =>
                        setCreatePostOpen(false)
                    }
                />
            </main>
        </div>
    )
}

export default UserProfile

