import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import "../../global.css";
import CircleShape from "../components/CircleShape";
import { useEffect } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useTheme } from "../theme/ThemeProvider";

type Props = NativeStackNavigationProp<RootStack, "SplashScreen">;

export default function SplashScreen() {

    const navigation = useNavigation<Props>();

    const opacity = useSharedValue(0);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 3000 });
        const timer = setTimeout(() => {
            navigation.replace("SignUpScreen");
        }, 3000);

        return () => {
            clearInterval(timer);
        };

    }, [navigation, opacity]);

    const animatedStyle = useAnimatedStyle(() => {
        return { opacity: opacity.value };
    });

    const {applied} = useTheme();

    const logo = applied === "dark"
        ? require("../../assets/logo-dark.png")
        : require("../../assets/logo.png");

    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-slate-50 dark:bg-slate-950">
            <StatusBar hidden={true} />

            <CircleShape width={200} height={200} fillColor="black" borderRadius={999} topValue={-25} leftValue={-45} />
            <CircleShape width={140} height={140} fillColor="black" borderRadius={999} topValue={-50} leftValue={80} />


            <Animated.View style={animatedStyle}>
                <Image source={logo} style={{ height: 180, width: 220 }} />
            </Animated.View>

            <View style={styles.bottomContainer}>

                <Text className="text-xs font-bold text-slate-600 dark:text-slate-200" >POWERED BY: {process.env.EXPO_PUBLIC_APP_OWNER}</Text>
                <Text className="text-xs font-bold text-slate-600 dark:text-slate-200" style={styles.appVersion}>VERSION: {process.env.EXPO_PUBLIC_APP_VERSION}</Text>

            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },

    bottomContainer: {
        position: 'absolute',
        bottom: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    companyName: {
        color: '#4b5563',
        fontWeight: 'bold',
        fontSize: 12,
    },

    appVersion: {
        color: '#4b5563',
        fontWeight: 'bold',
        fontSize: 10,
    },

});