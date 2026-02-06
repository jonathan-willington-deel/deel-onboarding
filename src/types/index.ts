export interface TeamMember {
  name: string;
  team: string;
}

export interface ProductTeamMember {
  name: string;
  role: string;
}

export interface DesignPerson {
  name: string;
  role: string;
  team?: string;
  photo?: string;
}

export interface CustomTask {
  text: string;
  link?: string;
}

export interface OnboardingData {
  name: string;
  startDate: string;
  jobTitle: string;
  productVertical: string;
  designGroup: string;
  lineManager: string;
  onboardingBuddy: string;
  customMessage?: string;
  teamDesigners: TeamMember[];
  productTeam: ProductTeamMember[];
  customTasks: CustomTask[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  link?: string;
  linkText?: string;
  photo?: string;
  icon?: string;
}

export interface ChecklistSubsection {
  title: string;
  items: ChecklistItem[];
  readOnly?: boolean;
}

export interface Section {
  id: string;
  title: string;
  icon: string;
  subsections: ChecklistSubsection[];
  description?: string;
}

export interface SlackChannel {
  name: string;
  url: string;
  description: string;
}

export interface ProgressData {
  completedItems: string[];
  lastVisited: string;
  lastUpdated: number;
}
