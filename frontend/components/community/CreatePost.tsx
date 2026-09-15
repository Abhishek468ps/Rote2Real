"use client";

import {
    Image,
    FileText,
    Send,
} from "lucide-react";
import {
    useState,
} from "react";

interface CreatePostProps {
    onPostCreated: (content: string) => Promise<void>;
}

export default function CreatePost({
    onPostCreated,
}: CreatePostProps) {

    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {

        if (!content.trim()) {
            return;
        }

        try {

            setLoading(true);

            await onPostCreated(
                content.trim()
            );

            setContent("");

        } catch (error) {

            console.error(
                "Post creation failed:",
                error
            );

        } finally {

            setLoading(false);

        }
    }

    return (
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

            <div className="mb-4">
                <h2 className="text-lg font-bold text-white">
                    Create Post
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                    Share something with the community.
                </p>
            </div>

            <textarea
                value={content}
                onChange={(event) =>
                    setContent(event.target.value)
                }
                placeholder="What's on your mind?"
                rows={5}
                className="w-full resize-none rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-cyan-500"
            />

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex gap-2">

                    <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 transition hover:bg-white/5"
                    >
                        <Image className="h-4 w-4" />
                        Attach Image
                    </button>

                    <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 transition hover:bg-white/5"
                    >
                        <FileText className="h-4 w-4" />
                        Attach PDF
                    </button>

                </div>

                <button
                    type="button"
                    disabled={
                        loading ||
                        !content.trim()
                    }
                    onClick={handleSubmit}
                    className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Send className="h-4 w-4" />

                    {loading
                        ? "Posting..."
                        : "Post"}
                </button>

            </div>

        </div>
    );
}