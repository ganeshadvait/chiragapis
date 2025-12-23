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
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            margin: 0; 
            padding: 0; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
            background-color: #f6f9fc;
            line-height: 1.6;
          }
          .email-wrapper { 
            max-width: 600px; 
            margin: 40px auto; 
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          }
          .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; 
            padding: 32px 24px; 
            text-align: center;
          }
          .header h1 { 
            margin: 0; 
            font-size: 28px; 
            font-weight: 600;
            letter-spacing: -0.5px;
          }
          .header p { 
            margin: 8px 0 0 0; 
            opacity: 0.9; 
            font-size: 14px;
          }
          .content { 
            padding: 32px 24px;
          }
          .section { 
            margin-bottom: 32px;
          }
          .section:last-child {
            margin-bottom: 0;
          }
          .section-title { 
            font-size: 12px; 
            font-weight: 600; 
            text-transform: uppercase; 
            color: #6b7280; 
            margin-bottom: 12px;
            letter-spacing: 0.5px;
          }
          .field { 
            background-color: #f9fafb;
            padding: 16px;
            border-radius: 6px;
            margin-bottom: 12px;
            border-left: 3px solid #667eea;
          }
          .field:last-child {
            margin-bottom: 0;
          }
          .label { 
            display: block;
            font-size: 12px;
            font-weight: 600; 
            color: #6b7280; 
            margin-bottom: 4px;
            text-transform: uppercase;
            letter-spacing: 0.3px;
          }
          .value { 
            display: block;
            font-size: 15px;
            color: #1f2937;
            word-break: break-word;
          }
          .footer { 
            background-color: #f9fafb;
            text-align: center; 
            padding: 24px; 
            color: #6b7280; 
            font-size: 12px;
            border-top: 1px solid #e5e7eb;
          }
          .footer .lead-id {
            font-family: 'Courier New', monospace;
            background-color: #e5e7eb;
            padding: 4px 8px;
            border-radius: 4px;
            display: inline-block;
            margin-top: 8px;
          }
          .empty-message {
            color: #9ca3af;
            font-style: italic;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="header">
            <h1>🎉 New Lead Received</h1>
            <p>A new inquiry has been submitted</p>
          </div>
          
          <div class="content">
            <!-- Contact Information -->
            <div class="section">
              <div class="section-title">📋 Contact Information</div>
              ${
                leadData.full_name
                  ? `
              <div class="field">
                <span class="label">Full Name</span>
                <span class="value">${leadData.full_name}</span>
              </div>`
                  : ""
              }
              ${
                leadData.email
                  ? `
              <div class="field">
                <span class="label">Email Address</span>
                <span class="value">${leadData.email}</span>
              </div>`
                  : ""
              }
              ${
                leadData.phone_number
                  ? `
              <div class="field">
                <span class="label">Phone Number</span>
                <span class="value">${leadData.phone_number}</span>
              </div>`
                  : ""
              }
              ${
                leadData.alt_phone_number
                  ? `
              <div class="field">
                <span class="label">Alternate Phone</span>
                <span class="value">${leadData.alt_phone_number}</span>
              </div>`
                  : ""
              }
              ${
                !leadData.full_name &&
                !leadData.email &&
                !leadData.phone_number &&
                !leadData.alt_phone_number
                  ? '<p class="empty-message">No contact information provided</p>'
                  : ""
              }
            </div>

            <!-- Location Details -->
            ${
              leadData.city || leadData.state || leadData.country
                ? `
            <div class="section">
              <div class="section-title">📍 Location Details</div>
              ${
                leadData.city
                  ? `
              <div class="field">
                <span class="label">City</span>
                <span class="value">${leadData.city}</span>
              </div>`
                  : ""
              }
              ${
                leadData.state
                  ? `
              <div class="field">
                <span class="label">State</span>
                <span class="value">${leadData.state}</span>
              </div>`
                  : ""
              }
              ${
                leadData.country
                  ? `
              <div class="field">
                <span class="label">Country</span>
                <span class="value">${leadData.country}</span>
              </div>`
                  : ""
              }
            </div>`
                : ""
            }

            <!-- Lead Details -->
            ${
              leadData.condition ||
              leadData.preferred_date ||
              leadData.message ||
              leadData.additional_notes
                ? `
            <div class="section">
              <div class="section-title">💬 Lead Details</div>
              ${
                leadData.condition
                  ? `
              <div class="field">
                <span class="label">Condition</span>
                <span class="value">${leadData.condition}</span>
              </div>`
                  : ""
              }
              ${
                leadData.preferred_date
                  ? `
              <div class="field">
                <span class="label">Preferred Date</span>
                <span class="value">${leadData.preferred_date}</span>
              </div>`
                  : ""
              }
              ${
                leadData.message
                  ? `
              <div class="field">
                <span class="label">Message</span>
                <span class="value">${leadData.message}</span>
              </div>`
                  : ""
              }
              ${
                leadData.additional_notes
                  ? `
              <div class="field">
                <span class="label">Additional Notes</span>
                <span class="value">${leadData.additional_notes}</span>
              </div>`
                  : ""
              }
            </div>`
                : ""
            }

            <!-- Form Information -->
            ${
              leadData.page_url ||
              leadData.form_type ||
              leadData.button_text ||
              leadData.source ||
              leadData.date_time ||
              leadData.url
                ? `
            <div class="section">
              <div class="section-title">📝 Form Information</div>
              ${
                leadData.form_type
                  ? `
              <div class="field">
                <span class="label">Form Type</span>
                <span class="value">${leadData.form_type}</span>
              </div>`
                  : ""
              }
              ${
                leadData.page_url
                  ? `
              <div class="field">
                <span class="label">Page URL</span>
                <span class="value">${leadData.page_url}</span>
              </div>`
                  : ""
              }
              ${
                leadData.button_text
                  ? `
              <div class="field">
                <span class="label">Button Text</span>
                <span class="value">${leadData.button_text}</span>
              </div>`
                  : ""
              }
              ${
                leadData.source
                  ? `
              <div class="field">
                <span class="label">Source</span>
                <span class="value">${leadData.source}</span>
              </div>`
                  : ""
              }
              ${
                leadData.url
                  ? `
              <div class="field">
                <span class="label">URL</span>
                <span class="value">${leadData.url}</span>
              </div>`
                  : ""
              }
              ${
                leadData.date_time
                  ? `
              <div class="field">
                <span class="label">Submission Time</span>
                <span class="value">${leadData.date_time}</span>
              </div>`
                  : ""
              }
            </div>`
                : ""
            }

            <!-- Marketing Attribution -->
            ${
              leadData.utm_source ||
              leadData.utm_medium ||
              leadData.utm_campaign ||
              leadData.utm_term ||
              leadData.utm_content ||
              leadData.utm_platform ||
              leadData.utm_device
                ? `
            <div class="section">
              <div class="section-title">📊 Marketing Attribution</div>
              ${
                leadData.utm_source
                  ? `
              <div class="field">
                <span class="label">UTM Source</span>
                <span class="value">${leadData.utm_source}</span>
              </div>`
                  : ""
              }
              ${
                leadData.utm_medium
                  ? `
              <div class="field">
                <span class="label">UTM Medium</span>
                <span class="value">${leadData.utm_medium}</span>
              </div>`
                  : ""
              }
              ${
                leadData.utm_campaign
                  ? `
              <div class="field">
                <span class="label">UTM Campaign</span>
                <span class="value">${leadData.utm_campaign}</span>
              </div>`
                  : ""
              }
              ${
                leadData.utm_term
                  ? `
              <div class="field">
                <span class="label">UTM Term</span>
                <span class="value">${leadData.utm_term}</span>
              </div>`
                  : ""
              }
              ${
                leadData.utm_content
                  ? `
              <div class="field">
                <span class="label">UTM Content</span>
                <span class="value">${leadData.utm_content}</span>
              </div>`
                  : ""
              }
              ${
                leadData.utm_platform
                  ? `
              <div class="field">
                <span class="label">Platform</span>
                <span class="value">${leadData.utm_platform}</span>
              </div>`
                  : ""
              }
              ${
                leadData.utm_device
                  ? `
              <div class="field">
                <span class="label">Device</span>
                <span class="value">${leadData.utm_device}</span>
              </div>`
                  : ""
              }
            </div>`
                : ""
            }
          </div>
          
          <div class="footer">
            <p style="margin: 0 0 8px 0;">Lead successfully captured and stored</p>
            <span class="lead-id">ID: ${leadData._id || "N/A"}</span>
            <p style="margin: 12px 0 0 0; opacity: 0.7;">
              Received: ${new Date().toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `New Lead: ${
        leadData.full_name || leadData.phone_number
      } - ${new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}`,
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
