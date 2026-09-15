/*"use client";

import {
    CommunityMember,
} from "@/types/community";

interface MembersOnlineProps {
    members: CommunityMember[];
}

export default function MembersOnline({
    members,
}: MembersOnlineProps) {

    const visibleMembers =
        members.slice(0, 8);

    return (
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

            <div className="mb-4 flex items-center justify-between">

                <h2 className="font-bold text-white">
                    Members Online
                </h2>

                <span className="text-xs text-gray-500">
                    {members.length} members
                </span>

            </div>

            <div className="space-y-3">

                {visibleMembers.map(
                    (member) => {

                        const initials =
                           member.fullName
                                ?.split(" ")
                                .map(
                                    (name) =>
                                        name[0]
                                )
                                .join("")
                                .slice(0, 2)
                                .toUpperCase();

                        return (

                            <div
                                key={member.id}
                                className="flex items-center gap-3"
                            >

                                <div className="relative">

                                    <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-cyan-500 text-xs font-bold text-black">

                                        {member.profileImage ? (

                                            <img
                                                src={
                                                    member.profileImage
                                                }
                                                alt={
                                                    member.fullName
                                                }
                                                className="h-full w-full object-cover"
                                            />

                                        ) : (
                                            initials
                                        )}

                                    </div>

                                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#111827] bg-green-500" />

                                </div>

                                <div className="min-w-0">

                                    <p className="truncate text-sm font-semibold text-white">
                                        {member.fullName}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {member.role}
                                    </p>

                                </div>

                            </div>

                        );
                    }
                )}

            </div>

        </div>
    );
}*/

"use client";

import {
    CommunityMember,
} from "@/types/community";

interface MembersOnlineProps {
    members: CommunityMember[];
}

export default function MembersOnline({
    members,
}: MembersOnlineProps) {

    const onlineMembers = members
        .filter((member) => member?.online)
        .slice(0, 8);

    return (
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

            <div className="mb-4 flex items-center justify-between">

                <h2 className="font-bold text-white">
                    Members Online
                </h2>

                <span className="text-xs text-gray-500">
                   {onlineMembers.length} online
                </span>

            </div>

            <div className="space-y-3">

                {onlineMembers.map((member) => {

                    

                    const fullName =
    member.fullName?.trim() || "User";

                    const initials =
                        fullName
                            .split(/\s+/)
                            .filter(Boolean)
                            .map((name) => name[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase();

                    return (

                        <div
                            key={member.id}
                            className="flex items-center gap-3"
                        >

                            {/* PROFILE IMAGE */}
                            <div className="relative">

                                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-cyan-500 text-xs font-bold text-black">

                                   {member.profileImage ? (

                                        <img
                                           src={member.profileImage}
                                            alt={fullName}
                                            className="h-full w-full object-cover"
                                        />

                                    ) : (

                                        <span>
                                            {initials}
                                        </span>

                                    )}

                                </div>

                                {/* ONLINE DOT */}
                                <span
                                    className="
                                        absolute
                                        bottom-0
                                        right-0
                                        h-2.5
                                        w-2.5
                                        rounded-full
                                        border-2
                                        border-[#111827]
                                        bg-green-500
                                    "
                                />

                            </div>

                            {/* USER DETAILS */}
                            <div className="min-w-0">

                                <p className="truncate text-sm font-semibold text-white">
                                   {member.fullName}
                                </p>

                                <p className="text-xs text-gray-500">
                                    {member?.role || "MEMBER"}
                                </p>

                            </div>

                        </div>

                    );
                })}

            </div>

        </div>
    );
}