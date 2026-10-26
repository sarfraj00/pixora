import { formatPostTime } from '../../utils/formattedTime.js'
import defaultAvatar from '../../assets/images/defaultAvatar.png'
import PostActions from '../home/PostActions.jsx'
import { api } from "../../config/axios.js";
import { useNavigate } from "react-router-dom";
import { memo, useEffect, } from 'react';
import { useSelector } from 'react-redux';
import { MoreVertical } from 'lucide-react';

import ConfirmDeleteModal from './ConfirmDeleteModel.jsx';
import { useDeletion } from '../../custom_hook/deletion.js';

const PostCard = memo(({
  post, scrollToElement
}) => {

  const navigate = useNavigate();

  useEffect(() => {
    //taking to the element
    if (scrollToElement) scrollToElement();
  }, [])


  const handleUserProfile = async (username) => {
    const res = await api.get('/auth/get-me');
    if (res?.data?.user?.userName === username) {
      navigate('/profile');
      return;
    }
    navigate(`/user/${username}`)
  }


  const currentUser = useSelector(state => state.userData);
  

  const { isOpen, onOpen, onClose, onPostDelete, loading } = useDeletion();

  return (
    <article

      className="
        overflow-hidden
        rounded-2xl
        border
        border-white/8
        bg-[#0b0918]/60
        relative
      "
    >


      <div
        className="
          flex
          items-center
          px-5
          py-5
          sm:px-6
          w-full
        "

      >
        <img
          onClick={() => handleUserProfile(post?.userId?.userName)}
          src={post?.userId?.profile?.avatarUrl || defaultAvatar}
          alt={post?.userId?.fullName}
          className="
            size-11
            rounded-full
            object-cover
            ring-2
            ring-violet-500/20
            cursor-pointer
          "
        />

        <div className="ml-3 cursor-pointer" onClick={() => handleUserProfile(post?.userId?.userName)}>
          <p className="text-sm font-semibold text-white">
            {post?.userId?.fullName}
          </p>

          <p className="mt-0.5 text-xs text-white/35">
            {post?.userId?.userName} ·{" "}
            {formatPostTime(post?.createdAt)}
          </p>
        </div>

        {post?.userId?._id === currentUser?._id && <button className='absolute right-4' onClick={() => onOpen(post?._id)}>
          <MoreVertical />
        </button>}

      </div>


      <div className="px-5 pb-4 sm:px-6">
        <p className="text-[15px] leading-6 text-white/80">
          {post?.postCaption || ""}
        </p>
      </div>



      <div className="relative w-full overflow-hidden" id={post?.postPublicId}>
        <img
          src={post?.postUrl}
          className="
            aspect-16/10
            w-full
            object-cover
            transition
            duration-500
            hover:scale-[1.02]
          "
        />
      </div>

      <div className="px-5 py-4 sm:px-6">
        <PostActions
          post={post}
        />
      </div>

      <ConfirmDeleteModal loading={loading} isOpen={isOpen} onClose={onClose} onConfirm={onPostDelete} />

    </article>
  );
});

export default PostCard;