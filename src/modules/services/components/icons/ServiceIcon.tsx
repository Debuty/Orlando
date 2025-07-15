interface ServiceIconProps {
  name: string;
  className?: string;
}

const ServiceIcon = ({ name, className = '' }: ServiceIconProps) => {
  switch (name) {
    case 'chalet':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M3 21H21" stroke="#00B5E2" strokeWidth="2" strokeLinecap="round"/>
          <path d="M5 21V8L12 3L19 8V21" stroke="#00B5E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 21V15H15V21" stroke="#00B5E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'room-service':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M3 12H21" stroke="#00B5E2" strokeWidth="2" strokeLinecap="round"/>
          <path d="M3 6H21" stroke="#00B5E2" strokeWidth="2" strokeLinecap="round"/>
          <path d="M3 18H21" stroke="#00B5E2" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 21H20" stroke="#00B5E2" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 6V18" stroke="#00B5E2" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    case 'entertainment':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M12 8V16" stroke="#00B5E2" strokeWidth="2" strokeLinecap="round"/>
          <path d="M8 12H16" stroke="#00B5E2" strokeWidth="2" strokeLinecap="round"/>
          <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#00B5E2" strokeWidth="2"/>
        </svg>
      );
    case 'vip':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z" stroke="#00B5E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return null;
  }
};

export default ServiceIcon; 