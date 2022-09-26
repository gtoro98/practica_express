const log = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

const logger = {
    log: log,
  };
  module.exports = logger;