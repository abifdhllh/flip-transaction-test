enum BankName {
  BCA = 'bca',
  BNI = 'bni',
  BRI = 'bri',
  BSM = 'bsm',
  BTPN = 'btpn',
  Mandiri = 'mandiri',
  Muamalat = 'muamalat',
  Permata = 'permata'
}

const BANK_NAME_MAPPING: Record<string, string> = {
  [BankName.BCA]: 'BCA',
  [BankName.BNI]: 'BNI',
  [BankName.BRI]: 'BRI',
  [BankName.BSM]: 'BSM',
  [BankName.BTPN]: 'BTPN',
  [BankName.Mandiri]: 'Mandiri',
  [BankName.Muamalat]: 'Muamalat',
  [BankName.Permata]: 'Permata',
};

export { BANK_NAME_MAPPING };
