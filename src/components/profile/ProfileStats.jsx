
import { useSelector } from "react-redux";

import { FollowersList, FollowingList } from '../../custom_hook/followerAndFollowingComponents.jsx'
import { useFollowerAndFollowing } from "../../custom_hook/followerAndFollowing.js";
import { memo } from "react";


const ProfileStats = memo(() => {

  const userProfilePostsAndStats = useSelector(state => state.userProfilePostsAndStats)

  const { openUnfollowModel, openSeeFollowers, openSeeFollowing, handleOpen, handleClose, handleOpenSeeFollowers, handleOpenSeeFollowing, handleCloseSeeFollowing, handleCloseSeeFollowers } = useFollowerAndFollowing();

  const stats = [
    {
      value: userProfilePostsAndStats?.userPosts?.length,
      label: "Posts",
    },
    {
      value: userProfilePostsAndStats?.userFollowers?.length,
      label: "Followers",
    },
    {
      value: userProfilePostsAndStats?.userFollowing?.length,
      label: "Following",
    },
  ];

  return (
    <div className="mt-5 pl-1 flex md:gap-27 gap-15 max-w-full  pb-8 text-white border-b-2 border-slate-800 ">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`
            ${index !== stats.length - 1
              ? "border-r border-white/[0.07]"
              : ""
            }
          `}
          onClick={() => {
            if (stat.label === "Followers") handleOpenSeeFollowers();
            else if (stat.label === "Following") handleOpenSeeFollowing();
          }}
        >
          <p className="text-xl font-bold text-white">
            {stat.value}
          </p>

          <p className="mt-1 text-zinc-300 ">
            {stat.label}
          </p>
        </div>
      ))}



      {openSeeFollowers && <FollowersList followers={userProfilePostsAndStats.userFollowers} onBack={handleCloseSeeFollowers} who={"followerId"} isOpened={openUnfollowModel} openUnfollowModel={handleOpen} closeUnfollowModel={handleClose} />}

      {openSeeFollowing && <FollowingList following={userProfilePostsAndStats.userFollowing} onBack={handleCloseSeeFollowing} who={'followingId'} isOpened={openUnfollowModel} openUnfollowModel={handleOpen} closeUnfollowModel={handleClose} />}

    </div>
  );
});

export default ProfileStats;