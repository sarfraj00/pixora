import { useState } from "react";
import { api } from "../config/axios";
import { toast } from "react-toastify";
import { setStatsChanges } from "../redux/features/userSlice";
import { useDispatch } from "react-redux";

export const useFollowerAndFollowing = () => {

    const dispatch = useDispatch()

    const [openUnfollowModel, setOpenUnfollowModel] = useState(false);

    const [openSeeFollowers, setOpenSeeFollowers] = useState(false);
    const [openSeeFollowing, setOpenSeeFollowing] = useState(false);

    const handleOpen = () => {
        setOpenUnfollowModel(true);
    }

    const handleClose = () => {
        setOpenUnfollowModel(false);
    }


    const handleOpenSeeFollowers = () => {
        setOpenSeeFollowing(false)
        setOpenSeeFollowers(true);
    }
    const handleOpenSeeFollowing = () => {
        setOpenSeeFollowers(false);
        setOpenSeeFollowing(true);

    }

    const handleCloseSeeFollowing = () => {
        setOpenSeeFollowing(false);
    }

    const handleCloseSeeFollowers = () => {
        setOpenSeeFollowers(false);
    }


    const handleFollow = async (followerId = null, followingId = null, followerUserName = null) => {
        try {
            const res = await api.post('/friend/follow', { followerId: followerId, followerUserName: followerUserName, followingId: followingId });
            if (res.status === 201) {
              
             dispatch(setStatsChanges());
            }
        }
        catch (err) {

            toast.error(err?.response?.data?.message || "something went wrong! please try again.");
        }
    }



    const handleUnfollow = async (followerId = null, followingId = null) => {
        try {

            const res = await api.delete(`/friend/unfollow?followerId=${followerId}&followingId=${followingId}`);
            if (res.status === 200) {
                
               dispatch(setStatsChanges());
            }
        }
        catch (err) {

            toast.error(err?.response?.data?.message || "something went wrong! please try again.")
        }

    }

    return {
        openUnfollowModel, openSeeFollowers, openSeeFollowing, handleOpen, handleClose, handleOpenSeeFollowers, handleOpenSeeFollowing, handleCloseSeeFollowing, handleCloseSeeFollowers, handleFollow, handleUnfollow
    }

}