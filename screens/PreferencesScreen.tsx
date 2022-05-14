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
import AppHeading from "../components/AppHeading";
import AppButton from "../components/AppButton";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
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

  const handleSubmit = React.useCallback((formValues) => {
    console.log(formValues);
  }, []);

  return (
    <Formik
      initialValues={{
        initialLetter: "",
        otherKidsNames: "",
      }}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <>
          <Flex justify="center" items="center" style={{ padding: 25 }}>
            <AppHeading fontSize={24}>
              Izberite preference glede generiranja imen
            </AppHeading>
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
            <AppHeading fontSize={20}>Dolžina imena</AppHeading>
            <Flex direction="row" justify="center">
              <AppLabel>Kratko:</AppLabel>
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
              <AppLabel>Srednje:</AppLabel>
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
              <AppLabel>Dolgo:</AppLabel>
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
            <AppHeading fontSize={20}>Spol</AppHeading>

            <Flex direction="row" justify="center">
              <AppLabel>Moški:</AppLabel>
              <RadioButton
                color="green"
                uncheckedColor="green"
                value="male"
                status={gender ? "checked" : "unchecked"}
                onPress={() => setGender(true)}
              />
              <AppLabel>Ženski:</AppLabel>

              <RadioButton
                color="green"
                uncheckedColor="green"
                value="female"
                status={!gender ? "checked" : "unchecked"}
                onPress={() => setGender(false)}
              />
            </Flex>
            <AppHeading fontSize={20}>Stil imena</AppHeading>

            <Flex direction="row" justify="center">
              <AppLabel>Tradicionalno:</AppLabel>
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
              <AppLabel>Moderno:</AppLabel>
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
            <TextInput
              onChangeText={handleChange("otherKidsNames")}
              onBlur={handleBlur("otherKidsNames")}
              value={values.otherKidsNames}
              style={styles.formItem}
              placeholder="Imena ostalih otrok (ločite z vejico)"
              leading={(props) => (
                <MaterialIcons name="child-care" size={24} color="black" />
              )}
            ></TextInput>
            <View style={{ marginTop: 40 }}>
              <AppButton
                onPress={() => handleSubmit}
                title="Shrani preference"
              />
            </View>
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
