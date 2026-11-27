import { createClient as createPrismicClient, type ClientConfig } from "@prismicio/client";

export const repositoryName = process.env.PRISMIC_REPOSITORY_NAME?.trim();

export function createClient(config: ClientConfig = {}) {
  if (!repositoryName) {
    throw new Error(
      "PRISMIC_REPOSITORY_NAME is required to load the events section."
    );
  }

  return createPrismicClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    ...config,
  });
}
