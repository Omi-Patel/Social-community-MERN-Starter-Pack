import Image from "next/image";
import React, { useContext, useState } from "react";
import moment from "moment";
import { UserDetailContext } from "../../../_context/UserDetailContext";
import GlobalApi from "../../../_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";
import { Button } from "../../../../components/ui/button";
import { Send } from "lucide-react";
import { toast } from "../../../../components/ui/use-toast";
import CommentList from "./CommentList";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog";

const PostItem = ({ post, updatePostList }) => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { user } = useUser();

  const [userInputComment, setUserInputComment] = useState();

  const checkIsUserLike = (postLikes) => {
    return postLikes.find((item) => item?._id == userDetail?._id);
  };

  const onLikeClick = (isLike, postId) => {
    const data = {
      userId: userDetail?._id,
      isLike: isLike,
    };

    GlobalApi.onPostLike(postId, data).then((response) => {
      // console.log(response);
      updatePostList();
    });
  };

  const addCommentText = (postId) => {
    const data = {
      commentText: userInputComment,
      createdBy: userDetail?._id,
      post: postId,
      createdAt: Date.now().toString(),
    };
    GlobalApi.addComment(data).then((response) => {
      if (response) {
        toast({
          title: "Awesome!",
          description: "Your Comment Added Successfully!",
          variant: "success",
        });
        updatePostList();
      }
    });
    setUserInputComment("");
  };

  return (
    <div className="p-5 border rounded-lg my-5">
      <div className="flex gap-2 items-center">
        <Image
          src={post?.createdBy.image}
          alt="user-image"
          width={35}
          height={35}
          className="rounded-full"
        />
        <div>
          <h2 className="font-bold">{post?.createdBy?.name}</h2>
          <h2 className="text-[12px] text-gray-600">
            {moment(Number(post?.createdAt)).format("DD MMM  | hh:mm A")}
          </h2>
        </div>
      </div>
      <div className="bg-slate-100 rounded-lg p-3 mt-4">
        <h2>{post.postText}</h2>
      </div>
      <div className="flex gap-8 mt-4">
        <div className="flex gap-1 items-center text-gray-500">
          {!checkIsUserLike(post?.likes) ? (
            <svg
              onClick={() => onLikeClick(true, post._id)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => onLikeClick(false, post._id)}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-red-500"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          )}
          <h2> {post?.likes?.length} Likes</h2>
        </div>

        <AlertDialog>
          <AlertDialogTrigger>
            <div className="flex gap-1 items-center text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                />
              </svg>

              <h2>{post.comments?.length} Comments</h2>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex justify-between items-center">
                Comments! <AlertDialogCancel>X</AlertDialogCancel>
              </AlertDialogTitle>
              <AlertDialogDescription>
                <CommentList
                  commentList={post?.comments}
                  updatePostList={() => updatePostList()}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Comment Section */}
      {user && (
        <div className="mt-5">
          <hr className="mb-5" />
          <div className="flex gap-4 items-center">
            <Image
              src={user?.imageUrl}
              width={30}
              height={30}
              alt="user-image"
              className="rounded-full"
            />

            <input
              onChange={(e) => setUserInputComment(e.target.value)}
              value={userInputComment}
              className="w-full bg-slate-100 p-2 rounded-xl px-5 outline-blue-300"
              type="text"
              placeholder="Write a Comment!"
            />

            <Button
              onClick={() => addCommentText(post._id)}
              disabled={!userInputComment}
              className="bg-blue-400 text-white p-2 h-8 w-8 rounded-xl hover:bg-blue-600"
            >
              <Send />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostItem;
