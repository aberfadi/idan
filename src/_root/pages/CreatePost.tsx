import CreatePostForm from "@/components/forms/CreatePostForm";

const CreatePost = () => {
  return (
    <div className="flex flex-1 justify-center">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
        </div>

        <CreatePostForm action="Create" />
      </div>
    </div>
  );
};
export default CreatePost;
