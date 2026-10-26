import {
  Image,
  Loader2,
  X,
} from "lucide-react";
import { useSelector, useDispatch } from 'react-redux'
import defaultAvatar from '../../assets/images/defaultAvatar.png';
import { api } from '../../config/axios.js'
import { memo, useState } from "react";
import { toast } from 'react-toastify'
import { setMadeChanges } from "../../redux/features/userSlice.js";


const CreatePost = memo(({
  open,
  onClose
}) => {

  if (!open) return;

  const userData = useSelector(state => state.userData);
  const [postData, setPostData] = useState({ tempPostUrl: '', postFile: '', postCaption: '', status: '' });
  const formData = new FormData();
  const dispatch = useDispatch();


  const handlePostData = (e) => {
    const { name } = e.target;
    if (name === 'postFile') {
      const file = e.target.files[0];
      const tempPostUrl = URL.createObjectURL(file);
      setPostData(state => ({ ...state, [name]: file, tempPostUrl }))
      return;
    }
    const { value } = e.target;
    setPostData(state => ({ ...state, [name]: value }));
  }

  const handleCreatePost = async () => {
    if (!postData.postFile) return;
    try {
      setPostData(state => ({ ...state, status: 'posting' }));
      formData.append('post', postData.postFile);
      if (postData.postCaption) formData.append('postCaption', postData.postCaption);
      formData.append('userName', userData?.userName)

      const res = await api.post('/post/create-post', formData);
      if (res.status === 201) {
        toast.success('Your post is uploaded.');
        dispatch(setMadeChanges());
      }
    }
    catch (err) {

      toast.error('something went wrong! please try again.')

    }
    finally {
      setPostData({ tempPostUrl: '', postFile: '', postCaption: '', status: '' });
    }
    onClose();
  }

  return (
    <main
      className="
        fixed
        inset-0
        z-1200
        flex
        items-center
        justify-center
        bg-black/70
        p-5
        backdrop-blur-sm
      "
      onClick={(e) => e.target.tagName === "MAIN" && onClose()}
    >
      <div
        className="
          w-full
          max-w-140
          rounded-3xl
          border
          border-white/10
          bg-[#0d0a20]/75
          p-6
          h-fit
          shadow-2xl
        "

      >


        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Create a post
            </h2>

            <p className="mt-1 text-xs text-white/35">
              Share a moment with Pixora.
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              grid
              size-9
              place-items-center
              rounded-full
              bg-white/5
              text-white/50
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            <X size={18} />
          </button>
        </div>



        <div className="mt-6 flex items-center gap-3">
          <img
            src={userData?.profile?.avatarUrl || defaultAvatar}
            className="size-11 rounded-full object-cover"
          />

          <div>
            <p className="text-sm font-semibold text-white">
              {userData?.fullName}
            </p>

            <p className="text-xs text-white/35">
              @{userData?.userName}
            </p>
          </div>
        </div>


        <textarea
          placeholder="What's on your mind?"
          className="
            mt-5
            min-h-28.5
            w-full
            resize-none
            rounded-2xl
            border
            border-white/[0.07]
            bg-white/2.5
            p-4
            text-sm
            text-white
            outline-none
            placeholder:text-white/25
            focus:border-violet-500/40
          "
          name='postCaption'
          value={postData.postCaption}
          onChange={handlePostData}
        />


        <div
          className="
            mt-4
            flex
            flex-wrap
            gap-2
          "
        >
          {postData.tempPostUrl ?

            <div className="w-45 h-40 p-0.5 flex gap-2 relative">
              <img src={postData.tempPostUrl} alt="" className="w-full h-full object-cover object-center border border-gray-300 rounded-sm" />
              <button onClick={() => setPostData(state => ({ ...state, tempPostUrl: "", postFile: '' }))} className="text-red-500 cursor-pointer self-start"> <X size={25} /></button>
            </div>

            : <label
              className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-white/4
              px-4
              py-2.5
              text-xs
              text-white/60
              transition
              hover:bg-white/8
              hover:text-white
            "
              id="post"
            >
              <input type="file" name="postFile" id="post" className="hidden" onChange={handlePostData} />
              <Image size={17} />
              Photo
            </label>
          }
        </div>


        <button
          onClick={handleCreatePost}
          className="
            mt-6
            h-12
            w-full
            rounded-xl
            bg-linear-to-r
            from-violet-600
            via-fuchsia-600
            to-pink-500
            text-sm
            font-semibold
            text-white
            transition
            hover:brightness-110
            disabled:cursor-none
            disabled:bg-gray-400
          "
          disabled={postData.status === 'posting'}
        >
          {postData.status === 'posting' ? <p><Loader2 size={15} className="inline animate-spin" /> posting</p> : 'post'}
        </button>
      </div>
    </main>
  );
});

export default CreatePost;