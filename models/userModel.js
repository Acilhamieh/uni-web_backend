// models/userModel.js
import supabase from '../config/supabase.js';
import bcrypt from 'bcrypt';
export const createUser = async ({ firstName, lastName, email, password, role = 'student' }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('users')
    .insert([{
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPassword,
      role,
    }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  const formattedUser = {
    id: data.id,
    full_name: `${data.first_name} ${data.last_name}`,
    email: data.email,
    role: data.role,
    custom_user_id: data.custom_user_id,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };

  return formattedUser;
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
    .select('id, first_name, last_name, email, role, custom_user_id, created_at, updated_at');

  if (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }

  return data;
};