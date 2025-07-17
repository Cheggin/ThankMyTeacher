import { useWindowDimensions } from 'react-native';

export const useDeviceType = () => {
  const { width } = useWindowDimensions();

  // Pixel-based device detection (same as navbar)
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  return {
    isMobile,
    isTablet,
    isDesktop,
    width,
  };
}; 