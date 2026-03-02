import { NextResponse } from "next/server";
import { ContactSchema, Contact } from "@sync-automations/types";
import { sanitizeInput } from "@sync-automations/utils";

// In-memory storage constraint
const contactStore: Contact[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate using shared Zod schema
    const parsedParams = ContactSchema.safeParse(body);

    if (!parsedParams.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsedParams.error.format() },
        { status: 400 },
      );
    }

    const { name, email, message } = parsedParams.data;

    // Sanitization
    const safeContact: Contact = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      message: sanitizeInput(message),
    };

    contactStore.push(safeContact);

    // Console logging
    console.log("New Contact query:", safeContact);

    return NextResponse.json(
      { success: true, message: "Contact message received" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
