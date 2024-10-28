import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { PostStats } from "@/components/shared";
import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();

  if (!post.creator) return;

  return (
    <div className="post-card">
      <div className="flex-between px-2 lg:px-3 py-4">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post.creator?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="size-9 rounded-full hover:brightness-200"
            />
          </Link>

          <div className="flex flex-col">
            <p className="text-[14px] font-semibold lg:body-bold text-light-1">
              {post.creator.name}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold text-[12px] text-light-6">
                {multiFormatDateString(post.$createdAt)}
              </p>

              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}
        >
          <img src={"/assets/icons/edit.svg"} alt="edit" className="size-6" />
        </Link>
      </div>

      <div>
        <div className="text-[24px]  px-2 lg:px-3 pb-3">
          <p>{post.caption}</p>
        </div>
        <Link to={`/posts/${post.$id}`}>
          {post.imageUrl && ( // Only render if imageUrl exists
            <img
              src={post.imageUrl}
              alt="post image"
              className="post-card_img"
            />
          )}
        </Link>
      </div>

      <div>
        <PostStats post={post} userId={user.id} />
      </div>
    </div>
  );
};

export default PostCard;
