import { instance } from '@/services/instance';

import { transactionsSchema } from './schema';

export const TransacitionServices = {
  fetchList: async () => {
    const response = await instance.get(`frontend-test`).json();

    return transactionsSchema.parse(response);
  },
};
