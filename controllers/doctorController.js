import * as doctorModel from '../models/doctorModel.js';

// GET /api/doctors
export async function handleGetAllDoctors(req, res) {
  try {
    const doctors = await doctorModel.getAllDoctors();
    res.status(200).json({
      success: true,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// POST /api/doctors
export async function handleAddDoctor(req, res) {
  try {
    const newDoctor = await doctorModel.addDoctor(req.body);
    res.status(201).json({
      success: true,
      message: "Doctor added successfully.",
      data: newDoctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }

}
// PUT /api/doctors/:id
export async function handleUpdateDoctor(req, res) {
  try {
    const updatedDoctor = await doctorModel.updateDoctor(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Doctor updated successfully.",
      data: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// DELETE /api/doctors/:id
export async function handleDeleteDoctor(req, res) {
  try {
    await doctorModel.deleteDoctor(req.params.id);
    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
