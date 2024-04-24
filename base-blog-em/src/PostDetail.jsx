import { fetchComments } from "./api";
import "./PostDetail.css";
import { useQuery } from "@tanstack/react-query";

export function PostDetail({ post, deleteMutation, updateMutation }) {
  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error! {error.toString()}</div>;

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div>
        <button
          onClick={() => {
            deleteMutation.mutate(post.id);
          }}
        >
          Delete
        </button>
        {deleteMutation.isPending && (
          <p className="loading">Deleting the post</p>
        )}
        {deleteMutation.isError && (
          <p className="error">
            Error deleting the post : {deleteMutation.error.toString()}
          </p>
        )}
        {deleteMutation.isSuccess && (
          <p className="success">Post was deleted.</p>
        )}
      </div>
      <div>
        <button
          onClick={() => {
            updateMutation.mutate(post.id);
          }}
        >
          Update title
        </button>
        {updateMutation.isError && (
          <p className="error">
            Error has occured. Error: {updateMutation.error.toString()}
          </p>
        )}
        {updateMutation.isSuccess && (
          <p className="success">Post was updated.</p>
        )}
      </div>
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
