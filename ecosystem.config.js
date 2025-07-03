module.exports = {
  apps: [
    {
      name: "wman",
      script: "npm",
      args: "start",
      env: {
        PORT: 3001
      }
    }
  ]
};
