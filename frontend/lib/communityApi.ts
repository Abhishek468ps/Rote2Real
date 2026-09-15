import {
    Community,
    CommunityCommentResponse,
    CommunityMember,
    CommunityPost,
    CommunityReactionResponse,
   
} from "@/types/community";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

function getToken(): string | null {
    if (typeof window === "undefined") {
        return null;
    }

    return localStorage.getItem("token");
}

async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {

    const token = getToken();
    console.log("Community API token:", token);
    console.log(
        "Community API endpoint:",
        `${API_BASE_URL}${endpoint}`
    );
    const headers = new Headers(options.headers);

    headers.set("Content-Type", "application/json");

    if (token) {
        headers.set(
            "Authorization",
            `Bearer ${token}`
        );
    }

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            ...options,
            headers,
        }
    );

    if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
            errorText || `Request failed: ${response.status}`
        );
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json();
}


/* ================================
   GET COMMUNITIES
================================ */

export async function getCommunities(): Promise<Community[]> {

    return apiRequest<Community[]>(
        "/community"
    );
}


/* ================================
   JOIN COMMUNITY
================================ */

export async function joinCommunity(
    communityId: number
): Promise<CommunityMember> {

    return apiRequest<CommunityMember>(
        `/community/join?communityId=${communityId}`,
        {
            method: "POST",
        }
    );
}


/* ================================
   GET FEED
================================ */

export async function getCommunityFeed(
    communityId: number
): Promise<CommunityPost[]> {

    return apiRequest<CommunityPost[]>(
        `/community/feed?communityId=${communityId}`
    );
}


/* ================================
   CREATE POST
================================ */

export async function createCommunityPost(
    communityId: number,
    content: string
): Promise<CommunityPost> {

    return apiRequest<CommunityPost>(
        `/community/post?communityId=${communityId}&content=${encodeURIComponent(content)}`,
        {
            method: "POST",
        }
    );
}


/* ================================
   COMMENT
================================ */

export async function createComment(
    postId: number,
    message: string
): Promise<CommunityCommentResponse> {

    return apiRequest<CommunityCommentResponse>(
        `/community/comment?postId=${postId}&message=${encodeURIComponent(message)}`,
        {
            method: "POST",
        }
    );
}



export async function getComments(
    postId: number
): Promise<CommunityCommentResponse[]> {

    return apiRequest<CommunityCommentResponse[]>(
        `/community/comments?postId=${postId}`
    );

}


/* ================================
   REACTION
================================ */

export async function reactToPost(
    postId: number,
    reaction: string
): Promise<CommunityReactionResponse> {

    return apiRequest<CommunityReactionResponse>(
        `/community/reaction?postId=${postId}&reaction=${encodeURIComponent(reaction)}`,
        {
            method: "POST",
        }
    );
}


/* ================================
   MEMBERS
================================ */

export async function getCommunityMembers(
    communityId: number
): Promise<CommunityMember[]> {

    return apiRequest<CommunityMember[]>(
        `/community/members?communityId=${communityId}`
    );
}