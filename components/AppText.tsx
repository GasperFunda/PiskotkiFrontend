import * as React from "react";
import { Text, useColorScheme } from "react-native";

export interface IAppTextProps {
  children: string;
}

export default function AppText(props: IAppTextProps) {
  const colorScheme = useColorScheme();
  return (
    <Text
      style={{
        color: colorScheme === "dark" ? "white" : "black",
      }}
    >
      {props.children}
    </Text>
  );
}
