"use client";

import {
    useState,
    useEffect,
} from "react";

import {
    X,
    Send,
} from "lucide-react";

import {
    CommunityCommentResponse,
    CommunityPost,
} from "@/types/community";

interface CommentModalProps {

    open: boolean;

    post: CommunityPost | null;

    comments: CommunityCommentResponse[];

    onClose: () => void;

    onSubmit: (
        message: string
    ) => Promise<void>;

}

export default function CommentModal({

    open,

    post,

    comments,

    onClose,

    onSubmit,

}: CommentModalProps) {

    const [message, setMessage] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {

        if (open) {

            setMessage("");

        }

    }, [open]);

    if (!open || !post) {

        return null;

    }

    async function handleSubmit() {

        if (
            message.trim() === ""
        ) {

            return;

        }

        try {

            setLoading(true);

            await onSubmit(
                message
            );

            setMessage("");

        } catch (error) {

            console.error(
                "Comment failed:",
                error
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

            <div className="flex h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111827]">

                {/* HEADER */}

                <div className="flex items-center justify-between border-b border-white/10 p-5">

                    <div>

                        <h2 className="text-lg font-bold text-white">

                            Comments

                        </h2>

                        <p className="text-sm text-gray-400">

                            {post.authorName}

                        </p>

                    </div>

                    <button

                        onClick={onClose}

                        className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"

                    >

                        <X className="h-5 w-5" />

                    </button>

                </div>

                {/* POST */}

                <div className="border-b border-white/10 p-5">

                    <div className="text-sm font-semibold text-white">

                        {post.authorName}

                    </div>

                    <div className="mt-2 whitespace-pre-wrap text-gray-300">

                        {post.content}

                    </div>

                </div>

                {/* COMMENTS */}

                <div className="flex-1 overflow-y-auto p-5 space-y-4">

                    {comments.length === 0 ? (

                        <div className="text-center text-gray-500">

                            No comments yet.

                        </div>

                    ) : (

                        comments.map((comment) => (

                            <div

                                key={comment.id}

                                className="rounded-xl border border-white/10 bg-[#1f2937] p-4"

                            >

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 font-bold text-black">

                                        {comment.profileImage ? (

                                            <img

                                                src={comment.profileImage}
        alt={comment.fullName}

                                                className="h-full w-full rounded-full object-cover"

                                            />

                                        ) : (

                                           (comment.fullName || "Unknown User")

                                                .split(" ")

                                                .map(

                                                    item => item[0]

                                                )
                                                .join("")
                                                .slice(0, 2)
                                                .toUpperCase()

                                        )}

                                    </div>

                                    <div>

                                        <div className="font-semibold text-white">

                                            {comment.fullName}

                                        </div>

                                        <div className="text-xs text-gray-400">

                                           {comment.role}

                                        </div>

                                    </div>

                                </div>

                                <div className="mt-3 whitespace-pre-wrap text-sm text-gray-300">

                                    {comment.message}

                                </div>

                                <div className="mt-2 text-xs text-gray-500">

                                    {new Date(
                                        comment.createdAt
                                    ).toLocaleString()}

                                </div>

                            </div>

                        ))

                    )}

                </div>

                {/* FOOTER */}

                <div className="border-t border-white/10 p-5">

                    <div className="flex gap-3">

                        <input

                            type="text"

                            value={message}

                            onChange={(e) =>

                                setMessage(

                                    e.target.value

                                )

                            }

                            onKeyDown={(e) => {

                                if (

                                    e.key === "Enter"

                                ) {

                                    handleSubmit();

                                }

                            }}

                            placeholder="Write a comment..."

                            className="flex-1 rounded-xl border border-white/10 bg-[#1f2937] px-4 py-3 text-white outline-none"

                        />

                        <button

                            onClick={handleSubmit}

                            disabled={loading}

                            className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:opacity-50"

                        >

                            <Send className="h-4 w-4" />

                            Post

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}