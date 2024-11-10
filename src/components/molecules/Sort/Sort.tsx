import type { FC } from 'react';
import type { RadioValue } from '@/components/atoms';

import React, { useMemo } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/theme';
import { useBoolean } from '@/hooks';

import { IconByVariant, RadioButton } from '@/components/atoms';

type Props = {
  onSelectOption: (value: string | number) => void;
  sortOptions: RadioValue[];
  sortValue?: string | number;
};

const Sort: FC<Props> = ({ sortOptions, sortValue, onSelectOption }) => {
  const { layout, fonts, colors } = useTheme();

  const {
    value: isModalFilterVisible,
    setTrue: openModalFilter,
    setFalse: closeModalFilter,
  } = useBoolean(false);

  const selectedLabel = useMemo(() => {
    return sortOptions?.find((item) => item?.value === sortValue)?.label;
  }, [sortOptions, sortValue]);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={openModalFilter}
        style={[layout.row, layout.itemsCenter]}
      >
        <Text style={[fonts.orange, fonts.bold]}>
          {selectedLabel || sortOptions?.[0]?.label}
        </Text>
        <IconByVariant
          height={20}
          path="chevron-down"
          stroke={colors.orange}
          width={20}
        />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        hardwareAccelerated
        onRequestClose={closeModalFilter}
        statusBarTranslucent
        transparent
        visible={isModalFilterVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <RadioButton
              onPress={(value) => {
                closeModalFilter();

                onSelectOption(value);
              }}
              options={sortOptions}
              selected={sortValue}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
  },
});

export default Sort;
