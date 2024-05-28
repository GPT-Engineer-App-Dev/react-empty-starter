import { useState } from "react";
import { Box, Button, Input, VStack, Heading, Text, useToast } from "@chakra-ui/react";
import { supabase } from "../integrations/supabase/index.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({
        title: "Login failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Login successful",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      window.location.reload();
    }
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={4} p={8} borderWidth={1} borderRadius="md" boxShadow="lg">
        <Heading>Login</Heading>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button onClick={handleLogin} colorScheme="blue" width="full">
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;