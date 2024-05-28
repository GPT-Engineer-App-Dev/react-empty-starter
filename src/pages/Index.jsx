import { Container, Text, VStack, Box, Table, Thead, Tbody, Tr, Th, Td, Link } from "@chakra-ui/react";
import { useEvents } from "../integrations/supabase/index.js";
import { Link as RouterLink } from "react-router-dom";

const Index = () => {
  const { data: events } = useEvents();

  return (
    <Box minH="100vh">
      <Container centerContent maxW="container.md" py={8}>
        <VStack spacing={4}>
          <Text fontSize="2xl">Events</Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Date</Th>
                <Th>Description</Th>
              </Tr>
            </Thead>
            <Tbody>
              {events?.map(event => (
                <Tr key={event.id}>
                  <Td>
                    <Link as={RouterLink} to={`/event/${event.id}`}>
                      {event.name}
                    </Link>
                  </Td>
                  <Td>{event.date}</Td>
                  <Td>{event.description}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;