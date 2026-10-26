
import { memo, useEffect } from "react";
import PostActions from '../home/PostActions.jsx'
import { formatPostTime } from "../../utils/formattedTime.js";

const Post = memo(({ posts, post, index }) => {

  useEffect(() => {
    if (posts?.length - 1 === index) {

      const url = window.location.href;
      if (url.includes("#")) {
        const getIndex = url.indexOf("#");
        const getElementId = url.slice(getIndex + 1);
        const element = document.getElementById(getElementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }

      }
      else window.scrollTo({ top: "0px", behavior: "smooth" })
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
          />
        </div>

      </div>

    </article>
  )
})

const ProfilePosts = memo(({ posts = [] }) => {

  if (!posts?.length) {
    return (
      <div className="flex min-h-104 items-center justify-center">
        <p className="text-xl text-violet-300">
          No posts yet!
        </p>
      </div>
    );
  }

  return (
    <main >

      <p className="text-violet-400 text-xs sm:pl-6 pl-2.5 pt-2 uppercase tracking-widest"> Posts</p>

      <div className="
      mt-20
    md:columns-2
    lg:columns-xs
    *:mb-6
  mb-5
    ">

        {[...posts].reverse().map((post, index) => (
          <Post posts={posts} post={post} index={index} key={index} />
        ))}

      </div>
    </main>
  );
});

export default ProfilePosts;