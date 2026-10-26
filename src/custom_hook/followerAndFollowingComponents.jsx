import {
    AlertTriangle, ArrowLeft,
    Search,
    UsersRound,
    UserCheck, Plus, X,
    Loader2,
} from "lucide-react";
import defaultAvatar from '../assets/images/defaultAvatar.png'
import { memo, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../config/axios.js"
import { useSelector } from "react-redux";
import { useFollowerAndFollowing } from "./followerAndFollowing.js";

export const UnfollowModel = memo(({ onClose, userName, yourId = null, userId = null }) => {

    const { handleUnfollow } = useFollowerAndFollowing()

    const [loading, setLoading] = useState(false);
    return (

        <main className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 px-4 backdrop-blur-2xl" >
            <div
                className="
          w-full max-w-md
          overflow-hidden
          rounded-3xl
          border border-base-content/10
          bg-base-100
          shadow-2xl
          animate-[fadeIn_.2s_ease-out]
          bg-black
        "
            >

                <div className="flex items-center justify-between px-6 pt-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-error/10">
                        <AlertTriangle
                            size={24}
                            className="text-error"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="btn btn-ghost btn-sm btn-circle"
                    >
                        <X size={19} />
                    </button>
                </div>

                <div className="px-6 py-6">
                    <h2 className="text-xl font-bold">
                        Unfollow {userName || 'this user'} ?
                    </h2>

                </div>


                <div className="flex gap-3 border-t border-base-content/10 px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="btn btn-ghost flex-1 rounded-xl"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={async () => {
                            setLoading(true);
                            try {
                                await handleUnfollow(yourId, userId);
                            }
                            catch (err) { }
                            finally { setLoading(false); onClose() }
                        }}
                        disabled={loading}
                        className="btn btn-error flex-1 rounded-xl"
                    >
                        {loading ? (
                            <>
                                <span className="loading loading-spinner loading-sm" />
                                Unfollowing...
                            </>
                        ) : (
                            <>
                                Unfollow
                            </>
                        )}
                    </button>
                </div>
            </div>
        </main>
    )
})


export const CheckingUser = memo(({ user = {}, who, onOpen, }) => {

    const statsChanges = useSelector(state => state.statsChanges);

    const [checkFollowing, setCheckFollowing] = useState({ checkYouFollowTheUser: false, checkUserFollowsYou: false, });
    const yourAccount = useSelector(state => state.userData);
    const checkItsYourAccount = yourAccount._id === user[who]?._id;
    const [loader, setLoader] = useState(true);

    const { handleFollow } = useFollowerAndFollowing();

    const visitProfile = () => {
        if (checkItsYourAccount) window.location.href = '/profile';
        else window.location.href = `/user/${user[who]?.userName}`
    }

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get(`/friend/check-follower-following?userId=${user[who]._id}`);
                if (res.status === 200) {
                    setCheckFollowing({ checkYouFollowTheUser: res?.data?.checkYouFollowTheUser, checkUserFollowsYou: res?.data?.checkUserFollowsYou })
                }
            }
            catch (err) {
                toast.error(err?.response?.data?.message || "something went wrong! please try again.")
            }
            finally {
                setLoader(false);
            }
        })()
    }, [statsChanges])

    return (
        <article
            key={user[who]?._id}
            className="flex items-center gap-3 rounded-2xl p-3 transition hover:bg-base-200/60"
        >

            <button
                type="button"
                className="shrink-0"
                aria-label={`View ${user[who]?.fullName}'s profile`}
            >
                <img
                    src={
                        user[who]?.profile?.avatarUrl || defaultAvatar
                    }
                    alt={user[who]?.userName}
                    className="h-12 w-12 rounded-full object-cover ring-1 ring-base-content/10"
                    onClick={visitProfile}
                />
            </button>


            <button
                type="button"
                className="min-w-0 flex-1 text-left"
            >
                <p className="truncate text-sm font-semibold" >
                    <span onClick={visitProfile}>  {user[who]?.fullName}</span>
                </p>

                <p className="truncate text-xs text-base-content/50" >
                    @{user[who]?.userName}
                </p>
            </button>
            {loader && <Loader2 className="animate-spin" />}

            {!checkItsYourAccount && !loader && (checkFollowing.checkYouFollowTheUser ? (
                <button
                    type="button"
                    onClick={() => { onOpen({ userId: user[who]?._id, userName: user[who]?.userName, yourId: yourAccount._id }) }}
                    className="btn btn-outline btn-sm gap-2 rounded-xl"
                    aria-label={`Unfollow ${user[who]?.userName}`}
                >
                    <UserCheck size={16} />
                    <span className="hidden sm:inline">Following</span>
                </button>
            ) : (
                <button className="flex items-center gap-1 bg-zinc-300 text-black/50 font-medium px-2 py-0.5 rounded-sm" onClick={() => handleFollow(yourAccount._id, user[who]?._id, yourAccount?.userName)}>
                    {checkFollowing.checkUserFollowsYou ? "Follow back" : <span className="flex gap-1 items-center">
                        <Plus size={14} className="inline" />
                        Follow
                    </span>}
                </button>
            ))}
        </article>
    )
}
);

