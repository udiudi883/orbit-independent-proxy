const internalPort = Number(process.env.PORT || 10000);

module.exports = {
  // Render terminates HTTPS and forwards requests to this internal port.
  bindingAddress: "0.0.0.0",
  port: internalPort,
  // One public port is used for both services; upstream supports same-port mode.
  crossDomainPort: null,

  // The public URL is HTTPS even though Render forwards internally over HTTP.
  getServerInfo: (req) => {
    const forwardedHost = req.headers["x-forwarded-host"] || req.headers.host || "";
    const hostname = String(forwardedHost).split(",")[0].trim().split(":")[0];
    return {
      hostname,
      port: 443,
      crossDomainPort: 443,
      protocol: "https:"
    };
  },

  // Set ORBIT_PASSWORD as a secret in the hosting dashboard.
  // Do not commit a real password into this file or a public Git repository.
  password: process.env.ORBIT_PASSWORD || "SET_ORBIT_PASSWORD_IN_HOSTING_SETTINGS",

  // Keep sessions scoped to the visitor IP.
  restrictSessionToIP: true
};
