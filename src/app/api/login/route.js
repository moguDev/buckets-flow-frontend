import axios from "axios";

export async function POST(req) {
  const { email, password } = await req.json();
  const localURL = "http://localhost:3000/api/v1/auth/sign_in";

  try {
    const response = await axios.post(
      localURL,
      { email: email, password: password },
      {
        withCredentials: true,
      }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.response.data }), {
      status: error.response.status,
      headers: { "Content-Type": "application/json" },
    });
  }
}
