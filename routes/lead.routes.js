const {
  createLead,
  getLeads,
  getLeadById,
} = require("../controllers/lead.controller");

async function leadRoutes(fastify) {
  fastify.post("/submit", createLead);
  fastify.get("/", getLeads);
  fastify.get("/:id", getLeadById);
}

module.exports = leadRoutes;
