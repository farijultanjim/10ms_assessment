export interface MediaItem {
  name: string;
  resource_type: string;
  resource_value: string;
  thumbnail_url?: string; // Optional based on the API data
}

export interface ChecklistItem {
  color: string;
  icon: string;
  id: string;
  list_page_visibility: boolean;
  text: string;
}

export interface CtaText {
  name: string;
  value: string;
}

export interface SectionValue {
  // Simplified for now, expand as needed
  [key: string]: any;
}

export interface Section {
  type: string;
  name: string;
  description: string;
  bg_color: string;
  order_idx: number;
  values: SectionValue[];
}

export interface CourseData {
  slug: string;
  id: number;
  title: string;
  description: string;
  cta_text: CtaText;
  media: MediaItem[];
  checklist: ChecklistItem[];
  sections: Section[];
}

export interface ApiResponse {
  code: number;
  data: CourseData;
  error: any[];
  message: string;
  payload: any[];
  status_code: number;
}
