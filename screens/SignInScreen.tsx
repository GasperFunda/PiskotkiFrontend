import * as React from "react";
import { Flex, Spacer } from "react-native-flex-layout";
import { Formik } from "formik";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Button, TextInput, Text } from "@react-native-material/core";
import { SignInFormData } from "../types/auth";
import AppHeading from "../components/AppHeading";
import AppButton from "../components/AppButton";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { AntDesign } from "@expo/vector-icons";
import { login } from "../api/login";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignInScreen({ navigation }: any) {
  const handleSubmit = React.useCallback((formValues: SignInFormData) => {
    const { email, password } = formValues;
    login(
      `signin`,
      { email: email, password: password },
      (res) => {
        AsyncStorage.setItem("token", res.data.token);
        navigation.navigate("Root");
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <Formik
      initialValues={{
        fatherName: "",
        motherName: "",
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
              Prijavite se v aplikacijo za generiranje dojenčkovega imena!
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
              leading={() => <AntDesign name="lock1" size={24} color="black" />}
            ></TextInput>
            <AppButton onPress={handleSubmit} title="Login" />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text
                style={{
                  color: "white",
                  marginTop: 15,
                  textDecorationLine: "underline",
                }}
              >
                Še nimate računa? Registrirajte se!
              </Text>
            </TouchableOpacity>
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
