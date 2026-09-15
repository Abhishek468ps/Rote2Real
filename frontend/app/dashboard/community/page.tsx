"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    Community,
    CommunityMember,
    CommunityPost,
    CommunityCommentResponse,
} from "@/types/community";

import {
    createCommunityPost,
    getCommunities,
    getCommunityFeed,
    getCommunityMembers,
    joinCommunity,
    reactToPost,
    getComments,
    createComment,
} from "@/lib/communityApi";

import CommunityHeader from "@/components/community/CommunityHeader";
import CreatePost from "@/components/community/CreatePost";
import CommunityFeed from "@/components/community/CommunityFeed";
import CommunitySidebar from "@/components/community/CommunitySidebar";
import MembersOnline from "@/components/community/MembersOnline";
import CommentModal from "@/components/community/CommentModal";
import JoinCommunityModal from "@/components/community/JoinCommunityModal";

export default function CommunityPage() {

    const [communities, setCommunities] =
        useState<Community[]>([]);

    const [selectedCommunity, setSelectedCommunity] =
        useState<Community | null>(null);


    const [pendingCommunity,setPendingCommunity] = 
    useState<Community | null>(null);

    const [posts, setPosts] =
        useState<CommunityPost[]>([]);

    const [members, setMembers] =
        useState<CommunityMember[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    const [
    selectedPost,
    setSelectedPost,
] = useState<CommunityPost | null>(
    null
);

const [
    comments,
    setComments,
] = useState<
    CommunityCommentResponse[]
>([]);

const [
    commentModalOpen,
    setCommentModalOpen,
] = useState(false);    


    /* ================================
       LOAD COMMUNITIES
    ================================= */

    useEffect(() => {

        async function loadCommunities() {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await getCommunities();

                setCommunities(data);

                if (data.length > 0) {

                    setSelectedCommunity(
                        data[0]
                    );

                }

            } catch (error) {

                console.error(error);

                setError(
                    "Unable to load communities."
                );

            } finally {

                setLoading(false);

            }

        }

        loadCommunities();

    }, []);


    /* ================================
       LOAD FEED + MEMBERS
    ================================= */

   useEffect(() => {

    if (!selectedCommunity) {
        return;
    }

                const communityId = selectedCommunity.id;

    async function loadCommunityData() {

        try {

            setLoading(true);
            setError(null);


            const [
                feedData,
                memberData,
            ] = await Promise.all([
                getCommunityFeed(communityId),
                getCommunityMembers(communityId),
            ]);

            setPosts(feedData);
            setMembers(memberData);

        } catch (error) {

            console.error(error);

            setError(
                "Unable to load community data."
            );

        } finally {

            setLoading(false);

        }

    }

    loadCommunityData();

}, [selectedCommunity]);


    /* ================================
       CREATE POST
    ================================= */

  async function handleCreatePost(
    content: string
) {

    if (!selectedCommunity) {
        return;
    }

    try {

        setError(null);

        const newPost =
            await createCommunityPost(
                selectedCommunity.id,
                content
            );

        setPosts((current) => [
            newPost,
            ...current,
        ]);

    } catch (error) {

        console.error(
            "Create post failed:",
            error
        );

        setError(
            "Unable to create post."
        );

    }

}


    /* ================================
       LIKE POST
    ================================= */

   async function handleLike(
    postId: number
) {

    try {

        const result =
            await reactToPost(
                postId,
                "LIKE"
            );

        console.log(
            "Reaction response:",
            result
        );

    } catch (error) {

        console.error(
            "Reaction failed:",
            error
        );

        throw error;
    }

}

async function handleOpenComments(
    post: CommunityPost
) {

    try {

        setSelectedPost(post);

        const data =
            await getComments(
                post.id
            );

        setComments(data);

        setCommentModalOpen(true);

    } catch (error) {

        console.error(
            "Load comments failed:",
            error
        );

    }

}

async function handleCreateComment(
    message: string
) {

    if (!selectedPost) {

        return;

    }

    try {

        const comment =
            await createComment(

                selectedPost.id,

                message

            );

        setComments(

            current => [

                ...current,

                comment

            ]

        );

    } catch (error) {

        console.error(

            "Create comment failed:",

            error

        );

    }

}


    /* ================================
       JOIN COMMUNITY
    ================================= */

    async function handleJoinCommunity() {

        if (!pendingCommunity) {
        return;
    }

        try {

            setError(null);

        const member = await joinCommunity(
            pendingCommunity.id
        );

            setMembers((current) => {

                const alreadyExists =
                    current.some(
                        (item) =>
                            item.userId ===
            member.userId
                    );

                if (alreadyExists) {
                    return current;
                }

                return [
                    ...current,
                    member,
                ];

            });

            setSelectedCommunity(pendingCommunity);

        setPendingCommunity(null);

        } catch (error) {

            console.error(
                "Join community failed:",
                error
            );

        }

    }


    /* ================================
       LOADING
    ================================= */

    if (loading && !selectedCommunity) {

        return (
            <div className="flex min-h-[500px] items-center justify-center">

                <div className="text-sm text-gray-400">
                    Loading community...
                </div>

            </div>
        );

    }


    /* ================================
       ERROR
    ================================= */

    if (error && !selectedCommunity) {

        return (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center">

                <p className="font-semibold text-red-400">
                    {error}
                </p>

            </div>
        );

    }


    /* ================================
       NO COMMUNITY
    ================================= */

    if (!selectedCommunity) {

        return (
            <div className="rounded-2xl border border-white/10 bg-[#111827] p-10 text-center">

                <h2 className="text-xl font-bold text-white">
                    No community available
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                    Please create a community first.
                </p>

            </div>
        );

    }


    return (
<>
        <div className="space-y-6">

            {/* HEADER */}

            <CommunityHeader
                communityName={
                    selectedCommunity.name
                }
                memberCount={
                    members.length
                }
                onJoin={handleJoinCommunity}
            />


            {/* COMMUNITY SELECTOR */}

            {communities.length > 1 && (

                <div className="flex gap-2 overflow-x-auto pb-1">

                    {communities.map(
                        (community) => (

                            <button
                                key={community.id}
                                type="button"
                                onClick={() =>
                                    setSelectedCommunity(
                                        community
                                    )
                                }
                                className={`
                                    whitespace-nowrap
                                    rounded-xl
                                    border
                                    px-4
                                    py-2
                                    text-sm
                                    font-semibold
                                    transition
                                    ${
                                        selectedCommunity.id ===
                                        community.id
                                            ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                                            : "border-white/10 bg-white/5 text-gray-400 hover:text-white"
                                    }
                                `}
                            >
                                {community.name}
                            </button>

                        )
                    )}

                </div>

            )}


            {/* MAIN GRID */}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">

                {/* MAIN CONTENT */}

                <main className="space-y-6">

                    {/* CREATE POST */}

                    <CreatePost
                        onPostCreated={
                            handleCreatePost
                        }
                    />

                    {/* FEED */}

                    {loading ? (

                        <div className="rounded-2xl border border-white/10 bg-[#111827] p-8 text-center text-sm text-gray-400">
                            Loading feed...
                        </div>

                    ) : (

                        <CommunityFeed
    posts={posts}
    onLike={handleLike}
    onComment={handleOpenComments}
/>

                    )}

                </main>


                {/* SIDEBAR */}

                <aside className="space-y-6">

                    <MembersOnline
                        members={members}
                    />

                    <CommunitySidebar
    communities={communities}
    selectedCommunity={selectedCommunity}
    onSelect={setSelectedCommunity}
/>

                </aside>

            </div>

        </div>

        <CommentModal

            open={commentModalOpen}

            post={selectedPost}

            comments={comments}

            onClose={() => {

                setCommentModalOpen(false);

                setSelectedPost(null);

            }}

            onSubmit={handleCreateComment}

        />

        <JoinCommunityModal

    open={pendingCommunity !== null}

    community={pendingCommunity}

    onClose={() => setPendingCommunity(null)}

    onJoin={handleJoinCommunity}

/>
        </>
    );
}