import type { StackScreenProps } from '@react-navigation/stack';
import type { Paths } from '@/navigation/paths';

export type DetailParamList = {
  accountNumber: string;
  amount: string;
  beneficiaryBank: string;
  beneficiaryName: string;
  date: string;
  remark: string;
  senderBank: string;
  transactionId: string;
  uniqueCode: number;
};

export type RootStackParamList = {
  [Paths.Startup]: undefined;
  [Paths.Example]: undefined;
  [Paths.List]: undefined;
  [Paths.Detail]: DetailParamList;
};

export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;
