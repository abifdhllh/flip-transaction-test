function sortObjectByStringAscending(
  array: Array<Record<string, any>>,
  sortAccessor: string,
) {
  return array.sort((a, b) => {
    const stringA = a[sortAccessor].toLowerCase();
    const stringB = b[sortAccessor].toLowerCase();

    let comparison = 0;
    if (stringA > stringB) {
      comparison = 1;
    } else if (stringA < stringB) {
      comparison = -1;
    }
    return comparison;
  });
}

 function sortObjectByStringDescending(
  array: Array<Record<string, any>>,
  sortAccessor: string,
) {
  return array.sort((a, b) => {
    const stringA = a[sortAccessor].toLowerCase();
    const stringB = b[sortAccessor].toLowerCase();

    let comparison = 0;
    if (stringB > stringA) {
      comparison = 1;
    } else if (stringB < stringA) {
      comparison = -1;
    }
    return comparison;
  });
}

 function sortObjectByDateAscending(
  array: Array<Record<string, any>>,
  sortAccessor: string,
) {
  return array.sort((a, b) => {
    const dateStringA = a[sortAccessor];
    const yearA = Number(dateStringA.slice(0, 4));
    const monthA = Number(dateStringA.slice(5, 7));
    const dateA = Number(dateStringA.slice(8, 10));

    const dateStringB = b[sortAccessor];
    const yearB = Number(dateStringB.slice(0, 4));
    const monthB = Number(dateStringB.slice(5, 7));
    const dateB = Number(dateStringB.slice(8, 10));

    // @ts-ignore
    return new Date(yearA, monthA, dateA) - new Date(yearB, monthB, dateB);
  });
}

function sortObjectByDateDescending(
  array: Array<Record<string, any>>,
  sortAccessor: string,
) {
  return array.sort((a, b) => {
    const dateStringA = a[sortAccessor];
    const yearA = Number(dateStringA.slice(0, 4));
    const monthA = Number(dateStringA.slice(5, 7));
    const dateA = Number(dateStringA.slice(8, 10));

    const dateStringB = b[sortAccessor];
    const yearB = Number(dateStringB.slice(0, 4));
    const monthB = Number(dateStringB.slice(5, 7));
    const dateB = Number(dateStringB.slice(8, 10));

    // @ts-ignore
    return new Date(yearB, monthB, dateB) - new Date(yearA, monthA, dateA);
  });
}

export {
  sortObjectByDateAscending,
  sortObjectByDateDescending,
  sortObjectByStringAscending,
  sortObjectByStringDescending,
};
