import type { FC } from 'react';
import type { Paths } from '@/navigation/paths';
import type { RootScreenProps } from '@/navigation/types';

import Clipboard from '@react-native-clipboard/clipboard';
import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { useTheme } from '@/theme';

import { IconByVariant } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';

type Props = RootScreenProps<Paths.Detail>;

const Detail: FC<Props> = ({ route: { params }, navigation: { goBack } }) => {
  const { backgrounds, layout, gutters, fonts, borders, colors } = useTheme();

  const {
    transactionId,
    senderBank,
    beneficiaryBank,
    beneficiaryName,
    accountNumber,
    amount,
    remark,
    uniqueCode,
    date,
  } = params || {};

  const handleCopyTransactionId = useCallback(() => {
    Clipboard.setString(transactionId);

    Toast.show({
      text1: 'Berhasil salin',
      text2: 'ID transaksi berhasil disalin',
      type: 'success',
      position: 'bottom',
    });
  }, [transactionId]);

  return (
    <SafeScreen>
      <View
        style={[backgrounds.gray50, layout.flex_1, gutters.paddingVertical_16]}
      >
        <View
          style={[
            backgrounds.default,
            gutters.padding_20,
            gutters.gap_4,
            layout.row,
            layout.itemsCenter,
            borders.wBottom_1,
            borders.gray50,
          ]}
        >
          <Text style={[fonts.reverseDefault, fonts.bold]}>
            ID Transaksi: #{transactionId}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={layout.hitslopValue}
            onPress={handleCopyTransactionId}
          >
            <IconByVariant
              height={16}
              path="copy"
              stroke={colors.orange}
              width={16}
            />
          </TouchableOpacity>
        </View>

        <View
          style={[
            backgrounds.default,
            gutters.padding_20,
            gutters.gap_8,
            layout.row,
            layout.itemsCenter,
            layout.justifyBetween,
            borders.wBottom_1,
            borders.gray100,
          ]}
        >
          <Text style={[fonts.reverseDefault, fonts.bold]}>
            DETAIL TRANSAKSI
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={layout.hitslopValue}
            onPress={goBack}
          >
            <Text style={fonts.orange}>Tutup</Text>
          </TouchableOpacity>
        </View>

        <View style={[backgrounds.default, gutters.padding_20, gutters.gap_12]}>
          <View style={[layout.row, layout.itemsCenter, gutters.gap_4]}>
            <Text style={[fonts.reverseDefault, fonts.bold, fonts.size_16]}>
              {senderBank}
            </Text>
            <IconByVariant height={12} path="arrow-right" width={12} />
            <Text style={[fonts.reverseDefault, fonts.bold, fonts.size_16]}>
              {beneficiaryBank}
            </Text>
          </View>
          <View style={[layout.row, layout.itemsCenter, gutters.gap_8]}>
            <View style={{ flex: 3 }}>
              <Text style={[fonts.reverseDefault, fonts.bold]}>
                {beneficiaryName}
              </Text>
              <Text style={[fonts.reverseDefault]}>{accountNumber}</Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={[fonts.reverseDefault, fonts.bold]}>NOMINAL</Text>
              <Text style={[fonts.reverseDefault]}>{amount}</Text>
            </View>
          </View>
          <View style={[layout.row, layout.itemsCenter, gutters.gap_8]}>
            <View style={{ flex: 3 }}>
              <Text style={[fonts.reverseDefault, fonts.bold]}>
                BERITA TRANSFER
              </Text>
              <Text style={[fonts.reverseDefault]}>{remark}</Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={[fonts.reverseDefault, fonts.bold]}>KODE UNIK</Text>
              <Text style={[fonts.reverseDefault]}>{uniqueCode}</Text>
            </View>
          </View>
          <View style={[layout.row, layout.itemsCenter, gutters.gap_8]}>
            <View style={{ flex: 3 }}>
              <Text style={[fonts.reverseDefault, fonts.bold]}>
                WAKTU DIBUAT
              </Text>
              <Text style={[fonts.reverseDefault]}>{date}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeScreen>
  );
};

export default Detail;
