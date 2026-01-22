//File: routes/lead.routes.js
const {
  createLead,
  getLeads,
  getLeadById,
} = require("../controllers/lead.controller");

async function leadRoutes(fastify) {
  // Specific routes first
  fastify.post("/submit", createLead);
  fastify.get("/", getLeads);

  // Dynamic routes last
  fastify.get("/:id", getLeadById);
  console.log({
    createLead,
    getLeads,
    getLeadById,
  });
}

module.exports = leadRoutes;
