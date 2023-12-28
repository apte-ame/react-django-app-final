// AddPostModal.js
import React, { useState, useEffect } from 'react';
import './AddPostModal.css';

const AddPostModal = ({ onSubmit, onCancel }) => {
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const handleTextChange = (e) => setText(e.target.value);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];

        if (selectedImage && selectedImage.type.startsWith('image/')) {
            setImage(selectedImage);

            // Create a preview of the selected image
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedImage);

            // Reset the alert
            setShowAlert(false);
        } else {
            // Show the alert if the selected file is not an image
            setShowAlert(true);
        }
    };

    const handleSubmit = () => {
        if (!text || !image) {
            // Show the alert if either text or image is missing
            setShowAlert(true);
        } else {
            // Reset the alert and proceed with submission
            setShowAlert(false);
            const formData = new FormData();
            formData.append('text', text);
            formData.append('image', image);
            onSubmit(formData);
        }
    };

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Escape') {
                onCancel();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [onCancel]);

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <h2 className="mb-4">Add New Post</h2>

                    {/* Custom file input with image preview */}
                    <label htmlFor="postImage" className="custom-file-upload">
                        {imagePreview && <div className="image-preview" style={{ backgroundImage: `url(${imagePreview})` }}></div>}
                        <div className="file-input-wrapper">
                            <span className="file-input-icon">📸</span>
                            {imagePreview ? 'Change Image' : 'Choose Image'}
                        </div>
                        <input type="file" id="postImage" onChange={handleImageChange} accept="image/*" />
                    </label>

                    <div className="mb-3">
                        <label htmlFor="postText" className="form-label">Post Text:</label>
                        <textarea className="form-control" id="postText" value={text} onChange={handleTextChange}></textarea>
                    </div>

                    {showAlert && (
                        <div className="alert alert-danger" role="alert">
                            {image && image.type.startsWith('image/') ? 'Please fill in both the image and text fields before submitting.' : 'Please upload a valid image file.'}
                        </div>
                    )}

                    <div className="modal-buttons">
                        <button className="btn btn-success" onClick={handleSubmit}>
                            Submit
                        </button>
                        <button className="btn btn-danger" onClick={onCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPostModal;
