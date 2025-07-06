import supabase from '../config/supabase.js';
import { uploadFile } from './fileUpload.js'; 

export async function addProject({
  title,
  supervisor,
  academic_year,
  description,
  team_members,
  report_pdf,
  presentation_pdf,
}) {
  try {
    let report_url_pdf = null;
    let presentation_url_pdf = null;

    if (report_pdf) {
      console.log('Uploading report_pdf...');
      report_url_pdf = await uploadFile('projects-files', 'reports', report_pdf);
      console.log('Uploaded report_url_pdf:', report_url_pdf);
    }

    if (presentation_pdf) {
      console.log('Uploading presentation_pdf...');
      presentation_url_pdf = await uploadFile('projects-files', 'presentations', presentation_pdf);
      console.log('Uploaded presentation_url_pdf:', presentation_url_pdf);
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          title,
          supervisor: Number(supervisor),
          academic_year,
          description,
          team_members, // JSONB field
          report_url_pdf,
          presentation_url_pdf,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase insert error:', JSON.stringify(error, null, 2));
      throw new Error(error.message || 'Insert failed without message');
    }

    return data;
  } catch (err) {
    console.error('Create project model error:', err);
    throw err;
  }
}
//get all projects
export async function getAllProjects() {
  try {
    const { data, error } = await supabase.rpc('get_projects_with_supervisor_name');

    if (error) {
      console.error('❌ Supabase RPC error:', JSON.stringify(error, null, 2));
      throw new Error(error.message || 'Fetch failed without message');
    }

    return data;
  } catch (err) {
    console.error('Get all projects model error:', err);
    throw err;
  }
}