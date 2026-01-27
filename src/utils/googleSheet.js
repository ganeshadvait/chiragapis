// src/utils/googleSheet.js
const { google } = require("googleapis");

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

async function getSheetsClient() {
  await auth.authorize();
  return google.sheets({
    version: "v4",
    auth,
  });
}

async function appendLeadToSheet(lead) {
  const sheets = await getSheetsClient();

  // Format the date properly as a string
  const formattedDate = lead.createdAt
    ? new Date(lead.createdAt).toISOString()
    : new Date().toISOString();

  // Ensure all values are strings or empty strings to prevent formatting issues
  const rowValues = [
    formattedDate,
    String(lead.full_name || "not provided"),
    String(lead.phone_number || "not provided"),
    String(lead.alt_phone_number || "not provided"),
    // String(lead.email || "not provided"),
    // String(lead.city || "not provided"),
    // String(lead.state || "not provided"),
    // String(lead.country || "not provided"),
    // String(lead.condition || "not provided"),
    // String(lead.preferred_date || "not provided"),
    // String(lead.message || "not provided"),
    // String(lead.additional_notes || "not provided"),
    String(lead.form_type || "not provided"),
    String(lead.button_text || "not provided"),
    String(lead.source || "not provided"),
    String(lead.page_url || "not provided"),
    String(lead.url || "not provided"),
    String(lead.utm_source || "not provided"),
    String(lead.utm_medium || "not provided"),
    String(lead.utm_campaign || "not provided"),
    String(lead.utm_term || "not provided"),
    String(lead.utm_content || "not provided"),
    String(lead.utm_platform || "not provided"),
    String(lead.utm_device || "not provided"),
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "'landing page leads'!A:Z",
    valueInputOption: "RAW", 
    insertDataOption: "INSERT_ROWS", 
    requestBody: {
      values: [rowValues],
    },
  });
}

module.exports = { appendLeadToSheet };
