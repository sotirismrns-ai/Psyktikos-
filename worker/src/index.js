export default {
  async fetch(request, env) {
    if (request.method === "GET") {
      return new Response("Psyktikos AI Proxy OK");
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    if (!env.OPENROUTER_API_KEY) {
      return new Response("API key missing", { status: 500 });
    }

    const body = await request.text();

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + env.OPENROUTER_API_KEY,
          "Content-Type": "application/json"
        },
        body
      }
    );

    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
