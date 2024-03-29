import { useUser } from "@clerk/nextjs";
import { Image, Send, Video } from "lucide-react";
import React, { useContext, useState } from "react";
import { Button } from "../../../../components/ui/button";
import GlobalApi from "../../../_utils/GlobalApi";
import { UserDetailContext } from "../../../_context/UserDetailContext";
import { useToast } from "../../../../components/ui/use-toast";
// import { useToast } from "@/components/ui/use-toast"

const WritePost = ({ getAllPost }) => {
  const { user } = useUser();
  const { toast } = useToast();

  const [userInputPost, setUserInputPost] = useState();

  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const onCreatePost = () => {
    const data = {
      postText: userInputPost,
      createdAt: Date.now().toString(),
      createdBy: userDetail?._id,
    };
    GlobalApi.createPost(data).then(
      (response) => {
        console.log(response);
        setUserInputPost("");
        if (response) {
          getAllPost();
          toast({
            title: "Awesome!",
            description: "Your Post Published Successfully!",
            variant: "success",
          });
        }
      },
      (error) => {
        toast({
          title: "Opps!!!",
          description: "Something Went Wrong!",
          variant: "destructive",
        });
      }
    );
  };
  return (
    <div>
      <h2 className="text-[30px] font-medium text-gray-600">
        Hello, {user.fullName}
      </h2>
      <h2 className="text-gray-500">
        What's New With You ? Would You Like To Share Something With Community ?
      </h2>

      <div className="p-3 border rounded-lg mt-4 bg-slate-100">
        <h2>Create Post</h2>
        <div className="p-4 bg-white rounded-lg mt-2">
          <textarea
            className="outline-none w-full"
            placeholder="What's New ?"
            value={userInputPost}
            onChange={(e) => setUserInputPost(e.target.value)}
          ></textarea>
        </div>
        <div className="mt-2 flex justify-between">
          <div className="flex gap-5">
            <h2 className="flex gap-2 items-center cursor-pointer hover:bg-slate-200 p-2 rounded-lg">
              <Image className="h-5 w-5" /> Image
            </h2>
            <h2 className="flex gap-2 items-center cursor-pointer hover:bg-slate-200 p-2 rounded-lg">
              <Video className="h-5 w-5" /> Video
            </h2>
          </div>
        </div>
        <Button
          className="bg-blue-500 rounded-xl text-md mt-2 gap-2 tracking-wider hover:bg-blue-700"
          disabled={!userInputPost?.length}
          onClick={() => onCreatePost()}
        >
          <Send className="h-4 w-4" /> Publish !
        </Button>
      </div>
    </div>
  );
};

export default WritePost;
