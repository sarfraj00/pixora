import { Loader2, } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { api } from "../../config/axios.js";
import { toast } from "react-toastify";
import { formatPostTime } from "../../utils/formattedTime.js";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfilePostsAndStats } from "../../redux/features/userSlice.js";
import PostActions from "../home/PostActions.jsx";


const Post = memo(({ postsLength, post, index }) => {

  useEffect(() => {

    if (postsLength - 1 === index) {
      const url = window.location.href;
      if (url.includes("#")) {
        const getIndex = url.indexOf("#");
        const getElementId = url.slice(getIndex + 1);
        const element = document.getElementById(getElementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }

      }
    }

  }, [])

  return (
    <article
      className="
           overflow-hidden
           rounded-2xl
       bg-white/3
           relative
         "
    >

      <div className="relative w-full h-full overflow-hidden" id={post?._id}>
        <img
          src={post?.postUrl}
          className="
               aspect-16/10
               w-full
              h-90
               object-cover
               transition
               duration-500
               hover:scale-[1.02]
             "
        />

        <div className="mt-2 ml-1">
          <p className="text-[15px] leading-6 text-white/80">
            {post?.postCaption || ""}
          </p>

          <p className="mt-0.5 text-xs text-white/35">
            {formatPostTime(post?.createdAt)}
          </p>
        </div>

        <div className="px-5 py-4 sm:px-6">
          <PostActions
            post={post}
            isProfile={true}
          />
        </div>

      </div>

    </article>
  )
})

const PostGrid = memo(({ }) => {
  const userProfilePostsAndStats = useSelector(state => state.userProfilePostsAndStats);

  const madeChanges = useSelector(state => state.madeChanges);

  const statsChanges = useSelector(state => state.statsChanges);

  const dispatch = useDispatch();
  const [postLoader, setPostLoader] = useState(true);


  useEffect(() => {
    (async () => {
      try {

        const res = await api.get('/post/get-user-posts');
        if (res.status === 200) dispatch(setUserProfilePostsAndStats({ userFollowers: res.data.followers, userFollowing: res.data.following, userPosts: res.data.posts }));

      }
      catch (err) {
        toast.error('somthing went wrong! please try again.')
      }

      finally {
        setPostLoader(false);

      }
    })()
  }, [madeChanges, statsChanges])


  if (postLoader) {
    return (
      <div className=" grid  mb-16 sm-mb-8 gap-3  text-neutral-400 relative w-full justify-center items-center min-h-80">

        <Loader2 className="animate-spin" />
      </div>)
  }

  return (

    <main>
      <p className="text-violet-400 text-xs pt-2 uppercase tracking-widest">Your Posts</p>
      <div className="mt-18 
    md:columns-2
    xl:columns-xs
    mb-20
  text-neutral-400 relative w-full">

        {
          userProfilePostsAndStats?.userPosts?.length === 0 ? <p className="  w-full flex justify-center absolute min-h-90 pb-15 items-center text-violet-300 text-xl">No posts yet!</p>
            :
            [...userProfilePostsAndStats?.userPosts]?.reverse().map((post, index) => (

              <Post key={index} post={post} postsLength={userProfilePostsAndStats?.userPosts?.length} index={index} />
            ))}
      </div>
    </main>


  );
});

export default PostGrid;