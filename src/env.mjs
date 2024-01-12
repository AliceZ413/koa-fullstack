import {createEnv} from '@t3-oss/env-nextjs';
import {z} from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url().refine(str => !str.includes("YOUR_MYSQL_URL_HERE"), "You forgot to change the default URL")
    },
    client: {},
});
