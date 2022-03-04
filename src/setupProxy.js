const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api", "/auth"], // You can pass in an array too eg. ['/api', '/another/path']
    createProxyMiddleware({
      // target: "https://matchoshop.herokuapp.com",
      target: "http://localhost:9000",
      changeOrigin: true,
    })
  );
};
