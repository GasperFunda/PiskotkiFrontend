import * as React from "react";
import { Text, useColorScheme } from "react-native";

export interface IHeadingProps {
  children: string;
}

export function Heading(props: IHeadingProps) {
  const colorScheme = useColorScheme();
  return (
    <Text
      style={{
        fontSize: 24,
        fontWeight: "bold",
        color: colorScheme === "dark" ? "white" : "black",
        textAlign: "center",
      }}
    >
      {props.children}
    </Text>
  );
}
