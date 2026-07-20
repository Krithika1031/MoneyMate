import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { API_URL } from "../config";


function VerifyResetOTP() {

  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("email");
  

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
  toast.error("Please enter the OTP.");
  return;
}

if (otp.length !== 6) {
  toast.error("OTP must be 6 digits.");
  return;
}
setLoading(true);

    try {

      const response = await fetch(
  `${API_URL}/api/auth/verify-reset-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );
      

      const data = await response.json();

      if (data.success) {

        toast.success("OTP verified successfully! ✅");

setTimeout(() => {
  navigate("/reset-password");
}, 1000);

      }

      else {

        toast.error(data.message)

      }

    }

    catch (error) {

      toast.error("Something went wrong. Please try again.");

    }
    finally {
  setLoading(false);
}

  };

  return (

    <div className="auth-container">

      <div className="auth-card">
            <div className="auth-logo">
    💰 MoneyMate
</div>
        <h2>Verify Reset OTP 📧</h2>

        <p>Enter the OTP sent to your email.</p>
        <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          handleVerifyOTP();
        }}
      >

        <div className="otp-container">

  {otp.padEnd(6).split("").map((digit,index)=>(

    <input
      key={index}
      type="text"
      maxLength="1"

      value={digit===" " ? "" : digit}

      ref={(el)=>inputRefs.current[index]=el}

      onChange={(e)=>{

        const value=e.target.value;

        if(!/^[0-9]?$/.test(value))
          return;

        const otpArray=otp.padEnd(6).split("");

        otpArray[index]=value;

        const newOtp=otpArray.join("").trimEnd();

        setOtp(newOtp);

        if(value && index<5){

          inputRefs.current[index+1].focus();

        }

      }}

      onKeyDown={(e)=>{

        if(e.key==="Backspace" && !otp[index] && index>0){

          inputRefs.current[index-1].focus();

        }

      }}

    />

  ))}

</div>
<button
  type="submit"
  className="signup-btn"
  disabled={loading}
>
  {loading ? (
<>
<div className="spinner"></div>

<span>Verifying...</span>
</>
) : (
"Verify OTP"
)}
</button>
</form>

      </div>

    </div>

  );

}

export default VerifyResetOTP;