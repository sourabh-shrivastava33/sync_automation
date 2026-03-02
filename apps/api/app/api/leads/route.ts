import { NextResponse } from "next/server";
import { LeadSchema, Lead } from "@sync-automations/types";
import { sanitizeInput } from "@sync-automations/utils";

// In-memory storage constraint
const leadsStore: Lead[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate using shared Zod schema
    const parsedParams = LeadSchema.safeParse(body);

    if (!parsedParams.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsedParams.error.format() },
        { status: 400 },
      );
    }

    const { name, email, company } = parsedParams.data;

    // Sanitization step
    const safeLead: Lead = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      company: company ? sanitizeInput(company) : undefined,
    };

    // Store lead
    leadsStore.push(safeLead);

    // Console logging as requested
    console.log("New Lead captured:", safeLead);

    return NextResponse.json(
      { success: true, message: "Lead captured successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
