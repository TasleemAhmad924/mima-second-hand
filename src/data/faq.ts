import type { FaqItem } from "@/types";
import { SALES_COMMISSION_PERCENT } from "@/config/pricing";

/**
 * FAQ content grouped by audience. Copy is intentionally concrete and plain.
 */
export const faqItems: FaqItem[] = [
  {
    audience: "verkaufen",
    question: "Wie miete ich ein Regal?",
    answer:
      "Die Buchung wird bald freigeschaltet. Sobald sie live ist, wählst du deinen Mietzeitraum. Konto, Zahlung und die Zuweisung eines Regals laufen über unseren Partner Pladsly.",
  },
  {
    audience: "verkaufen",
    question: "Wie lange kann ich ein Regal mieten?",
    answer:
      "Aktuell in drei Zeiträumen: 2 Wochen, 4 Wochen oder 3 Monate. Eine Verlängerung klärst du im Buchungsablauf, sobald dein Zeitraum endet.",
  },
  {
    audience: "verkaufen",
    question: "Muss ich selbst im Laden stehen?",
    answer:
      "Nein. Du richtest dein Regal ein, MiMa übernimmt den Verkauf und die Kasse im Second-Hand-Laden. Deine Verkäufe siehst du in deinem Konto.",
  },
  {
    audience: "verkaufen",
    question: "Wie bekomme ich mein Geld?",
    answer: `Die Verkäufe werden über das Kassensystem erfasst. Von jedem Verkauf behält MiMa ${SALES_COMMISSION_PERCENT} % als Provision. Den Rest überweisen wir auf dein Konto. Die Details stehen in den AGB.`,
  },
  {
    audience: "verkaufen",
    question: "Was darf ich verkaufen?",
    answer:
      "Gut erhaltene Second-Hand-Stücke: Kleidung, Bücher, Accessoires und Dinge fürs Zuhause. Was nicht angeboten werden darf, steht in den AGB.",
  },
  {
    audience: "entdecken",
    question: "Kann ich online kaufen?",
    answer:
      "Nach der Eröffnung kannst du Stücke online entdecken. Gekauft wird vor Ort im Second-Hand-Laden. So bleibt jedes Stück ein Einzelstück und du siehst es dir in Ruhe an.",
  },
  {
    audience: "entdecken",
    question: "Wie oft gibt es Neues?",
    answer:
      "Sobald der Laden öffnet, werden die Regale laufend neu bestückt. Ein Besuch lohnt sich immer wieder. Das Sortiment verändert sich ständig.",
  },
  {
    audience: "entdecken",
    question: "Wann hat MiMa geöffnet?",
    answer:
      "Dienstag bis Freitag von 10:00–17:00 Uhr, Samstag von 10:00–16:00 Uhr. Montag und Sonntag sind Ruhetage.",
  },
  {
    audience: "entdecken",
    question: "Wo finde ich MiMa?",
    answer:
      "MiMa ist ein Second-Hand-Laden in Stockelsdorf. Adresse und Öffnungszeiten findest du auf der Kontaktseite.",
  },
];
