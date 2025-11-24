"use client";

import { useState } from "react";
import Link from "next/link";

export default function CommentSection({
  postId,
  initialComments,
  currentUserId,
  currentUserProfile,
}) {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // FAKE DATA
  const fakeComments = [
    {
      id: "fake1",
      author_id: "user_123",
      username: "Graziela",
      avatar_url: "https://i.pravatar.cc/150?img=47",
      content: "PLS STOP THE MADNESS <3",
      created_at: new Date(Date.now() - 1000 * 60 * 8).toISOString(), // 8 min ago
      likes: 12,
      dislikes: 2,
    },
    {
      id: "fake2",
      author_id: "user_456",
      username: "Wednesday",
      avatar_url: "https://i.pravatar.cc/150?img=47",
      content: "my brain is fried <3",
      created_at: new Date(Date.now() - 1000 * 60 * 8).toISOString(), // 8 min ago
      likes: 134,
      dislikes: 6,
    },
  ];

  // inital comments with fake ones
  const [comments, setComments] = useState(
    initialComments?.length > 0 ? initialComments : fakeComments
  );

  

  // post request backend
  const handleVote = async (commentId, type) => {
    try {
      const res = await fetch(`/api/comments/${commentId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }), // "like" or "dislike"
      });
      if (!res.ok) throw new Error("failed to vote");

      const { comment } = await res.json();
      setComments((prev) =>
        prev.map((c) => (c.id === comment.id ? comment : c))
      );
    } catch (error) {
      console.error(error);
      alert("Error updating vote");
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = (now - date) / 1000; // seconds

    if (diff < 60) return "just now";
    if (diff < 3660) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUserId) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          content: newComment.trim(),
        }),
      });

      if (res.ok) {
        const comment = await res.json();
        setComments([comment, ...comments]);
        setNewComment("");
      } else {
        alert("failed to post comment");
      }
    } catch (error) {
      console.error(error);
      alert("error posting comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm("delete this comment?")) return;

    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setComments(comments.filter((c) => c.id !== commentId));
      } else {
        alert("failed to delete comment");
      }
    } catch (error) {
      console.error("error deleting comment:", error);
      alert("error deleting comment");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        comments ({comments.length})
      </h2>

      {/* comment form */}
      {currentUserId ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              {currentUserProfile?.avatar_url ? (
                <Image
                  src={currentUserProfile.avatar_url}
                  alt="your avatar"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-orange-200 flex items-center justify-center text-orange-600">
                  {currentUserProfile?.username?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="write a comment..."
                className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
                rows="3"
              />

              <button
                type="submit"
                disabled={isSubmitting || !newComment.trim()}
                className="mt-3 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold"
              >
                {isSubmitting ? "posting..." : "post comment"}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800">
            please{" "}
            <Link href="/sign-in" className="font-semibold underline">
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
            <div
              key={comment.id}
              className="border-b border-gray-200 pb-6 last:border-0"
            >
              <div className="flex items-start gap-3">
                <Link href={`/profile/${comment.author_id}`}>
                  <div className="relative w-10 h-10 rounded-full overflow-hidden cursor-pointer">
                    {comment.avatar_url ? (
                      <Image
                        src={comment.avatar_url}
                        alt={comment.username}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-orange-200 flex items-center justify-center text-orange-600">
                        {comment.username?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </Link>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Link href={`/profile/${comment.author_id}`}>
                      <p className="font-semibold text-gray-800 hover:underline cursor-pointer">
                        {comment.username}
                      </p>
                    </Link>

                    <span className="text-gray-400 text-sm">·</span>

                    <p className="text-sm text-gray-500">
                      {formatTime(comment.created_at)}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-xl">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-2 text-sm">
                    {/* // like button */}
                    <button
                      onClick={() => handleVote(comment.id, "like")}
                      className="flex items-center gap-1 text-gray-600 hover:text-orange-500 transition"
                    >
                      👍 <span>{comment.likes}</span>
                    </button>

                    {/* dislike button */}
                    <button
                      onClick={() => handleDislike(comment.id, "dislike")}
                      className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition"
                    >
                      👎 <span>{comment.dislikes}</span>
                    </button>

                    {currentUserId &&
                      comment.author_id === currentUserProfile?.id && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-red-500 text-sm ml-auto hover:underline"
                        >
                          delete
                        </button>
                      )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">
              no comments yet. be the first to comment!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
