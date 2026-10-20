import {
  Document,
  Page,
  Text,
  View,
  StyleSheet
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 11,
    position: "relative"
  },
  title: {
    fontSize: 18,
    marginBottom: 12
  },
  section: {
    marginBottom: 10
  },
  watermark: {
    position: "absolute",
    top: "45%",
    left: "10%",
    fontSize: 48,
    color: "rgba(200,200,200,0.3)",
    transform: "rotate(-30deg)"
  }
});

export function EvaluationPDF({
  data,
  locked
}: {
  data: any;
  locked: boolean;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {locked && (
          <Text style={styles.watermark}>
            PAYMENT REQUIRED
          </Text>
        )}

        <Text style={styles.title}>
          Assessment Evaluation Report
        </Text>

        <View style={styles.section}>
          <Text>Name: {data.name}</Text>
          <Text>Email: {data.email}</Text>
        </View>

        <View style={styles.section}>
          <Text>Personality Score: {data.personalityScore}/100</Text>
          <Text>Coding Score: {data.codingScore}/200</Text>
          <Text>Final Score: {data.finalScore}/100</Text>
        </View>

        <View style={styles.section}>
          <Text>Plagiarism Risk: {data.plagiarismRisk}</Text>
          <Text>Tab Switches: {data.tabSwitches}</Text>
        </View>

        <View style={styles.section}>
          <Text>
            Recommendation: {data.recommendation}
          </Text>
        </View>

        <Text style={{ marginTop: 30, fontSize: 9 }}>
          This report is system generated. Valid only after payment.
        </Text>

      </Page>
    </Document>
  );
}
