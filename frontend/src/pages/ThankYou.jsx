import { address } from "framer-motion/client";
import { Bold } from "lucide-react";
import {useLocation, useNavigate } from "react-router-dom";
 import checkmark from "../assets/checkmark.svg"



export default function ThankYou() {
  const location=useLocation();
  const navigate = useNavigate();

  const booking=location.state || {};
  const {address,selectedOption,vehicleType}=booking;
  return (
    <div style={{padding: "100px",  display:"flex",flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        fontWeight:"500",
        fontSize:"20px"}}>
      <img src={checkmark} 
      style={{
        height:"100px",
        width:"100px",
      
      }}/>
     <h1>Thank you — your booking is confirmed!</h1>
   
     </div>
   
  );
    }
