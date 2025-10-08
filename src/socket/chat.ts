export interface User {
    id: number;
    firstName: string;
    lastName: string;
    countryCode: string;
    contactNo: string;
    profileImage?: string;
    created_at: string;
    updated_at: string;
    status: string;
}

export interface Chat {
    id: number;
    friendId: number;
    friendName: string;
    lastMessage: string;
    lastTimeStamp: string;
    unreadCount: number;
    profileImage: string;
    from: User;
    to: User;
    created_at: string;
    updated_at: string;
    status: string;
    message: string;
}

export interface WSRequest {
    type: string;
    fromUserId?: number;
    toUserId?: number;
    message?: string;
}

export interface WSResponse {
    type: string;
    payload: any;
}