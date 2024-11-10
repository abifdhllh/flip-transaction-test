import type { FC } from 'react';

import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTheme } from '@/theme';

import { IconByVariant } from '@/components/atoms';

type Props = {
  onChangeText?: (text: string) => void;
  placeholder?: string;
  value?: string;
};

const SearchBar: FC<Props> = ({
  onChangeText,
  value,
  placeholder = 'Cari nama, bank, atau nominal',
}) => {
  const { layout, gutters, backgrounds, borders, colors, fonts } = useTheme();

  return (
    <View
      style={[
        backgrounds.default,
        gutters.padding_16,
        gutters.gap_12,
        layout.row,
        layout.itemsCenter,
        borders.rounded_8,
      ]}
    >
      <View
        style={[layout.row, layout.itemsCenter, gutters.gap_12, layout.flex_1]}
      >
        <IconByVariant path="search" stroke={colors.gray200} />
        <TextInput
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.gray200}
          style={[gutters.margin_0, gutters.padding_0, layout.flex_1]}
          value={value}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[layout.row, layout.itemsCenter]}
      >
        <Text style={[fonts.orange, fonts.bold]}>URUTKAN</Text>
        <IconByVariant
          height={20}
          path="chevron-down"
          stroke={colors.orange}
          width={20}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
