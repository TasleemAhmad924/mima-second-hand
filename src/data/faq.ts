import type { FaqItem } from "@/types";

/**
 * FAQ content grouped by audience. Copy is intentionally concrete and plain.
 * Where an answer depends on details not yet confirmed by the client, it stays
 * general rather than inventing specifics (prices, exact hours, contract terms).
 */
export const faqItems: FaqItem[] = [
  {
    audience: "verkaufen",
    question: "Wie miete ich ein Regal?",
    answer:
      "Du wählst online einen Startzeitpunkt, einen Mietzeitraum und ein freies Regal. Den Rest – Konto, Buchung und Zahlung – wickelst du anschließend über dein MiMa-Konto ab.",
  },
  {
    audience: "verkaufen",
    question: "Wie lange kann ich ein Regal mieten?",
    answer:
      "Aktuell in drei Zeiträumen: zwei Wochen, ein Monat oder drei Monate. Du kannst nach Ablauf verlängern, solange das Regal frei ist.",
  },
  {
    audience: "verkaufen",
    question: "Muss ich selbst im Laden stehen?",
    answer:
      "Nein. Du richtest dein Regal ein, MiMa übernimmt den Verkauf und die Kasse im Store. Deine Verkäufe siehst du in deinem Konto.",
  },
  {
    audience: "verkaufen",
    question: "Wie bekomme ich mein Geld?",
    answer:
      "Die Verkäufe werden deinem Konto gutgeschrieben und ausgezahlt. Die Abrechnung läuft über dein MiMa-Konto – transparent und nachvollziehbar.",
  },
  {
    audience: "verkaufen",
    question: "Was darf ich verkaufen?",
    answer:
      "Gut erhaltene Second-Hand-Stücke: Kleidung, Bücher, Accessoires und Dinge für zuhause. Details zu erlaubten Artikeln stimmen wir vor dem Start mit dir ab.",
  },
  {
    audience: "entdecken",
    question: "Kann ich online kaufen?",
    answer:
      "Entdecken kannst du online, gekauft wird vor Ort im Store. So bleibt jedes Stück ein Einzelstück und du siehst es dir in Ruhe an.",
  },
  {
    audience: "entdecken",
    question: "Wie oft gibt es Neues?",
    answer:
      "Die Regale werden laufend neu bestückt. Ein Besuch lohnt sich immer wieder – das Sortiment verändert sich ständig.",
  },
  {
    audience: "entdecken",
    question: "Wo finde ich MiMa?",
    answer:
      "MiMa ist ein fester Ort in Lübeck. Adresse und Öffnungszeiten findest du auf der Kontaktseite.",
  },
];
