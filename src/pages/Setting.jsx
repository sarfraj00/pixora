import { useEffect, useState } from "react";

import SettingsSidebar from "../components/home/SideBar";
import SettingsTopBar from "../components/home/TopBar";
import AccountInformation from "../components/settings/AccountInformation";

import bgImage from '../assets/images/pixora_landing_bg.png'
import { setCreatePost } from "../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../components/home/CreatePost.jsx";
import MobileBottomNav from "../components/home/MobileBottomNav.jsx";

import AccountActions from "../components/settings/AccountActions.jsx";

const Settings = () => {
  const [activePage, setActivePage] = useState("Settings");

useEffect(()=>{
window.scrollTo({behavior:'smooth',top:'0px'})
},[])

  const dispatch = useDispatch();
  const createPost = useSelector(state => state.createPost);

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

      <SettingsSidebar
        activePage={activePage}
        onNavigate={handleNavigation}
      />

      <main className="min-h-screen lg:ml-67.5 relative z-10 mb-20">
        <SettingsTopBar
          onCreatePost={() =>
            dispatch(setCreatePost(true))
          }
        />

        <div className="w-full px-4 pb-10 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-300">

            <div className="py-7">
              <h1 className="text-2xl font-bold text-white">
                Settings
              </h1>

              <p className="mt-1 text-sm text-zinc-500">
                Manage your account
              </p>
            </div>


            <AccountInformation
         
            />

            <AccountActions />

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

export default Settings;