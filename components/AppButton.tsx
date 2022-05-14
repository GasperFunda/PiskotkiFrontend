import { Button } from "@react-native-material/core";
import * as React from "react";
import { StyleSheet } from "react-native";

export interface IAppButtonProps {
  onPress: () => void;
  title: string;
}

export function AppButton({ onPress, title }: IAppButtonProps) {
  return (
    <Button style={styles.button} onPressOut={() => onPress} title={title} />
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    width: 200,
  },
});
