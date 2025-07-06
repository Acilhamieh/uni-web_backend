// src/models/sessionModel.js

import supabase from '../config/supabase.js';
import { uploadFile } from './fileUpload.js'; // import your reusable upload function

// 🔥 Create Session
export async function createSession({
  course_id,
  exam_type,
  final_type,
  exam_round,
  academic_year,
  question_pdf,
  solution_pdf,
  created_by,
}) {
  try {
    let question_pdf_url = null;
    let solution_pdf_url = null;

    if (question_pdf) {
      console.log('Uploading question_pdf...');
      question_pdf_url = await uploadFile('sessions-files', 'questions', question_pdf);
      console.log('Uploaded question_pdf_url:', question_pdf_url);
    }

    if (solution_pdf) {
      console.log('Uploading solution_pdf...');
      solution_pdf_url = await uploadFile('sessions-files', 'solutions', solution_pdf);
      console.log('Uploaded solution_pdf_url:', solution_pdf_url);
    }

    const { data, error } = await supabase
      .from('sessions') // ✅ corrected table name
      .insert([
        {
          course_id,
          exam_type,
          final_type,
          exam_round,
          academic_year,
          question_pdf_url,
          solution_pdf_url,
          created_by,
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
    console.error('Create session model error:', err);
    throw err;
  }
}


// 🔥 Get All Sessions
export async function getAllSessions() {
  const { data, error } = await supabase
    .from('sessions')
    .select(`
      id,
      course_id,
      courses ( name ),
      exam_type,
      final_type,
      exam_round,
      academic_year,
      question_pdf_url,
      solution_pdf_url,
      created_by,
      users ( first_name, last_name ),
      created_at,
      updated_at
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;

  // ✅ Format the results
  return data.map(session => ({
    id: session.id,
    course_id: session.course_id,
    course_name: session.courses?.name || null,
    exam_type: session.exam_type,
    final_type: session.final_type,
    exam_round: session.exam_round,
    academic_year: session.academic_year,
    question_pdf_url: session.question_pdf_url,
    solution_pdf_url: session.solution_pdf_url,
    created_by: session.created_by,
    created_by_name: session.Users
      ? `${session.users.first_name} ${session.Users.last_name}`
      : null,
    created_at: session.created_at,
    updated_at: session.updated_at,
  }));
}
