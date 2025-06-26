// TODO: Implement audit logging for admin actions
module.exports = function auditLogger(req, res, next) {
  // Log action, user, timestamp, etc.
  // Example: console.log(`[AUDIT] ${req.user?.email} performed ${req.method} on ${req.originalUrl}`);
  next();
}; 