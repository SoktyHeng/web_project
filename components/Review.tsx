import { Input } from '@mui/material';
import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';


const initialReviews = [
  { id: '1', text: 'Great event, had a wonderful time!' },
  { id: '2', text: 'Very informative and well-organized.' },
  { id: '3', text: 'Looking forward to the next one!' },
];

const Review = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState('');
  const [editingReview, setEditingReview] = useState<{ id: string; text: string } | null>(null);

  const handleAddReview = () => {
    const newReviewData = {
      id: (reviews.length + 1).toString(),
      text: newReview,
    };
    setReviews([...reviews, newReviewData]);
    setNewReview('');
  };

  const handleUpdateReview = (id: string) => {
    if (editingReview && editingReview.id === id) {
      setReviews(reviews.map(review => (review.id === id ? editingReview : review)));
      setEditingReview(null);
    }
  };

  const handleDeleteReview = (id: string) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Reviews</h1>
      <div className="mb-4 flex items-center">
        <Input
          value={newReview}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setNewReview(e.target.value)}
          placeholder="Add a new review"
          className="w-full mb-2"
        />
        <FaPlus onClick={handleAddReview} className="text-blue-600 cursor-pointer ml-2" size={24} />
      </div>
      <ul>
        {reviews.map((review) => (
          <li key={review.id} className="mb-4 p-4 bg-white shadow rounded flex justify-between items-center">
            {editingReview && editingReview.id === review.id ? (
              <div className="flex-1">
                <Input
                  value={editingReview.text}
                  onChange={(e: { target: { value: any; }; }) => setEditingReview({ ...editingReview, text: e.target.value })}
                  placeholder="Edit review"
                  className="w-full mb-2"
                />
                <div className="flex space-x-2">
                  <FaEdit onClick={() => handleUpdateReview(review.id)} className="text-green-600 cursor-pointer" size={24} />
                  <FaTrash onClick={() => setEditingReview(null)} className="text-gray-600 cursor-pointer" size={24} />
                </div>
              </div>
            ) : (
              <div className="flex-1">
                <p className="text-lg">{review.text}</p>
                <div className="flex space-x-2 mt-2">
                  <FaEdit onClick={() => setEditingReview(review)} className="text-yellow-600 cursor-pointer" size={24} />
                  <FaTrash onClick={() => handleDeleteReview(review.id)} className="text-red-600 cursor-pointer" size={24} />
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Review;