const Notification = require("../models/Notification");
const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

// Create a notification
router.post('/', auth, async (req, res) => {
  const { userId, message } = req.body;
  try {
    const notification = new Notification({
      userId,
      message,
    });

    await notification.save();
    res.status(200).json({ message: 'Notification sent successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error sending notification', error: err });
  }
});

// Get notifications for a user
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notifications", error });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const notificationId = req.params.id;
    const userId = req.userId; // Ensure the notification belongs to the authenticated user

    const notification = await Notification.findOneAndDelete({ _id: notificationId, userId });
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete notification", error: err.message });
  }
});

module.exports = router;