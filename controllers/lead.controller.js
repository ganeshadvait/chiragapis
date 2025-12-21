const Lead = require("../models/Lead");

exports.createLead = async (req, reply) => {
  try {
    const lead = await Lead.create(req.body);
    return reply.code(201).send({
      success: true,
      message: "Lead created successfully",
      id: lead._id,
      data: lead,
    });
  } catch (err) {
    // Mongoose validation error
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return reply.code(400).send({
        success: false,
        message: "Validation failed",
        errors: errors,
      });
    }

    // Other errors
    return reply.code(500).send({
      success: false,
      message: "Server error while creating lead",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};


exports.getLeads = async (req, reply) => {
  try {
    const Leads = await Lead.find().sort({ createdAt: -1 });
    return reply.code(200).send({
      success: true,
      count: Leads.length,
      data: Leads,
    });
  } catch (err) {
    return reply.code(500).send({
      success: false,
      message: "Server error while fetching leads",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
}

exports.getLeadById = async (req, reply) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return reply.code(404).send({
        success: false,
        message: "Lead not found",
      });
    }
    return reply.code(200).send({
      success: true,
      data: lead,
    });
  } catch (err) {
    return reply.code(500).send({
      success: false,
      message: "Server error while fetching lead",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
}