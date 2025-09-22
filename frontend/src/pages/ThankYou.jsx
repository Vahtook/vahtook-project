import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import checkmark from "../assets/checkmark.svg";

export default function ThankYou() {
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const booking = location.state || {};
  const { address, selectedOption, vehicleType, value } = booking;

  // Submit booking to backend when component loads
  useEffect(() => {
    const submitBooking = async () => {
      // Validate that we have booking data
      if (!address || !selectedOption || !vehicleType) {
        console.error('Missing booking data');
        return;
      }

      // Validate that we have all required address fields
      if (!address.pickup || !address.pickup.name || !address.pickup.phone || !address.pickup.location) {
        console.error('Missing pickup information:', address.pickup);
        return;
      }

      if (!address.destination || !address.destination.location) {
        console.error('Missing destination information:', address.destination);
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

        console.log('Submitting booking:', bookingData);
        console.log('Address structure:', {
          pickup: address?.pickup,
          destination: address?.destination
        });

        const response = await fetch('http://localhost:5000/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingData)
        });

        const result = await response.json();

        if (result.success) {
          setOrderNumber(result.data.orderNumber);
          console.log('Booking submitted successfully:', result);
        } else {
          console.error('Booking submission failed:', result.message);
          // You could show an error message to the user here
        }
      } catch (error) {
        console.error('Error submitting booking:', error);
        // You could show an error message to the user here
      } finally {
        setIsSubmitting(false);
      }
    };

    submitBooking();
  }, [address, selectedOption, vehicleType, value]);

  return (
    <div style={{
      padding: "100px",  
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "500",
      fontSize: "20px"
    }}>
      <img 
        src={checkmark} 
        style={{
          height: "100px",
          width: "100px",
        }}
        alt="Success checkmark"
      />
      
      <h1>Thank you — your booking is confirmed!</h1>
      
      {isSubmitting && (
        <p style={{ color: "#666", fontSize: "16px", marginTop: "20px" }}>
          Processing your booking...
        </p>
      )}
      
      {orderNumber && (
        <div style={{ 
          marginTop: "20px", 
          padding: "15px", 
          backgroundColor: "#f0f9ff", 
          borderRadius: "8px",
          textAlign: "center"
        }}>
          <p style={{ color: "#0369a1", fontSize: "16px", margin: "0" }}>
            Your order number is: <strong>{orderNumber}</strong>
          </p>
          <p style={{ color: "#666", fontSize: "14px", margin: "5px 0 0 0" }}>
            You can track your order using this number
          </p>
        </div>
      )}
    </div>
  );
}
