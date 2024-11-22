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

const userSchema = z.object({
  id: z.string().cuid(),
  username: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username must be at most 20 characters'),
  email: z.string().email(),
  bio: z.string(),
  image: z.string().optional()
});

const statusSchema = z.enum(['PENDING', 'ACCEPTED', 'REJECTED']);

const friendshipSchema = z.object({
  id: z.string().cuid(),
  requesterId: z.string(),
  addresseeId: z.string(),
  status: statusSchema,
});

const messageSchema = z.object({
  id: z.string().cuid(),
  senderId: z.string(),
  receiverId: z.string(),
  content: z.string().min(10, 'Message must be at least 10 characters').max(300, 'Message must be at most 300 characters'),
});


export function validateData<T>(data: T[], schema: z.ZodSchema<T>, type: string) {
  data.forEach((item) => {
    const result = schema.safeParse(item);
    if (result.success) {
      console.log(`${type} data validated successfully!`);
    } else {
      console.error(`${type} data validation failed!`, result.error);
      process.exit(1);
    }
  });
}

export { createUserSchema, sendMessageSchema, createFriendshipSchema, updateUserSchema, updateMessageSchema, userSchema, friendshipSchema, messageSchema };