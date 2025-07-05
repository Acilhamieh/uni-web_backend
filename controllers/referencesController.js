import * as ReferencesModel  from "../models/referencesModel.js";

export async function handlegetReferencesByCourseId(req, res) {
  const { courseId } = req.params;

  try {
    const references = await ReferencesModel.getReferencesByCourseId(courseId);
    res.status(200).json({
      success: true,
      message: "References fetched successfully.",
      data: references,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function handleAddReference(req, res) {
  try {
    const newReference = await ReferencesModel.addReference(req.body);
    res.status(201).json({
      success: true,
      message: "Reference added successfully.",
      data: newReference,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function handleDeleteReference(req, res) {
  const { id } = req.params;

  try {
    const result = await ReferencesModel.deleteReference(id);

    if (result === null) {
      return res.status(404).json({
        success: false,
        message: "Reference not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reference deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function handleUpdateReference(req, res) {
  const { id } = req.params;

  try {
    const updatedReference = await ReferencesModel.updateReference(id, req.body);

    if (updatedReference === null) {
      return res.status(404).json({
        success: false,
        message: "Reference not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reference updated successfully.",
      data: updatedReference,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function handleGetAllReferences(req, res) {
  try {
    const references = await ReferencesModel.getAllReferences();
    res.status(200).json({
      success: true,
      message: "References retrieved successfully.",
      data: references,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}