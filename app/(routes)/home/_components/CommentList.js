import { MoreVertical, Trash } from "lucide-react";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { UserDetailContext } from "../../../_context/UserDetailContext";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { Button } from "../../../../components/ui/button";
import GlobalApi from "../../../_utils/GlobalApi";
import { toast } from "../../../../components/ui/use-toast";

const CommentList = ({ commentList, updatePostList }) => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const [commentListData, setCommentListData] = useState(commentList);

  const onDeleteComment = (comment) => {
    const result = commentListData.filter((item) => item._id != comment._id);
    setCommentListData(result);
    GlobalApi.deleteComment(comment._id).then((response) => {
      if (response) {
        toast({
          title: "Deleted!",
          description: "Your Comment Deleted Successfully!",
          variant: "success",
        });
      }
    });
    updatePostList();
  };

  return (
    <div>
      {commentListData.map((item, index) => (
        <div
          key={index}
          className="flex items-center border rounded-lg p-2 m-2"
        >
          <div className="flex items-center gap-3 w-full">
            <Image
              src={item?.createdBy?.image}
              alt="user-image"
              width={30}
              height={30}
              className="rounded-full"
            />
            <h2 className="bg-slate-200 text-black text-left p-2 rounded-lg">
              {item.commentText}
            </h2>
          </div>
          {item.createdBy?._id == userDetail?._id && (
            <Popover>
              <PopoverTrigger>
                <MoreVertical className="h-5 w-5 cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent className="w-[150px] p-2">
                <Button
                  className="w-full flex gap-2"
                  variant="danger"
                  onClick={() => onDeleteComment(item)}
                >
                  <Trash className="w-4 h-4" /> Delete!
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
