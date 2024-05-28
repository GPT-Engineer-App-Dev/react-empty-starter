import { Container, Text, VStack, Box, Table, Thead, Tbody, Tr, Th, Td, Link, Button, HStack, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Checkbox } from "@chakra-ui/react";
import { useEvents, useUpdateEvent, useDeleteEvent } from "../integrations/supabase/index.js";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const { data: events } = useEvents();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({ name: "", date: "", description: "", is_pinned: false });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setFormData({ name: event.name, date: event.date, description: event.description, is_pinned: event.is_pinned });
    onOpen();
  };

  const handleDeleteClick = (eventId) => {
    deleteEvent.mutate(eventId);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateEvent.mutate({ ...editingEvent, ...formData });
    setEditingEvent(null);
    onClose();
  };

  const sortedEvents = events?.sort((a, b) => b.is_pinned - a.is_pinned);

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
                <Th>Pinned</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedEvents?.map(event => (
                <Tr key={event.id}>
                  <Td>
                    <Link as={RouterLink} to={`/event/${event.id}`}>
                      {event.name}
                    </Link>
                  </Td>
                  <Td>{event.date}</Td>
                  <Td>{event.description}</Td>
                  <Td>{event.is_pinned ? "Yes" : "No"}</Td>
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
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit Event</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
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
                    <Checkbox
                      name="is_pinned"
                      isChecked={formData.is_pinned}
                      onChange={handleFormChange}
                    >
                      Pinned
                    </Checkbox>
                  </VStack>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={handleFormSubmit}>
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;