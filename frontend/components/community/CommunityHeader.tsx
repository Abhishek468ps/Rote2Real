"use client";

import {
    Users,
    Search,
    Bell,
} from "lucide-react";

interface CommunityHeaderProps {
    communityName: string;
    memberCount: number;
    onSearch?: () => void;
    onJoin?: () => void;
}

export default function CommunityHeader({
    communityName,
    memberCount,
    onSearch,
    onJoin,
}: CommunityHeaderProps) {

    return (
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                <div>
                    <p className="text-sm font-medium text-cyan-400">
                        Brain Train Community
                    </p>

                    <h1 className="mt-1 text-3xl font-black text-white">
                        {communityName}
                    </h1>

                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
                        <Users className="h-4 w-4" />

                        <span>
                            {memberCount} members
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                   <button
        type="button"
        onClick={onJoin}
        className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-bold text-black hover:bg-cyan-400"
    >
        Join Community
    </button>
                    <button
                        type="button"
                        onClick={onSearch}
                        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                    >
                        <Search className="h-4 w-4" />
                        Search
                    </button>

                    <button
                        type="button"
                        className="rounded-xl border border-white/10 bg-white/5 p-3 text-gray-300 transition hover:bg-white/10"
                    >
                        <Bell className="h-5 w-5" />
                    </button>

                </div>

            </div>

        </div>
    );
}