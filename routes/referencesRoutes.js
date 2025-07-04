import express from "express";
import { handlegetReferencesByCourseId,handleAddReference,handleDeleteReference ,handleUpdateReference} from "../controllers/referencesController.js";

const router = express.Router();

// GET all references by course ID
router.get("/course/:courseId", handlegetReferencesByCourseId);//success but not sure about response format
router.post("/", handleAddReference);//done
router.delete("/:id", handleDeleteReference);//done
router.put("/:id", handleUpdateReference);//done
export default router;
