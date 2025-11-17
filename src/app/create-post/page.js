import CreatePostForm from "@/components/CreatePostForm";

function CreatePostPage() {
  return (
    <div className="max-w-xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-6">Create a New Post</h1>
        <CreatePostForm />
    </div>
  )
}

export default CreatePostPage;
