// models/userModel.js
import bcrypt from 'bcrypt';
import supabase from '../config/supabase.js';

export const createUser = async ({ firstName, lastName, email, password, role = 'student' }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const { error } = await supabase.from('users').insert([
    {
      firstname: firstName,
      lastname: lastName,
      email,
      password: hashedPassword,
      role,
    },
  ]);

  if (error) throw new Error(error.message);
};

export const findUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error) throw new Error(error.message);
  return data;
};
//get all users 
export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('id, firstname, lastname, email, role, custom_user_id, created_at');

  if (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }

  return data;
};