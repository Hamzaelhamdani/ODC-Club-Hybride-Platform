// TODO: Implement backend notification logic (in-app, email, push, etc.)
// Example: sendNotification(userId, { type: 'alert', message: 'New application received.' })

function sendNotification(userId, { type, message }) {
  // Implementation here (e.g., save to DB, send email, push, etc.)
  // For now, just log to console
  console.log(`[NOTIFY][User:${userId}] [${type}] ${message}`);
}

module.exports = { sendNotification }; 