import type { LegalDocumentData } from "@/lib/legal/types";
import { siteConfig } from "@/config/site";

/**
 * Client-supplied AGB, August 2026.
 * Owner and contact come from the confirmed site config.
 */
export const AGB_DOCUMENT: LegalDocumentData = {
  title: "Allgemeine Geschäftsbedingungen",
  published: "August 2026",
  party: {
    name: siteConfig.name,
    street: siteConfig.address.street,
    postalCode: siteConfig.address.postalCode,
    city: siteConfig.address.city,
    ownerLabel: siteConfig.owner.label,
    ownerName: siteConfig.owner.name,
    legalForm: "Einzelunternehmen",
    email: siteConfig.contact.email,
    websiteLabel: "www.mima-second-hand.de",
    websiteHref: siteConfig.url,
  },
  closing: [
    siteConfig.name,
    siteConfig.address.street,
    `${siteConfig.address.postalCode} ${siteConfig.address.city}`,
    `${siteConfig.owner.label}: ${siteConfig.owner.name}`,
    `E-Mail: ${siteConfig.contact.email}`,
    "Website: www.mima-second-hand.de",
    "Stand der AGB: August 2026",
  ],
  sections: [
    {
      id: "geltungsbereich",
      title: "§ 1 Geltungsbereich",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: `Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen MiMa Second Hand, Segeberger Straße 8, 23617 Stockelsdorf, Inhaberin ${siteConfig.owner.name} – nachfolgend „MiMa“ genannt – und den Kundinnen und Kunden – nachfolgend einheitlich „Kunde“ genannt.`,
            },
            {
              text: "MiMa betreibt ein Second-Hand-Ladengeschäft mit vermieteten Verkaufsregalen. Das Konzept richtet sich insbesondere an den Verkauf von Second-Hand-Bekleidung und weiteren gebrauchten Artikeln für Familien, Kinder sowie Damen und Herren, insbesondere auch im Bereich großer Größen.",
            },
            {
              text: "Gegenstand der Leistungen von MiMa ist insbesondere:",
              bullets: [
                "die zeitweise Überlassung eines Verkaufsregals bzw. einer Verkaufsfläche,",
                "die Präsentation der vom Kunden eingebrachten Waren,",
                "die Verkaufsabwicklung über das Kassensystem von MiMa,",
                "die Abrechnung der erzielten Verkaufserlöse,",
                "die Bewerbung ausgewählter Waren über die von MiMa genutzten Kommunikations- und Onlinekanäle.",
              ],
            },
            {
              text: "MiMa kauft die vom Kunden eingebrachten Waren grundsätzlich nicht an. Das Eigentum an den Waren verbleibt bis zum Verkauf beim Kunden.",
            },
            {
              text: "Diese AGB gelten sowohl für Verträge mit Verbrauchern als auch – soweit vereinbart – mit Unternehmern. Für Unternehmer können im Einzelfall abweichende Vereinbarungen getroffen werden.",
            },
            {
              text: "Individuelle Vereinbarungen zwischen MiMa und dem Kunden haben Vorrang vor diesen AGB, sofern sie in Textform vereinbart wurden.",
            },
          ],
        },
      ],
    },
    {
      id: "vertragsmodell",
      title: "§ 2 Vertragsmodell – Mietregal und Verkaufsvermittlung",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Der Kunde mietet für einen vereinbarten Zeitraum ein bestimmtes Verkaufsregal bzw. eine von MiMa zugewiesene Verkaufsfläche.",
            },
            {
              text: "Der Kunde stellt seine Waren eigenverantwortlich zur Verfügung und bestimmt grundsätzlich selbst den Verkaufspreis.",
            },
            {
              text: "MiMa übernimmt die organisatorische Abwicklung des Verkaufs, insbesondere die Präsentation der Waren, die Abwicklung des Kassiervorgangs und die Abrechnung.",
            },
            {
              text: "Der jeweilige Kaufvertrag über eine vom Kunden eingestellte Ware kommt grundsätzlich zwischen dem Kunden als Verkäufer und dem jeweiligen Käufer zustande.",
            },
            {
              text: "MiMa handelt bei der Verkaufsabwicklung als vom Kunden beauftragte Vermittlerin bzw. Verkaufsabwicklerin. MiMa wird durch die Annahme und Abwicklung des Verkaufs nicht selbst Eigentümerin der Ware.",
            },
            {
              text: "Soweit MiMa einzelne Waren ausdrücklich im eigenen Namen verkauft, gelten hierfür die jeweils gesondert mitgeteilten Bedingungen.",
            },
            {
              text: "Ein Anspruch auf einen bestimmten Verkaufserfolg, Mindestumsatz oder eine bestimmte Anzahl von Verkäufen besteht nicht.",
            },
          ],
        },
      ],
    },
    {
      id: "vertragsschluss",
      title: "§ 3 Vertragsschluss",
      blocks: [
        { type: "h3", text: "3.1 Online-Buchung" },
        {
          type: "clauses",
          items: [
            {
              text: "Die Darstellung von Regalen, Mietzeiträumen, Preisen und Leistungen auf der Website, in sozialen Medien oder in sonstiger Werbung stellt kein verbindliches Angebot zum Vertragsschluss dar.",
            },
            {
              text: "Der Kunde kann ein verfügbares Regal sowie den gewünschten Mietzeitraum auswählen und seine erforderlichen Daten eingeben.",
            },
            {
              text: "Vor Abschluss der Buchung erhält der Kunde eine Übersicht über die wesentlichen Vertragsdaten.",
            },
            {
              text: "Der Kunde kann seine Eingaben vor Abgabe der verbindlichen Buchung korrigieren.",
            },
            {
              text: "Mit Betätigung des entsprechend gekennzeichneten Bestellbuttons gibt der Kunde ein verbindliches Angebot zum Abschluss des Mietvertrages ab.",
            },
            {
              text: "Der Vertrag kommt zustande, sobald MiMa die Buchung ausdrücklich bestätigt, insbesondere durch eine Buchungsbestätigung per E-Mail.",
            },
          ],
        },
        { type: "h3", text: "3.2 Buchung vor Ort" },
        {
          type: "p",
          text: "Bei einer Buchung im Ladengeschäft kommt der Vertrag durch die verbindliche Buchung und Bestätigung durch MiMa zustande.",
        },
        { type: "h3", text: "3.3 Volljährigkeit" },
        {
          type: "p",
          text: "MiMa schließt Mietverträge grundsätzlich nur mit volljährigen Personen. Mit Vertragsschluss bestätigt der Kunde, mindestens 18 Jahre alt zu sein.",
        },
      ],
    },
    {
      id: "mietdauer",
      title: "§ 4 Mietdauer",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Die regulären Mietzeiträume betragen:",
              bullets: ["14 Tage: 39,00 €", "28 Tage: 75,00 €"],
            },
            {
              text: "Maßgeblich ist der im Zeitpunkt der Buchung angegebene Preis.",
            },
            {
              text: "Die Mietdauer beginnt mit dem vereinbarten ersten Miettag und endet mit Ablauf des vereinbarten letzten Miettages.",
            },
            {
              text: "Eine Verlängerung ist nach Verfügbarkeit möglich und muss vor Ablauf des bestehenden Mietzeitraums vereinbart werden.",
            },
            { text: "Ein Anspruch auf Verlängerung besteht nicht." },
            {
              text: "Die Mietgebühr ist unabhängig davon geschuldet, ob und in welchem Umfang während der Mietzeit Waren verkauft werden.",
            },
          ],
        },
      ],
    },
    {
      id: "verkaufsregal",
      title: "§ 5 Verkaufsregal und Nutzung",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "MiMa stellt dem Kunden für die vereinbarte Mietdauer ein Verkaufsregal zur Verfügung.",
            },
            {
              text: "Die konkrete Größe und Ausstattung des Regals richtet sich nach dem jeweils gebuchten Regaltyp.",
            },
            {
              text: "Die Nutzung ist ausschließlich auf das zugewiesene Regal bzw. die zugewiesene Verkaufsfläche beschränkt.",
            },
            {
              text: "Waren dürfen nicht platziert werden:",
              bullets: [
                "auf dem Boden,",
                "an Wänden,",
                "an anderen Regalen,",
                "in Flucht- und Rettungswegen,",
                "vor Türen,",
                "auf Treppen,",
                "in Durchgängen",
                "oder außerhalb des zugewiesenen Bereichs.",
              ],
            },
            {
              text: "Regale dürfen nicht eigenmächtig verschoben, umgebaut oder beschädigt werden.",
            },
            {
              text: "Das Anbringen von Gegenständen am Regal ist nur mit ausdrücklicher Zustimmung von MiMa gestattet.",
            },
            {
              text: "Eigene Regale, Möbel, Tische oder sonstige Einrichtungsgegenstände dürfen grundsätzlich nicht aufgestellt werden.",
            },
            {
              text: "Kartons, Kisten, Taschen und Transportbehälter sind nach dem Einräumen wieder mitzunehmen. Eine dauerhafte Lagerung solcher Gegenstände im Verkaufsbereich ist nicht gestattet.",
            },
            {
              text: "Elektrische Geräte dürfen ohne vorherige Zustimmung von MiMa nicht am Regal angeschlossen oder betrieben werden.",
            },
            {
              text: "MiMa ist aus betrieblichen, organisatorischen oder sicherheitsrelevanten Gründen berechtigt, einem Kunden ein anderes gleichwertiges Regal zuzuweisen.",
            },
          ],
        },
      ],
    },
    {
      id: "einraeumen",
      title: "§ 6 Einräumen des Regals",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Das Einräumen des Regals ist frühestens zu den von MiMa bekannt gegebenen Einräumzeiten möglich.",
            },
            {
              text: "Die konkreten Zeiten werden dem Kunden bei der Buchung bzw. vor Beginn der Mietzeit mitgeteilt.",
            },
            {
              text: "Das Regal muss spätestens am ersten Miettag eingerichtet werden.",
            },
            {
              text: "Erscheint der Kunde am ersten Miettag nicht und informiert MiMa auch nicht über seine Verhinderung, ist MiMa berechtigt, das Regal ab dem folgenden Tag anderweitig zu vergeben.",
            },
            {
              text: "In diesem Fall besteht grundsätzlich kein Anspruch auf Erstattung der bereits gezahlten Mietgebühr.",
            },
            {
              text: "Ein vorzeitiger Abbruch der Mietzeit begründet grundsätzlich keinen Anspruch auf anteilige Rückerstattung, soweit keine gesetzlichen Ansprüche bestehen.",
            },
          ],
        },
      ],
    },
    {
      id: "warenqualitaet",
      title: "§ 7 Warenqualität und Pflichten des Kunden",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Der Kunde darf nur Waren anbieten, die sich in seinem Eigentum befinden oder über die er nachweislich rechtmäßig verfügen darf.",
            },
            { text: "Die Waren müssen frei von Rechten Dritter sein." },
            {
              text: "Der Kunde ist verpflichtet, seine Waren vor dem Einstellen sorgfältig auf folgende Punkte zu überprüfen:",
              bullets: [
                "Verschmutzungen,",
                "Flecken,",
                "Löcher,",
                "Risse,",
                "Beschädigungen,",
                "Ungeziefer,",
                "Gerüche,",
                "Hygienemängel,",
                "Sicherheitsmängel,",
                "Funktionsstörungen.",
              ],
            },
            { text: "Textilien müssen sauber und frisch gewaschen sein." },
            {
              text: "Mängel müssen dem Käufer durch eine geeignete und wahrheitsgemäße Kennzeichnung mitgeteilt werden.",
            },
            {
              text: "Der Kunde ist dafür verantwortlich, dass die angebotenen Waren den jeweils geltenden gesetzlichen Anforderungen entsprechen.",
            },
            {
              text: "Der Kunde darf keine Waren anbieten, deren Verkauf gegen gesetzliche Vorschriften verstößt.",
            },
          ],
        },
      ],
    },
    {
      id: "unzulaessige-waren",
      title: "§ 8 Unzulässige Waren",
      blocks: [
        { type: "lead", text: "Nicht angeboten oder verkauft werden dürfen insbesondere:" },
        {
          type: "ul",
          items: [
            "Waffen und verbotene Waffen",
            "Munition",
            "Feuerwerkskörper",
            "Alkohol",
            "Tabakwaren und Nikotinprodukte",
            "illegale Substanzen",
            "pornografische oder sonstige unzulässige jugendgefährdende Inhalte",
            "gefälschte Markenartikel und Plagiate",
            "gestohlene oder rechtswidrig erlangte Waren",
            "gefährliche oder unsichere Produkte",
            "defekte sicherheitsrelevante Produkte",
            "verdorbene oder unhygienische Waren",
            "Waren, deren Verkauf gesetzlich verboten ist",
          ],
        },
        {
          type: "p",
          text: "MiMa kann darüber hinaus Waren ablehnen oder aus dem Verkauf nehmen, wenn deren Verkauf mit dem Ladenkonzept, dem Geschäftsbetrieb oder der Sicherheit von Kunden und Mitarbeitern nicht vereinbar ist.",
        },
      ],
    },
    {
      id: "kinderartikel",
      title: "§ 9 Kinderartikel und sicherheitsrelevante Waren",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Bei Kinderartikeln trägt der Kunde eine besondere Verantwortung für deren Sicherheit und rechtmäßigen Zustand.",
            },
            {
              text: "Spielzeug muss, soweit gesetzlich vorgeschrieben, über die erforderlichen Kennzeichnungen verfügen.",
            },
            {
              text: "Sicherheitsrelevante Artikel dürfen nur angeboten werden, wenn der Kunde deren ordnungsgemäßen und sicheren Zustand gewährleisten kann.",
            },
            {
              text: "Bei Artikeln wie beispielsweise Autokindersitzen, Kinderwagen, Hochstühlen, Babyartikeln oder vergleichbaren Produkten kann MiMa zusätzliche Anforderungen an Zustand, Kennzeichnung und Nachweise stellen.",
            },
            {
              text: "MiMa ist berechtigt, sicherheitsrelevante Waren abzulehnen oder aus dem Verkauf zu nehmen, wenn begründete Zweifel an ihrer Sicherheit bestehen.",
            },
          ],
        },
      ],
    },
    {
      id: "eigentum",
      title: "§ 10 Eigentum und Herkunft der Waren",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Der Kunde versichert, dass er zur Veräußerung der eingestellten Waren berechtigt ist.",
            },
            {
              text: "Insbesondere dürfen keine gestohlenen, unterschlagenen oder sonst rechtswidrig erlangten Waren angeboten werden.",
            },
            {
              text: "MiMa ist berechtigt, bei begründeten Zweifeln einen geeigneten Nachweis über die Eigentums- oder Verfügungsberechtigung zu verlangen.",
            },
            {
              text: "Bis zum Verkauf bleiben die Waren Eigentum des Kunden.",
            },
            {
              text: "Mit dem Verkauf geht das Eigentum entsprechend den gesetzlichen Regelungen auf den jeweiligen Käufer über.",
            },
          ],
        },
      ],
    },
    {
      id: "gewerblich",
      title: "§ 11 Gewerblicher Verkauf",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Das Mietregal ist grundsätzlich für den Verkauf aus dem privaten Besitz des Kunden vorgesehen.",
            },
            {
              text: "Kunden, die Waren gewerblich anbieten, müssen MiMa hierüber vor bzw. spätestens bei Vertragsschluss informieren.",
            },
            {
              text: "Gewerbliche Verkäufer sind selbst für die Einhaltung ihrer steuerlichen, gewerberechtlichen, verbraucherrechtlichen und sonstigen gesetzlichen Verpflichtungen verantwortlich.",
            },
            {
              text: "Dies gilt insbesondere für die ordnungsgemäße steuerliche Erfassung der Umsätze und die Abführung gegebenenfalls anfallender Umsatzsteuer.",
            },
            { text: "MiMa erteilt keine individuelle Steuerberatung." },
          ],
        },
      ],
    },
    {
      id: "weiterverkauf",
      title: "§ 12 Weiterverkaufsverbot",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Es ist grundsätzlich nicht gestattet, Waren ausschließlich zum Zweck des gewerblichen Weiterverkaufs bei MiMa zu erwerben und anschließend über ein Mietregal anzubieten.",
            },
            {
              text: "Dies gilt insbesondere für typische gewerbliche Beschaffungsquellen und vergleichbare Plattformen.",
            },
            {
              text: "Handmade-Produkte oder Neuware regionaler bzw. gewerblicher Anbieter können nach vorheriger Vereinbarung zugelassen werden.",
            },
            { text: "MiMa kann hierfür besondere Bedingungen festlegen." },
          ],
        },
      ],
    },
    {
      id: "kennzeichnung",
      title: "§ 13 Kennzeichnung und Preisauszeichnung",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Sämtliche Waren müssen mit dem von MiMa vorgegebenen Etikettensystem ausgezeichnet werden.",
            },
            {
              text: "Die Etiketten müssen eine eindeutige Zuordnung zum jeweiligen Kunden ermöglichen.",
            },
            { text: "Die Warenbeschreibung muss ausreichend konkret sein." },
            {
              text: "Soweit erforderlich, sollen insbesondere folgende Angaben enthalten sein:",
              bullets: [
                "Produktart,",
                "Marke,",
                "Größe,",
                "Farbe,",
                "Zustand,",
                "gegebenenfalls weitere relevante Produkteigenschaften.",
              ],
            },
            {
              text: "Angaben wie lediglich „Kleidung“, „Schuhe“ oder „Spielzeug“ reichen grundsätzlich nicht aus, wenn eine genauere Bezeichnung erforderlich ist.",
            },
            {
              text: "Etiketten müssen gut sichtbar, lesbar und sicher an der Ware angebracht werden.",
            },
            {
              text: "Preisänderungen müssen über das von MiMa vorgegebene Verfahren erfolgen.",
            },
            {
              text: "Durchgestrichene oder eigenmächtig veränderte Preise werden nicht anerkannt.",
            },
            {
              text: "Artikel ohne eindeutig zuordenbares Etikett können aus dem Verkauf genommen werden.",
            },
          ],
        },
      ],
    },
    {
      id: "nachfuellen",
      title: "§ 14 Nachfüllen und Ordnung",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Der Kunde darf während der Mietzeit weitere Waren nachfüllen, soweit ausreichend Platz vorhanden ist.",
            },
            {
              text: "Das Regal darf nicht so stark gefüllt werden, dass Waren herausfallen, beschädigt werden oder andere Regale bzw. Personen gefährdet werden.",
            },
            {
              text: "MiMa ist berechtigt, bei Überfüllung oder Sicherheitsrisiken eine Reduzierung der Warenmenge zu verlangen.",
            },
            {
              text: "MiMa darf Waren aus Gründen der Sicherheit, Ordnung oder einer ansprechenden Warenpräsentation umsortieren.",
            },
            { text: "Ein Anspruch auf eine bestimmte Präsentationsweise besteht nicht." },
            {
              text: "Ein grundlegender Aufräum- und Sortierservice kann Bestandteil der Mietleistung sein. Ein Anspruch auf eine jederzeit perfekte oder individuelle Präsentation des einzelnen Regals besteht jedoch nicht.",
            },
          ],
        },
      ],
    },
    {
      id: "rabatte",
      title: "§ 15 Rabatte",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Der Kunde kann während der Mietzeit Preisreduzierungen für seine Waren vereinbaren, sofern MiMa dies technisch und organisatorisch ermöglicht.",
            },
            { text: "Preisreduzierungen müssen MiMa rechtzeitig mitgeteilt werden." },
            {
              text: "MiMa kann für Rabattaktionen vorgegebene Rabattstufen anbieten.",
            },
            {
              text: "Die aktuell angebotenen Rabattstufen werden dem Kunden mitgeteilt.",
            },
            {
              text: "Rabattaktionen werden im Kassensystem von MiMa hinterlegt.",
            },
            {
              text: "Eigenmächtige Preisänderungen durch den Kunden sind nicht zulässig.",
            },
          ],
        },
      ],
    },
    {
      id: "provision",
      title: "§ 16 Verkaufsprovision",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Für die Verkaufsabwicklung berechnet MiMa eine Provision von 15 % des jeweiligen Verkaufspreises.",
            },
            {
              text: "Die Provision wird automatisch bei der Abrechnung berücksichtigt.",
            },
            {
              text: "Der Kunde erhält somit grundsätzlich:",
              aside:
                "Verkaufserlös – 15 % Verkaufsprovision = Auszahlungsbetrag",
            },
            {
              text: "Zusätzlich können Kosten für ausdrücklich gebuchte Zusatzleistungen oder wirksam vereinbarte Lager- bzw. Serviceleistungen abgezogen werden.",
            },
            {
              text: "Die jeweils geltenden Preise und Gebühren werden dem Kunden vor Vertragsschluss bzw. vor Buchung der Zusatzleistung mitgeteilt.",
            },
          ],
        },
      ],
    },
    {
      id: "mietgebuehr",
      title: "§ 17 Zahlung der Mietgebühr",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Die Mietgebühr ist bei Buchung fällig, sofern nichts anderes vereinbart wurde.",
            },
            {
              text: "Bei Online-Buchungen können die jeweils von MiMa angebotenen Zahlungsdienstleister eingesetzt werden.",
            },
            {
              text: "Hierzu können insbesondere Zahlungsanbieter wie Stripe, PayPal oder vergleichbare Anbieter eingesetzt werden.",
            },
            {
              text: "Für die Zahlungsabwicklung gelten ergänzend die jeweiligen Bedingungen und Datenschutzhinweise der eingesetzten Zahlungsdienstleister.",
            },
            {
              text: "Bei ausstehenden Zahlungen ist MiMa berechtigt, die geschuldete Leistung nach Maßgabe der gesetzlichen Vorschriften zurückzuhalten.",
            },
          ],
        },
      ],
    },
    {
      id: "abrechnung",
      title: "§ 18 Abrechnung und Auszahlung",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Grundlage der Abrechnung sind die im Kassensystem von MiMa erfassten Verkäufe.",
            },
            {
              text: "MiMa erstellt eine Abrechnung über die während der Mietzeit erzielten Verkaufserlöse.",
            },
            {
              text: "Die Auszahlung erfolgt grundsätzlich unbar per Überweisung auf das vom Kunden angegebene Bankkonto.",
            },
            {
              text: "Der Kunde ist verpflichtet, MiMa eine korrekte Bankverbindung mitzuteilen.",
            },
            {
              text: "Die Auszahlung erfolgt innerhalb der von MiMa festgelegten Abrechnungsfrist.",
            },
            {
              text: "Provisionen und wirksam vereinbarte Gebühren werden vor Auszahlung abgezogen.",
            },
            { text: "Eine Barauszahlung besteht grundsätzlich nicht." },
          ],
        },
      ],
    },
    {
      id: "etiketten",
      title: "§ 19 Fehlende, verlorene oder falsch zugeordnete Etiketten",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Artikel ohne oder mit verlorenem Etikett werden zunächst im Bereich „Gesucht & Gefunden“ bzw. einem vergleichbaren internen Aufbewahrungsbereich verwahrt.",
            },
            {
              text: "MiMa bemüht sich im Rahmen des zumutbaren Geschäftsbetriebs um eine Zuordnung.",
            },
            {
              text: "Kunden sind verpflichtet, fehlende Waren oder falsch zugeordnete Waren unverzüglich zu melden.",
            },
            {
              text: "Kunden sind außerdem verpflichtet, bei der Abholung zu prüfen, ob sich fremde Waren in ihrem Regal befinden.",
            },
            {
              text: "Nicht eindeutig zuordenbare Waren werden für einen angemessenen Zeitraum aufbewahrt.",
            },
            {
              text: "Vor einer Verwertung oder sonstigen Verfügung über nicht zuordenbare Waren wird MiMa den Kunden, soweit dieser ermittelbar ist, angemessen informieren.",
            },
            {
              text: "Gesetzliche Eigentums- und Herausgabeansprüche bleiben unberührt.",
            },
          ],
        },
      ],
    },
    {
      id: "werbung",
      title: "§ 20 Bewerbung der Waren durch MiMa",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "MiMa ist berechtigt, die im Ladengeschäft angebotenen Waren zu fotografieren oder zu filmen und diese Aufnahmen zur Verkaufsförderung zu verwenden.",
            },
            {
              text: "Die Bewerbung kann insbesondere erfolgen über:",
              bullets: [
                "Instagram,",
                "Facebook,",
                "die Website von MiMa,",
                "Google,",
                "Kleinanzeigen,",
                "weitere von MiMa genutzte Onlineplattformen,",
                "sonstige Werbemittel.",
              ],
            },
            {
              text: "Die Bewerbung dient ausschließlich der Präsentation und dem Verkauf der angebotenen Waren sowie der Werbung für MiMa.",
            },
            {
              text: "Personenbezogene Daten des Kunden werden dabei grundsätzlich nicht veröffentlicht.",
            },
            {
              text: "Ein Anspruch des Kunden auf eine bestimmte Häufigkeit, Dauer oder Form der Bewerbung besteht nicht.",
            },
            {
              text: "MiMa kann einzelne Artikel aus organisatorischen, rechtlichen oder wirtschaftlichen Gründen von der Online-Bewerbung ausnehmen.",
            },
          ],
        },
      ],
    },
    {
      id: "online",
      title: "§ 21 Online-Reservierungen und Online-Verkäufe",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "MiMa kann ausgewählte Artikel zusätzlich online präsentieren und zur Reservierung anbieten.",
            },
            {
              text: "Reservierte Waren können für einen von MiMa festgelegten Zeitraum zurückgelegt werden.",
            },
            {
              text: "Wird eine Reservierung nicht innerhalb der angegebenen Frist abgeholt oder anderweitig abgeschlossen, kann MiMa die Ware wieder zum Verkauf freigeben.",
            },
            {
              text: "Bei Verkäufen über externe Plattformen gelten zusätzlich die jeweiligen Plattformbedingungen.",
            },
            {
              text: "Die Abrechnung eines über einen Onlinekanal verkauften Artikels erfolgt grundsätzlich nach denselben vereinbarten Provisions- und Abrechnungsgrundsätzen, soweit vorab nichts anderes vereinbart wurde.",
            },
          ],
        },
      ],
    },
    {
      id: "grossartikel",
      title: "§ 22 Großartikel",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Soweit MiMa einen Bereich für größere Artikel anbietet, können dort nach Verfügbarkeit insbesondere Kinderwagen, Hochstühle, Babywippen und vergleichbare Artikel angeboten werden.",
            },
            { text: "Ein Anspruch auf einen bestimmten Stellplatz besteht nicht." },
            {
              text: "Aufgrund begrenzter Fläche kann MiMa die Anzahl und Art der zugelassenen Großartikel begrenzen.",
            },
            {
              text: "MiMa kann Artikel aus Platz-, Sicherheits- oder Organisationsgründen ablehnen.",
            },
            { text: "Großartikel müssen sicher, sauber und funktionsfähig sein." },
          ],
        },
      ],
    },
    {
      id: "mietende",
      title: "§ 23 Mietende und Abholung",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Nicht verkaufte Waren müssen spätestens zum Ende der vereinbarten Mietzeit abgeholt werden.",
            },
            {
              text: "Die konkreten Abholzeiten richten sich nach den von MiMa mitgeteilten Zeiten.",
            },
            { text: "Die Abholung erfolgt grundsätzlich durch den Kunden persönlich." },
            {
              text: "Eine Abholung durch eine bevollmächtigte Person ist möglich, wenn diese eine entsprechende Vollmacht und einen gültigen Lichtbildausweis vorlegen kann.",
            },
            {
              text: "MiMa ist berechtigt, die Waren bei der Abholung auf Zuordnung und Vollständigkeit zu kontrollieren.",
            },
            {
              text: "Die Etiketten müssen bis zur abgeschlossenen Abholung an den Waren verbleiben.",
            },
          ],
        },
      ],
    },
    {
      id: "abholung-verzug",
      title: "§ 24 Nicht rechtzeitig abgeholte Waren",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Werden Waren nicht rechtzeitig abgeholt, kann MiMa die Waren aus dem Verkaufsregal nehmen und für den Kunden zur Abholung bereitstellen.",
            },
            {
              text: "Für einen nicht vorher vereinbarten Räumservice kann eine angemessene Servicegebühr berechnet werden, sofern diese dem Kunden bei Vertragsschluss bzw. vor Inanspruchnahme transparent mitgeteilt wurde.",
            },
            {
              text: "Für eine anschließende Lagerung können nach vorheriger Vereinbarung bzw. entsprechender Preisangabe Lagerkosten anfallen.",
            },
            {
              text: "MiMa setzt dem Kunden grundsätzlich eine angemessene Frist zur Abholung.",
            },
            {
              text: "Nach erfolglosem Ablauf einer angemessenen Frist kann MiMa die Ware – soweit gesetzlich zulässig – verwerten, spenden oder anderweitig darüber verfügen.",
            },
            {
              text: "Eine automatische Eigentumsübertragung wird nicht allein durch den Ablauf einer bestimmten Anzahl von Tagen angenommen, sofern die gesetzlichen Voraussetzungen hierfür nicht erfüllt sind.",
            },
            {
              text: "Ein etwaiger Verkauf nach Ablauf der Mietzeit wird entsprechend den vereinbarten Provisions- und Abrechnungsbedingungen abgerechnet.",
            },
          ],
        },
      ],
    },
    {
      id: "stornierung",
      title: "§ 25 Stornierung und Umbuchung",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Bei Buchungen gelten grundsätzlich die gesetzlichen Widerrufsrechte, soweit diese anwendbar sind.",
            },
            {
              text: "Unabhängig davon kann MiMa freiwillige Stornierungs- oder Umbuchungsbedingungen anbieten.",
            },
            {
              text: "Eine kostenfreie Umbuchung ist nur möglich, wenn MiMa dies ausdrücklich bestätigt und das gewünschte Ersatzdatum verfügbar ist.",
            },
            { text: "Bei einer Umbuchung können Preisunterschiede auszugleichen sein." },
            {
              text: "Bei Krankheit oder sonstiger Verhinderung besteht außerhalb gesetzlicher Rechte kein Anspruch auf anteilige Rückerstattung für nicht genutzte Miettage.",
            },
            { text: "Kulanzregelungen von MiMa bleiben möglich." },
          ],
        },
      ],
    },
    {
      id: "widerruf",
      title: "§ 26 Widerrufsrecht",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Bei Verträgen mit Verbrauchern, die im Fernabsatz geschlossen werden, besteht grundsätzlich ein gesetzliches Widerrufsrecht, sofern keine gesetzliche Ausnahme greift.",
            },
            {
              text: "Einzelheiten des Widerrufsrechts ergeben sich aus der gesonderten Widerrufsbelehrung und dem Muster-Widerrufsformular von MiMa.",
            },
            {
              text: "Der Widerruf kann gegenüber MiMa insbesondere per E-Mail erklärt werden.",
            },
            {
              text: "Die gesetzliche Widerrufsfrist beträgt grundsätzlich 14 Tage.",
            },
            {
              text: "Beginnt MiMa auf ausdrückliches Verlangen des Kunden vor Ablauf der Widerrufsfrist mit der Ausführung der Dienstleistung, gelten die gesetzlichen Voraussetzungen für einen vorzeitigen Leistungsbeginn und einen gegebenenfalls zu leistenden Wertersatz.",
            },
            {
              text: "Ein pauschaler Ausschluss des gesetzlichen Widerrufsrechts durch diese AGB erfolgt nicht.",
            },
          ],
        },
      ],
    },
    {
      id: "privatverkauf",
      title: "§ 27 Privatverkauf der angebotenen Waren",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Soweit eine Ware von einer Privatperson angeboten wird, handelt es sich grundsätzlich um einen Privatverkauf.",
            },
            {
              text: "Der Kaufvertrag kommt zwischen dem jeweiligen privaten Verkäufer und dem Käufer zustande.",
            },
            {
              text: "MiMa ist bei diesen Verkäufen grundsätzlich nicht Verkäuferin der Ware.",
            },
            {
              text: "Ein gesetzliches Widerrufsrecht des Käufers besteht bei einem echten Privatverkauf grundsätzlich nicht allein deshalb, weil der Kauf über MiMa abgewickelt wird.",
            },
            {
              text: "Vereinbarte Beschaffenheitsangaben und bekannte Mängel sind vom Verkäufer wahrheitsgemäß anzugeben.",
            },
            {
              text: "Ein Ausschluss der gesetzlichen Sachmängelhaftung kann bei Privatverkäufen grundsätzlich vereinbart werden, soweit gesetzlich zulässig. Ein solcher Ausschluss gilt jedoch insbesondere nicht bei arglistigem Verschweigen eines Mangels, einer übernommenen Beschaffenheits- oder Haltbarkeitsgarantie oder in gesetzlich zwingenden Fällen.",
            },
            {
              text: "MiMa übernimmt keine Garantie für die Beschaffenheit der von Privatkunden angebotenen Waren.",
            },
          ],
        },
      ],
    },
    {
      id: "gewerbliche-verkaeufer",
      title: "§ 28 Gewerbliche Verkäufer",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Gewerbliche Verkäufer müssen MiMa vor Aufnahme des Verkaufs über ihren gewerblichen Status informieren.",
            },
            {
              text: "Gewerbliche Verkäufer sind selbst für die Einhaltung der für sie geltenden gesetzlichen Vorschriften verantwortlich.",
            },
            {
              text: "Dies betrifft insbesondere:",
              bullets: [
                "Gewerbeanmeldung,",
                "steuerliche Erfassung,",
                "Umsatzsteuer,",
                "Kennzeichnungspflichten,",
                "Produktsicherheit,",
                "Verbraucherrechte,",
                "Gewährleistungsrechte,",
                "Preisangaben,",
                "Informationspflichten.",
              ],
            },
            {
              text: "MiMa übernimmt keine Steuer- oder Rechtsberatung für gewerbliche Verkäufer.",
            },
          ],
        },
      ],
    },
    {
      id: "maengel-regal",
      title: "§ 29 Mängel des Verkaufsregals",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "MiMa stellt das gebuchte Verkaufsregal für die vereinbarte Mietzeit grundsätzlich in einem zum vertragsgemäßen Gebrauch geeigneten Zustand zur Verfügung.",
            },
            {
              text: "Der Kunde hat erkennbare Mängel möglichst unverzüglich nach Feststellung zu melden.",
            },
            {
              text: "MiMa wird einen von ihr zu vertretenden erheblichen Mangel innerhalb angemessener Zeit beseitigen.",
            },
            {
              text: "MiMa kann den Mangel insbesondere durch Reparatur oder durch Bereitstellung eines gleichwertigen Ersatzregals beheben.",
            },
            {
              text: "Gesetzliche Minderungs-, Kündigungs- oder Schadensersatzrechte bleiben unberührt.",
            },
          ],
        },
      ],
    },
    {
      id: "verlust",
      title: "§ 30 Verlust, Diebstahl und Beschädigung",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "MiMa behandelt die eingebrachten Waren mit der im gewöhnlichen Geschäftsbetrieb erforderlichen Sorgfalt.",
            },
            {
              text: "MiMa kann jedoch keine Garantie für einen bestimmten Zustand der Waren während der Mietzeit übernehmen.",
            },
            {
              text: "Für Verlust, Diebstahl oder Beschädigung durch Dritte haftet MiMa nur nach den gesetzlichen Vorschriften.",
            },
            {
              text: "Eine Haftung für vorsätzlich oder grob fahrlässig verursachte Schäden wird nicht ausgeschlossen.",
            },
            {
              text: "Gleiches gilt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.",
            },
            {
              text: "Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten haftet MiMa nur für den vertragstypischen und vorhersehbaren Schaden.",
            },
            {
              text: "Im Übrigen ist die Haftung für leicht fahrlässig verursachte Schäden ausgeschlossen, soweit dies gesetzlich zulässig ist.",
            },
            {
              text: "Eine gesonderte Versicherung der vom Kunden eingebrachten Waren durch MiMa besteht nicht.",
            },
            {
              text: "Kunden können selbst prüfen, ob ihre bestehende Versicherung Schäden an Waren auf gemieteten Verkaufsflächen abdeckt.",
            },
          ],
        },
      ],
    },
    {
      id: "video",
      title: "§ 31 Videoüberwachung",
      blocks: [
        {
          type: "clauses",
          items: [
            { text: "Im Ladengeschäft kann Videoüberwachung eingesetzt werden." },
            {
              text: "Die Videoüberwachung dient insbesondere:",
              bullets: [
                "dem Schutz des Eigentums,",
                "der Wahrnehmung des Hausrechts,",
                "der Prävention und Aufklärung von Diebstählen,",
                "dem Schutz von Kunden und Mitarbeitern.",
              ],
            },
            {
              text: "Umfang, Bereiche, Speicherdauer und weitere Einzelheiten richten sich nach den gesetzlichen Datenschutzvorschriften.",
            },
            {
              text: "Die entsprechenden Informationen werden durch gesonderte Datenschutzhinweise zur Videoüberwachung bereitgestellt.",
            },
            {
              text: "Eine pauschale Zusage einer bestimmten Speicherdauer erfolgt nicht, wenn gesetzliche oder tatsächliche Gründe im Einzelfall eine andere Speicherdauer erfordern.",
            },
          ],
        },
      ],
    },
    {
      id: "datenschutz",
      title: "§ 32 Datenschutz",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "MiMa verarbeitet personenbezogene Daten im Rahmen der geltenden Datenschutzgesetze, insbesondere der Datenschutz-Grundverordnung (DSGVO).",
            },
            {
              text: "Einzelheiten zur Verarbeitung personenbezogener Daten ergeben sich aus der gesonderten Datenschutzerklärung von MiMa.",
            },
            {
              text: "Dies betrifft insbesondere Daten, die erforderlich sind für:",
              bullets: [
                "Buchung,",
                "Vertragsdurchführung,",
                "Abrechnung,",
                "Auszahlung,",
                "Kommunikation,",
                "Kundenverwaltung,",
                "Zahlungsabwicklung.",
              ],
            },
            {
              text: "Soweit externe Dienstleister wie Zahlungsanbieter, Kassensysteme oder technische Dienstleister eingesetzt werden, kann eine Verarbeitung personenbezogener Daten durch diese Dienstleister erforderlich sein.",
            },
            { text: "Es gelten ergänzend die jeweiligen Datenschutzinformationen." },
          ],
        },
      ],
    },
    {
      id: "zahlungsdienstleister",
      title: "§ 33 Zahlungsdienstleister",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Bei Online-Zahlungen können externe Zahlungsdienstleister eingesetzt werden.",
            },
            {
              text: "Je nach gewählter Zahlungsart können hierfür insbesondere Name, Anschrift, E-Mail-Adresse, Zahlungsinformationen, Transaktionsdaten sowie erforderliche technische Daten verarbeitet werden.",
            },
            {
              text: "Die Datenverarbeitung erfolgt zur Zahlungsabwicklung, Betrugsprävention und gegebenenfalls zur Erfüllung gesetzlicher Pflichten.",
            },
            {
              text: "Weitere Einzelheiten ergeben sich aus der Datenschutzerklärung von MiMa und den Datenschutzinformationen des jeweiligen Zahlungsdienstleisters.",
            },
          ],
        },
      ],
    },
    {
      id: "oeffnungszeiten",
      title: "§ 34 Öffnungszeiten und vorübergehende Schließungen",
      blocks: [
        {
          type: "clauses",
          items: [
            { text: "Die aktuellen Öffnungszeiten werden von MiMa veröffentlicht." },
            {
              text: "MiMa kann die Öffnungszeiten aus organisatorischen oder betrieblichen Gründen ändern.",
            },
            {
              text: "Eine vorübergehende Schließung kann insbesondere erforderlich sein aufgrund von:",
              bullets: [
                "Krankheit,",
                "technischen Problemen,",
                "Reparaturen,",
                "behördlichen Anordnungen,",
                "Notfällen,",
                "höherer Gewalt",
                "oder sonstigen wichtigen betrieblichen Gründen.",
              ],
            },
            {
              text: "MiMa wird Kunden über planbare Schließungen möglichst rechtzeitig informieren.",
            },
            {
              text: "Bei erheblichen Einschränkungen der vereinbarten Leistung bleiben die gesetzlichen Rechte des Kunden unberührt.",
            },
          ],
        },
      ],
    },
    {
      id: "hausrecht",
      title: "§ 35 Hausrecht",
      blocks: [
        {
          type: "clauses",
          items: [
            { text: "MiMa übt im Ladengeschäft das Hausrecht aus." },
            {
              text: "Kunden haben den Anweisungen des Personals Folge zu leisten, soweit diese dem ordnungsgemäßen und sicheren Geschäftsbetrieb dienen.",
            },
            {
              text: "Bei erheblichen Verstößen gegen diese AGB, gegen gesetzliche Vorschriften oder bei unangemessenem bzw. gefährdendem Verhalten kann MiMa Kunden von der Nutzung des Ladengeschäfts ausschließen.",
            },
            { text: "Weitergehende gesetzliche Rechte von MiMa bleiben unberührt." },
          ],
        },
      ],
    },
    {
      id: "kuendigung",
      title: "§ 36 Vertragsbeendigung und außerordentliche Kündigung",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Der Mietvertrag endet automatisch mit Ablauf des vereinbarten Mietzeitraums.",
            },
            {
              text: "Eine gesonderte Kündigung ist für die ordentliche Beendigung nicht erforderlich.",
            },
            {
              text: "Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt bestehen.",
            },
            {
              text: "Ein wichtiger Grund kann insbesondere vorliegen, wenn der Kunde:",
              bullets: [
                "wiederholt gegen diese AGB verstößt,",
                "verbotene Waren anbietet,",
                "rechtswidrig erlangte Waren anbietet,",
                "Mitarbeiter oder Kunden gefährdet,",
                "falsche Angaben zu Waren macht,",
                "trotz Aufforderung offene Zahlungen nicht begleicht,",
                "das Hausrecht verletzt.",
              ],
            },
            { text: "Gesetzliche Rechte bleiben unberührt." },
          ],
        },
      ],
    },
    {
      id: "verstoss",
      title: "§ 37 Folgen eines Verstoßes",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Bei Verstößen gegen diese AGB kann MiMa betroffene Waren aus dem Verkauf nehmen.",
            },
            { text: "MiMa kann Waren bis zur Klärung sicher verwahren." },
            {
              text: "Bei erheblichen Verstößen kann der Vertrag außerordentlich beendet werden.",
            },
            {
              text: "Weitergehende Schadensersatzansprüche bleiben unberührt, sofern deren gesetzliche Voraussetzungen erfüllt sind.",
            },
          ],
        },
      ],
    },
    {
      id: "aenderung",
      title: "§ 38 Änderung der AGB",
      blocks: [
        {
          type: "clauses",
          items: [
            {
              text: "Für neue Verträge gilt jeweils die zum Zeitpunkt des Vertragsschlusses gültige Fassung der AGB.",
            },
            {
              text: "Änderungen dieser AGB werden gegenüber bestehenden Verträgen nur vorgenommen, soweit dies gesetzlich zulässig ist.",
            },
            {
              text: "Bereits entstandene Rechte und Pflichten werden durch eine spätere Änderung der AGB nicht nachträglich verändert.",
            },
            { text: "Zwingende gesetzliche Vorschriften bleiben unberührt." },
          ],
        },
      ],
    },
    {
      id: "streitbeilegung",
      title: "§ 39 Verbraucherstreitbeilegung",
      blocks: [
        {
          type: "p",
          text: "MiMa ist grundsätzlich nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen, sofern keine gesetzliche Verpflichtung hierzu besteht.",
        },
      ],
    },
    {
      id: "recht",
      title: "§ 40 Anwendbares Recht",
      blocks: [
        {
          type: "clauses",
          items: [
            { text: "Es gilt das Recht der Bundesrepublik Deutschland." },
            {
              text: "Gegenüber Verbrauchern gilt diese Rechtswahl nur insoweit, als dadurch nicht zwingende Verbraucherschutzvorschriften des Staates eingeschränkt werden, in dem der Verbraucher seinen gewöhnlichen Aufenthalt hat.",
            },
            { text: "Die Vertragssprache ist Deutsch." },
          ],
        },
      ],
    },
    {
      id: "gerichtsstand",
      title: "§ 41 Gerichtsstand",
      blocks: [
        {
          type: "clauses",
          items: [
            { text: "Für Verbraucher gelten die gesetzlichen Gerichtsstände." },
            {
              text: "Gegenüber Unternehmern kann – soweit gesetzlich zulässig – der Sitz von MiMa als Gerichtsstand vereinbart werden.",
            },
          ],
        },
      ],
    },
    {
      id: "salvatorisch",
      title: "§ 42 Salvatorische Klausel",
      blocks: [
        {
          type: "p",
          text: "Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam oder undurchführbar sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
        },
        {
          type: "p",
          text: "An die Stelle der unwirksamen oder undurchführbaren Bestimmung treten die gesetzlichen Vorschriften.",
        },
      ],
    },
  ],
};