export const FollowingList = memo(({
    following = [],
    loading = false,
    onBack,
    isOpened,
    openUnfollowModel, closeUnfollowModel
}) => {
    const [search, setSearch] = useState("");

    const filteredUsers = following.filter((user) => {
        const query = search.trim().toLowerCase();

        return (
            user.followingId?.fullName?.toLowerCase().includes(query) ||
            user.followingId?.userName?.toLowerCase().includes(query)
        );
    });

    const [detail, setDetail] = useState({ yourId: '', userId: "", userName: '' })

    const openModelWithData = ({ userId, userName, yourId }) => {
        openUnfollowModel();
        setDetail({ userId, userName, yourId })
    }
    return (

        <main className="flex justify-center items-end inset-0 z-100 fixed backdrop-blur-sm bg-black/50 sm:items-center sm:pt-18" >

            <section className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-base-content/10 bg-base-100 shadow-sm bg-black/80 min-h-[86%] sm:min-h-110 text-white ">

                <header className="flex items-center gap-3 border-b border-base-content/10 p-5">
                    <button
                        type="button"
                        onClick={onBack}
                        aria-label="Go back"
                        className="btn btn-ghost btn-sm btn-circle"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <div className="flex-1">
                        <h1 className="text-xl font-bold">Following</h1>
                        <p className="text-sm text-base-content/50">
                            {following.length} {following.length === 1 ? "person" : "people"}
                        </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <UsersRound size={21} />
                    </div>
                </header>


                <div className="p-4">
                    <label className="flex items-center gap-3 rounded-2xl border border-base-content/10 bg-base-200/50 px-4 transition focus-within:border-primary/50">
                        <Search size={19} className="text-base-content/40" />

                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search following..."
                            className="w-full bg-transparent py-3 text-sm outline-none"
                        />
                    </label>
                </div>

                <div className="max-h-[52vh] overflow-y-auto px-4 pb-4 py-4 scrollbar-none">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <span className="loading loading-spinner loading-lg text-primary" />
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="flex flex-col items-center py-12 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-base-200">
                                <UsersRound size={28} className="text-base-content/40" />
                            </div>

                            <h2 className="mt-4 font-semibold">
                                {search ? "No users found" : "Not following anyone yet"}
                            </h2>

                            <p className="mt-1 max-w-xs text-sm text-base-content/50">
                                {search
                                    ? "Try a different name or username."
                                    : "People this account follows will appear here."}
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1 ">
                            {filteredUsers.map((user) => (
                                <CheckingUser user={user} key={user._id} who={'followingId'} onBack={onBack} onOpen={openModelWithData} onClose={closeUnfollowModel} />
                            ))}

                        </div>
                    )}
                </div>
            </section>

            {isOpened && <UnfollowModel onClose={closeUnfollowModel}
                userId={detail?.userId} userName={detail?.userName} yourId={detail?.yourId} />}

        </main>
    );
});

export const FollowersList = memo(({
    followers = [],
    loading = false,
    onBack,
    isOpened,
    openUnfollowModel, closeUnfollowModel
}) => {
    const [search, setSearch] = useState("");


    const filteredUsers = followers.filter((user) => {
        const query = search.trim().toLowerCase();

        return (
            user.followerId?.fullName?.toLowerCase().includes(query) ||
            user.followerId?.userName?.toLowerCase().includes(query)
        );
    });

    const [detail, setDetail] = useState({ yourId: '', userId: "", userName: '' })

    const openModelWithData = ({ userId, userName, yourId }) => {
        openUnfollowModel();
        setDetail({ userId, userName, yourId })
    }

    return (
        <main className="flex justify-center items-end inset-0 z-100 fixed backdrop-blur-sm bg-black/50 sm:items-center sm:pt-18" >

            <section className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-base-content/10 bg-base-100 shadow-sm bg-black/80 min-h-[86%] sm:min-h-110 text-white ">

                <header className="flex items-center gap-3 border-b border-base-content/10 p-5">
                    <button
                        type="button"
                        onClick={onBack}
                        aria-label="Go back"
                        className="btn btn-ghost btn-sm btn-circle"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <div className="min-w-0 flex-1">
                        <h1 className="text-xl font-bold">Followers</h1>
                        <p className="text-sm text-base-content/50">
                            {followers.length} {followers.length === 1 ? "follower" : "followers"}
                        </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <UsersRound size={21} />
                    </div>
                </header>


                <div className="p-4">
                    <label className="flex items-center gap-3 rounded-2xl border border-base-content/10 bg-base-200/50 px-4 transition focus-within:border-primary/50">
                        <Search size={19} className="text-base-content/40" />

                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search followers..."
                            className="w-full bg-transparent py-3 text-sm outline-none"
                        />
                    </label>
                </div>


                <div className="max-h-[52vh] overflow-y-auto px-4 pb-4 py-4 scrollbar-none">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="animate-spin" />
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="flex flex-col items-center py-12 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-base-200">
                                <UsersRound
                                    size={28}
                                    className="text-base-content/40"
                                />
                            </div>

                            <h2 className="mt-4 font-semibold">
                                {search ? "No followers found" : "No followers yet"}
                            </h2>

                            <p className="mt-1 max-w-xs text-sm text-base-content/50">
                                {search
                                    ? "Try searching with another name or username."
                                    : "When people follow this account, they'll appear here."}
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1 ">
                            {filteredUsers.map((user) => (
                                <CheckingUser user={user} key={user._id} who={'followerId'} onBack={onBack} onOpen={openModelWithData} onClose={closeUnfollowModel} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {isOpened && <UnfollowModel onClose={closeUnfollowModel}
                userId={detail.userId} userName={detail.userName} yourId={detail.yourId} />}

        </main>
    );
});
