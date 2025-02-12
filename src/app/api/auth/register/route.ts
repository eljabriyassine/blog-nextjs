import exp from "constants";
import { stat } from "fs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, username, email, password, confirmPassword } =
    await request.json();

  try {
    const response = await fetch(
      `${process.env.BACKEND_API_URL}/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, email, password }),
      }
    );

    if (response.ok) {
      return NextResponse.json({ message: "Registration successful" });
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || "An error occurred" },
        { status: response.status || 400 }
      );
    }
  } catch (error) {
    console.error("Error registering:", error);
    return NextResponse.json(
      { error: "An error occurred while registering." },
      { status: 500 }
    );
  }
}
