import CreatePostForm from "@/components/CreatePostForm";

export default function CreatePostPage() {
  return (
    <div className="min-h-screen bg-[#F5F5DC] py-10 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Create a New Post</h1>
        <CreatePostForm />
      </div>
    </div>
  );
}
