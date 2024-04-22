import { fetchComments, deletePost } from "./api";
import "./PostDetail.css";
import { useQuery, useMutation } from "@tanstack/react-query";

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
  });

  const deleteMutation = useMutation({
    mutationFn: (postId) => deletePost(postId),
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error! {error.toString()}</div>;

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => {}}>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
