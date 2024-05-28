import { Container, Text, VStack, Box, Flex, Spacer, IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("black", "white");

  return (
    <Box bg={bg} color={color} minH="100vh">
      <Flex as="nav" bg={useColorModeValue("white", "gray.800")} p={4} boxShadow="md">
        <Box fontWeight="bold">MyApp</Box>
        <Spacer />
        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
        />
      </Flex>
      <Container centerContent maxW="container.md" py={8}>
        <VStack spacing={4}>
          <Text fontSize="2xl">Your Blank Canvas</Text>
          <Text>Chat with the agent to start making edits.</Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;