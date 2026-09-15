export interface Community {
    id: number;
    name: string;
    description: string;
    logo?: string;
    active: boolean;
    createdAt: string;
}

export interface User {
    id: number;
    fullName: string;
    email: string;
    phone?: string;
    role: string;
    braintrainId?: string;
    profileImage?: string;
    wallet?: number;
    xp?: number;
}

/*
export interface CommunityMember {
    id: number;
    userId: number;
    fullName: string;
    email: string;
    profileImage?: string | null;
    role: string;
    joinedAt: string;
    admin: boolean;
}*/


/*
export interface CommunityMember {
    id: number;
    community: Community;
    user: User;
    joinedAt: string;
    admin: boolean;
}*/

export interface CommunityMember {
    id: number;
    userId: number;
    fullName: string;
    email: string;
    braintrainId: string;
    profileImage?: string | null;
    role: string;
    admin: boolean;
    online: boolean;
    joinedAt: string;
}

/*
export interface CommunityPost {
    id: number;
    community: Community;
    author: User;
    content: string;
    createdAt: string;
}*/

export interface CommunityPost {
    id: number;
    content: string;
    authorId: number;
    authorName: string;
    authorImage?: string | null;
    authorRole?: string;
    authorBraintrainId?: string;
    createdAt: string;
}




export interface CommunityCommentResponse {

    id:number;

    postId:number;

    userId:number;

     fullName: string;
    profileImage: string | null;
    role: string;
    braintrainId: string;
    message: string;
    createdAt: string;

}

export interface CommunityReactionResponse {
    id: number;
    postId: number;
    userId: number;
    reaction: string;
    active: boolean;
}