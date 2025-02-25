import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/posts`, {
      cache: "no-store",
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
