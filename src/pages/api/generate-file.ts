import { readFileData } from "../../utilities/handle-stream";

export const post = async ({ request }) => {
  const data = await request.formData();
  const blobFile = data.get("file") as Blob;
  const streamReader = blobFile.stream().getReader();
  const jsonData = await readFileData(streamReader);
  return {
    body: jsonData,
  };
};
