export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  key: string;
}

export interface FAQCategory {
  id: string;
  name: string;
  key: string;
  icon?: React.ReactNode;
}

export interface FAQSection {
  category: FAQCategory;
  items: FAQItem[];
} 