import * as zod from "zod";

const envSchema = zod.object({
  FETCH_GITHUB_REPOS_API_URL: zod.string(),
});

const variables = {
  FETCH_GITHUB_REPOS_API_URL:
    process.env.NEXT_PUBLIC_FETCH_GITHUB_REPOS_API_URL,
} as const;

export const env = envSchema.parse(variables);
