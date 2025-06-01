/*
  # Add RLS policies for profiles table

  1. Security Changes
    - Enable RLS on profiles table
    - Add policies for:
      - Users can insert their own profile
      - Users can read their own profile
      - Users can update their own profile
      - Users can't delete profiles (handled by Supabase auth)

  2. Notes
    - Ensures users can only manage their own profile data
    - Maintains data security while allowing necessary operations
*/

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own profile
CREATE POLICY "Users can insert their own profile"
ON profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Allow users to read their own profile
CREATE POLICY "Users can read their own profile"
ON profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile"
ON profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Explicitly deny DELETE operations by not creating a policy for it