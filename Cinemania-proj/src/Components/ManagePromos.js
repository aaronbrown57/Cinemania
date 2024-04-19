import React, { useState, useEffect } from "react";
import NavMenu from "./Navigation/NavMenu";
import "./css/ManagePromotions.css";

const ManagePromotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    promoCode: "",
    start: "",
    end: "",
    percentage: "",
    description: "",
  });
  const [updateMessage, setUpdateMessage] = useState(""); // State for update message

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

    if (sentToUsers) {
      // Display error message
      setUpdateMessage("Already sent to users, cannot modify");
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
      // Set update message
      setUpdateMessage("Promotion updated, please refresh page.");
      // Optionally, you can show a success message or notification here
      console.log("Promotion updated successfully!");
    } catch (error) {
      console.error("Error updating promotion:", error.message);
      // Optionally, you can show an error message or notification here
    }
  };

  const handleSendToUsers = async (promotionId) => {
    try {
      // Fetch all users with promoSubscription turned on
      const usersResponse = await fetch("http://localhost:5000/users/allUsers");
      if (!usersResponse.ok) {
        throw new Error("Failed to fetch users");
      }
      const usersData = await usersResponse.json();
      const subscribedUsers = usersData.filter(
        (user) => user.promoSubscription
      );

      if (subscribedUsers.length === 0) {
        console.error("No subscribed users found");
        setUpdateMessage("No subscribed users found.");
        return;
      }

      // Prepare promo email for each subscribed user and send
      const sendPromoEmails = subscribedUsers.map(async (user) => {
        const mailOptions = {
          from: "cinemaniateam@gmail.com",
          to: user.email,
          subject: "New Promotion Available!",
          text: `Thank you for signing up for email promotions. A new promotion code is available to you! ${promotionId}`,
        };

        const responseEmail = await fetch(
          `http://localhost:5000/promotion/sendPromo/${promotionId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email }), // Pass the email parameter
          }
        );

        if (!responseEmail.ok) {
          throw new Error(`Failed to send promotion email to ${user.email}`);
        }

        return responseEmail.json();
      });

      // Wait for all promo emails to be sent
      const sentPromoEmails = await Promise.all(sendPromoEmails);
      console.log("Promotion emails sent:", sentPromoEmails);

      // Update the promotion's sentToUsers status
      const response = await fetch(
        `http://localhost:5000/promotion/sendToUsers/${promotionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sentToUsers: true }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send promotion to users");
      }
      const updatedPromotion = await response.json();
      setPromotions((prevPromotions) =>
        prevPromotions.map((promo) =>
          promo._id === updatedPromotion._id ? updatedPromotion : promo
        )
      );
      // Set update message
      setUpdateMessage("Promotion sent to subscribed users successfully.");
      // Optionally, you can show a success message or notification here
      console.log("Promotion sent to subscribed users successfully!");
    } catch (error) {
      console.error("Error sending promotion to users:", error.message);
      // Optionally, you can show an error message or notification here
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/promotion/addPromotion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add promotion");
      }
      const newPromotion = await response.json();
      setPromotions([...promotions, newPromotion]);
      setShowForm(false);
      setFormData({
        promoCode: "",
        start: "",
        end: "",
        percentage: "",
        description: "",
      });
      console.log("Promotion added successfully!");
    } catch (error) {
      console.error("Error adding promotion:", error.message);
    }
  };

  return (
    <div>
      <NavMenu loggedIn={true} admin={true}></NavMenu>
      <h2>Manage Promotions</h2>
      <div className="update-message">{updateMessage}</div>{" "}
      {/* Update message */}
      <div className="checkbox-label">Is Active</div>{" "}
      {/* Label above checkboxes */}
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
            />
            <span className="promotion-title">{promotion.title}</span> Promo
            Code: {promotion.promoCode} - Description: {promotion.description}
          </label>
          {!promotion.sentToUsers && ( // Render button if promotion has not been sent to users
            <button onClick={() => handleSendToUsers(promotion._id)}>
              Send to Users
            </button>
          )}
        </div>
      ))}
      <button onClick={() => setShowForm(true)}>Add Promotion</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <label>
            Promo Code:
            <input
              type="text"
              name="promoCode"
              value={formData.promoCode}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Start Date:
            <input
              type="text"
              name="start"
              value={formData.start}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            End Date:
            <input
              type="text"
              name="end"
              value={formData.end}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Percentage:
            <input
              type="number"
              name="percentage"
              value={formData.percentage}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ManagePromotions;
