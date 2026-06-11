import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  Gavel,
  ShieldCheck,
  Scale,
  Landmark,
  FileText,
  Info,
  Printer,
  Link as LinkIcon,
} from "lucide-react";

// ------------------------------------------------------------
// ✦ Impressum – Single-File Komponente (React + Tailwind CSS)
// ------------------------------------------------------------
// Hinweise:
// 1) Alle Platzhalter sind im Objekt `ORG` zentral gesammelt.
// 2) Abschnitte können nach Bedarf ein-/ausgebaut werden.
// 3) Der Stil ist druckfähig (Button "Drucken" nutzt window.print()).
// 4) Für eine reine HTML-Version (ohne React) einfach kurz Bescheid geben.

const ORG = {
  // — Basisdaten —
  legalName: "Vivien Krüger",
  brand: "",
  street: "Düsedauer Straße 70",
  postalCode: "39606",
  city: "Osterburg",
  country: "Deutschland",
  email: "vivienkruger138@gmail.com",
  phone: "+49 (0)15115837700",
  website: "",

  // — Vertretung —
  representedBy: "Vivien Krüger",
  position: "Inhaberin",

  // — Register & USt —
  registerCourt: "",
  registerNumber: "",
  vatId: "",

  // — Aufsicht / Berufsrecht (falls einschlägig) —
  supervisoryAuthority: "",
  professionalTitle: "",
  professionalRules: "",

  // — Verantwortlich gem. § 18 Abs. 2 MStV —
  contentResponsible: "Vivien Krüger",
  contentResponsibleAddress: "Düsedauer Straße 70, 39606 Osterburg",

  // — Verbraucherschlichtung —
  disputeText:
    "Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",

  // — Letzte Aktualisierung —
  lastUpdated: "09.11.2025",
};

const sections = [
  { id: "anbieter", label: "Anbieterkennzeichnung" },
  { id: "kontakt", label: "Kontakt" },
  { id: "vertretung", label: "Vertretung" },
  { id: "verantwortlich", label: "§ 18 Abs. 2 MStV" },
  { id: "haftung", label: "Haftungshinweise" },
  { id: "urheberrecht", label: "Urheberrecht" },
  { id: "streit", label: "Verbraucherschlichtung" },
];

function Anchor({ id, children }) {
  return (
    <div id={id} className="scroll-mt-28">
      {children}
    </div>
  );
}

