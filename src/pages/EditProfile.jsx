import { useCallback, useState,memo } from "react";
import {
  ArrowLeft,
  Camera,
  User,
  AtSign,
  FileText,
  Save,
  UserCheck,
  UserX,
  Link,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from 'react-redux'
import defaultAvatar from '../assets/images/defaultAvatar.png';
import { api } from '../config/axios.js'
import axios from "axios";
import { debounce } from "../utils/debounce.js";
import { useEffect } from "react";
import { setUserData } from "../redux/features/userSlice.js";
import { toast } from "react-toastify";


const AddLink = memo(({ formData, handleFormData }) => {
  return <div className="mb-1">

    <label className="mb-2 block text-sm text-zinc-400">
      Add Link
    </label>

    <div className="relative">

      <input
        name={'title'}
        required={formData?.url}
        value={formData?.title ?? ''}
        onChange={handleFormData}
        placeholder='Title'
        className="w-full resize-none rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-pink-500/60"
      />
      <input
        name="url"
        required={formData?.title}
        onChange={handleFormData}
        placeholder="Url"
        value={formData?.url ?? ''}
        className="w-full resize-none rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-pink-500/60"
      />
    </div>
  </div>
}
)

const EditProfile = memo(() => {
  const [editStatus, setEditStatus] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    avatarFile: '',
    fullName: '',
    userName: '',
    title: '',
    url: '',
    bio: '',
    avatarUrl: '',
    previousSavedUserName: '',
    status: 'pending',
    ableToUpdate: true,
    createAvatarUrl: '',
    isSaving: false
  });
  useEffect(() => {
    (async () => {
      try {

        const res = await api.get('/auth/get-me');

        if (res.status === 200) {

          dispatch(setUserData(res?.data?.user))
          setFormData(state => ({ ...state, ...res["data"]["user"], bio: res["data"]['user']['profile']['bio'], previousSavedUserName: res['data']['user']['userName'] }))
        }

      }
      catch (err) {
        if (axios.isAxiosError(err)) {
          window.location.href = '/'
          // toast.error(err?.response?.data.message);
          return;
        }
        toast.error('somthing went wrong! please try again.')
      }

    })()
  }, [editStatus])



  const debouncedFunc = useCallback(
    debounce(async (userName) => {

      try {
        const res = await api.post('/auth/get-username-availability', { userName });
        if (res?.status === 200) setFormData(state => ({ ...state, status: true }))
      }
      catch (err) {
        if (axios.isAxiosError(err)) {
          setFormData(state => ({ ...state, status: false }));
        }

      }
    }, 800)

    , [])

  const fileData = new FormData();

  const handleFormData = async (e) => {
    const { name, value } = e.target;

    if (name === "userName" && (!value || value.trim() === formData?.previousSavedUserName)) {
      setFormData(state => ({ ...state, [name]: value, status: 'pending', ableToUpdate: false }));
      debouncedFunc.cancel();
      return;
    }

    else if (name === "userName") {
      await debouncedFunc(value.trim());
    }

    if (name === "file") {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setFormData(state => ({ ...state, avatarFile: file, avatarUrl: imageUrl, ableToUpdate: false }))
      return;
    }

    setFormData(state => ({ ...state, [name]: value, ableToUpdate: false }))
  }


  const handleSave = async (e) => {
    e.preventDefault();
    const { fullName, userName, bio, url, title, previousSavedUserName, avatarFile, } = formData;
    setFormData(state => ({ ...state, isSaving: true }));

    if (!userName && !fullName) {
      toast.info('name and username both are required.');
      return;
    }

    if (!userName) {
      toast.info('username is required.');
      return;
    }
    if (!fullName) {
      toast.info('name is required.');
      return;
    }

    let success;
    if (userName.trim() !== previousSavedUserName) {
      try {
        const res = await api.post('/auth/get-username-availability', { userName });
        if (res.data.success) {
          success = res.data.success;

        }
      }
      catch (err) {
        success = false
        toast.error(err?.response?.data?.message || 'something went wrong! please try again.');
        setFormData(state => ({ ...state, isSaving: false }));
      }
    }
    if (success === undefined || success) {
      try {
        fileData.append('avatar', avatarFile);
        fileData.append('fullName', fullName);
        fileData.append('userName', userName);
        fileData.append('bio', bio);
        fileData.append('url', url);
        fileData.append('title', title);
        fileData.append('previousAvatar', formData?.profile?.avatarUrl);
        fileData.append('previousAvatarPublicId', formData?.profile?.avatarPublicId)
        const res = await api.put('/profile/edit', fileData);
        if (res.status === 201) {
          setEditStatus(editStatus + 1)
          toast.success(res?.data?.message);
        }
      }
      catch (err) {

        toast.error('something went wrong! please try again.')
      }
      finally {
        setFormData(state => ({ ...state, status: 'pending', ableToUpdate: true, title: '', url: '', avatarFile: '', avatarUrl: '', isSaving: false }));

      }
    }

  }

  const handleDeleteLink = async (url, title) => {
    if (!url || !title) {
      toast.info( 'url and title both are required');
      return;
    }
    try {
      const res = await api.patch('/profile/delete-link', { url, title });
      if (res.status === 200) {
        
        setEditStatus(state => state + 1);
      };
    }
    catch (err) {

      toast.error('something went wrong! please try again.');
    }
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
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


      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#09090b]/5 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="rounded-full p-2 transition hover:bg-white/10"
            >
              <ArrowLeft size={21} />
            </button>

            <h1 className="text-lg font-semibold">Edit Profile</h1>
          </div>

          <button
            disabled={formData?.ableToUpdate || formData?.status === false || formData?.isSaving}

            form="edit-profile-form"
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-linear-to-r from-pink-500 to-violet-600 px-4 py-2 text-sm font-medium transition hover:opacity-90
            disabled:cursor-no-drop disabled:opacity-50"
          >
            <Save size={17} />
            {formData?.isSaving ? "saving..." : 'save'}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 relative">
        <form
          id="edit-profile-form"
          onSubmit={handleSave}
          className="space-y-7"
        >

          <section className="rounded-2xl border border-white/10 bg-white/3 p-6">
            <h2 className="mb-5 text-base font-semibold">
              Profile Picture
            </h2>

            <div className="flex items-center gap-5">
              <div className="relative">
                <img
                  src={formData?.avatarUrl || formData?.profile?.avatarUrl || defaultAvatar}
                  alt="Profile"
                  className="h-24 w-24 rounded-full object-cover ring-2 ring-pink-500/40"
                />

                <label
                  htmlFor="profile-image"
                  className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-[#09090b] bg-linear-to-r from-pink-500 to-violet-600"
                >
                  <Camera size={15} />

                  <input
                    name="file"
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleFormData}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <p className="font-medium">Profile photo</p>
                <p className="mt-1 text-sm text-zinc-500">
                  JPG, PNG or WEBP. Maximum 5MB.
                </p>

                <label
                  htmlFor="profile-image"
                  className="mt-3 inline-block cursor-pointer text-sm font-medium text-pink-400 hover:text-pink-300"
                >
                  Change photo
                </label>
              </div>
            </div>
          </section>


          <section className="rounded-2xl border border-white/10 bg-white/3 p-6">
            <h2 className="mb-5 text-base font-semibold">
              Basic Information
            </h2>

            <div className="space-y-5">

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  />

                  <input
                    type="text"
                    required={true}
                    name="fullName"
                    value={formData?.fullName ?? ''}
                    onChange={handleFormData}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-pink-500/60"
                  />
                </div>
              </div>


              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Username
                </label>

                <div className="relative">
                  <AtSign
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  />

                  <input
                    type="text"
                    name="userName"
                    pattern="^[a-z_]([a-z0-9_.]*[a-z0-9_])?$"
                    title="Must start with a lowercase letter or underscore, and end with a letter, number, or underscore. Only lowercase letters, numbers, underscores, and dots allowed."
                    value={formData?.userName ?? ''}
                    onChange={handleFormData}
                    placeholder="username"
                    required={true}
                    className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-pink-500/60"
                  />
                </div>
                {formData?.status === true && <p className=" text-green-700 flex items-center gap-3"> <UserCheck size={16} className="inline" /> Username is available.</p>}

                {formData?.status === false && <p className=" text-red-600 flex items-center gap-3"> <UserX size={16} className="inline" />This username is already taken.</p>}

              </div>


              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  {formData?.bio ? "Bio" : "Add Bio"}
                </label>
                <div className="relative">
                  <FileText
                    size={18}
                    className="absolute left-3 top-3 text-zinc-500"
                  />
                  <textarea
                    onChange={handleFormData}
                    name="bio"
                    value={formData?.bio ?? ''}
                    maxLength={160}
                    rows={4}
                    placeholder="Tell people about yourself..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-pink-500/60"
                  />
                </div>

                <p className="mt-1 text-right text-xs text-zinc-600">
                  {formData?.bio?.length}/160
                </p>
              </div>



              {Array.isArray(formData?.profile?.links) && formData?.profile?.links.length > 0 &&
                <div>
                  <label className="mb-3 block text-sm text-zinc-400">
                    Links
                  </label>
                  <div className="flex flex-wrap flex-col gap-2">
                    {formData?.profile?.links.map((link, ind) => {
                      return <div className="relative flex gap-3 group justify-between sm:w-1/4 w-1/2 " key={ind}>
                        <a href={link.url}
                          target="_blank"
                          className="text-zinc-300 text-sm flex items-center justify-center gap-1"
                        >
                          <Link size={14} className="inline" /> {link.title}</a>
                        <p onClick={() => handleDeleteLink(link.url, link.title)}> <Trash2 size={14} className="cursor-pointer text-red-400  group-hover:block group-hover:transition-all md:hidden" /> </p>
                      </div>
                    })}
                  </div>
                </div>
              }
              <AddLink formData={formData} handleFormData={handleFormData} />

            </div>
          </section>


          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-pink-500 to-violet-600 py-3 font-medium transition hover:opacity-90 md:hidden disabled:cursor-no-drop disabled:opacity-50 "
            disabled={formData?.ableToUpdate || formData?.status === false || formData?.isSaving}
          >
            <Save size={18} />
            Save Changes
          </button>
        </form>
      </main>
    </div>
  );
});

export default EditProfile;