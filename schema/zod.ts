import { z } from "zod";

const createUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  bio: z.string().optional(),
  image: z.string().optional()
})

export { createUserSchema }