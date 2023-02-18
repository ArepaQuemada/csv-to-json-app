import { arrayToObject } from "./array-to-object";
import { convertFileToArray } from "./file-to-array";
import { makeJson } from "./make-json";

export async function readFileData(streamReader) {
  let responseJsonArray = [];
  let mainRow: null | string[] = null;

  return new Promise((resolve) => {
    streamReader.read().then(function processData({ done, value }) {
      if (done) {
        return resolve(makeJson(responseJsonArray.splice(1)));
      }

      const decodedToString = new TextDecoder().decode(value);
      console.log(decodedToString);

      const convertedMatrix = convertFileToArray(decodedToString);

      if (!mainRow) {
        mainRow = convertedMatrix[0];
      }

      const arrayObject = arrayToObject(convertedMatrix, mainRow);

      responseJsonArray = responseJsonArray.concat(arrayObject);
      return streamReader.read().then(processData);
    });
  });
}
