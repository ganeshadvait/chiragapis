require("dotenv").config();
const fastify = require("./app");
const connectDB = require("./db");

const start = async () => {
  await connectDB();

  try {
    await fastify.listen({
      port: process.env.PORT || 3000,
      host: "0.0.0.0",
    });
    console.log("🚀 Server running");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
