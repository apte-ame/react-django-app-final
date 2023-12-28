// AddPostButton.js
import React, { useState } from 'react';
import AddPostModal from './AddPostModal';

const AddPostButton = ({ onPost }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => setModalVisible(true);
    const handleCloseModal = () => setModalVisible(false);

    const submitPost = async (formData) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/posts/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // Simulate posting to the server, you should replace this with actual API call
                console.log('Post successfully submitted to the server');
                // Close the modal
                handleCloseModal();
                // Trigger the onPost callback
                onPost();
            } else {
                // Handle errors, log or display an error message
                console.error('Error submitting post to the server:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        // <div className="add-post-button" style={{ position: 'absolute', top: 10, right: 10 }}>
        <div className="add-post-button">
            <button style={{ background: 'black', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={handleOpenModal}>
                Add New Post
            </button>
            {modalVisible && (
                <AddPostModal
                    onSubmit={(formData) => submitPost(formData)}
                    onCancel={handleCloseModal}
                />
            )}
        </div>
    );

};

export default AddPostButton;
