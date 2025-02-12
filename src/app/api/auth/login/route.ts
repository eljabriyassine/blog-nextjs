// In your Next.js API route (app/api/auth/login/route.ts)

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    // Make sure to use the full URL including the protocol (http://)
    const response = await fetch(`${process.env.BACKEND_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("Response:", response);

    // Check if the response is okay
    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    } else {
      const errorData = await response.json();

      // Extract the message from the backend error response and return it
      return NextResponse.json(
        { message: errorData.message || "An error occurred" },
        { status: response.status || 400 }
      );
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { error: "An error occurred while logging in." },
      { status: 500 }
    );
  }
}
