import React, { useState } from 'react';
import NavMenu from './Navigation/NavMenu';

const ManagePromotions = () => {
  // State to manage the status of each promotion
  const [promotions, setPromotions] = useState({
    promo1: false,
    promo2: false,
    promo3: false,
  });

  // Function to toggle the status of a promotion
  const togglePromotion = (promotionName) => {
    setPromotions((prevPromotions) => ({
      ...prevPromotions,
      [promotionName]: !prevPromotions[promotionName],
    }));
  };

  return (
    <div>
        <NavMenu loggedIn={true} admin={true}></NavMenu>
      <h2>Manage Promotions</h2>
      <div className="promotion-item">
        <label>
          Children free with purchase of Adult Ticket!
          <input
            type="checkbox"
            checked={promotions.promo1}
            onChange={() => togglePromotion('promo1')}
          />
        </label>
      </div>
      <div className="promotion-item">
        <label>
          Free popcorn with 2 Adult ticket purchases!
          <input
            type="checkbox"
            checked={promotions.promo2}
            onChange={() => togglePromotion('promo2')}
          />
        </label>
      </div>
      <div className="promotion-item">
        <label>
          Buy 3 tickets Get 1 Free!
          <input
            type="checkbox"
            checked={promotions.promo3}
            onChange={() => togglePromotion('promo3')}
          />
        </label>
      </div>
    </div>
  );
};

export default ManagePromotions;
