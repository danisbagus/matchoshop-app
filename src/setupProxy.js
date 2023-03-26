const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api", "/auth"],
    createProxyMiddleware({
      // target: "http://localhost:9000",
      target: "https://matchoshop.up.railway.app", // todo: set with env value
      changeOrigin: true,
    })
  );
};
