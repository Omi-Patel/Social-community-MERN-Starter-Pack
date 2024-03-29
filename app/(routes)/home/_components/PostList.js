import React, { useEffect, useState } from "react";
import GlobalApi from "../../../_utils/GlobalApi";
import PostItem from "./PostItem";

const PostList = ({ postList, updatePostList }) => {
  return (
    <div>
      {postList ? (
        postList.map((item, index) => (
          <div key={index}>
            <PostItem post={item} updatePostList={() => updatePostList()} />
          </div>
        ))
      ) : (
        <div>
          {[1, 2, 3].map((item, index) => (
            <div className="h-[200px] w-full bg-slate-200 rounded-lg animate-pulse my-5"></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
