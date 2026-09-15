/*"use client";

import {
    Heart,
    MessageCircle,
    Share2,
    MoreHorizontal,
} from "lucide-react";

import {
    CommunityPost,
} from "@/types/community";

interface CommunityPostCardProps {
    post: CommunityPost;
    onLike: (
        postId: number
    ) => Promise<void>;
}

export default function CommunityPostCard({
    post,
    onLike,
}: CommunityPostCardProps) {

    const initials =
        post.author?.fullName
            ?.split(" ")
            .map((name) => name[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "BT";

    return (
        <article className="rounded-2xl border border-white/10 bg-[#111827] p-5">

           

            <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-cyan-500 font-bold text-black">

                        {post.author?.profileImage ? (
                            <img
                                src={post.author.profileImage}
                                alt={post.author.fullName}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            initials
                        )}

                    </div>

                    <div>

                        <h3 className="font-bold text-white">
                            {post.author?.fullName || "User"}
                        </h3>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">

                            <span>
                                {post.author?.role || "MEMBER"}
                            </span>

                            <span>•</span>

                            <span>
                                {post.author?.braintrainId || "Brain Train Member"}
                            </span>

                            <span>•</span>

                            <span>
                                {new Date(
                                    post.createdAt
                                ).toLocaleString()}
                            </span>

                        </div>

                    </div>

                </div>

                <button
                    type="button"
                    className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
                >
                    <MoreHorizontal className="h-5 w-5" />
                </button>

            </div>

          

            <div className="mt-5 whitespace-pre-wrap text-sm leading-7 text-gray-200">
                {post.content}
            </div>

            

            <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4">

                <button
                    type="button"
                    onClick={() =>
                        onLike(post.id)
                    }
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-400 transition hover:bg-white/5 hover:text-red-400"
                >
                    <Heart className="h-4 w-4" />
                    Like
                </button>

                <button
                    type="button"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-400 transition hover:bg-white/5 hover:text-cyan-400"
                >
                    <MessageCircle className="h-4 w-4" />
                    Comment
                </button>

                <button
                    type="button"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-400 transition hover:bg-white/5 hover:text-green-400"
                >
                    <Share2 className="h-4 w-4" />
                    Share
                </button>

            </div>

        </article>
    );
}*/

"use client";

import {
    Heart,
    MessageCircle,
    Share2,
    MoreHorizontal,
} from "lucide-react";

import {
    CommunityPost,
} from "@/types/community";

import {
    useState,
} from "react";

interface CommunityPostCardProps {
    post: CommunityPost;

    onLike: (
        postId: number
    ) => Promise<void>;

    onComment: (
        post: CommunityPost
    )=>void;
}

export default function CommunityPostCard({
    post,
    onLike,
    onComment,
}: CommunityPostCardProps) {

    const [liked, setLiked] =
    useState(false);

const [likeLoading, setLikeLoading] =
    useState(false);

    const initials =
        post.authorName
            ?.split(" ")
            .map((name) => name[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "BT";

        const handleLikeClick = async () => {

        if (likeLoading) {
            return;
        }

        try {

            setLikeLoading(true);

            await onLike(post.id);

            setLiked(
                previous => !previous
            );

        } catch (error) {

            console.error(
                "Like failed:",
                error
            );

        } finally {

            setLikeLoading(false);
        }
    };        

    return (
        <article className="rounded-2xl border border-white/10 bg-[#111827] p-5">

            {/* AUTHOR */}

            <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                    {/* PROFILE IMAGE */}

                    <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-cyan-500 font-bold text-black">

                        {post.authorImage ? (
                            <img
                                src={post.authorImage}
                                alt={post.authorName}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            initials
                        )}

                    </div>

                    {/* USER DETAILS */}

                    <div>

                        <h3 className="font-bold text-white">
                            {post.authorName || "User"}
                        </h3>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">

                            <span>
                                {post.authorRole || "MEMBER"}
                            </span>

                            <span>•</span>

                            <span>
                                {post.authorBraintrainId || "Brain Train Member"}
                            </span>

                            <span>•</span>

                            <span>
                                {new Date(
                                    post.createdAt
                                ).toLocaleString()}
                            </span>

                        </div>

                    </div>

                </div>

                {/* MORE */}

                <button
                    type="button"
                    className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
                >
                    <MoreHorizontal className="h-5 w-5" />
                </button>

            </div>

            {/* CONTENT */}

            <div className="mt-5 whitespace-pre-wrap text-sm leading-7 text-gray-200">
                {post.content}
            </div>

            {/* ACTIONS */}

            <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4">

                <button
    type="button"
    onClick={handleLikeClick}
    disabled={likeLoading}
    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
        liked
            ? "text-red-400"
            : "text-gray-400 hover:bg-white/5 hover:text-red-400"
    }`}
>
    <Heart
        className="h-4 w-4"
        fill={
            liked
                ? "currentColor"
                : "none"
        }
    />

    {liked ? "Liked" : "Like"}
</button>

                <button
    type="button"
    onClick={() => onComment(post)}
    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-400 transition hover:bg-white/5 hover:text-cyan-400"
>
    <MessageCircle className="h-4 w-4" />

    Comment
</button>

                <button
                    type="button"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-400 transition hover:bg-white/5 hover:text-green-400"
                >
                    <Share2 className="h-4 w-4" />
                    Share
                </button>

            </div>

        </article>
    );
}