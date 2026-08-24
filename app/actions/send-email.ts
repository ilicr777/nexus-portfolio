"use server";

import { Resend } from "resend";
import { z } from "zod";
import { ContactFormEmail } from "@/components/emails/contact-form-email";
import { AutoReplyEmail } from "@/components/emails/auto-reply-email";

// Initialize Resend
const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

// Validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Il nome deve contenere almeno 2 caratteri"),
  email: z.string().email("Inserisci un indirizzo email valido"),
  subject: z.string().optional(),
  message: z.string().min(10, "Il messaggio deve contenere almeno 10 caratteri"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export interface SendEmailResult {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
  };
}

export async function sendContactEmail(formData: ContactFormData): Promise<SendEmailResult> {
  try {
    // Validate form data
    const validatedData = contactFormSchema.safeParse(formData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Errore di validazione",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    const { name, email, subject, message } = validatedData.data;

    // Se manca la chiave API (es. test locale), simuliamo l'invio per evitare crash
    if (!resend) {
      console.warn("RESEND_API_KEY non è configurata. Simulo l'invio dell'email per il test locale.");
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simula latenza di rete
      return {
        success: true,
        message: "Messaggio inviato con successo! (Simulazione Locale)",
      };
    }

    const adminEmail =
      process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
      process.env.ADMIN_EMAIL ||
      "info@nexus-dev.it";

    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      "Portfolio Contact <onboarding@resend.dev>";

    // Send notification email to admin
    const { error: adminEmailError } = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      replyTo: email,
      subject: subject
        ? `Nuovo messaggio dal Portfolio: ${subject}`
        : `Nuovo messaggio dal Portfolio di ${name}`,
      react: ContactFormEmail({ name, email, message }),
    });

    if (adminEmailError) {
      console.error("Error sending admin email:", adminEmailError);
      return {
        success: false,
        message:
          adminEmailError.message ||
          "Errore nell'invio dell'email. Riprova più tardi.",
      };
    }

    // Send auto-reply email to user
    const { error: autoReplyError } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Grazie per aver contattato NEXUS.dev!",
      react: AutoReplyEmail({ name }),
    });

    if (autoReplyError) {
      // Log error but don't fail the whole operation
      // The main notification was sent successfully
      console.error("Error sending auto-reply email:", autoReplyError);
    }

    return {
      success: true,
      message: "Messaggio inviato con successo! Ti risponderò al più presto.",
    };
  } catch (error) {
    console.error("Unexpected error in sendContactEmail:", error);
    return {
      success: false,
      message: "Si è verificato un errore imprevisto. Riprova più tardi.",
    };
  }
}
