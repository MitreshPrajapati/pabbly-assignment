import React, { useState } from "react";
import {
  Button,
  FormControl,
  useToast,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Box,
} from "@chakra-ui/react";
import { BASE_URL } from "../Api";
import { useAuth } from "../context/AuthProvider";

const LoginSignupModal = ({ isOpen, onClose, isLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  // const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const url = !isLogin
      ? `${BASE_URL}/users/register`
      : `${BASE_URL}/users/login`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log("Form submitted with data:", formData);
    console.log(data);

    if (data.token) {
      localStorage.setItem("token", data.token);
      // login();
      
    }

    response.ok
      ? toast({
          position: "bottom-left",
          status: "success",
          title: `${data?.message}`,
        })
      : toast({
          position: "bottom-left",
          status: "error",
          title: `${data?.message}`,
        });

    setIsLoading(false);
    setFormData({ email: "", username: "", password: "" });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={"navy"} fontSize={"large"} fontWeight={"bold"}>
          {isLogin ? "Login" : "Sign Up"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Stack spacing="4">
              {!isLogin && (
                <FormControl id="username" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                  />
                </FormControl>
              )}
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </FormControl>
              <ModalFooter>
                <Button type="submit" colorScheme="blue" isLoading={isLoading}>
                  {isLogin ? "Login" : "Sign Up"}
                </Button>
              </ModalFooter>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginSignupModal;
