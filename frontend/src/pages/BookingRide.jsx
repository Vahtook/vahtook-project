import React, { useState } from "react";
import cashImg from "../assets/cash.png";
import bikeImg from "../assets/bike.png";
import threeWheeler from "../assets/threeWheeler.png";
import truck from "../assets/truck.png";
import fourWheeler from "../assets/fourWheeler.png"
import ThankYou from "./ThankYou";
import { useLocation, useNavigate } from "react-router-dom";

export default function BookingRide() {
  const [editingType, setEditingType] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", location: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); // ✅ error state
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state || {};
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const [vehicleType, setVehicleType] = useState(bookingData.vehicle || "");

  const [address, setAddress] = useState({
    pickup: { name: "", phone: "", location: bookingData.pickup || "" },
    destination: { name: "", phone: "", location: bookingData.destination || "" },
  });

  const vehicles = {
    bike: {
      img: bikeImg,
      weight: "30 Kg",
      dimensions: "40cm x 40cm x 40cm",
    },
    auto: {
      img: threeWheeler,
      weight: "500 Kg",
      dimensions: "5ft x 4.5ft x 5ft",
    },
    truck: {
      img: truck,
      weight: "750 Kg",
      dimensions: "7ft x 4.5ft x 5.5ft",
    },
    fourWheeler: {
      img: fourWheeler,
      weight: "1250 Kg",
      dimensions: "8ft x 5.5ft x 5ft",
    },
  };

  function editAddress(type) {
    setEditingType(type);
    setFormData(address[type]);
    setShowForm(true);
  }

  function saveAddress() {
    setAddress((prev) => ({
      ...prev,
      [editingType]: formData,
    }));
    setShowForm(false);
    setEditingType(null);
  }

  // ✅ validation before booking
  function handleBooking() {
    const isPickupComplete =
      address.pickup.name?.trim() && address.pickup.phone?.trim() && address.pickup.location?.trim();

    const isDestinationComplete =
      address.destination.name?.trim() && address.destination.phone?.trim() && address.destination.location?.trim();

    // More specific error messages
    const missingFields = [];
    
    if (!isPickupComplete) {
      if (!address.pickup.name?.trim()) missingFields.push("Pickup Name");
      if (!address.pickup.phone?.trim()) missingFields.push("Pickup Phone");
      if (!address.pickup.location?.trim()) missingFields.push("Pickup Location");
    }
    
    if (!isDestinationComplete) {
      if (!address.destination.name?.trim()) missingFields.push("Destination Name");
      if (!address.destination.phone?.trim()) missingFields.push("Destination Phone");
      if (!address.destination.location?.trim()) missingFields.push("Destination Location");
    }
    
    if (!selectedOption?.trim()) missingFields.push("Goods Type");
    if (!vehicleType?.trim()) missingFields.push("Vehicle Type");

    if (missingFields.length > 0) {
      setErrorMsg(`⚠️ Please fill the following: ${missingFields.join(", ")}`);
      return;
    }

    setErrorMsg(""); // clear error when valid

    navigate("/thank-you", {
      state: {
        address,
        selectedOption,
        vehicleType,
        value,
      },
    });
  }

  const goodsOptions = [
    "Household & Personal Items",
    "Commercial & Office Goods",
    "Construction & Industrial Materials",
    "Retail & E-commerce Deliveries",
    "Perishables & Fragile Items",
    "Others",
  ];

  return (
    <>
      <div
        style={{
          marginTop: "80px",
          minHeight: "450px",
          display: "flex",
          width: "70%",
          right: "-10%",
          border: "1px solid lightgray",
          borderRadius: "8px",
          overflow: "hidden",
          padding: "15px",
          position: "relative",
          alignItems: "stretch",
        }}
      >
        {/* Left panel */}
        <div style={{ flex: 1, position: "relative" }}>
          <h2 style={{ fontWeight: "700", marginBottom: "20px" }}>Address Details</h2>

          {/* Pickup card */}
          <div style={{ marginBottom: "20px", position: "relative" }}>
            <strong>
              {address.pickup.name || (
                <span style={{ color: "lightgray", fontSize: "12px" }}>Sender's Name </span>
              )}{" "}
              •{" "}
              {address.pickup.phone || (
                <span style={{ color: "lightgray", fontSize: "12px" }}>Sender's Phone</span>
              )}
            </strong>
            <p style={{ margin: "4px 0", color: "#555" }}>{address.pickup.location}</p>
            <button
              onClick={() => editAddress("pickup")}
              style={{
                color: "blue",
                background: "none",
                border: "none",
                cursor: "pointer",
                position: "absolute",
                right: "30px",
                top: "0",
              }}
            >
              Edit
            </button>
          </div>

          {/* Destination card */}
          <div style={{ marginBottom: "20px", position: "relative" }}>
            <strong>
              {address.destination.name || (
                <span style={{ color: "lightgray", fontSize: "12px" }}>Receiver's Name</span>
              )}{" "}
              •{" "}
              {address.destination.phone || (
                <span style={{ color: "lightgray", fontSize: "12px" }}>Receiver's Phone</span>
              )}
            </strong>
            <p style={{ margin: "4px 0", color: "#555" }}>{address.destination.location}</p>
            <button
              onClick={() => editAddress("destination")}
              style={{
                color: "blue",
                background: "none",
                border: "none",
                cursor: "pointer",
                position: "absolute",
                right: "30px",
                top: "0",
              }}
            >
              Edit
            </button>
          </div>

          {/* goods type */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            style={{
              border: "1px solid lightgray",
              borderRadius: "5px",
              marginRight: "10px",
              marginTop: "40px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ color: "gray", width: "300px", padding: "10px 10px" }}>
                <span>{selectedOption || "Select a Goods Type"} </span>
              </div>
              <button
                style={{ color: "blue", position: "relative", right: "10px" }}
                onClick={() => setIsOpen(true)}
              >
                Change
              </button>
            </div>
            {isOpen && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1000,
                }}
                onClick={() => setIsOpen(false)}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    width: "400px",
                    maxHeight: "700vh",
                    overflowY: "auto",
                    padding: "20px",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {goodsOptions.map((option) => (
                    <div
                      key={option}
                      onClick={() => {
                        setSelectedOption(option);
                        setIsOpen(false);
                      }}
                      style={{
                        padding: "10px",
                        backgroundColor: selectedOption === option ? "#d0e8ff" : "white",
                        cursor: "pointer",
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* description about the items */}
          <div
            style={{
              border: "1px solid lightgray",
              borderRadius: "5px",
              marginRight: "5px",
              marginTop: "10px",
            }}
          >
            <input
              style={{ color: "gray", width: "100%", padding: "10px 10px" }}
              type="text"
              maxLength={20}
              placeholder="Description About goods"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>

          {/* vehicle selector */}
          <div style={{ marginTop: "16px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}>
              Select Vehicle
            </label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #e6e6e6",
                background: "#fff",
                fontSize: 14,
              }}
            >
              <option value="">Choose vehicle</option>
              <option value="bike">Two-wheeler</option>
              <option value="auto">Three-wheeler</option>
              <option value="truck">Truck</option>
              <option value="fourWheeler">Four-Wheeler</option>
            </select>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: "1px", backgroundColor: "lightgray" }} />

        {/* Right panel */}
        <div style={{ flex: "1" }}>
          <h3 style={{ fontWeight: "700", marginLeft: "15px" }}>Selected Vehicle</h3>

          <div style={{ border: "1px solid #0A57FF", borderRadius: "5%", margin: "12px 50px" }}>
            <div style={{ display: "flex", flexDirection: "column", marginBottom: "15px", alignItems: "center" }}>
              {vehicleType && vehicles[vehicleType] ? (
                <div style={{ textAlign: "center", margin: "15px 0" }}>
                  <img
                    src={vehicles[vehicleType].img}
                    alt={vehicleType}
                    style={{ height: "auto", width: "150px", margin: "10px auto" }}
                  />
                  <p>
                    <strong>Capacity:</strong> {vehicles[vehicleType].weight}
                  </p>
                  <p>
                    <strong>Dimensions:</strong> {vehicles[vehicleType].dimensions}
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    width: "150px",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#888",
                    border: "1px dashed #ddd",
                    borderRadius: 8,
                    margin: "10px auto",
                  }}
                >
                  No vehicle selected
                </div>
              )}
            </div>
          </div>

          {/* border */}
          <div style={{ height: "1px", border: "1px solid lightgray", margin: "10px 20px" }}></div>

          {/* payment method */}
          <div style={{ margin: "20px 20px", display: "flex" }}>
            <img
              src={cashImg}
              alt="cash img"
              style={{
                borderRadius: "80%",
                width: "28px",
                height: "28px",
                marginTop: "10px",
              }}
            />
            <div>
              <p>Payment method </p>
              <h2 style={{ fontWeight: "500", margin: "5px" }}>Cash</h2>
            </div>
          </div>

          {/* book button + error message */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <button
              onClick={handleBooking}
              style={{
                backgroundColor: "#FA8C00",
                color: "white",
                width: "400px",
                height: "50px",
                fontWeight: "500",
                borderRadius: "10px",
              }}
            >
              Book Now
            </button>
            {errorMsg && (
              <p style={{ color: "red", marginTop: "10px", fontSize: "14px" }}>
                {errorMsg}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Centered modal overlay */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              width: "320px",
            }}
          >
            <h3 style={{ marginBottom: "12px" }}>
              Edit {editingType === "pickup" ? "Pickup" : "Destination"}
            </h3>

            <input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ display: "block", marginBottom: "10px", width: "100%", padding: "6px" }}
            />
            <input
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={{ display: "block", marginBottom: "10px", width: "100%", padding: "6px" }}
            />
            <input
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              style={{ display: "block", marginBottom: "10px", width: "100%", padding: "6px" }}
            />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button
                onClick={() => setShowForm(false)}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  cursor: "pointer",
                  background: "none",
                }}
              >
                Cancel
              </button>
              <button
                onClick={saveAddress}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "blue",
                  color: "white",
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
