import getBookingStatsService from "../services/stats.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const getBookingStats = asyncHandler(async (req, res) => {

  const stats = await getBookingStatsService(req, res);
  res.status(200).json({
    success: true,
    data: stats,
  });

});