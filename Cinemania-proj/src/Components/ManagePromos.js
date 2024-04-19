import React, { useState, useEffect } from "react";
import NavMenu from "./Navigation/NavMenu";
import "./css/ManagePromotions.css";

const ManagePromotions = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/promotion/allPromotion",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch promotions");
        }
        const promotionsData = await response.json();
        setPromotions(promotionsData);
      } catch (error) {
        console.error("Error fetching promotions:", error.message);
      }
    };

    fetchPromotions();
  }, []);

  const handleCheckboxChange = async (promotionId, isActive, sentToUsers) => {
    console.log("Checkbox changed:", promotionId, isActive, sentToUsers); // Debugging statement

    if (sentToUsers && !isActive) {
      // Display error toast
      console.error("Already sent to users, cannot disable at this time");
      // Optionally, you can show a toast notification or error message here
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/promotion/updatePromotion/${promotionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isActive: !isActive }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update promotion");
      }
      const updatedPromotion = await response.json();
      setPromotions((prevPromotions) =>
        prevPromotions.map((promo) =>
          promo._id === updatedPromotion._id ? updatedPromotion : promo
        )
      );
      // Optionally, you can show a success message or notification here
      console.log("Promotion updated successfully!");
    } catch (error) {
      console.error("Error updating promotion:", error.message);
      // Optionally, you can show an error message or notification here
    }
  };

  return (
    <div>
      <NavMenu loggedIn={true} admin={true}></NavMenu>
      <h2>Manage Promotions</h2>
      {promotions.map((promotion) => (
        <div className="promotion-item" key={promotion._id}>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={promotion.isActive}
              onChange={() =>
                handleCheckboxChange(
                  promotion._id,
                  promotion.isActive,
                  promotion.sentToUsers
                )
              }
              onClick={() =>
                console.log(
                  "Checkbox clicked:",
                  promotion._id,
                  promotion.isActive,
                  promotion.sentToUsers
                )
              } // Debugging statement for click event
            />
            <span className="promotion-title">{promotion.title}</span> Promo
            Code: {promotion.promoCode} - Description: {promotion.description}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ManagePromotions;
