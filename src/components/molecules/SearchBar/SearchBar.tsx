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
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
