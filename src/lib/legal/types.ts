export interface LegalClause {
  text: string;
  bullets?: string[];
  aside?: string;
}

export type LegalBlock =
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "lead"; text: string }
  | { type: "clauses"; items: LegalClause[] }
  | { type: "ul"; items: string[] }
  | { type: "formula"; text: string };

export interface LegalSection {
  id: string;
  title: string;
  blocks: LegalBlock[];
}

export interface LegalParty {
  name: string;
  street: string;
  postalCode: string;
  city: string;
  ownerLabel: string;
  ownerName: string;
  legalForm: string;
  email: string;
  websiteLabel: string;
  websiteHref: string;
}

export interface LegalDocumentData {
  title: string;
  published: string;
  party: LegalParty;
  sections: LegalSection[];
  closing: string[];
}
