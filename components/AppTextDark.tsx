import * as React from "react";
import { Text, useColorScheme } from "react-native";

export interface IAppTextDarkProps {
  children: string;
}

export default function AppTextDark(props: IAppTextDarkProps) {
  const colorScheme = useColorScheme();
  return (
    <Text
      style={{
        color: colorScheme === "light" ? "white" : "black",
        marginRight: 20,
        fontWeight: "bold",
      }}
    >
      {props.children}
    </Text>
  );
}
