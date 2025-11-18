// src/app/profile/[id]/page.jsx

// import { auth } from "@clerk/nextjs/server";  // comment this out
import { redirect } from "next/navigation";
// import { db } from "@/utils/db";
import Image from "next/image";
import Link from "next/link";
import Map from "@/components/Map";
import Filters from "@/components/Filters";

export default async function ProfilePage({ params }) {
  // const { userId } = await auth();  // comment this out
  const userId = "fake-user-123";  // temporary fake user id
    
    const resolvedParams = await params;
    const profileId = resolvedParams.id;

    // if someone goes to /profile/me, redirect to their actual profile
    if (profileId === "me") {
        if (!userId) {
        redirect("/sign-in");
        }
        
        // temporary - just redirect to a test id
        redirect("/profile/test-user-123");
    }

    // TEMPORARY MOCK DATA - replace with real database queries later
    const profile = {
        id: profileId,
        username: "testuser",
        full_name: "Test User",
        avatar_url: null,
        neighbourhood_name: "Camden Town",
        neighbourhood_lat: 51.5392,
        neighbourhood_lng: -0.1426,
        created_at: new Date("2024-01-15"),
        clerk_user_id: userId
    };

    const isOwnProfile = true;

    // temporary mock posts
    const posts = [
        {
        id: "post-1",
        username: "testuser",
        avatar_url: null,
        content: "looking for someone to help move furniture this weekend! willing to pay £20/hour",
        latitude: 51.5392,
        longitude: -0.1426,
        created_at: new Date("2024-11-10")
        },
        {
        id: "post-2",
        username: "testuser",
        avatar_url: null,
        content: "anyone want to join a neighbourhood cleanup on saturday morning?",
        latitude: 51.5400,
        longitude: -0.1430,
        created_at: new Date("2024-11-15")
        }
    ];

    // temporary nearby posts
    const nearbyPosts = [
        {
        id: "nearby-1",
        username: "neighbour123",
        avatar_url: null,
        content: "giving away some books! come grab them before they go to charity",
        distance: 0.3,
        created_at: new Date("2024-11-16")
        },
        {
        id: "nearby-2",
        username: "localhelper",
        avatar_url: null,
        content: "offering dog walking services in the area, dm me!",
        distance: 0.8,
        created_at: new Date("2024-11-14")
        }
    ];

    /* 
    REAL DATABASE QUERIES - uncomment when you have database access:
    
    const profileResult = await db.query(
        `SELECT 
        profiles.*,
        neighbourhoods.name as neighbourhood_name,
        neighbourhoods.latitude as neighbourhood_lat,
        neighbourhoods.longitude as neighbourhood_lng
        FROM profiles 
        LEFT JOIN neighbourhoods ON profiles.neighbourhood_id = neighbourhoods.id
        WHERE profiles.id = $1`,
        [profileId]
    );

    if (profileResult.rows.length === 0) {
        return (
        <div className="flex min-h-screen items-center justify-center bg-green-50">
            <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">profile not found</h1>
            <Link href="/" className="text-orange-600 hover:underline mt-4 inline-block">
                go back home
            </Link>
            </div>
        </div>
        );
    }

    const profile = profileResult.rows[0];
    const isOwnProfile = userId && profile.clerk_user_id === userId;

    const postsResult = await db.query(
        `SELECT 
        posts.*,
        profiles.username,
        profiles.avatar_url 
        FROM posts 
        JOIN profiles ON posts.author_id = profiles.id 
        WHERE posts.author_id = $1 
        ORDER BY posts.created_at DESC`,
        [profileId]
    );

    const posts = postsResult.rows;

    let nearbyPosts = [];
    
    if (profile.neighbourhood_lat && profile.neighbourhood_lng) {
        const nearbyResult = await db.query(
        `SELECT 
            posts.*,
            profiles.username,
            profiles.avatar_url,
            (6371 * acos(
            cos(radians($1)) * cos(radians(posts.latitude)) * 
            cos(radians(posts.longitude) - radians($2)) + 
            sin(radians($1)) * sin(radians(posts.latitude))
            )) AS distance
        FROM posts
        JOIN profiles ON posts.author_id = profiles.id
        WHERE posts.latitude IS NOT NULL 
        AND posts.longitude IS NOT NULL
        AND posts.author_id != $3
        ORDER BY distance ASC
        LIMIT 10`,
        [profile.neighbourhood_lat, profile.neighbourhood_lng, profileId]
        );
        
        nearbyPosts = nearbyResult.rows;
    }
    */

    return (
        <div className="min-h-screen bg-green-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            
            {/* profile header */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
                
                {/* avatar */}
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-orange-400">
                {profile.avatar_url ? (
                    <Image
                    src={profile.avatar_url}
                    alt={profile.username}
                    fill
                    className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-orange-200 flex items-center justify-center text-4xl text-orange-600">
                    {profile.username?.charAt(0).toUpperCase()}
                    </div>
                )}
                </div>

                {/* user info */}
                <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-800">
                    {profile.full_name || profile.username}
                </h1>
                <p className="text-xl text-gray-600 mt-1">@{profile.username}</p>
                
                {profile.neighbourhood_name && (
                    <div className="mt-3 inline-block bg-green-100 px-4 py-2 rounded-full">
                    <p className="text-green-700 font-semibold flex items-center gap-2">
                        📍 {profile.neighbourhood_name}
                    </p>
                    </div>
                )}
                
                <p className="text-gray-500 text-sm mt-4">
                    member since {new Date(profile.created_at).toLocaleDateString()}
                </p>
                </div>
                
                {/* edit button */}
                {isOwnProfile && (
                <Link
                    href="/profile/edit"
                    className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold"
                >
                    edit profile
                </Link>
                )}
            </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* left side - posts and filters */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* filters section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">filter posts</h3>
                <Filters 
                    onFilterChange={(filters) => {
                    console.log("filters applied:", filters);
                    }}
                />
                </div>

                {/* user's posts */}
                <div>
                <h2 className="text-3xl font-bold mb-4 text-orange-600">
                    {isOwnProfile ? "your posts" : `${profile.username}'s posts`}
                </h2>
                
                <div className="space-y-4">
                    {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <Link href={`/posts/${post.id}`} key={post.id}>
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer">
                            
                            <div className="flex items-start gap-3 mb-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                {post.avatar_url ? (
                                <Image
                                    src={post.avatar_url}
                                    alt={post.username}
                                    fill
                                    className="object-cover"
                                />
                                ) : (
                                <div className="w-full h-full bg-orange-200 flex items-center justify-center text-orange-600">
                                    {post.username?.charAt(0).toUpperCase()}
                                </div>
                                )}
                            </div>
                            
                            <div>
                                <p className="font-semibold text-gray-800">{post.username}</p>
                                <p className="text-sm text-gray-500">
                                {new Date(post.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            </div>
                            
                            <p className="text-gray-700">{post.content}</p>
                            
                            {post.latitude && post.longitude && (
                            <p className="text-gray-500 text-sm mt-2">
                                📍 {post.latitude.toFixed(4)}, {post.longitude.toFixed(4)}
                            </p>
                            )}
                        </div>
                        </Link>
                    ))
                    ) : (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        <p className="text-gray-500">no posts yet</p>
                    </div>
                    )}
                </div>
                </div>
            </div>

            {/* right side - map and nearby posts */}
            <div className="space-y-6">
                
                {/* map */}
                <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">neighbourhood map</h3>
                <Map />
                </div>

                {/* nearby posts */}
                {nearbyPosts.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-orange-600">
                    nearby posts
                    </h2>
                    
                    <div className="space-y-4">
                    {nearbyPosts.map((post) => (
                        <Link href={`/posts/${post.id}`} key={post.id}>
                        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer">
                            
                            <div className="flex justify-between items-start mb-2">
                            <p className="font-semibold text-gray-800">{post.username}</p>
                            
                            {post.distance && (
                                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-semibold">
                                {post.distance.toFixed(1)} km
                                </span>
                            )}
                            </div>
                            
                            <p className="text-gray-700 text-sm line-clamp-2">{post.content}</p>
                            
                            <p className="text-gray-400 text-xs mt-2">
                            {new Date(post.created_at).toLocaleDateString()}
                            </p>
                        </div>
                        </Link>
                    ))}
                    </div>
                </div>
                )}
            </div>
            </div>
        </div>
        </div>
    );
}