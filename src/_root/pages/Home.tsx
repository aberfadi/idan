import { Loader } from "@/components/shared";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/query/queries";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";

const Home = () => {
  const { user } = useUserContext();
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();

  if (isErrorPosts) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="home-posts">
        <div className="flex gap-2 w-2/3 items-center bg-dark-3 rounded-xl p-2">
          <Link to={`/profile/${user.id}`}>
            <img
              src={user.imageUrl}
              alt={user.name}
              className="size-9 rounded-full hover:brightness-200"
            />
          </Link>

          <Link
            to="/create_post"
            className="bg-dark-4 hover:bg-dark-5 text-light-6 rounded-full px-3 py-2 flex-grow"
          >
            Create your post!
          </Link>
        </div>

        {isPostLoading && !posts ? (
          <Loader />
        ) : (
          <ul className="flex flex-col flex-1 gap-6 w-full ">
            {posts?.documents.map((post: Models.Document) => (
              <li key={post.$id} className="flex justify-center w-full">
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default Home;
