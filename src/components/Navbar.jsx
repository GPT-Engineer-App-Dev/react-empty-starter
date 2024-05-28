import { Flex, Box, Spacer, IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Flex as="nav" bg={bg} p={4} boxShadow="md">
      <Box fontWeight="bold">
        <Link to="/">MyApp</Link>
      </Box>
      <Spacer />
      <Box>
        <Link to="/venues">Venues</Link>
      </Box>
      <Spacer />
      <IconButton
        aria-label="Toggle dark mode"
        icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
        onClick={toggleColorMode}
      />
    </Flex>
  );
};

export default Navbar;