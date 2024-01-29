import { z } from 'zod';

export const loginParamsSchema = z.object({
  username: z.string(),
  password: z.string(),
});
export type LoginParams = z.infer<typeof loginParamsSchema>;

export type LoginResult = {
  username: string;
};
