import { APIRoute } from "astro";
import { convertFileToArray } from "../../utilities/file-to-array";
import { arrayToObject } from "../../utilities/array-to-object";
import { makeJson } from "../../utilities/make-json";
import { pipe } from "../../utilities/pipe";

export const post: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const blobFile = data.get("file") as Blob;
  const csvText = await blobFile.text();
  const jsonString = pipe(convertFileToArray, arrayToObject, makeJson)(csvText);
  return {
    body: jsonString,
  };
};
