import { Container, Text, VStack, Box, Table, Thead, Tbody, Tr, Th, Td, Link, Button, HStack, Input } from "@chakra-ui/react";
import { useEvents, useUpdateEvent, useDeleteEvent } from "../integrations/supabase/index.js";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const { data: events } = useEvents();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({ name: "", date: "", description: "" });

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setFormData({ name: event.name, date: event.date, description: event.description });
  };

  const handleDeleteClick = (eventId) => {
    deleteEvent.mutate(eventId);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateEvent.mutate({ ...editingEvent, ...formData });
    setEditingEvent(null);
  };

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
                <Th>Actions</Th>
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
                  <Td>
                    <HStack spacing={2}>
                      <Button size="sm" onClick={() => handleEditClick(event)}>Edit</Button>
                      <Button size="sm" colorScheme="red" onClick={() => handleDeleteClick(event.id)}>Delete</Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {editingEvent && (
            <Box as="form" onSubmit={handleFormSubmit} mt={4} p={4} borderWidth="1px" borderRadius="md">
              <VStack spacing={4}>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Event Name"
                />
                <Input
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  placeholder="Event Date"
                />
                <Input
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Event Description"
                />
                <Button type="submit" colorScheme="blue">Save</Button>
                <Button onClick={() => setEditingEvent(null)}>Cancel</Button>
              </VStack>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;