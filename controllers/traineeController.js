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
//add a new trainee
export async function handleAddTrainee(req, res) {
  try {
    const newTrainee = await traineeModel.addTrainee(req.body);
    res.status(201).json({
      success: true,
      message: "Trainee added successfully.",
      data: newTrainee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
//delete trainee by id
export async function handleDeleteTrainee(req, res) {
  const { id } = req.params;

  try {
    const deletedTrainee = await traineeModel.deleteTrainee(id);

    if (!deletedTrainee) {
      return res.status(404).json({
        success: false,
        message: "Trainee not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Trainee deleted successfully.",
      data: deletedTrainee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}