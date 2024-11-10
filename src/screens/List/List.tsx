import type { FC } from 'react';
import type { ListRenderItemInfo } from 'react-native';
import type { TransactionSchema } from '@/hooks/domain/transaction/schema';
import type { RootScreenProps } from '@/navigation/types';

import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';

import { useTheme } from '@/theme';
import { BANK_NAME_MAPPING } from '@/hooks/domain/transaction/constant';
import useTransaction from '@/hooks/domain/transaction/useTransaction';
import { Paths } from '@/navigation/paths';

import { SearchBar } from '@/components/molecules';
import TransactionItem from '@/components/molecules/TransactionItem/TransactionItem';
import { SafeScreen } from '@/components/templates';

import { formatCurrency, formatDate } from '@/utils/string';

type Props = RootScreenProps<Paths.List>;

const List: FC<Props> = ({ navigation: { navigate } }) => {
  const { layout, backgrounds, gutters } = useTheme();

  const { useFetchTransactionList } = useTransaction();
  const { data, isError, refetch, isFetching } = useFetchTransactionList();

  const [searchValue, setSearchValue] = useState('');

  const filterData = useCallback(
    (unfilteredData: TransactionSchema[]) => {
      function filterPerRecord(value: string) {
        return value?.toLowerCase()?.includes(searchValue?.toLowerCase());
      }

      return unfilteredData?.filter(
        (item) =>
          filterPerRecord(item?.sender_bank) ||
          filterPerRecord(item?.beneficiary_bank) ||
          filterPerRecord(item?.beneficiary_name) ||
          filterPerRecord(item?.amount?.toString()),
      );
    },
    [searchValue],
  );

  const transformedData = useMemo(() => {
    if (data) {
      return filterData(Object.values(data));
    }

    return [];
  }, [data, filterData]);

  const renderTransactionItem = useCallback(
    ({ item }: ListRenderItemInfo<TransactionSchema>) => {
      const {
        sender_bank: senderBank,
        beneficiary_bank: beneficiaryBank,
        amount,
        status,
        beneficiary_name: beneficiaryName,
        created_at: date,
        id: transactionId,
        unique_code: uniqueCode,
        account_number: accountNumber,
        remark,
      } = item || {};

      const transactionData = {
        senderBank:
          BANK_NAME_MAPPING?.[senderBank] || senderBank?.toUpperCase(),
        beneficiaryBank:
          BANK_NAME_MAPPING?.[beneficiaryBank] || senderBank?.toUpperCase(),
        amount: formatCurrency(amount),
        status,
        beneficiaryName: beneficiaryName?.toUpperCase(),
        date: formatDate(date),
        transactionId,
        uniqueCode,
        accountNumber,
        remark,
      };

      function handlePressItem() {
        navigate(Paths.Detail, transactionData);
      }

      return <TransactionItem onPress={handlePressItem} {...transactionData} />;
    },
    [],
  );

  return (
    <SafeScreen isError={isError} onResetError={refetch}>
      <View style={[backgrounds.gray50, layout.flex_1, gutters.gap_12]}>
        <View style={[gutters.paddingHorizontal_12, gutters.paddingTop_12]}>
          <SearchBar onChangeText={setSearchValue} value={searchValue} />
        </View>

        <FlatList
          contentContainerStyle={[
            gutters.gap_12,
            gutters.paddingHorizontal_12,
            gutters.paddingBottom_12,
          ]}
          data={transformedData}
          keyExtractor={(item) => `transaction-item-${item?.id}`}
          onRefresh={refetch}
          refreshing={isFetching}
          renderItem={renderTransactionItem}
        />
      </View>
    </SafeScreen>
  );
};

export default List;
