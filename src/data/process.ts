export interface ProcessStep {
  number: string;
  title: string;
  short: string;
  /** Longer explanation used on the dedicated "So funktioniert's" page. */
  detail: string;
}

/** The seller journey — single source shared by the homepage and detail page. */
export const sellerSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Regal auswählen",
    short: "Startzeitpunkt, Mietdauer und ein freies Regal online wählen.",
    detail:
      "Du wählst online, wann es losgeht, wie lange du mieten möchtest und welches Regal im Store deins wird. Der schematische Grundriss zeigt dir, was frei ist.",
  },
  {
    number: "02",
    title: "Lieblingsstücke vorbereiten",
    short: "Stücke auszeichnen und dein Regal in Ruhe einräumen.",
    detail:
      "Du zeichnest deine Stücke aus und räumst dein Regal ein – so, wie es dir gefällt. Wir helfen beim Start, wenn du magst.",
  },
  {
    number: "03",
    title: "MiMa verkauft für dich",
    short: "Verkauf und Kasse übernehmen wir vor Ort im Store.",
    detail:
      "Während dein Regal im Store steht, kümmern wir uns um Verkauf und Kasse. Du musst nicht selbst vor Ort sein.",
  },
  {
    number: "04",
    title: "Verkäufe verfolgen",
    short: "Deine Verkäufe siehst du jederzeit in deinem Konto.",
    detail:
      "Was verkauft wurde, siehst du transparent in deinem Online-Konto. Die Abrechnung und Auszahlung läuft ebenfalls darüber.",
  },
];
