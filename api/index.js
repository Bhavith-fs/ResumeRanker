const { createServer } = require('../server/index.js');

const app = createServer();

export default function handler(req, res) {
  app(req, res);
}
