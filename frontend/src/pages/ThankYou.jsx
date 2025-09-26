import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import checkmark from "../assets/checkmark.svg";
import MapView from "../components/MapView.jsx";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function ThankYou() {
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // NEW: map states
  const [pickupCoord, setPickupCoord] = useState(null);     // {lat,lng}
  const [deliveryCoord, setDeliveryCoord] = useState(null); // {lat,lng}
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoMsg, setGeoMsg] = useState("");

  // Booking payload passed via router
  const booking = location.state || {};
  const { address, selectedOption, vehicleType, value } = booking;

  // Submit booking to backend when component loads (unchanged)
  useEffect(() => {
    const submitBooking = async () => {
      if (!address || !selectedOption || !vehicleType) {
        console.error("Missing booking data");
        return;
      }

      if (!address.pickup || !address.pickup.name || !address.pickup.phone || !address.pickup.location) {
        console.error("Missing pickup information:", address.pickup);
        return;
      }

      if (!address.destination || !address.destination.location) {
        console.error("Missing destination information:", address.destination);
        return;
      }

      setIsSubmitting(true);

      try {
        const bookingData = {
          address,
          selectedOption,
          vehicleType,
          value // goods description
        };

        const response = await fetch(`${API_BASE}/api/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData)
        });

        const result = await response.json();

        if (result.success) {
          setOrderNumber(result.data.orderNumber);
          console.log("Booking submitted successfully:", result);
        } else {
          console.error("Booking submission failed:", result.message);
        }
      } catch (error) {
        console.error("Error submitting booking:", error);
      } finally {
        setIsSubmitting(false);
      }
    };

    submitBooking();
  }, [address, selectedOption, vehicleType, value]);

  // NEW: geocode pickup & destination and show on map
  useEffect(() => {
    const doGeocode = async () => {
      // need at least one address to geocode
      const pickupText = address?.pickup?.location;
      const destText = address?.destination?.location;
      if (!pickupText && !destText) return;

      setGeoMsg("");
      setGeoLoading(true);

      const geocode = async (text) => {
        const u = new URL(`${API_BASE}/api/map/geocode`);
        u.searchParams.set("address", text);
        const res = await fetch(u.toString());
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || `Geocode failed (${res.status})`);
        }
        return data.point || null;
      };

      try {
        const [p, d] = await Promise.all([
          pickupText ? geocode(pickupText) : Promise.resolve(null),
          destText ? geocode(destText) : Promise.resolve(null),
        ]);

        if (p) setPickupCoord(p);
        if (d) setDeliveryCoord(d);

        if (!p && pickupText) setGeoMsg(`Couldn't find pickup: "${pickupText}"`);
        if (!d && destText) setGeoMsg((prev) => (prev ? prev + " | " : "") + `Couldn't find destination: "${destText}"`);
      } catch (e) {
        setGeoMsg(e.message || "Failed to locate addresses.");
      } finally {
        setGeoLoading(false);
      }
    };

    doGeocode();
  }, [address]);

  return (
    <div
      style={{
        padding: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "500",
        fontSize: "20px",
        gap: "24px"
      }}
    >
      <img
        src={checkmark}
        style={{ height: "100px", width: "100px" }}
        alt="Success checkmark"
      />

      <h1>Thank you — your booking is confirmed!</h1>

      {isSubmitting && (
        <p style={{ color: "#666", fontSize: "16px", marginTop: "8px" }}>
          Processing your booking...
        </p>
      )}

      {orderNumber && (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#f0f9ff",
            borderRadius: "8px",
            textAlign: "center",
            maxWidth: 520
          }}
        >
          <p style={{ color: "#0369a1", fontSize: "16px", margin: 0 }}>
            Your order number is: <strong>{orderNumber}</strong>
          </p>
          <p style={{ color: "#666", fontSize: "14px", margin: "6px 0 0 0" }}>
            You can track your order using this number
          </p>
        </div>
      )}

      {/* Optional: show the text addresses */}
      {(address?.pickup?.location || address?.destination?.location) && (
        <div style={{ textAlign: "center", fontSize: 14, color: "#444" }}>
          {address?.pickup?.location && <div><b>Pickup:</b> {address.pickup.location}</div>}
          {address?.destination?.location && <div><b>Destination:</b> {address.destination.location}</div>}
        </div>
      )}

      {/* MAP SECTION */}
      <div style={{ width: "100%", maxWidth: 900 }}>
        <div style={{ height: 420, borderRadius: 12, overflow: "hidden", border: "1px solid #eee" }}>
          {geoLoading ? (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Locating on map…
            </div>
          ) : (pickupCoord || deliveryCoord) ? (
            <MapView pickup={pickupCoord} delivery={deliveryCoord} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Map will appear here once addresses are located
            </div>
          )}
        </div>
        {geoMsg && (
          <div style={{ marginTop: 8, color: "#b91c1c", fontSize: 12, textAlign: "center" }}>
            {geoMsg}
          </div>
        )}
      </div>
    </div>
  );
}
 