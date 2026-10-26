import { ArrowLeft, Bell } from "lucide-react";
import { api } from "../../config/axios";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenNotification, setUserData } from "../../redux/features/userSlice";
import { formatPostTime } from "../../utils/formattedTime";
import { memo } from "react";

export const Notification = memo(({
    onBack,
    notification,
    notificationCount
}) => {

    const navigate = useNavigate();
    const user = useSelector(state => state.userData);
    const dispatch = useDispatch();

    const handleBackAndReset = async () => {
        try {
            onBack();

            if (notificationCount > 0) {
                const res = await api.patch('/profile/reset-notification-count');
                if (res.data.success) dispatch(setUserData(res?.data?.user));
            }
        }
        catch (err) {
            toast.error('something went wrong! please try again.');
        }
    }


    return (
        <main className="flex justify-center items-end inset-0 z-100 fixed backdrop-blur-sm bg-black/50 sm:items-center sm:pt-10" onClick={async (e) => { if (e.target.tagName === 'MAIN') handleBackAndReset() }}>

            <section className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-base-content/10 bg-base-100 shadow-sm bg-black/80 min-h-[86%] sm:min-h-110 text-white ">

                <header className="flex items-center gap-3 border-b border-base-content/10 p-5">
                    <button
                        type="button"
                        onClick={handleBackAndReset}
                        aria-label="Go back"
                        className="btn btn-ghost btn-sm btn-circle"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <div className="min-w-0 flex-1 ">
                        <h1 className="text-xl font-bold">Notifications</h1>
                        <p className="text-sm text-zinc-400">
                            {notificationCount > 1 ? `${notificationCount} new notifications ` : `${notificationCount} new notification`}
                        </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Bell size={21} />
                    </div>
                </header>


                <div className="max-h-[65vh] overflow-y-auto px-4 pb-4 py-4 scrollbar-none">
                    {
                        notification?.length === 0 ? <div className="w-ful h-60 flex justify-center items-center">It looks like you don't have any messages.</div> : <div className="flex flex-col gap-7 ">
                            {[...notification].reverse().map((not, ind) => (
                                <div key={ind} className="flex gap-5  w-full justify-between pl-3 pr-8 text-sm">
                                    <p className='w-70 wrap-break-word cursor-default text-zinc-200' onClick={() => {
                                        dispatch(setOpenNotification());
                                        navigate(`/user/${not?.notificationFrom}`);;
                                    }}>{not.message}
                                        <span className='block text-[12px] text-zinc-400'>{formatPostTime(not?.createdAt)}</span>
                                    </p>
                                    {not.postUrl && <div className='w-11 h-15 rounded-md overflow-hidden' onClick={() => {
                                        dispatch(setOpenNotification())
                                        if (not.postCreatorId === user?._id) {
                                            window.location.href = `/profile#${not.postId}`
                                            return;
                                        }
                                        window.location.href = `/user/${not.notificationFrom}#${not.postId}`
                                    }}>
                                        <img src={not?.postUrl} alt="" className="object-center object-cover w-full h-full " />
                                    </div>}

                                </div>

                            ))}
                        </div>
                    }
                </div>

            </section>
        </main>
    );
});