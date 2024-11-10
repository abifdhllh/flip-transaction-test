import { useErrorBoundary } from 'react-error-boundary';
import { Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/theme';

import { IconByVariant } from '@/components/atoms';

type Props = {
  onReset?: () => void;
};

function DefaultErrorScreen({ onReset = undefined }: Props) {
  const { gutters, layout, colors, fonts } = useTheme();
  const { resetBoundary } = useErrorBoundary();

  return (
    <View
      style={[
        layout.flex_1,
        layout.justifyCenter,
        layout.itemsCenter,
        gutters.gap_16,
        gutters.padding_16,
      ]}
    >
      <IconByVariant
        height={42}
        path="fire"
        stroke={colors.red500}
        width={42}
      />
      <Text style={[fonts.gray800, fonts.bold, fonts.size_16]}>
        Oops! Something went wrong
      </Text>
      <Text style={[fonts.gray800, fonts.size_12, fonts.alignCenter]}>
        We are sorry for the inconvenience. Please try again later.
      </Text>

      {onReset && (
        <TouchableOpacity
          onPress={() => {
            resetBoundary();
            onReset?.();
          }}
        >
          <Text style={[fonts.gray800, fonts.size_16]}>Reload the screen</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default DefaultErrorScreen;
