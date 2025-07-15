export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface FAQCategory {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

export interface FAQSection {
  category: FAQCategory;
  items: FAQItem[];
} 