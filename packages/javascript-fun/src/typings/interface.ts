/** Top Navigation Button Config */
export interface TopNavConfigSchema {
  to: string;
  img: string;
  title: string;
  alt: string;
  disqusId: string;
  asset: string;
  page: number;
  adPositions: number[];
}

export interface GitGroupSchema extends GroupBaseSchema {
  icon: string;
  list: GitSchema[];
}

export interface LinkGroupSchema extends GroupBaseSchema {
  icon: string;
  list: LinkSchema[];
}

interface GroupBaseSchema {
  id: number;
  name: string;
  page: number;
  sort: number;
  anchorId: string;
}

export interface GitSchema {
  category: number;
  github: string;
  name: string;
  star: number;
  inactiveDate: string;
  img?: string;
}

export interface LinkSchema {
  category: number;
  url: string;
  name: string;
  desc?: string;
}
