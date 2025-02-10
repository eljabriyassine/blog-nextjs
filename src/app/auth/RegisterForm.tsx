"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface UserInput {
  value: string;
  error: string;
}

interface UserInputs {
  name: UserInput;
  username: UserInput;
  email: UserInput;
  password: UserInput;
  confirmPassword: UserInput;
}

export default function RegisterForm() {
  const [userInputs, setUserInputs] = useState<UserInputs>({
    name: { value: "", error: "" },
    username: { value: "", error: "" },
    email: { value: "", error: "" },
    password: { value: "", error: "" },
    confirmPassword: { value: "", error: "" },
  });
  const [generalError, setGeneralError] = useState("");
  const router = useRouter();

  const validateField = (field: keyof UserInputs, value: string): string => {
    switch (field) {
      case "name":
        return value.length < 2
          ? "Name must be at least 2 characters long"
          : "";
      case "username":
        return value.length < 3
          ? "Username must be at least 3 characters long"
          : "";
      case "email":
        return !/\S+@\S+\.\S+/.test(value)
          ? "Please enter a valid email address"
          : "";
      case "password":
        return value.length < 6
          ? "Password must be at least 6 characters long"
          : "";
      case "confirmPassword":
        return value !== userInputs.password.value
          ? "Passwords do not match"
          : "";
      default:
        return "";
    }
  };

  const handleInputChange =
    (field: keyof UserInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const error = validateField(field, value);
      setUserInputs((prev) => ({
        ...prev,
        [field]: { value, error },
      }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");

    // Validate all fields
    let hasError = false;
    const updatedInputs = { ...userInputs };
    Object.keys(updatedInputs).forEach((key) => {
      const field = key as keyof UserInputs;
      const error = validateField(field, updatedInputs[field].value);
      updatedInputs[field].error = error;
      if (error) hasError = true;
    });

    setUserInputs(updatedInputs);

    if (hasError) {
      setGeneralError("Please correct the errors before submitting.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: userInputs.name.value,
            username: userInputs.username.value,
            email: userInputs.email.value,
            password: userInputs.password.value,
          }),
        }
      );

      if (response.ok) {
        router.push("/auth");
      } else {
        const data = await response.json();
        setGeneralError(
          data.message || "Registration failed. Please try again."
        );
      }
    } catch (err) {
      setGeneralError("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {Object.entries(userInputs).map(
        ([field, { value, error }]) =>
          field !== "confirmPassword" && (
            <div key={field} className="space-y-2">
              <Label htmlFor={field} className="capitalize">
                {field}
              </Label>
              <Input
                id={field}
                type={
                  field === "password"
                    ? "password"
                    : field === "email"
                    ? "email"
                    : "text"
                }
                placeholder={`Enter your ${field}`}
                value={value}
                onChange={handleInputChange(field as keyof UserInputs)}
                required
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          )
      )}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={userInputs.confirmPassword.value}
          onChange={handleInputChange("confirmPassword")}
          required
        />
        {userInputs.confirmPassword.error && (
          <p className="text-red-500 text-sm">
            {userInputs.confirmPassword.error}
          </p>
        )}
      </div>
      {generalError && <p className="text-red-500 text-sm">{generalError}</p>}
      <Button type="submit" className="w-full">
        Register
      </Button>
    </form>
  );
}
