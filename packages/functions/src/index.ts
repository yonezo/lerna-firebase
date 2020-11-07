import { message } from "@lerna-firebase/shared";
import cors from "cors";
import * as functions from "firebase-functions";

export const hello = functions.https.onRequest((_, res) => {
  cors({ origin: true })(_, res, () => {
    res.status(200).json({ message });
  });
});
