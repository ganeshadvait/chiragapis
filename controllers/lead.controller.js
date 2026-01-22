// file: controllers/lead.controller.js
const Lead = require("../models/Lead");
const { sendLeadNotification } = require("../services/email.service");
const { appendLeadToSheet } = require("../src/utils/googleSheet");

exports.createLead = async (req, reply) => {
  try {
    const lead = await Lead.create(req.body);
    const leadData = lead.toObject();

    reply.code(201).send({
      success: true,
      message: "Lead created successfully",
      id: lead._id,
      data: lead,
    });

    setImmediate(() => {
      sendLeadNotification(leadData).catch(console.error);
      appendLeadToSheet(leadData).catch(console.error);
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return reply.code(400).send({
        success: false,
        message: "Validation failed",
        errors: Object.values(err.errors).map((e) => e.message),
      });
    }

    return reply.code(500).send({
      success: false,
      message: "Server error while creating lead",
    });
  }
};

exports.getLeads = async (req, reply) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  return reply.send({ success: true, data: leads });
};

exports.getLeadById = async (req, reply) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) {
    return reply.code(404).send({ success: false, message: "Lead not found" });
  }
  return reply.send({ success: true, data: lead });
};
