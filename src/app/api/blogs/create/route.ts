import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { title, description } = await request.json();
  const header = request.headers.get("authorization");

  console.log("header", header);

  if (!header) {
    return NextResponse.json(
      { error: "Unauthorized: No token provided" },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${header}`,
      },
      body: JSON.stringify({ title, description }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the post." },
      { status: 500 }
    );
  }
}
