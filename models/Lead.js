//file : models/Lead.js
const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    full_name: { type: String },
    email: { type: String },
    phone_number: { type: String, required: true },
    alt_phone_number: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    condition: { type: String },
    preferred_date: { type: String },
    additional_notes: { type: String },
    page_url: { type: String },
    form_type: { type: String },
    button_text: { type: String },
    message: { type: String },
    source: { type: String },
    date_time: { type: String },
    url: { type: String },
    utm_source: { type: String },
    utm_medium: { type: String },
    utm_campaign: { type: String },
    utm_term: { type: String },
    utm_content: { type: String },
    utm_platform: { type: String },
    utm_device: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
