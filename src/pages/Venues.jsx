import { Container, Text, VStack, Box, Table, Thead, Tbody, Tr, Th, Td, Button, HStack, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import { useVenues, useAddVenue, useUpdateVenue, useDeleteVenue } from "../integrations/supabase/index.js";
import { useState } from "react";

const Venues = () => {
  const { data: venues } = useVenues();
  const addVenue = useAddVenue();
  const updateVenue = useUpdateVenue();
  const deleteVenue = useDeleteVenue();
  const [editingVenue, setEditingVenue] = useState(null);
  const [formData, setFormData] = useState({ name: "", location: "", description: "" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();

  const handleEditClick = (venue) => {
    setEditingVenue(venue);
    setFormData({ name: venue.name, location: venue.location, description: venue.description });
    onOpen();
  };

  const handleDeleteClick = (venueId) => {
    deleteVenue.mutate(venueId);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingVenue) {
      updateVenue.mutate({ ...editingVenue, ...formData });
      setEditingVenue(null);
    } else {
      addVenue.mutate(formData);
    }
    onClose();
    onAddClose();
  };

  return (
    <Box minH="100vh">
      <Container centerContent maxW="container.md" py={8}>
        <VStack spacing={4}>
          <Text fontSize="2xl">Venues</Text>
          <Button colorScheme="blue" onClick={onAddOpen}>Add Venue</Button>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Location</Th>
                <Th>Description</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {venues?.map(venue => (
                <Tr key={venue.id}>
                  <Td>{venue.name}</Td>
                  <Td>{venue.location}</Td>
                  <Td>{venue.description}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <Button size="sm" onClick={() => handleEditClick(venue)}>Edit</Button>
                      <Button size="sm" colorScheme="red" onClick={() => handleDeleteClick(venue.id)}>Delete</Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {(editingVenue || isAddOpen) && (
            <Modal isOpen={isOpen || isAddOpen} onClose={onClose || onAddClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{editingVenue ? "Edit Venue" : "Add Venue"}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <VStack spacing={4}>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="Venue Name"
                    />
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleFormChange}
                      placeholder="Venue Location"
                    />
                    <Input
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      placeholder="Venue Description"
                    />
                  </VStack>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={handleFormSubmit}>
                    Save
                  </Button>
                  <Button onClick={onClose || onAddClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Venues;