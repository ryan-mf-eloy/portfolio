import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import type { Resume, ResumeWork, ResumeEducation, ResumeSkillGroup } from "@/lib/resume/schema";

const ACCENT = "#00C14E";
const TEXT = "#0A0A0A";
const MUTED = "#525252";
const RULE = "#0A0A0A";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatDate(s: string): string {
  if (/^\d{4}$/.test(s)) return s;
  const [y, m] = s.split("-");
  const idx = Number(m) - 1;
  const month = MONTHS[idx] ?? "";
  return month ? `${month} ${y}` : y;
}

function dateRange(start: string, end?: string): string {
  return `${formatDate(start)} – ${end ? formatDate(end) : "Present"}`;
}

function stripScheme(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    color: TEXT,
    fontFamily: "Helvetica",
    fontSize: 10.5,
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 44,
    lineHeight: 1.45,
  },
  header: {
    marginBottom: 14,
  },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 22,
    letterSpacing: -0.5,
    color: TEXT,
    lineHeight: 1.15,
    marginBottom: 4,
  },
  label: {
    fontSize: 11.5,
    color: TEXT,
    lineHeight: 1.3,
  },
  rule: {
    height: 1,
    backgroundColor: ACCENT,
    width: 64,
    marginTop: 8,
    marginBottom: 8,
  },
  contactLine: {
    fontSize: 9.5,
    color: MUTED,
  },
  contactLink: {
    color: ACCENT,
    textDecoration: "underline",
  },
  section: {
    marginTop: 14,
  },
  sectionHeader: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    textTransform: "uppercase",
    color: TEXT,
    paddingBottom: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: RULE,
    marginBottom: 8,
  },
  summary: {
    fontSize: 10.5,
    color: TEXT,
    lineHeight: 1.5,
  },
  workItem: {
    marginBottom: 10,
  },
  workItemTight: {
    marginBottom: 8,
  },
  workHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 1,
  },
  workTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    color: TEXT,
    flex: 1,
    paddingRight: 8,
  },
  workDates: {
    fontSize: 9.5,
    color: MUTED,
  },
  workCompany: {
    fontSize: 10.5,
    color: TEXT,
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 4,
  },
  bulletDot: {
    width: 10,
    fontSize: 10,
    color: TEXT,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: TEXT,
    lineHeight: 1.4,
  },
  skillRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  skillCategory: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: TEXT,
    width: 130,
  },
  skillKeywords: {
    flex: 1,
    fontSize: 10,
    color: TEXT,
  },
  educationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 4,
  },
  educationLeft: {
    flex: 1,
    paddingRight: 8,
  },
  educationInstitution: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    color: TEXT,
  },
  educationArea: {
    fontSize: 10,
    color: TEXT,
  },
  educationDates: {
    fontSize: 9.5,
    color: MUTED,
  },
  languagesLine: {
    fontSize: 10,
    color: TEXT,
  },
});

function renderContactLine(parts: Array<{ label: string; href?: string }>) {
  return parts.map((p, i) => (
    <Text key={i}>
      {i > 0 ? "  ·  " : ""}
      {p.href ? (
        <Link src={p.href} style={styles.contactLink}>
          {p.label}
        </Link>
      ) : (
        p.label
      )}
    </Text>
  ));
}

function ContactBlock({ basics }: { basics: Resume["basics"] }) {
  const linkedIn = basics.profiles.find((p) => p.network.toLowerCase() === "linkedin");
  const github = basics.profiles.find((p) => p.network.toLowerCase() === "github");
  const locationParts = [
    basics.location.city,
    basics.location.region && basics.location.region !== basics.location.city
      ? basics.location.region
      : undefined,
    basics.location.countryCode,
  ].filter(Boolean) as string[];
  const location = locationParts.join(", ");

  const primary: Array<{ label: string; href?: string }> = [
    { label: basics.email, href: `mailto:${basics.email}` },
    basics.phone ? { label: basics.phone } : null,
    { label: location },
  ].filter(Boolean) as Array<{ label: string; href?: string }>;

  const secondary: Array<{ label: string; href?: string }> = [
    linkedIn ? { label: "LinkedIn", href: linkedIn.url } : null,
    basics.url ? { label: "Portfolio", href: basics.url } : null,
    github ? { label: "GitHub", href: github.url } : null,
  ].filter(Boolean) as Array<{ label: string; href?: string }>;

  return (
    <View>
      <Text style={styles.contactLine}>{renderContactLine(primary)}</Text>
      {secondary.length > 0 && (
        <Text style={styles.contactLine}>{renderContactLine(secondary)}</Text>
      )}
    </View>
  );
}

function WorkItem({ work, tight }: { work: ResumeWork; tight?: boolean }) {
  return (
    <View style={tight ? styles.workItemTight : styles.workItem} wrap={false}>
      <View style={styles.workHeader}>
        <Text style={styles.workTitle}>
          {work.position} · {work.name}
        </Text>
        <Text style={styles.workDates}>{dateRange(work.startDate, work.endDate)}</Text>
      </View>
      {work.location && <Text style={styles.workCompany}>{work.location}</Text>}
      {work.highlights.map((h, i) => (
        <View key={i} style={styles.bulletRow}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{h}</Text>
        </View>
      ))}
    </View>
  );
}

function SkillRow({ group }: { group: ResumeSkillGroup }) {
  return (
    <View style={styles.skillRow}>
      <Text style={styles.skillCategory}>{group.name}</Text>
      <Text style={styles.skillKeywords}>{group.keywords.join(", ")}</Text>
    </View>
  );
}

function EducationRow({ ed }: { ed: ResumeEducation }) {
  const left = ed.studyType ? `${ed.studyType}, ${ed.area}` : ed.area;
  return (
    <View style={styles.educationRow}>
      <View style={styles.educationLeft}>
        <Text style={styles.educationInstitution}>{ed.institution}</Text>
        <Text style={styles.educationArea}>{left}</Text>
      </View>
      <Text style={styles.educationDates}>{dateRange(ed.startDate, ed.endDate)}</Text>
    </View>
  );
}

export function ResumeDocument({ data }: { data: Resume }) {
  const { basics, work, education, skills, languages } = data;
  const languagesLine = languages
    .map((l) => `${l.language} (${l.fluency})`)
    .join("  ·  ");

  return (
    <Document
      title={`${basics.name} — ${basics.label}`}
      author={basics.name}
      subject="Resume"
      keywords={skills.flatMap((s) => s.keywords).join(", ")}
      producer="ryaneloy.dev"
      creator="ryaneloy.dev"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{basics.name}</Text>
          <Text style={styles.label}>{basics.label}</Text>
          <View style={styles.rule} />
          <ContactBlock basics={basics} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Summary</Text>
          <Text style={styles.summary}>{basics.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Experience</Text>
          {work.map((w, i) => (
            <WorkItem key={i} work={w} tight={i >= 3} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Skills</Text>
          {skills.map((s, i) => (
            <SkillRow key={i} group={s} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Education</Text>
          {education.map((e, i) => (
            <EducationRow key={i} ed={e} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Languages</Text>
          <Text style={styles.languagesLine}>{languagesLine}</Text>
        </View>
      </Page>
    </Document>
  );
}
