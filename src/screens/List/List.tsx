import type { ListRenderItemInfo } from '@shopify/flash-list';
import type { FC } from 'react';
import type { TransactionSchema } from '@/hooks/domain/transaction/schema';
import type { RootScreenProps } from '@/navigation/types';

import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import { useTheme } from '@/theme';
import { useTransaction } from '@/hooks';
import { BANK_NAME_MAPPING } from '@/hooks/domain/transaction/constant';
import { Paths } from '@/navigation/paths';

import { SearchBar, Sort } from '@/components/molecules';
import TransactionItem from '@/components/molecules/TransactionItem/TransactionItem';
import { SafeScreen } from '@/components/templates';

import {
  sortObjectByDateAscending,
  sortObjectByDateDescending,
  sortObjectByStringAscending,
  sortObjectByStringDescending,
} from '@/utils/function';
import { formatCurrency, formatDate } from '@/utils/string';

import { SORT_OPTIONS, SortType } from './constant';

type Props = RootScreenProps<Paths.List>;

const List: FC<Props> = ({ navigation: { navigate } }) => {
  const { layout, backgrounds, gutters, borders } = useTheme();

  const { useFetchTransactionList } = useTransaction();
  const { data, isError, refetch, isFetching } = useFetchTransactionList();

  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState<string | number>(
    SORT_OPTIONS[0].value,
  );

  const sortData = useCallback(
    (unsortedData: TransactionSchema[]) => {
      if (unsortedData?.length) {
        switch (sortValue) {
          case SortType.NameAscending: {
            return sortObjectByStringAscending(
              unsortedData,
              'beneficiary_name',
            ) as TransactionSchema[];
          }
          case SortType.NameDescending: {
            return sortObjectByStringDescending(
              unsortedData,
              'beneficiary_name',
            ) as TransactionSchema[];
          }
          case SortType.DateAscending: {
            return sortObjectByDateAscending(
              unsortedData,
              'created_at',
            ) as TransactionSchema[];
          }
          case SortType.NameDescending: {
            return sortObjectByDateDescending(
              unsortedData,
              'created_at',
            ) as TransactionSchema[];
          }
          default: {
            return unsortedData;
          }
        }
      }

      return [];
    },
    [sortValue],
  );

  const filterData = useCallback(
    (unfilteredData: TransactionSchema[]) => {
      if (unfilteredData?.length) {
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
      }

      return [];
    },
    [searchValue],
  );

  const transformedData = useMemo(() => {
    if (data) {
      return filterData(sortData(Object.values(data)));
    }

    return [];
  }, [data, filterData, sortData]);

  const renderTransactionItem = useCallback(
    ({ item, index }: ListRenderItemInfo<TransactionSchema>) => {
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

  const renderItemSeparator = useCallback(() => {
    return <View style={gutters.marginBottom_12} />;
  }, []);

  return (
    <SafeScreen isError={isError} onResetError={refetch}>
      <View style={[backgrounds.gray50, layout.flex_1, gutters.gap_12]}>
        <View
          style={[
            backgrounds.default,
            gutters.padding_16,
            gutters.gap_12,
            layout.row,
            layout.itemsCenter,
            borders.rounded_8,
            gutters.marginHorizontal_12,
            gutters.marginTop_12,
          ]}
        >
          <SearchBar onChangeText={setSearchValue} value={searchValue} />
          <Sort
            onSelectOption={setSortValue}
            sortOptions={SORT_OPTIONS}
            sortValue={sortValue}
          />
        </View>

        <FlashList
          ItemSeparatorComponent={renderItemSeparator}
          contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 12 }}
          data={transformedData}
          estimatedItemSize={130}
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
