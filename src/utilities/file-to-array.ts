export const convertFileToArray = (file: string) => {
  return file
    .trim()
    .split(/\n/g)
    .reduce<string[][]>(
      (acum, currentValue) => [...acum, currentValue.split(";")],
      []
    );
};
