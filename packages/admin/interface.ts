export interface GitSchema {
  category: number;
  github: string;
  img?: string;
  name?: string;
}

export interface SiteSchema {
  category: number;
  url: string;
  name: string;
  desc?: string;
}

export interface CategorySchema {
  id: number;
  name: string;
  page: number;
  icon?: string;
  sort?: number;
}
