import {
  Bell,
  Bookmark,
  Home as HomeIcon,
  Loader2,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../config/axios";
import axios from "axios";
import { setUserData, setPosts, setOpenNotification, setOpenCommentSection } from '../../redux/features/userSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import defaultAvatar from '../../assets/images/defaultAvatar.png'
import { toast } from 'react-toastify'

import { Notification } from "../notification/Notification.jsx";
import Loader from '../../utils/Loader.jsx'
import CommentSection from "./CommentSection.jsx";

const Sidebar = memo(({
  activePage = "Home",

}) => {

  const dispatch = useDispatch();
  const [logoutLoader, setLogoutLoader] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {

        const res = await api.get('/auth/get-me');
        if (res.status === 200) dispatch(setUserData(res?.data?.user))

      }
      catch (err) {
       toast.error('something went wrong! please try again.')
      }
      finally {
        setLoading(false);
      }

    })();
    return () => {
      dispatch(setOpenCommentSection(false));
    }
  }, [])
  const userData = useSelector(state => state.userData);
  
  const openNotification = useSelector(state => state.openNotification);
  const openCommentSection = useSelector(state => state.openCommentSection);

  const menuItems = [
    {
      name: "Home",
      icon: HomeIcon,
    },
    {
      name: "Notifications",
      icon: Bell,
      badge: 3,
    },

    {
      name: "Saved",
      icon: Bookmark,
    },
    {
      name: "Profile",
      icon: User,
    },
    {
      name: "Settings",
      icon: Settings,
    },
  ];
  const navigate = useNavigate();
  const handleNavigate = (to) => {
    navigate(to)
  }

  const handleLogout = async () => {
    setLogoutLoader(true);
    try {
      const res = await api.get('/auth/logout');
      if (res.status === 200) {
        dispatch(setPosts(null));
        dispatch(setUserData(null));
        toast.success(res?.data?.message);
        navigate('/')
      }
    }
    catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data?.message);
        return;
      }
       toast.error('somthing went wrong! please try again.');
    }
  }


  if (loading) {
    return <Loader />
  }

  return (
    <main>
      <aside
        className="
        fixed
        left-0
        top-0
        z-40
        hidden
        h-screen
        w-65
        flex-col
        border-r
        border-white/[0.07]
        bg-[#070612]/40
        px-5
        py-7
        lg:flex
      "
      >


        <button
          onClick={() => handleNavigate('/home')}
          className="
          mb-12
          px-3
          text-left
        "
        >
          <span
            className="
            font-['Bodoni_Moda']
            text-5xl
            font-medium
            italic
            tracking-[-0.07em]
            text-white
          "
          >
            Pixora
          </span>
        </button>
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              activePage === item.name;

            return (
              <button
                key={item.name}
                onClick={() => item.name === "Notifications" ? dispatch(setOpenNotification()) : handleNavigate(`/${item.name.toLowerCase()}`)
                }
                className={`
                group
                flex
                w-full
                items-center
                gap-4
                rounded-2xl
                px-4
                py-3.5
                text-left
                transition-all
                duration-200
                ${active
                    ? "bg-linear-to-r from-violet-600/25 to-fuchsia-500/10 text-white"
                    : "text-white/50 hover:bg-white/4 hover:text-white"
                  }
              `}
              >
                <Icon
                  size={21}
                  strokeWidth={active ? 2.2 : 1.8}
                  className={
                    active
                      ? "text-violet-400"
                      : "text-white/50 group-hover:text-white"
                  }
                />

                <span className="text-[15px] font-medium">
                  {item.name}
                </span>

                {item.name === "Notifications" && userData?.profile?.notificationCount > 0 && (
                  <span
                    className="
                    ml-auto
                    grid
                    size-6
                    place-items-center
                    rounded-full
                    bg-fuchsia-500
                    text-[11px]
                    font-bold
                    text-white
                  "
                  >
                    {userData?.profile?.notificationCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

       

        <div
          className="
          rounded-2xl
          border
          border-white/5
          p-3
          bg-white/2
        "
        >
          <div className="flex items-center gap-3">
            <img
              src={userData?.profile?.avatarUrl || defaultAvatar}
              alt="Sarfraj"
              className="
              size-10
              rounded-full
              object-cover
            "
            />

            <div className="min-w-0 cursor-pointer" onClick={() => window.location.href = '/profile'}>
              <p className="truncate text-sm font-semibold text-white">
                {userData?.fullName}
              </p>

              <p className="truncate text-xs text-white/35">
                @{userData?.userName}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="
              ml-auto
              text-white/70
              transition
              hover:text-white
              cursor-pointer
            "
              title="Logout"

            >
              {
                logoutLoader ? <Loader2 className="animate-spin" />
                  : <LogOut size={17} />
              }
            </button>
          </div>
        </div>
      </aside>

      {openNotification && <Notification onBack={() => dispatch(setOpenNotification())} notification={userData?.profile?.notification} notificationCount={userData?.profile?.notificationCount} />}

      {openCommentSection &&
        <div className="fixed w-full h-full flex justify-center items-center z-40 bg-black/50 backdrop-blur-lg"> <CommentSection currentUser={userData} /> </div>}

    </main>
  );
});

export default Sidebar;