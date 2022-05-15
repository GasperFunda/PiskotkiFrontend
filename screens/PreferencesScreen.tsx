import * as React from "react";
import { Flex, Spacer } from "react-native-flex-layout";
import { Formik } from "formik";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "@react-native-material/core";
import AppHeading from "../components/AppHeading";
import AppButton from "../components/AppButton";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Checkbox, RadioButton, Snackbar } from "react-native-paper";
import AppLabel from "../components/AppLabel";
import { get } from "../api/get";
import { create } from "../api/create";

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
  const [initialLetter, setInitialLetter] = React.useState("");
  const [endingLetter, setEndingLetter] = React.useState("");
  const [motherName, setMotherName] = React.useState("");
  const [fatherName, setFatherName] = React.useState("");
  const [otherKidsNames, setOtherKidsNames] = React.useState("");
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  React.useEffect(() => {
    get(
      "settings",
      (res) => {
        const nameLength = [];
        const nameStyle = [];
        setInitialLetter(res.data.first_character);
        setEndingLetter(res.data.last_character);
        setMotherName(res.data.name_mother);
        setFatherName(res.data.name_father);
        setOtherKidsNames(res.data.other_kids_names);
        if (res.data.length_long) nameLength.push("long");
        if (res.data.length_medium) nameLength.push("medium");
        if (res.data.length_short) nameLength.push("short");
        if (res.data.style_modern) nameStyle.push("modern");
        if (res.data.style_classic) nameStyle.push("traditional");
        setNameLength(nameLength);
        setNameStyle(nameStyle);
      },
      (err) => {
        console.log(err.response?.data);
      }
    );
  }, []);

  const handleSubmit = React.useCallback((formValues) => {
    const requestData = {
      length_short: nameLength.includes("short"),
      length_medium: nameLength.includes("medium"),
      length_long: nameLength.includes("long"),
      first_character: formValues.initialLetter,
      last_character: formValues.endingLetter,
      gender: gender,
      style_classic: nameStyle.includes("traditional"),
      style_modern: nameStyle.includes("modern"),
      sibling_names: formValues.otherKidsNames,
      name_father: formValues.fatherName,
      name_mother: formValues.motherName,
    };
    console.log(requestData);

    create(
      "settings",
      requestData,
      (res) => {
        setSnackbarVisible(true);
      },
      (err) => {
        console.log(err.response?.data);
      }
    );
  }, []);

  return (
    <ScrollView>
      <Formik
        enableReinitialize={true}
        initialValues={{
          initialLetter: initialLetter,
          endingLetter: endingLetter,
          otherKidsNames: otherKidsNames,
          motherName: motherName,
          fatherName: fatherName,
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
                leading={() => (
                  <MaterialCommunityIcons
                    name="format-letter-case"
                    size={24}
                    color="black"
                  />
                )}
              ></TextInput>
              <TextInput
                onChangeText={handleChange("endingLetter")}
                onBlur={handleBlur("endingLetter")}
                value={values.endingLetter}
                style={styles.formItem}
                placeholder="Končna črka"
                maxLength={1}
                leading={() => (
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
                  status={
                    nameLength.includes("short") ? "checked" : "unchecked"
                  }
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
                  status={
                    nameLength.includes("medium") ? "checked" : "unchecked"
                  }
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
                      setNameLength(
                        nameLength.filter((item) => item !== "long")
                      );
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
                  status={
                    nameStyle.includes("modern") ? "checked" : "unchecked"
                  }
                  onPress={() => {
                    if (nameStyle.includes("modern")) {
                      setNameStyle(
                        nameStyle.filter((item) => item !== "modern")
                      );
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
              <TextInput
                onChangeText={handleChange("fatherName")}
                onBlur={handleBlur("fatherName")}
                value={values.fatherName}
                style={styles.formItem}
                placeholder="Father's name"
                leading={() => <AntDesign name="man" size={24} color="black" />}
              ></TextInput>
              <TextInput
                onChangeText={handleChange("motherName")}
                onBlur={handleBlur("motherName")}
                value={values.motherName}
                style={styles.formItem}
                placeholder="Mother's name"
                leading={() => (
                  <AntDesign name="woman" size={24} color="black" />
                )}
              ></TextInput>
              <View style={{ marginVertical: 20 }}>
                <AppButton onPress={handleSubmit} title="Shrani preference" />
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
      <Snackbar
        onDismiss={() => setSnackbarVisible(false)}
        visible={snackbarVisible}
        duration={2000}
      >
        Successfully saved user settings!
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formItem: {
    margin: 20,
    width: "85%",
  },
});
