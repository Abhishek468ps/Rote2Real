export const metadata = {
  title: "Transparency Notice | BrainzEdge",
  description:
    "Transparency notice clarifying the relationship between BrainzEdge and Brain Train Consultancy Services LLP.",
};

export default function TransparencyPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "center",
        padding: "80px 20px",
      }}
    >
      <section
        style={{
          maxWidth: "820px",
          width: "100%",
          color: "#111827",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          lineHeight: "1.75",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 600,
            marginBottom: "24px",
          }}
        >
          Transparency Notice
        </h1>

        <p style={{ marginBottom: "20px" }}>
          BrainzEdge is a future product initiative currently under conceptual
          development.
        </p>

        <p style={{ marginBottom: "20px" }}>
          All open collaboration, AI skill evaluation, and team-based development
          activities are conducted independently under Brain Train Consultancy
          Services LLP through public disclosures and public repositories.
        </p>

        <p style={{ marginBottom: "20px" }}>
          BrainzEdge does not currently run internships, development programs, or
          collaborative initiatives of any kind.
        </p>

        <p style={{ marginBottom: "20px" }}>
          For transparency regarding open development activities, please refer
          only to official communications published by Brain Train Consultancy
          Services LLP and the public repositories linked therein.
        </p>

        <p
          style={{
            marginTop: "32px",
            fontStyle: "italic",
            color: "#374151",
          }}
        >
          This page is published solely in the interest of transparency.
        </p>
      </section>
    </main>
  );
}
