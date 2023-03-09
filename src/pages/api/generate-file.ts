import { readFileData } from "../../utilities/handle-stream";

export const post = async ({ request }) => {
  return {
    body: JSON.stringify([{ example: "" }]),
  };
};
