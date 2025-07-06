// src/models/fileUpload.js

import supabase from '../config/supabase.js';

/**
 * Uploads a file to Supabase storage and returns its public URL.
 * @param {string} bucket - The bucket name (e.g. 'sessions-files')
 * @param {string} folder - The folder inside the bucket (e.g. 'questions')
 * @param {object} file - The multer file object
 * @returns {string} - Public URL of uploaded file
 */
export async function uploadFile(bucket, folder, file) {
  if (!file) {
    throw new Error('No file provided for upload.');
  }

  const path = `${folder}/${Date.now()}_${file.originalname}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) throw error;

  const { data: publicUrlData, error: urlError } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  if (urlError) throw urlError;

  return publicUrlData.publicUrl;
}
