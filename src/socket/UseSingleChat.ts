import { useEffect, useState } from "react";
import { Chat, User, WSResponse } from "./chat";
import { useWebSocket } from "./WebSocketProvider";

export function useSingleChat(friendId: number) {

    const { socket, sendMessage } = useWebSocket();
    const [messages, setMessage] = useState<Chat[]>([]);
    const [friend, setFriend] = useState<User>();

    useEffect(() => {

        if (!socket) {
            return;
        }

        sendMessage({ type: "get_single_chat", friendId });

        const onMessage = (event: MessageEvent) => {
            const response: WSResponse = JSON.parse(event.data);
            if (response.type === "single_chat") {
                sendMessage(response.payload);
            }
        };

        socket.addEventListener("message", onMessage);

        return () => {
            socket.removeEventListener("message", onMessage);
        };

    }, [socket, friendId])

    return messages;
}
