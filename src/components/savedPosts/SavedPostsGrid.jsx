import { Bookmark, Images, Loader2 } from "lucide-react";

import PostCard from '../home/PostCard.jsx'
import { memo } from "react";


const SavedPostsGrid = memo(({
    posts = [],
    loading = false,
    onPostClick,
    onUnsave,
}) => {


    if (loading) {
        return (
            <div className="flex w-full h-[70vh] justify-center items-center text-white z-100">
                <Loader2 className="animate-spin" size={30} />
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="flex min-h-[55vh] flex-col items-center justify-center text-center">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-4xl bg-primary/10 text-primary">
                    <Bookmark size={42} strokeWidth={1.5} />

                    <span className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-base-200">
                        <Images size={16} />
                    </span>
                </div>

                <h2 className="mt-6 text-xl font-bold">
                    Nothing saved yet
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-base-content/50">
                    Save posts you love, and they will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="mb-13 lg:mb-8 md:columns-2 *:mb-5">
            {posts.map((post) => (
                <PostCard
                    key={post._id}
                    post={post}
                    onPostClick={onPostClick}
                    onUnsave={onUnsave}
                />
            ))}
        </div>
    );
});

export default SavedPostsGrid;