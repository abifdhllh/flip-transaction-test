import type { FC } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';

import React, { useMemo } from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '@/theme';
import { TransactionStatus } from '@/hooks/domain/transaction/schema';

type Props = {
  status: TransactionStatus;
};

const StatusLabel: FC<Props> = ({ status }) => {
  const { colors, gutters, borders, fonts } = useTheme();

  const labelConfig: {
    styles: ViewStyle & TextStyle;
    text: string;
  } = useMemo(() => {
    switch (status) {
      case TransactionStatus.Success: {
        return {
          styles: {
            backgroundColor: colors.green,
            color: colors.default,
            borderColor: colors.green,
          },
          text: 'Berhasil',
        };
      }
      case TransactionStatus.Pending: {
        return {
          styles: {
            backgroundColor: colors.default,
            color: colors.gray800,
            borderColor: colors.orange,
          },
          text: 'Pengecekan',
        };
      }
      default: {
        return {
          styles: {},
          text: '',
        };
      }
    }
  }, [colors.default, colors.gray800, colors.green, colors.orange, status]);

  return (
    <View
      style={[
        gutters.paddingVertical_4,
        gutters.paddingHorizontal_8,
        borders.rounded_4,
        borders.w_1,
        {
          borderColor: labelConfig.styles.borderColor,
          backgroundColor: labelConfig.styles.backgroundColor,
        },
      ]}
    >
      <Text style={[fonts.bold, { color: labelConfig.styles.color }]}>
        {labelConfig?.text}
      </Text>
    </View>
  );
};

export default StatusLabel;
