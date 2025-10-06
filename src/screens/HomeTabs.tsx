import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatsScreen from "./ChatsScreen";
import StatusScreen from "./StatusScreen";
import CallsScreen from "./CallsScreen";
import { Ionicons } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

export default function HomeTabs() {

    return (
        <Tabs.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName = "chatbubble-ellipses";
                if (route.name === "Chats") iconName = "chatbubble-ellipses";
                else if (route.name === "Status") iconName = "time";
                else if (route.name === "Calls") iconName = "call";
                return <Ionicons name={iconName as any} size={28} color={color} />;
            },
            tabBarLabelStyle: { fontSize: 16, fontWeight: "800" },
            tabBarActiveTintColor: "#16a34a",
            tabBarInactiveTintColor: "#6b7280",
            tabBarStyle: {
                height: 80,
                backgroundColor: "#fff",
            }
        })}>
            <Tabs.Screen name="Chats" component={ChatsScreen} options={{ headerShown: false }} />
            <Tabs.Screen name="Status" component={StatusScreen} />
            <Tabs.Screen name="Calls" component={CallsScreen} />
        </Tabs.Navigator>
    );
}