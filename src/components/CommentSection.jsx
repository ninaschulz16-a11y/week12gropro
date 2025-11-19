"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabase";

export default function CommentSection({ 
    postId, 
    initialComments, 
    currentUserId, 
    currentUserProfile 
    }) {
    const [comments, setComments] = useState(initialComments || []);
    const [newComment, setNewComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    // handle posting a new comment
    const handleSubmitComment = async (event) => {
        event.preventDefault();
        
        if (!newComment.trim()) {
        setMessage("please write something");
        return;
        }
        
        if (!currentUserId) {
        setMessage("please sign in to comment");
        return;
        }

        setIsSubmitting(true);
        setMessage("");

        try {
        // find the profile for this user
        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("id")
            .eq("clerk_user_id", currentUserId)
            .single();

        if (profileError || !profile) {
            setMessage("profile not found. please sign out and back in.");
            setIsSubmitting(false);
            return;
        }

        // save comment to database
        const { data: savedComment, error: commentError } = await supabase
            .from("comments")
            .insert([
            {
                post_id: postId,
                author_id: profile.id,
                content: newComment.trim(),
            }
            ])
            .select()
            .single();

        if (commentError) {
            setMessage("failed to post comment: " + commentError.message);
            setIsSubmitting(false);
            return;
        }

        // add comment to local state
        const newCommentData = {
            id: savedComment.id,
            username: currentUserProfile?.username || "you",
            avatar_url: currentUserProfile?.avatar_url || null,
            author_id: profile.id,
            content: newComment.trim(),
            created_at: new Date()
        };

        setComments([newCommentData, ...comments]);
        setNewComment("");
        setMessage("comment posted!");
        
        // clear message after 2 seconds
        setTimeout(() => setMessage(""), 2000);

        } catch (error) {
        console.error("Error posting comment:", error);
        setMessage("something went wrong");
        } finally {
        setIsSubmitting(false);
        }
    };

    // handle deleting a comment
    const handleDeleteComment = async (commentId) => {
        if (!confirm("delete this comment?")) {
        return;
        }

        try {
        // delete from database
        const { error } = await supabase
            .from("comments")
            .delete()
            .eq("id", commentId);

        if (error) {
            console.error("Error deleting comment:", error);
            return;
        }

        // remove from local state
        setComments(comments.filter((comment) => comment.id !== commentId));

        } catch (error) {
        console.error("Error:", error);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-8">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
            comments ({comments.length})
        </h2>

        {/* comment form */}
        {currentUserId ? (
            <form onSubmit={handleSubmitComment} className="mb-8">
            <div className="flex gap-3">
                
                {/* user avatar */}
                <div className="w-10 h-10 min-w-10 min-h-10 rounded-full bg-[#3E513E] flex items-center justify-center text-white flex-shrink-0">
                {currentUserProfile?.username?.charAt(0).toUpperCase() || "U"}
                </div>
                
                <div className="flex-1">
                <textarea
                    value={newComment}
                    onChange={(event) => setNewComment(event.target.value)}
                    placeholder="write a comment..."
                    className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#3E513E] text-gray-800 placeholder-gray-500"
                    rows="3"
                />
                
                <div className="flex items-center gap-4 mt-3">
                    <button
                    type="submit"
                    disabled={isSubmitting || !newComment.trim()}
                    className="bg-[#3E513E] text-white px-6 py-2 rounded-full hover:bg-[#2d3d2d] transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                    {isSubmitting ? "posting..." : "post comment"}
                    </button>
                    
                    {message && (
                    <p className={`text-sm ${message.includes("posted") ? "text-green-600" : "text-red-600"}`}>
                        {message}
                    </p>
                    )}
                </div>
                </div>
            </div>
            </form>
        ) : (
            <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">
                please{" "}
                <Link href="/sign-in" className="font-semibold underline text-[#3E513E]">
                sign in
                </Link>{" "}
                to comment
            </p>
            </div>
        )}

        {/* comments list */}
        <div className="space-y-6">
            {comments.length > 0 ? (
            comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex items-start gap-3">
                    
                    {/* comment author avatar */}
                    <div className="w-10 h-10 min-w-10 min-h-10 rounded-full bg-[#3E513E] flex items-center justify-center text-white">
                    {comment.username?.charAt(0).toUpperCase()}
                    </div>
                    
                    <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <p className="font-semibold text-gray-800">{comment.username}</p>
                        <span className="text-gray-400 text-sm">·</span>
                        <p className="text-sm text-gray-500">
                        {new Date(comment.created_at).toLocaleDateString()}
                        </p>
                    </div>
                    
                    <p className="text-gray-700">{comment.content}</p>

                    {/* delete button - only show for your own comments */}
                    {currentUserId && comment.author_id === currentUserId && (
                        <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-red-500 text-sm mt-2 hover:underline"
                        >
                        delete
                        </button>
                    )}
                    </div>
                </div>
                </div>
            ))
            ) : (
            <p className="text-gray-500 text-center py-4">
                no comments yet. be the first to comment!
            </p>
            )}
        </div>
        </div>
    );
}