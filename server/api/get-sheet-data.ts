import type { IncomingMessage, ServerResponse } from "http";
import axios from "axios";

export default async (req: IncomingMessage, res1: ServerResponse) => {
  const { google } = require("googleapis");
  const sheets = google.sheets("v4");
  const auth = new google.auth.GoogleAuth({
    // Scopes can be specified either as an array or as a single, space-delimited string.
    scopes: [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });

  // Acquire an auth client, and bind it to all future calls
  const authClient = await auth.getClient();
  google.options({ auth: authClient });

  // Do the magic
  const res = await sheets.spreadsheets.batchUpdate({
    // The spreadsheet to apply the updates to.
    spreadsheetId: "1pWj2kjrd2J0ldEZk26z5YfWXGTi4WcQQ",

    // Request body metadata
    requestBody: {
      // request body parameters
      // {
      //   "includeSpreadsheetInResponse": false,
      //   "requests": [],
      //   "responseIncludeGridData": false,
      //   "responseRanges": []
      // }
    },
  });
  console.log(res.data);

  return res.data;
};
