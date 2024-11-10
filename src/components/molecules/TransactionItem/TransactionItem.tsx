import type { FC } from 'react';
import type { ViewStyle } from 'react-native';

import React, { memo, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/theme';
import { TransactionStatus } from '@/hooks/domain/transaction/schema';

import { IconByVariant, StatusLabel } from '@/components/atoms';

type Props = {
  amount: string;
  beneficiaryBank: string;
  beneficiaryName: string;
  date: string;
  onPress: () => void;
  senderBank: string;
  status: TransactionStatus;
};

const TransactionItem: FC<Props> = ({
  senderBank,
  beneficiaryBank,
  amount,
  date,
  beneficiaryName,
  status,
  onPress,
}) => {
  const { layout, gutters, fonts, backgrounds, borders, colors } = useTheme();

  const itemStyles: ViewStyle = useMemo(() => {
    switch (status) {
      case TransactionStatus.Success: {
        return {
          borderLeftColor: colors.green,
        };
      }
      case TransactionStatus.Pending: {
        return {
          borderLeftColor: colors.orange,
        };
      }
      default: {
        return {};
      }
    }
  }, [colors.green, colors.orange, status]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        gutters.padding_12,
        gutters.gap_8,
        layout.row,
        layout.justifyBetween,
        layout.itemsCenter,
        borders.rounded_8,
        backgrounds.default,
        { borderLeftColor: itemStyles.borderLeftColor, borderLeftWidth: 8 },
      ]}
    >
      <View style={gutters.gap_4}>
        <View style={[layout.row, layout.itemsCenter, gutters.gap_4]}>
          <Text style={[fonts.reverseDefault, fonts.bold]}>{senderBank}</Text>
          <IconByVariant height={12} path="arrow-right" width={12} />
          <Text style={[fonts.reverseDefault, fonts.bold]}>
            {beneficiaryBank}
          </Text>
        </View>
        <Text style={fonts.reverseDefault}>{beneficiaryName}</Text>
        <View style={[layout.row, layout.itemsCenter]}>
          <Text style={fonts.reverseDefault}>{amount}</Text>
          <IconByVariant path="dot" style={{ margin: -4 }} />
          <Text style={fonts.reverseDefault}>{date}</Text>
        </View>
      </View>
      <StatusLabel status={status} />
    </TouchableOpacity>
  );
};

export default memo(TransactionItem);
