/** Top Navigation Button Config */
export interface TopNavConfigSchema {
  to: string;
  img: string;
  title: string;
  alt: string;
  disqusId: string;
  asset: string;
  page: number;
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

export interface GitSchema extends LinkSchema {
  github: string;
  img: string;
  star: number;
}

export interface LinkSchema {
  id: number;
  name: string;
  desc: string;
  url: string;
  grp: number;
}
