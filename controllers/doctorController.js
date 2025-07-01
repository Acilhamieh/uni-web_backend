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
export async function addDoctor(req, res) {
  try {
    const { first_name, last_name, linkedin_url, created_by } = req.body;
    const doctor = await doctorModel.addDoctor({ first_name, last_name, linkedin_url, created_by });
    res.status(201).json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PUT /api/doctors/:id
export async function updateDoctor(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { first_name, last_name, linkedin_url } = req.body;
    const doctor = await doctorModel.updateDoctor(id, { first_name, last_name, linkedin_url });
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE /api/doctors/:id
export async function deleteDoctor(req, res) {
  try {
    const id = parseInt(req.params.id);
    await doctorModel.deleteDoctor(id);
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
