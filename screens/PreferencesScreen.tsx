import * as React from "react";
import { Flex, Spacer } from "react-native-flex-layout";
import { Formik } from "formik";
import {
  View,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { Button, TextInput, Text } from "@react-native-material/core";
import { SignUpFormData } from "../types/auth";
import { Heading } from "../components/Heading";
import { AppButton } from "../components/AppButton";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Checkbox, RadioButton } from "react-native-paper";
import AppLabel from "../components/AppLabel";

export default function PreferencesScreen({ navigation }: any) {
  const [nameLength, setNameLength] = React.useState([
    "short",
    "medium",
    "long",
  ] as string[]);
  const [gender, setGender] = React.useState(true);
  const [nameStyle, setNameStyle] = React.useState([
    "traditional",
    "modern",
  ] as string[]);
  const handleSubmit = React.useCallback((formValues) => {}, []);

  return (
    <Formik
      initialValues={{
        initialLetter: "",
        length: 3,
        gender: false,
        traditional: true,
        modern: true,
        kidNames: [] as string[],
      }}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <>
          <Flex justify="center" items="center" style={{ padding: 25 }}>
            <Heading>Choose your baby name making preferences</Heading>
          </Flex>
          <Flex justify="center" items="center">
            <TextInput
              onChangeText={handleChange("initialLetter")}
              onBlur={handleBlur("initialLetter")}
              value={values.initialLetter}
              style={styles.formItem}
              placeholder="Prva začetnica"
              maxLength={1}
              leading={(props) => (
                <MaterialCommunityIcons
                  name="format-letter-case"
                  size={24}
                  color="black"
                />
              )}
            ></TextInput>
            <Flex direction="row" justify="center">
              <AppLabel>Short:</AppLabel>
              <Checkbox
                color="green"
                uncheckedColor="green"
                status={nameLength.includes("short") ? "checked" : "unchecked"}
                onPress={() => {
                  if (nameLength.includes("short")) {
                    setNameLength(
                      nameLength.filter((item) => item !== "short")
                    );
                  } else {
                    setNameLength([...nameLength, "short"]);
                  }
                }}
              />
              <AppLabel>Medium:</AppLabel>
              <Checkbox
                color="green"
                uncheckedColor="green"
                status={nameLength.includes("medium") ? "checked" : "unchecked"}
                onPress={() => {
                  if (nameLength.includes("medium")) {
                    setNameLength(
                      nameLength.filter((item) => item !== "medium")
                    );
                  } else {
                    setNameLength([...nameLength, "medium"]);
                  }
                }}
              />
              <AppLabel>Long:</AppLabel>
              <Checkbox
                color="green"
                uncheckedColor="green"
                status={nameLength.includes("long") ? "checked" : "unchecked"}
                onPress={() => {
                  if (nameLength.includes("long")) {
                    setNameLength(nameLength.filter((item) => item !== "long"));
                  } else {
                    setNameLength([...nameLength, "long"]);
                  }
                }}
              />
            </Flex>
            <Flex direction="row" justify="center">
              <AppLabel>Male:</AppLabel>
              <RadioButton
                color="green"
                uncheckedColor="green"
                value="male"
                status={gender ? "checked" : "unchecked"}
                onPress={() => setGender(true)}
              />
              <AppLabel>Female:</AppLabel>

              <RadioButton
                color="green"
                uncheckedColor="green"
                value="female"
                status={!gender ? "checked" : "unchecked"}
                onPress={() => setGender(false)}
              />
            </Flex>
            <Flex direction="row" justify="center" style={{ marginBottom: 40 }}>
              <AppLabel>Traditional:</AppLabel>
              <Checkbox
                color="green"
                uncheckedColor="green"
                status={
                  nameStyle.includes("traditional") ? "checked" : "unchecked"
                }
                onPress={() => {
                  if (nameStyle.includes("traditional")) {
                    setNameStyle(
                      nameStyle.filter((item) => item !== "traditional")
                    );
                  } else {
                    setNameStyle([...nameStyle, "traditional"]);
                  }
                }}
              />
              <AppLabel>Modern:</AppLabel>
              <Checkbox
                color="green"
                uncheckedColor="green"
                status={nameStyle.includes("modern") ? "checked" : "unchecked"}
                onPress={() => {
                  if (nameStyle.includes("modern")) {
                    setNameStyle(nameStyle.filter((item) => item !== "modern"));
                  } else {
                    setNameStyle([...nameStyle, "modern"]);
                  }
                }}
              />
            </Flex>
            <AppButton onPress={() => handleSubmit} title="Save preferences" />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            ></TouchableOpacity>
          </Flex>
        </>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  formItem: {
    margin: 20,
    width: "85%",
  },
});
