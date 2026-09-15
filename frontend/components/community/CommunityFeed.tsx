"use client";

import {
    CommunityPost,
} from "@/types/community";

import CommunityPostCard from "./CommunityPostCard";

interface CommunityFeedProps {
    posts: CommunityPost[];

    onLike: (
        postId: number
    ) => Promise<void>;

    onComment: (
        post: CommunityPost
    ) => void;
}

export default function CommunityFeed({
    posts,
    onLike,
    onComment,
}: CommunityFeedProps) {

    return (
        <div className="space-y-4">

            <div className="flex items-center justify-between">

                <h2 className="text-xl font-black text-white">
                    Community Feed
                </h2>

                <span className="text-sm text-gray-500">
                    {posts.length} posts
                </span>

            </div>

            {posts.length === 0 ? (

                <div className="rounded-2xl border border-dashed border-white/10 bg-[#111827] p-10 text-center">

                    <p className="font-semibold text-gray-300">
                        No posts yet.
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        Be the first person to start a conversation.
                    </p>

                </div>

            ) : (

                posts.map((post) => (

                    <CommunityPostCard
    key={post.id}
    post={post}
    onLike={onLike}
    onComment={onComment}
/>

                ))

            )}

        </div>
    );
}