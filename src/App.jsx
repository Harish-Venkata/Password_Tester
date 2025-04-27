import React, { useState, useEffect } from "react";
import lock from "./assets/lock.png";
import copy from "./assets/copy.png";
import tick from "./assets/tick.png";
import cross from "./assets/cross.png";

export default function App() {
  return (
    <div>
      <MainContainer />
    </div>
  );
}

function MainContainer() {
  const [field, setField] = useState("");
  const [rangeValue, setRangeValue] = useState(0);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecial, setHasSpecial] = useState(false);

  useEffect(() => {
    const upper = /[A-Z]/.test(field);
    const lower = /[a-z]/.test(field);
    const number = /[0-9]/.test(field);
    const special = /[!@#$%^&*()]/.test(field);

    setHasUppercase(upper);
    setHasLowercase(lower);
    setHasNumber(number);
    setHasSpecial(special);

    let strength = 0;
    if (upper) strength += 25;
    if (lower) strength += 25;
    if (number) strength += 25;
    if (special) strength += 25;

    setRangeValue(strength);
  }, [field]);

  const handleCopy = () => {
    if (field) {
      navigator.clipboard.writeText(field);
      alert("Copied to clipboard!");
    }
  };

  return (
    <div className="container">
      <img className="lock-img" src={lock} width="50px" />

      <h1>Password Tester</h1>
      <h6>
        Create strong and secure passwords to keep your account safe online.
      </h6>

      <div className="copy-text">
        <input
          type="text"
          placeholder="Strong password"
          value={field}
          maxLength={15}
          onChange={(e) => setField(e.target.value)}
        />

        <div className="copy-image" onClick={handleCopy}>
          <img src={copy} width="20px" height="20px" />
          <span className="copy">copy</span>
        </div>
      </div>

      <div>
        <p
          style={{
            color:
              hasUppercase && hasLowercase && hasNumber && hasSpecial
                ? "green"
                : "red",
          }}
        >
          <strong style={{ color: "black" }}>Password Strength:</strong>{" "}
          {hasUppercase && hasLowercase && hasNumber && hasSpecial
            ? "Strong"
            : "Weak"}
        </p>
      </div>
      <div className="password-details">
        <input
          type="range"
          min={0}
          max={100}
          step={25}
          value={rangeValue}
          readOnly
        />

        <div className="details">
          <div className="detail-item">
            Uppercase{" "}
            <img
              src={hasUppercase ? tick : cross}
              alt="check"
              className="crossTick"
            />
          </div>
          <div className="detail-item">
            Lowercase{" "}
            <img
              src={hasLowercase ? tick : cross}
              alt="check"
              className="crossTick"
            />
          </div>
          <div className="detail-item">
            Number{" "}
            <img
              src={hasNumber ? tick : cross}
              alt="check"
              className="crossTick"
            />
          </div>
          <div className="detail-item">
            Special Character{" "}
            <img
              src={hasSpecial ? tick : cross}
              alt="check"
              className="crossTick"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
