import React, { useState } from "react";
import { Star, StarOff } from "lucide-react";
import { UseSingleProduct } from "../hooks/useProduct/UseProduct";
import { UseAddComment, UseComments } from "../hooks/comments/useComment";
import { toast } from "react-toastify";

function ReviewProduct() {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const { AddComment, isPending } = UseAddComment();
  const { FetchComment } = UseComments();
  console.log("FetchComment", FetchComment);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || content === "") {
      toast.error("Please select a rating");
    }

    AddComment({
      rating,
      content,
    });

    setRating(0);
    setContent("");
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Customer Reviews
      </h2>

      {/* Review Form */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  {star <= rating ? (
                    <Star className="w-6 h-6 text-yellow-400 fill-current" />
                  ) : (
                    <StarOff className="w-6 h-6 text-gray-300" />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Share your thoughts about this product..."
            />
          </div>
          <button
            disabled={isPending}
            type="submit"
            className="px-6 py-2 disabled:cursor-not-allowed disabled:bg-blue-400 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            {isPending ? "Loading..." : "Submit Review"}
          </button>
        </form>
      </div>

      <div className="space-y-6">
        {FetchComment?.length > 0
          ? FetchComment?.map((comment) => (
              <div
                key={comment?._id}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500 text-white">
                    {comment?.user?.name.charAt(0).toUpperCase()}
                    {comment?.user?.lastname.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {comment?.user?.name}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {comment?.createAt}
                      </span>
                    </div>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${
                            index < comment.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-3 text-gray-600">{comment?.content}</p>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default ReviewProduct;
