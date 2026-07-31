export const setRTL = (element: HTMLElement) => {
  element.dir = 'rtl';
  element.style.textAlign = 'right';
};

export const setLTR = (element: HTMLElement) => {
  element.dir = 'ltr';
  element.style.textAlign = 'left';
};

export const isRTL = (element: HTMLElement) => {
  return element.dir === 'rtl';
};

// Helper for conditional class names in RTL context
export const rtlClass = (rtlClassName: string, ltrClassName: string, isRtl = true) => {
  return isRtl ? rtlClassName : ltrClassName;
}; 