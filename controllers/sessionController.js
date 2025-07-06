// src/controllers/sessionController.js

import * as sessionModel from '../models/sessionModel.js';

export async function createSessionController(req, res) {
  try {
    const {
      course_id,
      exam_type,
      final_type,
      exam_round,
      academic_year,
      created_by,
    } = req.body;

    const files = req.files;

    console.log('Received create session request with data:', {
      course_id,
      exam_type,
      final_type,
      exam_round,
      academic_year,
      created_by,
      filesKeys: Object.keys(files || {}),
    });

    const newSession = await sessionModel.createSession({
      course_id: Number(course_id),
      exam_type,
      final_type,
      exam_round: exam_round ? Number(exam_round) : null,
      academic_year,
      question_pdf: files?.question_pdf?.[0] || null,
      solution_pdf: files?.solution_pdf?.[0] || null,
      created_by: Number(created_by),
    });

    console.log('Session created successfully:', newSession);

    res.status(201).json({
      success: true,
      message: 'Session created successfully',
      data: newSession,
    });
  } catch (err) {
    console.error('❌ Create Session Error:', err);
    res.status(500).json({
      success: false,
      message: 'Error creating session',
      error: err.message,
      stack: err.stack, // include stack for deep debugging during development
    });
  }
}

export async function getAllSessionsController(req, res) {
  try {
    const sessions = await sessionModel.getAllSessions();
    res.status(200).json({
      success: true,
      data: sessions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Error fetching sessions',
      error: err.message,
    });
  }
}
