-- create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  username TEXT,
  full_name TEXT,
  avatar_url TEXT,
  neighbourhood_name TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT NOT NULL,
  category TEXT,
  tags TEXT,
  image_url TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- create comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- create post_images table
CREATE TABLE IF NOT EXISTS post_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);