import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Image, KeyboardAvoidingView, Platform, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSingleChat } from "../socket/UseSingleChat";
import { Chat } from "../socket/chat";
import { formatChatTime } from "../util/DateFormatter";
import { useSendChat } from "../socket/UseSendChat";

type Message = {
    id: number;
    text: string;
    sender: "me" | "friend";
    time: string;
    status?: "sent" | "delivered" | "read";
};

const dummyMessage: Message[] = [
    { id: 1, text: "Hi", sender: "friend", time: "10:00 AM" },
    { id: 2, text: "Hello", sender: "friend", time: "10:36 AM" },
    { id: 3, text: "Hello, Kohomada?", sender: "me", time: "10:51 AM", status: "read" },
];

type SingleChatScreenProps = NativeStackScreenProps<RootStack, "SingleChatScreen">;

export default function SingleChatScreen({ route, navigation }: SingleChatScreenProps) {

    const { chatId, friendName, lastSeenTime, profileImage } = route.params;
    const sendMessage = useSendChat();
    const singleChat = useSingleChat(chatId) //chatId == friendIdF
    const messages = singleChat.messages;
    const friend = singleChat.friend;
    const [input, setInput] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerLeft: () => (
                <View className="items-center flex-row gap-2 ">
                    <TouchableOpacity className="justify-center items-center"
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                    </TouchableOpacity>
                    <Image source={{ uri: profileImage }} className="h-14 w-14 rounded-full border-2 border-gray-400 p-1" />
                    <View className="space-y-2">
                        <Text className="font-bold text-2xl"> {friend ? friend.firstName + " " + friend.lastName : friendName}</Text>
                        <Text className="italic text-xs font-bold text-gray-500">
                            {friend?.status === "ONLINE" ? "Online" : `Last seen ${formatChatTime(friend?.updated_at ?? "")}`}
                        </Text>
                    </View>
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity>
                    <Ionicons name="ellipsis-vertical" size={24} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation, friend]);

    const renderItem = ({ item }: { item: Chat }) => {

        const isMe = item.from.id !== chatId;

        return (
            <View className={`my-1 px-3 py-2 max-w-[75%] ${isMe
                ? `self-end bg-green-600 rounded-bl-xl rounded-br-xl`
                : `self-start bg-gray-700 rounded-tr-xl rounded-bl-xl rounded-br-xl`
                }`}>

                <Text className={`text-white text-base`}>{item.message}</Text>

                <View className="flex-row justify-end items-center mt-1">
                    <Text className={`text-white italic text-xs me-2`}>{formatChatTime(item.created_at)}</Text>
                    {isMe &&
                        (<Ionicons
                            name={item.status === "READ" ? "checkmark-done" : item.status === "DELIVERED" ? "checkmark-done" : "checkmark"}
                            size={16}
                            color={item.status === "READ" ? "#21acf1ff" : "#9ca3af"} />
                        )}
                </View>

            </View>
        );
    };

    const handleSendChat = () => {
        if (!input.trim()) {
            return;
        }
        sendMessage(chatId, input);
        setInput("");
    }

    return (
        <SafeAreaView className="flex-1 bg-white " edges={["right", "bottom", "left"]}>
            <StatusBar hidden={false} />
            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "android" ? "padding" : "height"}>
                <FlatList data={messages} renderItem={renderItem} className="px-3 flex-1" inverted contentContainerStyle={{ paddingBottom: 60 }} keyExtractor={(_, index) => index.toString()} />

                <View className="flex-row items-end p-2 bg-white">
                    <TextInput value={input} onChangeText={(text) => setInput(text)} multiline placeholder="Type a Message"
                        className="flex-1 min-h-14 max-h-32 h-auto px-5 py-2 bg-gray-200 rounded-3xl text-base"
                    />
                    <TouchableOpacity className="bg-green-600 w-14 h-14 items-center justify-center rounded-full" onPress={handleSendChat}>
                        <Ionicons name="send" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}