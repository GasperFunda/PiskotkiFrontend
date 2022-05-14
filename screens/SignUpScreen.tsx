import * as React from "react";
import { Flex, Spacer } from "react-native-flex-layout";
import { Formik } from "formik";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Button, TextInput, Text } from "@react-native-material/core";
import { SignUpFormData } from "../types/auth";
import AppHeading from "../components/AppHeading";
import AppButton from "../components/AppButton";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { AntDesign } from "@expo/vector-icons";
import { login } from "../api/login";
import { get } from "../api/get";

export default function SignUpScreen({ navigation }: any) {
  const handleSubmit = React.useCallback((formValues: SignUpFormData) => {
    const { email, password } = formValues;
    const object = { email: email, password: password };
    login(
      `signup`,
      object,
      (res) => {
        console.log(res.data);
      },
      (err) => {
        console.log(err.response?.data);
      }
    );

    get(
      "getRandomName",
      (res) => {
        console.log(res.data);
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
              Sign Up to generate personalized baby names!
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
              leading={() => <AntDesign name="woman" size={24} color="black" />}
            ></TextInput>
            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry={true}
              style={styles.formItem}
              placeholder="Password"
              leading={() => <AntDesign name="lock1" size={24} color="black" />}
            ></TextInput>
            <TextInput
              onChangeText={handleChange("repeatPassword")}
              onBlur={handleBlur("repeatPassword")}
              value={values.repeatPassword}
              secureTextEntry={true}
              style={styles.formItem}
              placeholder="Repeat password"
              leading={() => <AntDesign name="lock1" size={24} color="black" />}
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
                Already have an account? Sign in
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
