export interface AboutValue {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface AboutStat {
  id: number;
  value: string;
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
  content: string;
  image?: string;
} 