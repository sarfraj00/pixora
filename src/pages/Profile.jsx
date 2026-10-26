import { memo, useState } from "react";
import SideBar from '../components/home/SideBar'
import TopBar from '../components/home/TopBar.jsx';
import ProfileHeader from '../components/profile/ProfileHeader.jsx';
import ProfileStats from '../components/profile/ProfileStats.jsx';
import PostGrid from '../components/profile/PostGrid.jsx'
import bgImage from '../assets/images/pixora_landing_bg.png'
import CreatePost from "../components/home/CreatePost.jsx";
import MobileBottomNav from "../components/home/MobileBottomNav.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setCreatePost } from "../redux/features/userSlice.js";

const Profile = memo(() => {
  const [activePage, setActivePage] = useState("Profile");
  

  const createPost = useSelector(state => state.createPost)
  const dispatch = useDispatch();



 const handleNavigation = (page) => {
        setActivePage(page);
        window.location.href = `/${page}`

    };

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

      <SideBar
        activePage={activePage}
        onNavigate={handleNavigation}
      />

      {/* Main */}
      <main className="min-h-screen lg:ml-65">
        <TopBar
          onCreatePost={() =>
            dispatch(setCreatePost(true))
          }
        />

        <div className="w-full px-4 pb-10 sm:px-6 lg:px-8 z-10">
          <div className="mx-auto w-full max-w-350 relative">
            <ProfileHeader />

            <ProfileStats />

            <PostGrid />
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
});

export default Profile;