"use client";
import React, { useEffect, useState } from "react";
import Banner from "./_components/Banner";
import WritePost from "./_components/WritePost";
import PostList from "./_components/PostList";
import { useUser } from "@clerk/nextjs";
import GlobalApi from "../../_utils/GlobalApi";

function Home() {
  const { user } = useUser();
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    getAllPost();
  }, []);
  const getAllPost = () => {
    GlobalApi.getAllPost().then((response) => {
      //   console.log(response.data);
      setPostList(response.data);
    });
  };
  return (
    <div className="p-5 md:px-32">
      {!user ? <Banner /> : <WritePost getAllPost={() => getAllPost()} />}
      <PostList postList={postList} updatePostList={() => getAllPost()} />
    </div>
  );
}

export default Home;
