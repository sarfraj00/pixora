
import { Bookmark } from "lucide-react";


const SavedPostsHeader = ({ count = 0 }) => {

    return (
        <main>
           
            <header className="mb-8 flex items-center gap-4 mt-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary text-violet-500 ">
                    <Bookmark size={27} />
                </div>

                <div>
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-violet-500">
                        Saved Posts
                    </h1>

                    <p className="mt-1 text-sm text-base-content/50">
                        Your favorite moments, all in one place.
                    </p>
                </div>

                <span className="ml-auto hidden rounded-full bg-base-200 px-4 py-2 text-sm font-semibold sm:block">
                    {count} {count === 1 ? "post" : "posts"}
                </span>
            </header>
        </main>

    );
};

export default SavedPostsHeader;