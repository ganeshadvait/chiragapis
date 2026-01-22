const { google } = require("googleapis");

const auth = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  ["https://www.googleapis.com/auth/spreadsheets"],
);

const sheets = google.sheets({ version: "v4", auth });

async function appendLeadToSheet(lead) {
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Sheet1!A1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          lead.createdAt?.toISOString() || "",
          lead.full_name || "",
          lead.phone_number || "",
          lead.alt_phone_number || "",
          lead.email || "",
          lead.city || "",
          lead.state || "",
          lead.country || "",
          lead.condition || "",
          lead.preferred_date || "",
          lead.message || "",
          lead.additional_notes || "",
          lead.form_type || "",
          lead.button_text || "",
          lead.source || "",
          lead.page_url || "",
          lead.url || "",
          lead.utm_source || "",
          lead.utm_medium || "",
          lead.utm_campaign || "",
          lead.utm_term || "",
          lead.utm_content || "",
          lead.utm_platform || "",
          lead.utm_device || "",
        ],
      ],
    },
  });
}

module.exports = { appendLeadToSheet };
