import { useNavigate } from "react-router-dom";
import { FileUploader, Loader } from "../shared";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui";
import { Textarea } from "../ui/textarea";
import * as z from "zod";
import { Models } from "appwrite";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { PostV } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useCreatePost, useUpdatePost } from "@/lib/query/queries";

type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

const CreatePostForm = ({ post, action }: PostFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUserContext();
  const form = useForm<z.infer<typeof PostV>>({
    resolver: zodResolver(PostV),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
    },
  });

  // Query
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdatePost();

  // Watch the form values
  const { watch } = form;
  const caption = watch("caption");
  const files = watch("file");

  // Determine if the button should be enabled
  const isButtonDisabled =
    !caption && (!files || (Array.isArray(files) && files.length === 0));
  // Handler
  const handleSubmit = async (value: z.infer<typeof PostV>) => {
    // ACTION = UPDATE
    if (post && action === "Update") {
      console.log("Creating post with:", value);
      const updatedPost = await updatePost({
        ...value,
        postId: post.$id,
        imageId: post.imageId,
        imageUrl: post.imageUrl,
      });

      if (!updatedPost) {
        toast({
          title: `${action} post failed. Please try again.`,
        });
      }
      return navigate(`/posts/${post.$id}`);
    }

    // ACTION = CREATE
    const newPost = await createPost({
      ...value,
      userId: user.id,
    });

    if (!newPost) {
      toast({
        title: `${action} post failed. Please try again.`,
      });
    }
    navigate("/");
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder={`Say what you want, ${user.name}...`}
                  className="textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="message" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="cancel-button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="button whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate || isButtonDisabled} // Use the calculated disabled status
          >
            {(isLoadingCreate || isLoadingUpdate) && <Loader />}
            Publish
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default CreatePostForm;
