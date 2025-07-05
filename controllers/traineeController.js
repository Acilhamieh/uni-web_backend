import * as traineeModel from '../models/traineeModel.js';

export async function handleGetAllTrainees(req, res) {
  try {
    const trainees = await traineeModel.getAllTrainees();
    res.status(200).json({
      success: true,
      message: "Trainees retrieved successfully.",
      data: trainees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
