import { arrayToObject } from "./array-to-object";
import { convertFileToArray } from "./file-to-array";
import { makeJson } from "./make-json";
import { pipe } from "./pipe";

export async function readFileData(streamReader) {
  let responseJsonArray = [];

  console.log("PROCCESSING JSON");
  return new Promise((resolve) => {
    streamReader.read().then(function processData({ done, value }) {
      if (done) {
        console.log("END OF PROCCESS");
        return resolve(makeJson(responseJsonArray));
      }

      const decodedToString = new TextDecoder().decode(value);

      const resultArray = pipe(
        convertFileToArray,
        arrayToObject
      )(decodedToString);
      responseJsonArray = responseJsonArray.concat(resultArray);
      return streamReader.read().then(processData);
    });
  });
}
