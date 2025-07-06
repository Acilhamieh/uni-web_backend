import * as projectModel from '../models/projectModel.js';

export async function createProjectController(req, res) {
  try {
    const {
      title,
      supervisor,
      academic_year,
      description,
      team_members,
    } = req.body;

    const files = req.files;

    const newProject = await projectModel.addProject({
      title,
      supervisor,
      academic_year,
      description,
      team_members: team_members ? JSON.parse(team_members) : null, // parse if sent as JSON string
      report_pdf: files?.report_pdf?.[0] || null,
      presentation_pdf: files?.presentation_pdf?.[0] || null,
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject,
    });
  } catch (err) {
    console.error('❌ Create project controller error:', err);
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: err.message,
    });
  }
}
