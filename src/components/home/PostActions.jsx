import {
  Bookmark,
  Heart,
  Loader2,
  MessageCircle,
  MoreHorizontal,
  Send,

  X,
} from "lucide-react";
import { api } from "../../config/axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, memo } from "react";
import { setOpenCommentSection, setComments, setCurrentPostData, setMadeSavedChanges } from '../../redux/features/userSlice.js'
import { env } from "../../config/env.js";
import { useDeletion } from "../../custom_hook/deletion.js";


const PostActions = memo(({
  post, isProfile = false
}) => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.userData);
  const postLikedCount = post?.likes?.length;
  let isLiked = post?.likes?.includes(user?._id);

  const { onPostDelete, loading } = useDeletion()
  const [liked, setLiked] = useState({ isPostLiked: isLiked, postLikedCount });

  const openCommentSection = useSelector(state => state.openCommentSection);
  const postComments = useSelector(state => state.comments);

  const [commentsCount, setCommentsCount] = useState(0)
  const [saving, setSaving] = useState(false);

  const [isSaved, setIsSaved] = useState(user?.profile?.saved?.includes(post?._id));

  const [openMore, setOpenMore] = useState(false);


  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/post/get-post-comments-counts?postId=${post?._id}
    `);
        if (res.status === 200) setCommentsCount(res.data?.totalComments);
      }
      catch (err) {
        toast.error('something went wrong! please try again.');
      }
    })()
  }, [postComments])

  const handlePostLike = async (postId) => {

    setLiked(state => !state.isPostLiked ? ({ isPostLiked: !state.isPostLiked, postLikedCount: state.postLikedCount + 1 }) : ({ isPostLiked: !state.isPostLiked, postLikedCount: state.postLikedCount - 1 }));

    try {
      const res = await api.patch('/post/like', { postId, userName: user?.userName, postCreatorId: post?.userId?._id || post?.userId });
      if (res.status === 201) {

      }

    }
    catch (err) {
      setLiked(state => !state.isPostLiked ? ({ isPostLiked: !state.isPostLiked, postLikedCount: state.postLikedCount + 1 }) : ({ isPostLiked: !state.isPostLiked, postLikedCount: state.postLikedCount - 1 }));

      toast.error('something went wrong! please try again.');
    }
  }

  const handleOpenCommentSection = async () => {
    dispatch(setOpenCommentSection(!openCommentSection));
    dispatch(setCurrentPostData(post))
    try {
      const res = await api.get(`/post/get-post-comments?postId=${post?._id}`);
      if (res.status === 200) {
        dispatch(setComments(res?.data?.comments));
      }
    }
    catch (err) {
      toast.error('something went wrong! please try again.');
    }
  };


  const handleOpenMore = () => {
    setOpenMore(true);
  }

  const handleCloseMore = () => {
    setOpenMore(false);
  }

  const handlePostSave = async () => {
    setIsSaved(!isSaved);
    try {
      const res = await api.patch('/profile/saved', { id: user?._id, postId: post?._id });
      if (res.status === 201) {
        dispatch(setMadeSavedChanges())

      }
    }
    catch (err) {
      setIsSaved(!isSaved);
      toast.error(err?.response?.data?.message || "something went wrong ! please try again")

    }
    finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="
        flex
        items-center
        border-t
        border-white/3
        pt-4
       relative
      "
    >


      <button
        className={`
          group
          flex
          items-center
          gap-2
          transition
          ${liked.isPostLiked
            ? "text-pink-500"
            : "text-white/45 hover:text-pink-400"
          }
        `}

      >
        <Heart
          size={21}
          fill={
            liked.isPostLiked
              ? "currentColor"
              : "none"
          }
          className="
            transition-transform
            group-active:scale-125
            cursor-pointer
          "
          onClick={() => handlePostLike(post?._id)}
        />

        <span className="text-sm">
          {liked.postLikedCount}
        </span>
      </button>


      <button
        className="
          ml-7
          flex
          items-center
          gap-2
          text-white/45
          transition
          hover:text-white
          cursor-pointer
        "
        onClick={handleOpenCommentSection}
      >
        <MessageCircle size={21} />

        <span className="text-sm">
          {commentsCount}
        </span>
      </button>



      <button
        className="
          ml-7
          text-white/45
          transition
          hover:text-white
          cursor-pointer
        "
        onClick={() => { window.navigator.share({ title: "Pixora", text: `${env.viteClientUri}/post/${post?.postPublicId}` }) }}
      >
        <Send size={20} />
      </button>


      {isProfile && !openMore && <button className=" ml-auto transition cursor-pointer" onClick={handleOpenMore}> <MoreHorizontal /></button>}

      {isProfile && openMore && <button className=" ml-auto transition text-[#F6339A] cursor-pointer" onClick={handleCloseMore}>
        <X />
      </button>}

      {openMore && <div className="rounded-md border border-gray-500 p-7 absolute bottom-10 -right-3 flex flex-col gap-4  text-white bg-zinc-300 *:cursor-pointer">
        <button className="border rounded-md p-2 text-base-500 bg-red-500 border-gray-200" onClick={async () => { await onPostDelete(post?._id); setOpenMore(false) }}>
          {loading ? "Deleting" : "Delete this post"}
        </button>
        <button className="border rounded-md p-2 border-gray-200 bg-zinc-400 flex justify-center items-center text-base-500" onClick={async () => { setSaving(true); await handlePostSave() }}>{saving ? <Loader2 className="animate-spin text-center" /> : isSaved ? "Remove from saved" : "Add to saved"}</button>
      </div>}


      {!isProfile && <button
        onClick={handlePostSave}
        className={`
          ml-auto
          transition
          cursor-pointer
          ${isSaved
            ? "text-violet-400"
            : "text-white/45 hover:text-white"
          }
        `}
      >
        <Bookmark
          size={21}
          fill={
            isSaved
              ? "currentColor"
              : "none"
          }
        />
      </button>}
    </div>
  );
});

export default PostActions;