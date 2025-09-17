export interface AboutValue {
  id: number;
  tag: string;
  title: string;
  description: string;
  icon: string;
}

export interface AboutStat {
  id: number;
  value: string;
  tag: string;
  label: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

export interface AboutStorySection {
  title: string;
  tag: string;
  content: string;
  image?: string;
} 