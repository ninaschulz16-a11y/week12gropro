CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    post_id INT NULL REFERENCES posts(id),
    vote SMALLINT CHECK (vote IN (-1, 1)),
    vote_type VARCHAR(255) CHECK (vote_type IN ('post', 'comment')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, post_id, vote_type)
);
create table profiles (
  id uuid primary key default uuid_generate_v4(),
  clerk_user_id text unique not null,   -- link to Clerk
  username text unique not null,
  full_name text,
  avatar_url text,
  neighbourhood_id uuid references neighbourhoods(id),
  created_at timestamp with time zone default now()
);
create table neighbourhoods (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  latitude double precision,
  longitude double precision
);
create table posts (
  id uuid primary key default uuid_generate_v4(),
  author_id uuid references profiles(id) on delete cascade,
  content text,
  latitude double precision,
  longitude double precision,
  created_at timestamp with time zone default now()
);
create table post_images (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid references posts(id) on delete cascade,
  image_url text not null,
  created_at timestamp with time zone default now()
);

create table comments1 (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid references posts(id) on delete cascade,
  author_id uuid references profiles(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default now()
);

create table neighbour_connections (
  id uuid primary key default uuid_generate_v4(),
  requester_id uuid references profiles(id) on delete cascade,
  addressee_id uuid references profiles(id) on delete cascade,
  status text check (status in ('pending', 'accepted', 'rejected')) default 'pending',
  created_at timestamp with time zone default now(),
  unique (requester_id, addressee_id)
);

insert into profiles (clerk_user_id, username, full_name, avatar_url)
values
  ('clerk_1', 'john_doe', 'John Doe', null),
  ('clerk_2', 'sarah_line', 'Sarah Line', null),
  ('clerk_3', 'marco_r', 'Marco Rossi', null);

  insert into posts (author_id, content, latitude, longitude)
select
  id,
  'Hello neighbours! This is my first post.',
  51.5007, -0.1246
from profiles
limit 1;

insert into posts (author_id, content, latitude, longitude)
select
  id,
  'Anybody knows a good craftsman?',
  51.5010, -0.1250
from profiles
offset 1 limit 1;

insert into comments1 (post_id, author_id, content)
select
  (select id from posts order by created_at limit 1),
  id,
  'Welcome to the neighbourhood!'
from profiles
limit 1;

insert into comments1 (post_id, author_id, content)
select
  (select id from posts order by created_at desc limit 1),
  id,
  'I know a great craftsman — I can help you!'
from profiles
offset 1 limit 1;



