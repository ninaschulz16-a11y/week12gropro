
This project was created as part of our bootcamp final assignment.

NeighbourNet is a simple neighbourhood app where users can join their area, create posts, comment, and view what’s happening around them. The goal was to build a full-stack application using Next.js, Express, Postgres (Supabase), Clerk authentication, and Leaflet for maps.

Features:

 -User authentication with Clerk

 -Profiles linked to neighbourhoods

 -Create posts with optional images

 -Comment on posts

 -Accept/reject neighbour connection requests

 -Display post locations using Leaflet maps

 -Supabase used for database + storage


What we used :

 -Next.js

 -Express server

 -Postgres (Supabase)

 -PG 

 -Clerk Authentication

 -Leaflet (Interactive Maps)

 -Tailwind CSS


Database Setup

Supabase website project - At first, we created a detailed and complex schema with many relational tables, having 9 tables :

 -profiles

 -neighbourhoods

 -posts

 -post_images

 -comments

 -neighbour_connections

 -likes

 -comments1 (a mistake)

 -users


However, this made the project harder to implement and caused issues with queries and data fetching.

We eventually simplified the tables to a cleaner, more practical structure, keeping only :

 -comments

 -post_images

 -posts 

 -profiles

We originally designed a more complex database with several relational tables.
However, we kept running into issues:

 -Complicated JOINs

 -Insert errors due to constraints

 -Hard-to-debug queries

 -Route handlers breaking when fetching related data

Because of this, we created simpler versions of a few tables to make queries easier and more reliable.
This helped the API routes work more consistently during development.

In the end , we also had to use supabase.js, as it was what worked when trying to fix some issues.

We connected to Supabase using a PG Pool only at first:


        import pg from "pg";

            export const db = new pg.Pool({
            connectionString: process.env.NEXT_POSTGRES,
        }); 




Mapping with Leaflet:

We added Leaflet so users could interact with a map and view neighbourhood locations visually.
Leaflet helped us:

 -Display neighbourhoods on a map

 -Show markers

 -Make the UI more intuitive

 -Test geolocation features during development

 
 MVP Features

 -Authentication with Clerk

 -Join/select a neighbourhood

 -Create posts

 -Add comments

 -View neighbourhood feeds

 -Basic mapping using Leaflet

 
 


Technical Challenges

Throughout the project we ran into several issues:

Supabase

 -Authentication errors after resetting database passwords

 -Route handlers not finding the correct tables

 -Query failures due to incorrect IDs or schema mismatch

 -Several trips to the documentation were needed to debug SQL, RLS policies, and API calls

 Next.js

 -Pages routing to the wrong components

 -Folder structure mistakes inside /app

 -Errors in API routes when connecting to the Pool database helper file


GitHub

 -Branches overriding each other

 -Merge conflicts that needed manual fixing

 -Team members pushing code to wrong branches

These taught us how to communicate better and work more carefully with Git workflows.

Mapping with Leaflet

We used Leaflet.js to show neighbourhood posts on an interactive map.
This allowed users to see local posts visually, making the app feel more connected to physical locations.

Reflection:

My teammates also shared their thoughts on the project. One highlighted how challenging it can be to organise work in a bigger team, especially when people want to work on similar tasks. Another mentioned how rewarding it was to build the landing page and see how all parts of the project grew from that central entry point. Overall, we all learned a lot about teamwork, problem-solving, and building a larger project from scratch
