import {
  Bell,
  Loader2,
  Plus,
  Search,
  UserRound,
} from "lucide-react";
import defaultUrl from '../../assets/images/defaultAvatar.png'
import { debounce } from '../../utils/debounce.js';
import { api } from "../../config/axios.js";
import { memo, useCallback, useEffect, useRef, } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { setUsername, setUsers, setOpenNotification } from "../../redux/features/userSlice.js";
import { useNavigate } from 'react-router-dom'

const TopBar = memo(({
  onCreatePost,
}) => {

  const dispatch = useDispatch();
  const username = useSelector(state => state.username);

  const users = useSelector(state => state.users);

  const searchUser = async (username) => {
    dispatch(setUsername(username))
    if (username === "") {
      dispatch(setUsers(null));
      return;
    }
    try {
      const res = await api.get(`/user/get-users/users?username=${username}`);
      if (res.status === 200) dispatch(setUsers(res.data.user));
    }
    catch (err) {

      toast.error(err?.response?.data?.message || "unexpected error");

    }
  }
  const userData = useSelector(state => state.userData);

  const searchRef = useRef(null);
  const debounced = useCallback(debounce(searchUser, 800));
  const navigate = useNavigate();

  const handleUserProfile = async (username) => {
    dispatch(setUsername(''));
    searchRef.current.value = '';
    try {
      const res = await api.get('/auth/get-me');
      if (res.status === 200) {
        if (res.data.user.userName === username) {
          navigate('/profile');
        }
        else {

          navigate(`/user/${username}`);
        }
      }
    }
    catch (err) {
      toast.error('unexpected error')
    }
  }


  useEffect(() => {
    return () => {
      dispatch(setUsername(''))
      dispatch(setUsers(null))
    }
  }, [])


  return (
    <main className="w-full h-full sticky top-0 z-200">
      <header
        className="
        w-full
        z-30
        border-b
        border-white/6
        px-5
        py-3
        backdrop-blur-xl
        sm:px-8
        lg:px-10
      "
      >
        <div
          className="
          flex
          items-center
          gap-4
        "
        >


          <div
            className="
            relative
            min-w-0
            flex-1
          "
          >
            <Search
              size={19}
              className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-white/30
            "
            />

            <input
              type="text"
              ref={searchRef}
              placeholder="Search people..."
              onChange={(e) => debounced(e.target.value)
              }
              className="
              h-12
              w-full
              rounded-2xl
              border
              border-white/8
              bg-white/2.5
              pl-12
              pr-4
              text-sm
              text-white
              outline-none
              placeholder:text-white/40
              transition
              focus:border-violet-500/40
              focus:bg-white/4
            "
            />
          </div>


          <button
            onClick={onCreatePost}
            className="
            hidden
            h-12
            shrink-0
            items-center
            gap-2
            rounded-2xl
            bg-linear-to-r
            from-violet-600
            to-fuchsia-500
            px-5
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-violet-600/10
            transition
            hover:-translate-y-0.5
            hover:brightness-110
            sm:flex
          "
          >
            <Plus size={19} />

            Create
          </button>

          <button
            className="
            relative
            grid
            size-11
            shrink-0
            place-items-center
            rounded-2xl
            border
            border-white/8
            bg-white/2.5
            text-white/60
            transition
            hover:bg-white/6
            hover:text-white
          "
            onClick={() => dispatch(setOpenNotification())}
          >
            <Bell size={20} />

            {userData?.profile?.notificationCount > 0 && <span
              className="
              absolute
              right-2
              top-2
              size-2
              rounded-full
              bg-pink-500
            "
            />}
          </button>
        </div>

      </header>

      <section className="text-gray-200 ">

        {username && users?.length === 0 && <div className="flex flex-col items-center justify-center px-4 py-10 max-h-120  mb-5 ">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-base-content/5">
            <UserRound
              size={25}
              className="text-base-content/40"
            />
          </div>

          <p className="mt-3 text-sm font-semibold">
            No users found
          </p>

          <p className="mt-1 text-xs text-base-content/50">
            Try searching with a different username
          </p>
        </div>
        }

        {username && users?.length > 0 && (
          <div className=" overflow-y-auto min-h-screen overflow-x-hidden absolute w-full bg-[#06041E] backdrop-brightness-10 z-10 backdrop-blur-3xl pt-7 flex flex-col gap-4">
            {users.map((user) => (
              <div
                key={user._id}

                onClick={() => handleUserProfile(user.userName)}
                className="
                flex w-120 items-center gap-5
                px-4 py-3
                text-left
                transition
               ml-2
                border border-gray-800
                rounded-lg
                hover:bg-base-content/5
              "
              >
        
                <img
                  src={user.profile.avatarUrl || defaultUrl}
                  alt={user.userName}
                  className="
                  h-11 w-11
                  shrink-0
                  rounded-full
                  object-cover
                "
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {user.fullName}
                  </p>

                  <p className="truncate text-xs text-base-content/50">
                    @{user.userName}
                  </p>
                </div>
              </div>
            ))}
          </div>)}

        {username && users === null && <div className="flex flex-col items-center justify-center px-4 py-15 z-10 relative mb-5">
          <div className=" min-h-full pb-40 flex items-center text-center gap-2"><Loader2 size={35} className='inline-block animate-spin' /><span>Searching...</span></div> </div>}
      </section>

    </main>
  );
});

export default TopBar;