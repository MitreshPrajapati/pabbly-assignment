import React from "react";
import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";

const Navbar = ({
  isLoggedIn,
  setIsLoginFormOpen,
  setIsRegisterFormOpen,
  onLogout,
}) => {
  return (
    <Flex
      p={4}
      bg={"navy"}
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={4}
      width={"100%"}
    >
      <Box>
        <Text textColor={"white"} fontSize={"2xl"} fontWeight={"bold"}>
          Pabbly
        </Text>
      </Box>
      <Spacer />
      <Box display={"flex"}>
        <Button
          onClick={() => setIsLoginFormOpen(true)}
          mr={4}
          display={!isLoggedIn ? "block" : "none"}
        >
          Login
        </Button>
        <Button
          onClick={() => setIsRegisterFormOpen(true)}
          display={!isLoggedIn ? "block" : "none"}
        >
          Register
        </Button>
        <Button onClick={onLogout} display={isLoggedIn ? "block" : "none"}>
          Logout
        </Button>
      </Box>
    </Flex>
  );
};

export default Navbar;
