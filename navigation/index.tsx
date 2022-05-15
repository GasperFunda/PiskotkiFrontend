/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Button, ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import PreferencesScreen from "../screens/PreferencesScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { SuperLikeListScreen } from "../screens/SuperLikeListScreen";
import Home from "../screens/HomeScreen";

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import HomeScreen from "../screens/HomeScreen";
import { NamesByYearScreen } from "../screens/NamesByYearScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const [user, setUser] = React.useState(false);
  React.useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("token");
      if (user) setUser(true);
      else {
        setUser(false);
      }
    };
    checkUser();
  }, []);

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {!user ? <AuthNavigator /> : <AppNavigator />}
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: "Prijava" }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: "Registracija" }}
      />

      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ title: "Baby generator" }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ title: "Baby generator" }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: "Prijava" }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: "Registracija" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator({ navigation }: any) {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="SuperLikeList"
        component={SuperLikeListScreen}
        options={({ navigation }: any) => ({
          title: "Všečkana imena",
          headerLeft: () => null,
          headerRight: () => (
            <AntDesign
              name="logout"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
              onPress={() => {
                AsyncStorage.removeItem("token");
                navigation.navigate("SignIn");
              }}
            />
          ),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="thumbs-up" color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: any) => ({
          title: "Všečkaj imena",
          headerLeft: () => null,
          headerRight: () => (
            <AntDesign
              name="logout"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
              onPress={() => {
                AsyncStorage.removeItem("token");
                navigation.navigate("SignIn");
              }}
            />
          ),
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Preferences"
        component={PreferencesScreen}
        options={({ navigation }: any) => ({
          title: "Preference",
          headerLeft: () => null,
          headerRight: () => (
            <AntDesign
              name="logout"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
              onPress={() => {
                AsyncStorage.removeItem("token");
                navigation.navigate("SignIn");
              }}
            />
          ),
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Statistics"
        component={NamesByYearScreen}
        options={({ navigation }: any) => ({
          title: "Statistika",
          headerLeft: () => null,
          headerRight: () => (
            <AntDesign
              name="logout"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
              onPress={() => {
                AsyncStorage.removeItem("token");
                navigation.navigate("SignIn");
              }}
            />
          ),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="list-ol" color={color} />
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
