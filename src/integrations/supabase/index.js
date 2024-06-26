import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

// TYPES SECTION
// DO NOT USE TYPESCRIPT AND SHOULD ALWAYS BE

Event // table: events
    id: number
    created_at: string
    name: string
    date: string
    description: string
    venue_id: number // foreign key to Venue
    comments?: Comment[] // available if .select('*,comments(*)') was done

Comment // table: comments
    id: number
    created_at: string
    content: string
    event_id: number // foreign key to Event

Venue // table: venues
    id: number
    name: string
    location: string
    description: string
    created_at: string
    updated_at: string
    events?: Event[] // available if .select('*,events(*)') was done

*/

// hooks

export const useEvents = () => {
    return useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            return await fromSupabase(supabase.from('events').select('*'));
        },
    });
};

export const useAddEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEvent) => fromSupabase(supabase.from('events').insert([newEvent])),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useUpdateEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedEvent) => {
            // Exclude events information from the updatedEvent object
            const { events, ...eventWithoutEvents } = updatedEvent;
            return fromSupabase(supabase.from('events').update(eventWithoutEvents).eq('id', updatedEvent.id));
        },
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (eventId) => fromSupabase(supabase.from('events').delete().eq('id', eventId)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useVenues = () => useQuery({
    queryKey: ['venues'],
    queryFn: () => fromSupabase(supabase.from('venues').select('*,events(*)')),
});

export const useAddVenue = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newVenue) => fromSupabase(supabase.from('venues').insert([newVenue])),
        onSuccess: () => {
            queryClient.invalidateQueries('venues');
        },
    });
};

export const useUpdateVenue = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedVenue) => {
            // Exclude events information from the updatedVenue object
            const { events, ...venueWithoutEvents } = updatedVenue;
            return fromSupabase(supabase.from('venues').update(venueWithoutEvents).eq('id', updatedVenue.id));
        },
        onSuccess: () => {
            queryClient.invalidateQueries('venues');
        },
    });
};

export const useDeleteVenue = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (venueId) => fromSupabase(supabase.from('venues').delete().eq('id', venueId)),
        onSuccess: () => {
            queryClient.invalidateQueries('venues');
        },
    });
};

export const useComments = (eventId) => {
    return useQuery({
        queryKey: ['comments', eventId],
        queryFn: async () => {
            return await fromSupabase(supabase.from('comments').select('*').eq('event_id', eventId));
        },
    });
};

export const useAddComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newComment) => fromSupabase(supabase.from('comments').insert([newComment])),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};