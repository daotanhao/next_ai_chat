import { handleRESTAPIRequest } from "../../../lib/restApiHandler";

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    return handleRESTAPIRequest(messages);
  } catch (error) {
    console.error("Error in POST function:", error);
    return new Response(JSON.stringify({ error: "Error in POST function" }), {
      status: 500,
    });
  }
}
