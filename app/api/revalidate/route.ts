import { revalidateTag } from "next/cache";
import { eventCacheTag } from "@/lib/events";
import { repositoryName } from "@/prismicio";

interface PrismicWebhookPayload {
  type?: unknown;
  secret?: unknown;
  domain?: unknown;
  documents?: unknown;
}

function isPayload(value: unknown): value is PrismicWebhookPayload {
  return typeof value === "object" && value !== null;
}

export async function POST(request: Request) {
  const webhookSecret = process.env.PRISMIC_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return Response.json(
      { error: "Prismic webhook is not configured." },
      { status: 503 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  if (!isPayload(payload)) {
    return Response.json({ error: "Invalid webhook payload." }, { status: 400 });
  }

  if (payload.secret !== webhookSecret) {
    return Response.json({ error: "Invalid webhook secret." }, { status: 401 });
  }

  if (!repositoryName || payload.domain !== repositoryName) {
    return Response.json({ error: "Unexpected Prismic repository." }, { status: 403 });
  }

  if (payload.type === "test-trigger") {
    return Response.json({ received: true });
  }

  if (payload.type !== "api-update") {
    return Response.json({ error: "Unsupported webhook event." }, { status: 400 });
  }

  if (
    !Array.isArray(payload.documents) ||
    !payload.documents.every((documentId) => typeof documentId === "string")
  ) {
    return Response.json({ error: "Invalid document list." }, { status: 400 });
  }

  revalidateTag(eventCacheTag, { expire: 0 });

  return Response.json({
    revalidated: true,
    documents: payload.documents.length,
  });
}
