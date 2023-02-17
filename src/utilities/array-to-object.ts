export const arrayToObject = (array: string[][], mainRow: string[]) => {
  return array.map((currentRow) => {
    return currentRow.reduce((acum, currentValue, index) => {
      return {
        ...acum,
        [mainRow[index].trim()]: currentValue,
      };
    }, {});
  });
};
