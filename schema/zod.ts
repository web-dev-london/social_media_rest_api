import { z } from "zod";

const createUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  bio: z.string().optional(),
  image: z.string().optional()
});

const updateUserSchema = z.object({
  username: z.string().min(3).max(20).optional(),
  email: z.string().email().optional(),
  bio: z.string().optional(),
  image: z.string().optional()
})

const sendMessageSchema = z.object({
  senderId: z.string(),
  receiverId: z.string(),
  content: z.string(),
});

const updateMessageSchema = z.object({
  content: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

const createFriendshipSchema = z.object({
  requesterId: z.string(),
  addresseeId: z.string(),
});

export { createUserSchema, sendMessageSchema, createFriendshipSchema, updateUserSchema, updateMessageSchema };