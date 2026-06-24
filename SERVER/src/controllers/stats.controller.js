import getBookingStatsService from "../services/stats.service.js";

export const getBookingStats = async (req, res) => {
  try {
    const stats = await getBookingStatsService(req, res);
    res.status(200).json({
        success: true,
        data: stats,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};