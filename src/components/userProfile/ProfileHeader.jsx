import {
  UserCheck, Plus,

} from "lucide-react";
import defaultAvatar from '../../assets/images/defaultAvatar.png'
import defaultCover from '../../assets/images/pixora_landing_bg.png'
import { Link } from "lucide-react";
import { useFollowerAndFollowing } from "../../custom_hook/followerAndFollowing";
import { FollowingList, FollowersList, UnfollowModel } from '../../custom_hook/followerAndFollowingComponents.jsx'
import { useSelector } from "react-redux";
import { memo, useEffect } from "react";

const ProfileHeader = memo(({ user, checkFollowing, stats, }) => {

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: "0px" })
  }, [])


  const yourProfileData = useSelector(state => state.userData);
  const {
    openUnfollowModel, openSeeFollowers, openSeeFollowing, handleOpen, handleClose, handleOpenSeeFollowers, handleOpenSeeFollowing, handleCloseSeeFollowing, handleCloseSeeFollowers, handleFollow, } = useFollowerAndFollowing();

  return (
    <section className="text-gray-200 bg-black/50">

      <div className="h-60 overflow-hidden sm:h-75 ">
        <img
          src={user?.profile?.coverUrl || defaultCover}
          alt="Cover"
          className="h-full w-full object-cover rounded-lg"
        />
        
      </div>

      <div className="relative px-2 sm:px-6">
        <div className="-mt-16 w-fit sm:-mt-18">
          <div className="rounded-full  bg-linear-to-r
            from-violet-600
            via-fuchsia-600
            to-pink-500 p-0.5 ">
            <img
              src={user?.profile?.avatarUrl || defaultAvatar}
              alt={user?.userName}
              className="h-28 w-28 rounded-full object-cover sm:h-32 sm:w-32"
            />
          </div>
        </div>
        <div className='ml-30 -mt-2 *:cursor-pointer text-[17px]  *:border-gray-600 *:px-2 *:py-0.5 *:rounded-md '>
          {checkFollowing.checkYouFollowTheUser ? <button
            type="button"
            onClick={handleOpen}
            className="btn btn-outline btn-sm gap-2 rounded-xl"
          >
            <UserCheck size={16} />
            <span className=" ">Following</span>
          </button> : <button onClick={async () => await handleFollow(yourProfileData?._id, user?._id, yourProfileData?.userName)} className="flex items-center gap-1  bg-zinc-300 text-black/50 font-medium px-2 py-0.5 rounded-sm">
            {checkFollowing.checkUserFollowsYou ? "Follow back" : <span className="flex gap-1 items-center">
              <Plus size={14} className="inline" />
              Follow
            </span>}
          </button>}
        </div>


        <div className="mt-4">

          <h1 className="text-2xl font-bold">
            {user?.fullName}
          </h1>

          <p className="text-sm text-base-content/50 text-gray-200 mt-0.5">
            @{user?.userName}
          </p>

          <p className="mt-3 max-w-175 text-sm leading-6 text-zinc-300 sm:text-[15px]">
            {user?.profile?.bio || ""}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-500">
            {user?.profile?.links.map((link, ind) => {
              return <div key={ind} className="flex gap-1 items-center text-zinc-400">  <a href={link.url} target="_blank"> <Link size={15} className="inline text-white" /> {link.title}</a> </div>
            })}
          </div>
        </div>


        <div className="mt-8 flex md:gap-27 gap-15 border-b-3 border-slate-800 pb-10">

          <div>
            <p className="font-bold text-xl">{stats.totalPosts}</p>
            <p className="text-sm text-base-content/50">Posts</p>
          </div>

          <div className="cursor-pointer" onClick={handleOpenSeeFollowers}>
            <p className="font-bold text-xl">{stats.followers?.length}</p>
            <p className="text-sm text-base-content/50">
              Followers
            </p>
          </div>

          <div className="cursor-pointer" onClick={handleOpenSeeFollowing}>
            <p className="font-bold text-xl">{stats.following?.length}</p>
            <p className="text-sm text-base-content/50">
              Following
            </p>
          </div>

        </div>

      </div>

      {openUnfollowModel && <UnfollowModel userName={user?.userName} onClose={handleClose} yourId={yourProfileData?._id} userId={user?._id} />}

      {openSeeFollowers && <FollowersList followers={stats.followers} onBack={handleCloseSeeFollowers} who={"followerId"} isOpened={openUnfollowModel} openUnfollowModel={handleOpen} closeUnfollowModel={handleClose} />}

      {openSeeFollowing && <FollowingList following={stats.following} onBack={handleCloseSeeFollowing} who={'followingId'} isOpened={openUnfollowModel} openUnfollowModel={handleOpen} closeUnfollowModel={handleClose} />}

    </section>
  );
});

export default ProfileHeader;