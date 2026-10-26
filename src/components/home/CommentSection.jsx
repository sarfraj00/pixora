
import { memo, useState } from "react";
import {
  MessageCircle,
  Send,
  X,
  Loader2,
  Edit2,
  Trash2,
  Save,
} from "lucide-react";
import defaultAvatar from "../../assets/images/defaultAvatar.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { api } from "../../config/axios";
import {
  setComments,
  setCurrentPostData,
  setOpenCommentSection,
} from "../../redux/features/userSlice";
import { formatPostTime } from "../../utils/formattedTime";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "./ConfirmDeleteModel";
import { useDeletion } from "../../custom_hook/deletion.js";

const CommentSection = memo(({ currentUser }) => {
  const currentPostData = useSelector((state) => state.currentPostData);
  const [comment, setComment] = useState("");
  const postComments = useSelector((state) => state.comments);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    isOpen,
    onOpen,
    onClose,
    loading,
    onCommentDelete,
    isEditCommentOpen,
    oneditCommentOpen,
    onEditCommentClose,
    onEditSave,
  } = useDeletion();

  const [sendLoader, setSendLoader] = useState(false);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment) return;
    setSendLoader(true);

    try {
      const res = await api.post("/comment/create-post-comment", {
        comment,
        authorId: currentUser?._id,
        postId: currentPostData?._id,
        postUrl: currentPostData?.postUrl,
        authorUserName: currentUser?.userName,
        postCreatorId: currentPostData?.userId?._id,
      });

      if (res.status === 201) {
        try {
          const res = await api.get(
            `/post/get-post-comments?postId=${currentPostData?._id}`
          );

          if (res.status === 200) {
            dispatch(setComments(res?.data?.comments));
          }
        } catch (err) {
          toast.error("somthing went wrong! please try again.");
          return;
        }
      }
    } catch (err) {
      toast.error("somthing went wrong! please try again.");
    } finally {
      setComment("");
      setSendLoader(false);
    }
  };

  return (
    <main className="fixed inset-0 z-100 flex items-center justify-center bg-black/5 p-0 backdrop-blur-sm sm:p-4 sm:mt-2 ">
      <section
        className="
          relative flex w-full flex-col overflow-hidden h-[70vh]
          border border-white/10 bg-black/70 text-white shadow-2xl
        sm:h-[min(75vh,720px)] sm:max-w-xl sm:rounded-2xl
          md:max-w-2xl
          lg:max-w-3xl
        "
      >
      
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-black/80 px-4 py-3 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-bold sm:text-lg">
                Comments
              </h2>

              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-gray-200 sm:text-sm">
                {postComments?.length ?? 0}
              </span>
            </div>

            <p className="mt-1 text-xs text-gray-400 sm:text-sm">
              Join the conversation
            </p>
          </div>

          <button
            type="button"
            aria-label="Close comments"
            onClick={() => {
              dispatch(setComments(null));
              dispatch(setOpenCommentSection(false));
              dispatch(setCurrentPostData(null));
            }}
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-gray-300 transition hover:bg-white/10 hover:text-white sm:size-10"
          >
            <X size={22} />
          </button>
        </header>

        {/* Scrollable Comments */}
        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-none p-3 sm:p-5">
          {postComments === null && (
            <div className="flex min-h-60 items-center justify-center">
              <Loader2
                size={30}
                className="animate-spin text-primary"
              />
            </div>
          )}

          {postComments?.length === 0 && (
            <div className="flex min-h-60 flex-col items-center justify-center px-4 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 sm:size-20">
                <MessageCircle
                  size={30}
                  className="text-primary"
                />
              </div>

              <h3 className="mt-4 text-base font-semibold sm:text-lg">
                No comments yet
              </h3>

              <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-400">
                Start the conversation. Share what you think!
              </p>
            </div>
          )}

          {postComments?.length > 0 && (
            <div className="space-y-2 sm:space-y-3">
              {postComments.map((comment) => (
                <article
                  key={comment._id}
                  className="flex min-w-0 gap-2.5 sm:gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="rounded-2xl rounded-tl-sm border border-white/5 bg-white/6 px-3 py-1 sm:px-4">
                     
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div
                          className="flex min-w-0 flex-1 cursor-pointer items-center gap-2.5"
                          onClick={() => {
                            if (
                              currentUser?._id === comment?.author?._id
                            ) {
                              navigate("/profile");
                              return;
                            }

                            navigate(
                              `/user/${comment?.author?.userName}`
                            );
                          }}
                        >
                          <img
                            src={
                              comment?.author?.profile?.avatarUrl ||
                              defaultAvatar
                            }
                            alt={
                              comment.author?.userName || "User"
                            }
                            className="size-9 shrink-0 rounded-full object-cover ring-1 ring-white/10 sm:size-10"
                          />

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-white">
                              @{comment.author?.userName || "Unknown user"}
                            </p>

                            <p className="mt-0.5 text-[11px] text-gray-400 sm:text-xs">
                              {formatPostTime(comment?.createdAt)}
                            </p>
                          </div>
                        </div>

                      
                        {comment?.author?._id === currentUser?._id &&
                          !isEditCommentOpen && (
                            <div className="flex shrink-0 items-center gap-1">
                              <button
                                type="button"
                                aria-label="Edit comment"
                                disabled={isEditCommentOpen}
                                onClick={() => {
                                  setComment(comment?.text);
                                  oneditCommentOpen(
                                    comment?._id,
                                    comment?.text
                                  );
                                }}
                                className="flex size-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-green-500/10 hover:text-green-400 disabled:opacity-50 sm:size-9"
                              >
                                <Edit2 size={17} />
                              </button>

                              <button
                                type="button"
                                aria-label="Delete comment"
                                disabled={isEditCommentOpen}
                                onClick={() => onOpen(comment?._id)}
                                className="flex size-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50 sm:size-9"
                              >
                                <Trash2 size={17} />
                              </button>
                            </div>
                          )}
                      </div>

                 
                      <p className="mt-2 whitespace-pre-wrap wrap-break-word pl-0 text-sm leading-relaxed text-gray-200 sm:pl-12.5 sm:text-[15px]">
                        {comment?.text}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

     
        {isEditCommentOpen ? (
          <div className="shrink-0 border-t border-white/10 bg-black/90">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!comment) return;
                await onEditSave(comment);
                setComment("");
              }}
              className="p-3 sm:p-4"
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <img
                  src={
                    currentUser?.profile?.avatarUrl || defaultAvatar
                  }
                  alt="Your avatar"
                  className="size-9 shrink-0 rounded-full object-cover sm:size-10"
                />

                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-white/10 bg-white/6 px-3 transition focus-within:border-primary/60">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Edit your comment..."
                    maxLength={1000}
                    className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-gray-500"
                  />

                  <button
                    type="submit"
                    aria-label="Save edited comment"
                    disabled={loading || !comment.trim()}
                    className="flex size-9 shrink-0 items-center justify-center rounded-full text-primary transition hover:bg-primary/10 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 size={19} className="animate-spin" />
                    ) : (
                      <Save size={19} />
                    )}
                  </button>
                </div>
              </div>

              <p className="mt-2 text-right text-xs text-gray-500">
                {comment.length}/1000
              </p>
            </form>

            <div className="pb-3 text-center sm:pb-4">
              <button
                type="button"
                onClick={() => {
                  setComment("");
                  onEditCommentClose();
                }}
                className="rounded-lg px-4 py-1.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
              >
                Cancel editing
              </button>
            </div>
          </div>
        ) : (
        
          <form
            onSubmit={handleAddComment}
            className="shrink-0 border-t border-white/10 bg-black/90 p-3 sm:p-4"
          >
            <div className="flex items-center gap-2.5 sm:gap-3">
              <img
                src={
                  currentUser?.profile?.avatarUrl || defaultAvatar
                }
                alt="Your avatar"
                className="size-9 shrink-0 rounded-full object-cover sm:size-10"
              />

              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-white/10 bg-white/6 px-3 transition focus-within:border-primary/60 focus-within:bg-white/8">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  maxLength={1000}
                  className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-gray-500"
                />

                <button
                  type="submit"
                  aria-label="Send comment"
                  disabled={sendLoader || !comment.trim()}
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-content transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {sendLoader ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={17} />
                  )}
                </button>
              </div>
            </div>

            <p className="mt-2 text-right text-xs text-gray-500">
              {comment.length}/1000
            </p>
          </form>
        )}

        <ConfirmDeleteModal
          isOpen={isOpen}
          onClose={onClose}
          title="Delete this comment?"
          message="This action cannot be undone. The comment will be permanently removed from this post."
          loading={loading}
          onConfirm={onCommentDelete}
        />
      </section>
    </main>
  );
});

export default CommentSection;