import { useParams } from "react-router-dom";
import { Box, Heading, Text, VStack, Divider } from "@chakra-ui/react";
import { useEvents, useComments, useVenues } from "../integrations/supabase/index.js";

const EventDetails = () => {
  const { id } = useParams();
  const { data: events } = useEvents();
  const { data: comments } = useComments(id);
  const { data: venues } = useVenues();

  const event = events?.find(event => event.id === parseInt(id));
  const venue = venues?.find(venue => venue.id === event?.venue_id);

  return (
    <Box p={4}>
      {event && (
        <VStack spacing={4} align="start">
          <Heading>{event.name}</Heading>
          <Text>{event.description}</Text>
          <Text>Date: {event.date}</Text>
          <Divider />
          <Heading size="md">Venue Information</Heading>
          {venue && (
            <Box>
              <Text>Name: {venue.name}</Text>
              <Text>Location: {venue.location}</Text>
              <Text>Description: {venue.description}</Text>
            </Box>
          )}
          <Divider />
          <Heading size="md">Comments</Heading>
          {comments?.map(comment => (
            <Box key={comment.id} p={2} borderWidth="1px" borderRadius="md">
              <Text>{comment.content}</Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default EventDetails;