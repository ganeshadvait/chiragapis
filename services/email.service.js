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
</head>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <h2>New Lead Received</h2>
  <p><strong>Date:</strong> ${new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}</p>

  <h3>Contact Information</h3>
  ${leadData.full_name ? `<p><strong>Name:</strong> ${leadData.full_name}</p>` : ""}
  ${leadData.email ? `<p><strong>Email:</strong> ${leadData.email}</p>` : ""}
  ${leadData.phone_number ? `<p><strong>Phone:</strong> ${leadData.phone_number}</p>` : ""}
  ${leadData.alt_phone_number ? `<p><strong>Alternate Phone:</strong> ${leadData.alt_phone_number}</p>` : ""}

  ${leadData.city || leadData.state || leadData.country ? "<h3>Location</h3>" : ""}
  ${leadData.city ? `<p><strong>City:</strong> ${leadData.city}</p>` : ""}
  ${leadData.state ? `<p><strong>State:</strong> ${leadData.state}</p>` : ""}
  ${leadData.country ? `<p><strong>Country:</strong> ${leadData.country}</p>` : ""}

  ${leadData.condition || leadData.preferred_date || leadData.message || leadData.additional_notes ? "<h3>Details</h3>" : ""}
  ${leadData.condition ? `<p><strong>Condition:</strong> ${leadData.condition}</p>` : ""}
  ${leadData.preferred_date ? `<p><strong>Preferred Date:</strong> ${leadData.preferred_date}</p>` : ""}
  ${leadData.message ? `<p><strong>Message:</strong> ${leadData.message}</p>` : ""}
  ${leadData.additional_notes ? `<p><strong>Additional Notes:</strong> ${leadData.additional_notes}</p>` : ""}

  ${leadData.form_type || leadData.page_url || leadData.source ? "<h3>Form Information</h3>" : ""}
  ${leadData.form_type ? `<p><strong>Form Type:</strong> ${leadData.form_type}</p>` : ""}
  ${leadData.page_url ? `<p><strong>Page URL:</strong> ${leadData.page_url}</p>` : ""}
  ${leadData.source ? `<p><strong>Source:</strong> ${leadData.source}</p>` : ""}

  ${leadData.utm_source || leadData.utm_medium || leadData.utm_campaign || leadData.utm_term || leadData.utm_content || leadData.utm_platform || leadData.utm_device ? "<h3>Marketing Data</h3>" : ""}
  ${leadData.utm_source ? `<p><strong>UTM Source:</strong> ${leadData.utm_source}</p>` : ""}
  ${leadData.utm_medium ? `<p><strong>UTM Medium:</strong> ${leadData.utm_medium}</p>` : ""}
  ${leadData.utm_campaign ? `<p><strong>UTM Campaign:</strong> ${leadData.utm_campaign}</p>` : ""}
  ${leadData.utm_term ? `<p><strong>UTM Term:</strong> ${leadData.utm_term}</p>` : ""}
  ${leadData.utm_content ? `<p><strong>UTM Content:</strong> ${leadData.utm_content}</p>` : ""}
  ${leadData.utm_platform ? `<p><strong>Platform:</strong> ${leadData.utm_platform}</p>` : ""}
  ${leadData.utm_device ? `<p><strong>Device:</strong> ${leadData.utm_device}</p>` : ""}

  <hr>
  <p style="font-size: 12px; color: #666;">Lead ID: ${leadData._id || "N/A"}</p>
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
    console.error("❌ Failed to send lead notification:");
    console.error("Error message:", error.message);
    console.error("Error response:", error.response);
    console.error("Full error:", error);
    // Don't throw - we don't want email failure to break lead creation
    return { success: false, error: error.message };
  }
}

module.exports = { sendLeadNotification };
