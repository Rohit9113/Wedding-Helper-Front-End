import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VendorDecoreGallery() {
  const [images, setImages] = useState([]);
  const [imageDesc, setImageDesc] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Fetch images from backend
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vendor/images`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && response.data.images) {
        setImages(response.data.images.map(img => ({ imageUrl: img, description: '' })));
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle description change
  const handleDescriptionChange = (e) => {
    setImageDesc(e.target.value);
  };

  // Submit new image (Only POST, no updating state manually)
  const handleSubmit = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append('images', imageFile);
    formData.append('description', imageDesc);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/vendor/upload-images`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
            Role: role,
          },
        }
      );

      setImageDesc('');
      setImageFile(null);
      setIsModalOpen(false);

      // Fetch updated images after successful upload
      fetchImages();
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // Delete image from backend and update state
  const handleDeleteImage = async (imageUrl) => {
    const imageName = imageUrl.split('/').pop();
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/vendor/images/${imageName}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Fetch updated images after deletion
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-12">
      <button onClick={() => setIsModalOpen(true)} className="bg-white text-black w-40 m-auto font-semibold py-3 px-6 rounded-full hover:bg-slate-200 transition-all duration-300 mb-6">
        Add Image
      </button>
      <div className="w-full max-w-[1400px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((imageObj, index) => (
          <div key={index} className="relative bg-white rounded-lg shadow-lg">
            <div className="relative">
              <img src={imageObj.imageUrl} alt={`Gallery Image ${index}`} className="w-full h-64 object-cover rounded-t-lg" />
              <button onClick={() => handleDeleteImage(imageObj.imageUrl)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600">X</button>
            </div>
            <div className="p-4">
              <p>{imageObj.description || 'No description added'}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <h3 className="text-xl font-semibold text-center mb-4">Add Image and Description</h3>
            <input type="file" onChange={handleImageChange} className="w-full p-2 border border-gray-300 rounded-md mb-4" />
            <textarea placeholder="Add a description..." value={imageDesc} onChange={handleDescriptionChange} className="w-full p-2 border border-gray-300 rounded-md mb-4"></textarea>
            <div className="flex justify-between">
              <button onClick={handleSubmit} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300">Submit</button>
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition-all duration-300">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VendorDecoreGallery;
