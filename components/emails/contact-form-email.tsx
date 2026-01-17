import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
}

export function ContactFormEmail({ name, email, message }: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nuovo messaggio da {name} via Portfolio</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>📬 Nuovo Messaggio dal Portfolio</Heading>
          <Hr style={hr} />
          
          <Section style={section}>
            <Text style={label}>Nome</Text>
            <Text style={value}>{name}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Email</Text>
            <Text style={value}>{email}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Messaggio</Text>
            <Text style={messageStyle}>{message}</Text>
          </Section>

          <Hr style={hr} />
          
          <Text style={footer}>
            Questo messaggio è stato inviato tramite il form di contatto del tuo portfolio.
            Puoi rispondere direttamente a questa email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  marginBottom: "64px",
  borderRadius: "12px",
  maxWidth: "600px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#1a1a1a",
  textAlign: "center" as const,
  margin: "0 0 30px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const section = {
  marginBottom: "24px",
};

const label = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#6b7280",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  margin: "0 0 8px",
};

const value = {
  fontSize: "16px",
  color: "#1a1a1a",
  margin: "0",
  padding: "12px 16px",
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
};

const messageStyle = {
  fontSize: "16px",
  color: "#1a1a1a",
  margin: "0",
  padding: "16px",
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  lineHeight: "1.6",
  whiteSpace: "pre-wrap" as const,
};

const footer = {
  fontSize: "12px",
  color: "#9ca3af",
  textAlign: "center" as const,
  marginTop: "30px",
};

export default ContactFormEmail;
