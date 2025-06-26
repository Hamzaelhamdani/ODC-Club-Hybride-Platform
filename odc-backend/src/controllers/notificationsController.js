// TODO: Implement notification endpoints (list, mark as read, send, etc.)
exports.listNotifications = (req, res) => {
  // Fetch notifications for req.user.id
  res.json([]); // Placeholder
};

exports.sendNotification = (req, res) => {
  // Send a notification to a user
  res.status(201).json({ success: true });
}; 