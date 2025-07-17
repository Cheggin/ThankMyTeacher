import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { useDeviceType } from '../hooks/useDeviceType';

export function HapticTab(props: BottomTabBarButtonProps) {
  const { isMobile } = useDeviceType();
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (isMobile) {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}
