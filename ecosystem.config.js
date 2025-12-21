module.exports = {
  apps: [
    {
      name: "skillup-api",
      script: "src/server.js",
      instances: 1,
      autorestart: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
