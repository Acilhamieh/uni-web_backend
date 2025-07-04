import multer from "multer";

const storage = multer.memoryStorage(); // store file in memory for direct upload to Supabase
const upload = multer({ storage });

export default upload;
