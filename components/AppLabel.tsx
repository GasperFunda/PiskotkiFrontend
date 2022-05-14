import * as React from "react";
import { Text, useColorScheme } from "react-native";

export interface IAppLabelProps {
  children: string;
}

export default function AppLabel(props: IAppLabelProps) {
  const colorScheme = useColorScheme();
  return (
    <Text
      style={{
        color: colorScheme === "dark" ? "white" : "black",
        marginTop: 10,
      }}
    >
      {props.children}
    </Text>
  );
}
