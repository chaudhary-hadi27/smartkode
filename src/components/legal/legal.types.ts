export interface LegalSection {
  title: string;
  content: string | string[]; // string for a single paragraph, string[] for multiple
}

export interface LegalPageData {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: LegalSection[];
}
