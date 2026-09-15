"use client";

import { useState } from "react";

import {
    X,
    Users,
    CheckCircle,
} from "lucide-react";

import {
    Community,
} from "@/types/community";

interface JoinCommunityModalProps {

    open: boolean;

    community: Community | null;

    onClose: () => void;

    onJoin: () => Promise<void>;

}

export default function JoinCommunityModal({

    open,

    community,

    onClose,

    onJoin,

}: JoinCommunityModalProps) {

    const [loading, setLoading] =
        useState(false);

    if (!open || !community) {

        return null;

    }

    async function handleJoin() {

        try {

            setLoading(true);

            await onJoin();

        } catch (error) {

            console.error(
                "Join community failed:",
                error
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

            <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#111827]">

                {/* HEADER */}

                <div className="flex items-center justify-between border-b border-white/10 p-5">

                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20">

                            <Users className="h-6 w-6 text-cyan-400" />

                        </div>

                        <div>

                            <h2 className="text-lg font-bold text-white">

                                Join Community

                            </h2>

                            <p className="text-sm text-gray-400">

                                Become a member

                            </p>

                        </div>

                    </div>

                    <button

                        onClick={onClose}

                        className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"

                    >

                        <X className="h-5 w-5" />

                    </button>

                </div>

                {/* BODY */}

                <div className="space-y-6 p-6">

                    <div className="text-center">

                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10">

                            <Users className="h-10 w-10 text-cyan-400" />

                        </div>

                        <h3 className="text-2xl font-bold text-white">

                            {community.name}

                        </h3>

                        <p className="mt-3 text-gray-400">

                            {community.description}

                        </p>

                    </div>

                    <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">

                        <div className="flex items-start gap-3">

                            <CheckCircle className="mt-0.5 h-5 w-5 text-cyan-400" />

                            <div>

                                <p className="font-semibold text-white">

                                    Join this community?

                                </p>

                                <p className="mt-1 text-sm text-gray-400">

                                    You will become a member of the{" "}
                                    <span className="font-semibold text-cyan-400">

                                        {community.name}

                                    </span>{" "}
                                    community and will be able to create posts,
                                    comment, react, and interact with other
                                    members.

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* FOOTER */}

                <div className="flex justify-end gap-3 border-t border-white/10 p-5">

                    <button

                        onClick={onClose}

                        disabled={loading}

                        className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-gray-300 transition hover:bg-white/5"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={handleJoin}

                        disabled={loading}

                        className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:opacity-50"

                    >

                        {loading
                            ? "Joining..."
                            : "Join Community"}

                    </button>

                </div>

            </div>

        </div>

    );

}