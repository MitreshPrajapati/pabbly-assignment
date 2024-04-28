import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  Spacer,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  useBreakpointValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import LoginSignupModal from "../pages/Login";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isSignupOpen,
    onOpen: onSignupOpen,
    onClose: onSignupClose,
  } = useDisclosure();

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const navItems = isLoggedIn
    ? [
        { label: "Logout", onClick: handleLogout },
        { label: "Dashboard", href: "/dashboard" },
        { label: "Profile", href: "/profile" },
      ]
    : [];

  const logoSize = useBreakpointValue({ base: "100px", md: "150px" });

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1rem"
      bg="gray.200"
      color="navy"
      marginBottom="1rem"
      direction={["column", "row"]}
    >
      <Flex align="center" w={"100%"} justify={"space-between"}>
        <Box as="a" href="/" fontSize="xl" fontWeight="bold" lineHeight="none">
          Pabbly
        </Box>
        <Flex align={"center"} justify={"center"} gap={4}>
          {isLoggedIn &&
            navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={item.onClick}
                padding={["0.5rem", "1rem"]}
              >
                {item.label}
              </Link>
            ))}

          <Button colorScheme="blue" onClick={onLoginOpen}>
            Login
          </Button>
          <Button colorScheme="green" onClick={onSignupOpen}>
            Sign Up
          </Button>

          <LoginSignupModal
            isOpen={isLoginOpen}
            onClose={onLoginClose}
            isLogin={true}
          />
          <LoginSignupModal
            isOpen={isSignupOpen}
            onClose={onSignupClose}
            isLogin={false}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
