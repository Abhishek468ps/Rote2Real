"use client";

import {
    Hash,
    Users,
    Trophy,
    Code2,
    Brain,
    BriefcaseBusiness,
    Newspaper,
} from "lucide-react";



import { Community } from "@/types/community";

interface CommunitySidebarProps {
    communities: Community[];
    selectedCommunity: Community | null;
    onSelect: (community: Community) => void;
}

export default function CommunitySidebar({
    communities,
    selectedCommunity,
    onSelect,
}: CommunitySidebarProps){

    return (
        <aside className="space-y-5">

            {/* COMMUNITIES */}

            <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

                <div className="mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-cyan-400" />

                    <h2 className="font-bold text-white">
                        Communities
                    </h2>
                </div>

                <div className="space-y-1">

                  {communities.map((community) => (
                        <button
                            key={community.id}
                            type="button"
                            onClick={() => onSelect(community)}
                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                                selectedCommunity?.id === community.id
                                     ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                            <Hash className="h-4 w-4" />

                            {community.name}
                        </button>

                        )
                    )}

                </div>

            </div>

            {/* TRENDING */}

            <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

                <div className="mb-4 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-400" />

                    <h2 className="font-bold text-white">
                        Trending Tags
                    </h2>
                </div>

                <div className="flex flex-wrap gap-2">

                    {[
                        "#Java",
                        "#AI",
                        "#SpringBoot",
                        "#React",
                        "#DSA",
                        "#Placements",
                    ].map(
                        (tag) => (

                            <span
                                key={tag}
                                className="rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300"
                            >
                                {tag}
                            </span>

                        )
                    )}

                </div>

            </div>

            {/* QUICK LINKS */}

            <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

                <h2 className="mb-4 font-bold text-white">
                    Explore
                </h2>

                <div className="space-y-2 text-sm text-gray-400">

                    <div className="flex items-center gap-3">
                        <Code2 className="h-4 w-4" />
                        Projects
                    </div>

                    <div className="flex items-center gap-3">
                        <Brain className="h-4 w-4" />
                        Challenges
                    </div>

                    <div className="flex items-center gap-3">
                        <BriefcaseBusiness className="h-4 w-4" />
                        Placements
                    </div>

                    <div className="flex items-center gap-3">
                        <Newspaper className="h-4 w-4" />
                        News
                    </div>

                </div>

            </div>

        </aside>
    );
}