import React, { useState } from 'react';
import '../styles/BehanceItem.css';
import { AiFillLike } from 'react-icons/ai'; 

const BehanceItem = ({ item }) => { 
  const [likes, setLikes] = useState(item.feLike);
  const [showModal, setShowModal] = useState(false);

  const handleLikeClick = () => {
    setLikes(likes + 1);
  };

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="behance-item">
      <img 
        src={item.featureImg} 
        alt={item.featureTxt} 
        className="item-image" 
        onClick={handleImageClick}
      />
      <div className="item-info">
        <p>{item.featureTxt}</p>
        <div className="user-likes">
          <p className='user-name'>{item.feUser}</p>
          <div className="likes" onClick={handleLikeClick}>
            <AiFillLike className="like-icon" /> 
            <span>{likes}</span>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleModalClose}>×</span>
            <img src={item.featureImg} alt={item.featureTxt} className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default BehanceItem;