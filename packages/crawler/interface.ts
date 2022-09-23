export interface GitSchema {
  category: number;
  github: string;
  name: string;
  star: number;
  lastUpdate?: string;
  inactiveDate: string;
  img?: string;
}

export interface GitParseResult {
  star: number;
  lastUpdate: string;
}
