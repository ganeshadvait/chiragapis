const fastify = require("fastify")({ logger: true });
const rateLimit = require("@fastify/rate-limit");
const leadRoutes = require("../routes/lead.routes");

fastify.register(rateLimit, {
  max: Number(process.env.RATE_LIMIT_MAX) || 100,
  timeWindow: "1 minute",
});

fastify.register(leadRoutes, { prefix: "/api/leads" });

module.exports = fastify;
