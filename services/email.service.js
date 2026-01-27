const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send email notification when a new lead is created
 * @param {Object} leadData - The lead data to include in email
 * @returns {Promise<Object>} - Resend API response
 */
async function sendLeadNotification(leadData) {
  try {
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          h2 {
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
          }
          .field {
            margin: 10px 0;
          }
          .label {
            font-weight: bold;
            display: inline-block;
            min-width: 150px;
          }
          .value {
            display: inline;
          }
          hr {
            border: none;
            border-top: 1px solid #ddd;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <h2>New Lead Received</h2>
        <p>Date: ${new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}</p>

        ${leadData.full_name ? `<div class="field"><span class="label">Name:</span> <span class="value">${leadData.full_name}</span></div>` : ""}
        ${leadData.email ? `<div class="field"><span class="label">Email:</span> <span class="value">${leadData.email}</span></div>` : ""}
        ${leadData.phone_number ? `<div class="field"><span class="label">Phone:</span> <span class="value">${leadData.phone_number}</span></div>` : ""}
        ${leadData.alt_phone_number ? `<div class="field"><span class="label">Alternate Phone:</span> <span class="value">${leadData.alt_phone_number}</span></div>` : ""}

        ${leadData.city || leadData.state || leadData.country ? "<hr>" : ""}
        ${leadData.city ? `<div class="field"><span class="label">City:</span> <span class="value">${leadData.city}</span></div>` : ""}
        ${leadData.state ? `<div class="field"><span class="label">State:</span> <span class="value">${leadData.state}</span></div>` : ""}
        ${leadData.country ? `<div class="field"><span class="label">Country:</span> <span class="value">${leadData.country}</span></div>` : ""}

        ${leadData.condition || leadData.preferred_date || leadData.message || leadData.additional_notes ? "<hr>" : ""}
        ${leadData.condition ? `<div class="field"><span class="label">Condition:</span> <span class="value">${leadData.condition}</span></div>` : ""}
        ${leadData.preferred_date ? `<div class="field"><span class="label">Preferred Date:</span> <span class="value">${leadData.preferred_date}</span></div>` : ""}
        ${leadData.message ? `<div class="field"><span class="label">Message:</span> <span class="value">${leadData.message}</span></div>` : ""}
        ${leadData.additional_notes ? `<div class="field"><span class="label">Additional Notes:</span> <span class="value">${leadData.additional_notes}</span></div>` : ""}

        ${leadData.form_type || leadData.page_url || leadData.source ? "<hr>" : ""}
        ${leadData.form_type ? `<div class="field"><span class="label">Form Type:</span> <span class="value">${leadData.form_type}</span></div>` : ""}
        ${leadData.page_url ? `<div class="field"><span class="label">Page URL:</span> <span class="value">${leadData.page_url}</span></div>` : ""}
        ${leadData.source ? `<div class="field"><span class="label">Source:</span> <span class="value">${leadData.source}</span></div>` : ""}

        ${leadData.utm_source || leadData.utm_medium || leadData.utm_campaign ? "<hr><h3>Marketing Data</h3>" : ""}
        ${leadData.utm_source ? `<div class="field"><span class="label">UTM Source:</span> <span class="value">${leadData.utm_source}</span></div>` : ""}
        ${leadData.utm_medium ? `<div class="field"><span class="label">UTM Medium:</span> <span class="value">${leadData.utm_medium}</span></div>` : ""}
        ${leadData.utm_campaign ? `<div class="field"><span class="label">UTM Campaign:</span> <span class="value">${leadData.utm_campaign}</span></div>` : ""}
        ${leadData.utm_term ? `<div class="field"><span class="label">UTM Term:</span> <span class="value">${leadData.utm_term}</span></div>` : ""}
        ${leadData.utm_content ? `<div class="field"><span class="label">UTM Content:</span> <span class="value">${leadData.utm_content}</span></div>` : ""}
        ${leadData.utm_platform ? `<div class="field"><span class="label">Platform:</span> <span class="value">${leadData.utm_platform}</span></div>` : ""}
        ${leadData.utm_device ? `<div class="field"><span class="label">Device:</span> <span class="value">${leadData.utm_device}</span></div>` : ""}

        <hr>
        <p style="color: #666; font-size: 12px;">Lead ID: ${leadData._id || "N/A"}</p>
      </body>
      </html>
    `;

    const data = await resend.emails.send({
      from: "chiragHospitals@chirag.advaitlabs.com",
      to: [
        "tools@advaitlabs.com",
        "vamshi@advaitlabs.com",
        "chiraghospitals@gmail.com",
        "chiragglobalhospital@gmail.com"
      ],
      subject: `New Lead From Landing Page  - ${new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })} from Book.ChiragHospitals.com`,
      html: emailContent,
    });

    console.log("✅ Lead notification email sent:", data.id);
    return { success: true, emailId: data.id };
  } catch (error) {
    console.error("❌ Failed to send lead notification:", error.message);
    // Don't throw - we don't want email failure to break lead creation
    return { success: false, error: error.message };
  }
}

module.exports = { sendLeadNotification };
