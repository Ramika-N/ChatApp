import AntDesign from '@expo/vector-icons/AntDesign';
import { Image, KeyboardAvoidingView, Platform, Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import "../../global.css";

export default function ContactScreen() {
    return (
        <SafeAreaView className="flex-1 bg-red-100 items-center">

            <StatusBar hidden={true} />
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'android' ? 100 : 100}
            >
                <View className="p-5 items-center">
                    <View>
                        <Image source={require("../../assets/logo.png")} className="h-40 w-36" />
                    </View>
                    <View>
                        <Text className="text-slate-600 font-bold">
                            We use your contact to help you find friends who are already on the app. Your contact stay private.
                        </Text>
                    </View>
                    <View className="mt-5 w-full">
                        <Pressable className="flex w-full justify-center items-center flex-row h-16 border-b-4 border-b-green-600">
                            <Text className="font-bold text-lg">Select Country</Text>
                            <AntDesign name="caret-down" size={18} color="black" style={{ marginTop: 5 }} />
                        </Pressable>
                    </View>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}