function Card({ icon: Icon, title, children }) {
  return (
    <motion.section
      initial={{ y: 16, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative rounded-2xl border border-white/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xl shadow-xl p-6 md:p-8 print:bg-white print:shadow-none print:border-neutral-200"
    >
      <div className="flex items-start gap-4">
        <div className="mt-1 shrink-0">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-black/5 dark:border-white/10 bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 shadow">
            {Icon && <Icon className="h-5 w-5" aria-hidden />}
          </span>
        </div>
        <div className="min-w-0">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-2 flex items-center gap-2">
            {title}
            <a
              href={`#${slugify(title)}`}
              className="group ml-1 inline-flex items-center text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
              aria-label={`${title} – Abschnittslink`}
            >
              <LinkIcon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {children}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function ImpressumModern() {
  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG.brand,
    legalName: ORG.legalName,
    url: ORG.website,
    address: {
      "@type": "PostalAddress",
      streetAddress: ORG.street,
      postalCode: ORG.postalCode,
      addressLocality: ORG.city,
      addressCountry: ORG.country,
    },
    email: ORG.email,
    telephone: ORG.phone,
  }), []);

  return (
    <div className="relative min-h-screen text-neutral-900 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-950">
      {/* Hintergrund – weicher Verlauf + dekorative Formen */}
      <BackgroundDecor />

      <main className="relative">
        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/40 bg-white/70 dark:bg-neutral-900/60 border-b border-black/5 dark:border-white/10 print:static print:bg-white print:border-transparent">
          <div className="mx-auto max-w-5xl px-4 md:px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 shadow-inner" />
              <div className="leading-tight">
                <div className="text-sm uppercase tracking-widest text-neutral-500">{ORG.brand}</div>
                <div className="font-semibold">Impressum</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="#kontakt"
                className="hidden sm:inline-flex rounded-xl border border-black/10 dark:border-white/10 px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5"
              >
                Kontakt
              </a>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5"
              >
                <Printer className="h-4 w-4" /> Drucken
              </button>
            </div>
          </div>
        </header>

        {/* Intro / Hero */}
        <section className="relative">
          <div className="mx-auto max-w-5xl px-4 md:px-6 pt-14 md:pt-20 pb-10">
            <motion.h1
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-3xl md:text-5xl font-semibold tracking-tight mb-4"
            >
              Rechtliche Angaben
            </motion.h1>
            <motion.p
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
              className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl"
            >
              Nachfolgend finden Sie die gesetzlichen Pflichtangaben gem. TMG, MStV und weitere Hinweise.
            </motion.p>

            {/* Schnell-Navigation */}
            <nav aria-label="Abschnittsnavigation" className="mt-6 md:mt-8">
              <ul className="flex flex-wrap gap-2">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/60 backdrop-blur px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/5"
                    >
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {/* Inhalt */}
        <div className="mx-auto max-w-5xl px-4 md:px-6 pb-24 print:pb-0 space-y-6 md:space-y-8">
          <Anchor id="anbieter">
            <Card icon={Building2} title="Anbieterkennzeichnung">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="font-medium">{ORG.legalName}</p>
                  <address className="not-italic">
                    {ORG.street}
                    <br />
                    {ORG.postalCode} {ORG.city}
                    <br />
                    {ORG.country}
                  </address>
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-300">
                  <p>Letzte Aktualisierung: {ORG.lastUpdated}</p>
                </div>
              </div>
            </Card>
          </Anchor>

          <Anchor id="kontakt">
            <Card icon={MapPin} title="Kontakt">
              <ul className="grid md:grid-cols-2 gap-4">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-0.5" />
                  <span>
                    {ORG.street}, {ORG.postalCode} {ORG.city}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="h-5 w-5 mt-0.5" />
                  <a className="underline underline-offset-4 hover:no-underline" href={`mailto:${ORG.email}`}>{ORG.email}</a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 mt-0.5" />
                  <a className="underline underline-offset-4 hover:no-underline" href={`tel:${ORG.phone}`}>{ORG.phone}</a>
                </li>
              </ul>
            </Card>
          </Anchor>

          <Anchor id="vertretung">
            <Card icon={Landmark} title="Vertretungsberechtigte Person(en)">
              <p>
                Vertreten durch: <span className="font-medium">{ORG.representedBy}</span> ({ORG.position})
              </p>
            </Card>
          </Anchor>

          <Anchor id="verantwortlich">
            <Card icon={Info} title="Verantwortlich für Inhalte (§ 18 Abs. 2 MStV)">
              <p>
                {ORG.contentResponsible}, {ORG.contentResponsibleAddress}
              </p>
            </Card>
          </Anchor>

          <Anchor id="haftung">
            <Card icon={Scale} title="Haftungshinweise">
              <h3 className="text-base font-semibold mt-2">Haftung für Inhalte</h3>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach den §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>

              <h3 className="text-base font-semibold mt-4">Haftung für Links</h3>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </Card>
          </Anchor>

          <Anchor id="urheberrecht">
            <Card icon={Gavel} title="Urheberrecht">
              <p>
                Die durch die Betreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung der jeweiligen Autorinnen und Autoren bzw. Ersteller. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet.
              </p>
            </Card>
          </Anchor>

          <Anchor id="streit">
            <Card icon={Scale} title="Verbraucherstreitbeilegung / OS-Plattform">
              <p className="mb-3">
                {ORG.disputeText}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Hinweis auf die EU-Plattform zur Online-Streitbeilegung (OS):
                {" "}
                <a
                  className="underline underline-offset-4 hover:no-underline"
                  href="https://consumer-redress.ec.europa.eu/index_de"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://consumer-redress.ec.europa.eu/index_de
                </a>
              </p>
            </Card>
          </Anchor>

          {/* Footer */}
          <footer className="pt-6 md:pt-10 pb-2 text-sm text-neutral-600 dark:text-neutral-400">
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/10 dark:border-white/10 pt-4">
              <p>
                © {new Date().getFullYear()} {ORG.legalName}. Alle Rechte vorbehalten.
              </p>
              <div className="flex items-center gap-3">
                <a href="#anbieter" className="hover:underline underline-offset-4">Impressum</a>
                <span aria-hidden>·</span>
                <a href="#kontakt" className="hover:underline underline-offset-4">Kontakt</a>
              </div>
            </div>
          </footer>
        </div>
      </main>

      {/* JSON-LD strukturierte Daten */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}

function BackgroundDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Weicher radialer Verlauf */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[42rem] w-[42rem] rounded-full bg-gradient-to-br from-neutral-200 via-neutral-100 to-transparent dark:from-neutral-800 dark:via-neutral-900 dark:to-transparent blur-3xl opacity-60" />

      {/* Subtile animierte Blobs */}
      <motion.div
        initial={{ opacity: 0.4, scale: 0.9 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        className="absolute right-[-8rem] top-20 h-96 w-96 rounded-full bg-gradient-to-br from-neutral-300 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0.3, scale: 1 }}
        animate={{ opacity: 0.5, scale: 1.05 }}
        transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}
        className="absolute left-[-10rem] bottom-0 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-neutral-200 to-neutral-50 dark:from-neutral-900 dark:to-neutral-700 blur-3xl"
      />
    </div>
  );
}
