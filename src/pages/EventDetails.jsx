import { useParams } from "react-router-dom";
import { Box, Heading, Text, VStack, Divider, Input, Button, HStack } from "@chakra-ui/react";
import { useEvents, useVenues, useAddComment, useComments } from "../integrations/supabase/index.js";
import { useState } from "react";

const EventDetails = () => {
  const { id } = useParams();
  const { data: events } = useEvents();
  const { data: venues } = useVenues();
  const { data: comments, refetch } = useComments(id);
  const addComment = useAddComment();
  const [commentContent, setCommentContent] = useState("");

  const event = events?.find(event => event.id === parseInt(id));
  const venue = venues?.find(venue => venue.id === event?.venue_id);

  const handleAddComment = async () => {
    if (commentContent.trim()) {
      await addComment.mutateAsync({ content: commentContent, event_id: event.id });
      setCommentContent("");
      refetch();
    }
  };

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
          <VStack spacing={2} align="start">
            {comments?.map(comment => (
              <Box key={comment.id} p={2} borderWidth="1px" borderRadius="md" w="100%">
                <Text>{comment.content}</Text>
                <Text fontSize="sm" color="gray.500">Posted on: {new Date(comment.created_at).toLocaleString()}</Text>
              </Box>
            ))}
          </VStack>
          <HStack spacing={2} mt={4}>
            <Input
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Add a comment"
            />
            <Button onClick={handleAddComment} colorScheme="blue">Submit</Button>
          </HStack>
        </VStack>
      )}
    </Box>
  );
};

export default EventDetails;