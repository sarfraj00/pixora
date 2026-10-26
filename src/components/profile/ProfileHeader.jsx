import {
  Camera,
  Edit3,
  Share2,
  Link,
  Loader2,
} from "lucide-react";
import defaultCover from '../../assets/images/pixora_landing_bg.png';
import defaultAvatar from '../../assets/images/defaultAvatar.png';

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import { api } from "../../config/axios";
import { toast } from "react-toastify";
import axios from "axios";
import { env } from "../../config/env";

const ProfileHeader = memo(() => {

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: "0px" })
  }, [])

  const [url, setUrl] = useState({ avatarUrl: '', fileData: '', coverUrl: '', status: '', publicId: '' });
  const navigate = useNavigate();
  let userData = useSelector(state => state.userData);
  const [newData, setNewData] = useState(null);

  if (newData) {
    userData = newData;
  }

  const handleProfileEdit = () => {
    navigate('/profile/edit')
  }

  const formData = new FormData();

  const handleAvatarAndCover = async (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUrl(state => ({ ...state, [name]: url, fileData: file, status: 'saving' }))
    try {
      if (name === "avatarUrl") {
        formData.append('avatarFile', file)
        formData.append('avatarPublicId', userData?.profile?.avatarPublicId);
        const res = await api.patch('/profile/change-avatar', formData);
        if (res.status === 201) {
          toast.success(res?.data?.message)
          setNewData(res?.data?.user)
          return;
        }
      }
      formData.append('coverFile', file);
      formData.append('coverPublicId', userData?.profile?.coverPublicId);
      const res = await api.patch('/profile/change-cover', formData);
      if (res.status === 201) {
        toast.success(res?.data?.message)
        setNewData(res?.data?.user)
        return;
      }
    }
    catch (err) {
      if (axios.isAxiosError(err)) {
        return;
      }
      toast.error('somthing went wrong! please try again.');
    }
    finally {
      setUrl(state => ({ ...state, status: '' }))
    }
  }



  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-black">


      {url.status === 'saving' && <div className="flex justify-center items-center w-full  text-white  gap-2 ">
        <Loader2 size={30} className='animate-spin' /> it may take a moment...
      </div>}

      <div className="relative h-60 sm:h-74">
        <img
          src={url.coverUrl || userData?.profile?.coverUrl || defaultCover}
          alt="Cover"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/50" />


        <label
          className="
            absolute
            right-5
            top-5
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-white/10
            bg-black/40
            px-4
            py-2.5
            text-sm
            text-white
            backdrop-blur-md
            transition
            hover:bg-black/60
          "
          htmlFor="cover"
        >
          <input type="file" className="hidden" id="cover" name="coverUrl" onChange={handleAvatarAndCover} />
          <Camera size={17} />
          <span className="hidden sm:block">Edit Cover</span>
        </label>
      </div>

      <div className="relative px-5 pb-6 sm:px-7">

        <div className="relative -mt-20 w-fit">
          <div className="rounded-full bg-linear-to-r
            from-violet-600
            via-fuchsia-600
            to-pink-500 p-0.5 ">
            <img
              src={url.avatarUrl || userData?.profile?.avatarUrl || defaultAvatar}

              className="
                h-32
                w-32
                rounded-full
                border-3
                border-[#080817]
                object-cover
                sm:h-36
                sm:w-36
              "
            />
          </div>

          <label
            className="
              absolute
              bottom-1
              right-1
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border-4
              border-[#080817]
              bg-zinc-900
              text-white
              transition
              hover:bg-zinc-800
            "
            htmlFor="avatar"
          >
            <input type="file" name="avatarUrl" id="avatar" className="hidden" onChange={handleAvatarAndCover} />
            <Camera size={15} />
          </label>
        </div>

        <div className="mt-4 flex justify-end gap-2 sm:-mt-12">
          <button
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/8
              bg-white/2.5
              px-4
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-white/6

            "
            onClick={handleProfileEdit}
          >
            <Edit3 size={16} />
            <span className="hidden sm:block">Edit Profile</span>
          </button>

          <button
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-white/8
              bg-white/2.5
              text-zinc-400
              transition
              hover:bg-white/6
              hover:text-white
            "
            onClick={() => { window.navigator.share({ title: "Pixora user's profile", text: `${env.viteClientUri}/user/${userData.userName}` }) }}
          >
            <Share2 size={17} />
          </button>


        </div>

        <div className="mt-5">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white">
              {userData?.fullName}
            </h2>

            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-[11px] text-white">
              ✓
            </span>
          </div>

          <p className="mt-1 text-sm text-zinc-300">
            @{userData?.userName}
          </p>

          <p className="mt-3 max-w-175 text-sm leading-6 text-zinc-300 sm:text-[15px]">
            {userData?.profile?.bio}
          </p>


          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-500">

            {userData?.profile?.links.map((link, ind) => {
              return <div key={ind} className="flex gap-1 items-center text-zinc-400">  <a href={link.url} target="_blank"> <Link size={15} className="inline" /> {link.title}</a> </div>
            })}

          </div>
        </div>
      </div>
    </section>
  );
});

export default ProfileHeader;