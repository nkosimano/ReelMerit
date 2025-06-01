/*
  # Add RLS policies for user_roles table

  1. Security Changes
    - Enable RLS on user_roles table
    - Add policies for:
      - Users can insert their own role
      - Users can read their own role
      - Users can't update or delete roles (for data integrity)
    
  2. Notes
    - Ensures users can only insert and read their own role assignments
    - Prevents unauthorized role modifications
    - Maintains data security while allowing necessary operations
*/

-- Enable RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own role
CREATE POLICY "Users can insert their own role"
ON user_roles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow users to read their own role
CREATE POLICY "Users can read their own role"
ON user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Note: No UPDATE or DELETE policies are created intentionally
-- to prevent role modifications after initial assignment