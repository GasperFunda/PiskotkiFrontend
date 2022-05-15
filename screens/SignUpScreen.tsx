import * as React from "react";
import { Flex } from "react-native-flex-layout";
import { Formik } from "formik";
import { StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Text } from "@react-native-material/core";
import { SignUpFormData } from "../types/auth";
import AppHeading from "../components/AppHeading";
import AppButton from "../components/AppButton";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { AntDesign } from "@expo/vector-icons";
import { login } from "../api/login";
import { Snackbar } from "react-native-paper";

export default function SignUpScreen({ navigation }: any) {
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const handleSubmit = React.useCallback((formValues: SignUpFormData) => {
    const { email, password, repeatPassword } = formValues;
    if (password !== repeatPassword) {
      setSnackbarMessage("Gesla se ne ujemajo!");
      setSnackbarVisible(true);
      return;
    }
    const object = { email: email, password: password };
    login(
      `signup`,
      object,
      () => {
        setSnackbarVisible(true);
        setSnackbarMessage("Registracija uspešna!");
        setTimeout(() => {
          navigation.navigate("SignIn");
        }, 2000);
      },
      (err) => {
        console.log(err.response?.data);
      }
    );
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          repeatPassword: "",
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <Flex justify="center" items="center" style={{ padding: 25 }}>
              <AppHeading fontSize={24}>
                Registrirajte, da lahko začnete uporabljati aplikacijo za
                personalizirano generiranje imen
              </AppHeading>
            </Flex>
            <Flex justify="center" items="center">
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                style={styles.formItem}
                placeholder="Email"
                leading={(props) => <Icon name="account" {...props} />}
              ></TextInput>

              <TextInput
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={true}
                style={styles.formItem}
                placeholder="Geslo"
                leading={() => (
                  <AntDesign name="lock1" size={24} color="black" />
                )}
              ></TextInput>
              <TextInput
                onChangeText={handleChange("repeatPassword")}
                onBlur={handleBlur("repeatPassword")}
                value={values.repeatPassword}
                secureTextEntry={true}
                style={styles.formItem}
                placeholder="Ponovite geslo"
                leading={() => (
                  <AntDesign name="lock1" size={24} color="black" />
                )}
              ></TextInput>
              <AppButton onPress={handleSubmit} title="Register" />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SignIn");
                }}
              >
                <Text
                  style={{
                    color: "white",
                    marginTop: 15,
                    textDecorationLine: "underline",
                  }}
                >
                  Že imate račun? Prijavite se!
                </Text>
              </TouchableOpacity>
            </Flex>
          </>
        )}
      </Formik>
      <Snackbar
        onDismiss={() => setSnackbarVisible(false)}
        visible={snackbarVisible}
        duration={2000}
      >
        {snackbarMessage}
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  formItem: {
    margin: 20,
    width: "85%",
  },
});
