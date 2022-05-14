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
import { AntDesign } from "@expo/vector-icons";

export default function SignInScreen({ navigation }: any) {
  const handleSubmit = React.useCallback((formValues: SignUpFormData) => {
    console.log(formValues);
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
            <Heading>Sign in to your baby names generator account!</Heading>
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
              placeholder="Password"
              leading={() => <AntDesign name="lock1" size={24} color="black" />}
            ></TextInput>
            <AppButton onPress={() => handleSubmit} title="Login" />
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