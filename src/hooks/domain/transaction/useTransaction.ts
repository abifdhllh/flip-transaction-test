import { useQuery, useQueryClient } from '@tanstack/react-query';

import { TransacitionServices } from './transactionService';

const enum TransactionQueryKey {
  fetchList = 'fetchTransactionList',
}

const useFetchTransactionList = () =>
  useQuery({
    queryKey: [TransactionQueryKey.fetchList],
    queryFn: () => TransacitionServices.fetchList(),
    refetchOnMount: true,
  });

const useTransaction = () => {
  const client = useQueryClient();

  const invalidateQuery = (queryKeys: TransactionQueryKey[]) =>
    client.invalidateQueries({
      queryKey: queryKeys,
    });

  return {
    useFetchTransactionList,
    invalidateQuery,
  };
};

export default useTransaction;
