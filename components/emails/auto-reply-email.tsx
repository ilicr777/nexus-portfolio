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
  Link,
} from "@react-email/components";

interface AutoReplyEmailProps {
  name: string;
}

export function AutoReplyEmail({ name }: AutoReplyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Grazie per avermi contattato, {name}!</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>NEXUS.dev</Text>
          </Section>

          <Heading style={heading}>Grazie per il tuo messaggio! 🚀</Heading>
          
          <Text style={greeting}>Ciao {name},</Text>
          
          <Text style={paragraph}>
            Ho ricevuto il tuo messaggio e ti ringrazio per aver dedicato del tempo a contattarmi.
          </Text>

          <Text style={paragraph}>
            Ti risponderò il prima possibile, solitamente entro 24-48 ore lavorative.
          </Text>

          <Text style={paragraph}>
            Nel frattempo, se hai domande urgenti, non esitare a rispondere direttamente a questa email.
          </Text>

          <Hr style={hr} />

          {/* What to expect */}
          <Section style={infoSection}>
            <Text style={infoTitle}>Cosa aspettarti:</Text>
            <Text style={infoItem}>✓ Risposta personalizzata alle tue domande</Text>
            <Text style={infoItem}>✓ Valutazione gratuita del tuo progetto</Text>
            <Text style={infoItem}>✓ Proposta dettagliata se applicabile</Text>
          </Section>

          <Hr style={hr} />

          <Text style={closing}>
            A presto,
            <br />
            <strong>NEXUS.dev</strong>
          </Text>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Questa è un&apos;email automatica inviata in risposta al tuo messaggio.
            </Text>
            <Text style={footerLinks}>
              <Link href="https://nexus.dev" style={link}>Website</Link>
              {" • "}
              <Link href="https://github.com/nexusdev" style={link}>GitHub</Link>
              {" • "}
              <Link href="https://linkedin.com/in/nexusdev" style={link}>LinkedIn</Link>
            </Text>
          </Section>
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
  padding: "0",
  marginBottom: "64px",
  borderRadius: "12px",
  maxWidth: "600px",
  overflow: "hidden" as const,
};

const header = {
  backgroundColor: "#0a0a0a",
  padding: "24px",
  textAlign: "center" as const,
};

const logo = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#ffffff",
  margin: "0",
  letterSpacing: "-0.5px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#1a1a1a",
  textAlign: "center" as const,
  margin: "30px 20px 20px",
};

const greeting = {
  fontSize: "16px",
  color: "#1a1a1a",
  margin: "0 40px 16px",
};

const paragraph = {
  fontSize: "16px",
  color: "#4b5563",
  lineHeight: "1.6",
  margin: "0 40px 16px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "30px 40px",
};

const infoSection = {
  margin: "0 40px",
};

const infoTitle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#1a1a1a",
  margin: "0 0 12px",
};

const infoItem = {
  fontSize: "14px",
  color: "#4b5563",
  margin: "0 0 8px",
  paddingLeft: "8px",
};

const closing = {
  fontSize: "16px",
  color: "#1a1a1a",
  margin: "0 40px 30px",
  lineHeight: "1.6",
};

const footer = {
  backgroundColor: "#f9fafb",
  padding: "24px 40px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "12px",
  color: "#9ca3af",
  margin: "0 0 12px",
};

const footerLinks = {
  fontSize: "12px",
  color: "#6b7280",
  margin: "0",
};

const link = {
  color: "#3b82f6",
  textDecoration: "none",
};

export default AutoReplyEmail;
