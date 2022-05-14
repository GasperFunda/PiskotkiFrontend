import * as React from "react";
import { Text, useColorScheme } from "react-native";

export interface IAppHeadingProps {
  children: string;
  fontSize: number;
}

export default function AppHeading(props: IAppHeadingProps) {
  const colorScheme = useColorScheme();
  return (
    <Text
      style={{
        fontSize: props.fontSize,
        fontWeight: "bold",
        color: colorScheme === "dark" ? "white" : "black",
        textAlign: "center",
      }}
    >
      {props.children}
    </Text>
  );
}
