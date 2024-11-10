enum SortType {
  DateAscending = 'date_ascending',
  DateDescending = 'date_descending',
  NameAscending = 'name_ascending',
  NameDescending = 'name_descending',
}

const SORT_OPTIONS = [
  {
    value: '',
    label: 'URUTKAN',
  },
  {
    value: SortType.NameAscending,
    label: 'Nama A-Z',
  },
  {
    value: SortType.NameDescending,
    label: 'Nama Z-A',
  },
  {
    value: SortType.DateDescending,
    label: 'Tanggal Terbaru',
  },
  {
    value:  SortType.DateAscending,
    label: 'Tanggal Terlama',
  },
];

export { SORT_OPTIONS, SortType };
