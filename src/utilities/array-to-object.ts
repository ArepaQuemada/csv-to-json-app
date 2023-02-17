// TODO BUSCAR UNA MANERA DE GUARDAR LA PRIMERA FILA, YA QUE ESTE METODO SE LLAMA VARIAS VECES Y SE PIERDE EL ROW DEBIDO A QUE SE USA STREAM
export const arrayToObject = (array: string[][]) => {
  const result = array.map((currentRow, _, originalArray) => {
    return currentRow.reduce((acum, currentValue, index) => {
      const mainRow = originalArray[0];
      if (index >= mainRow.length) return acum;
      return {
        ...acum,
        [mainRow[index].trim()]: currentValue,
      };
    }, {});
  });
  return result;
};
