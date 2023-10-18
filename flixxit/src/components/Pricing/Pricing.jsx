import React from "react";
import "./Pricing.css";
import { Link } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "$7.99/month",
      features: [
        { name: "HD Streaming", available: true },
        { name: "Unlimited Movies", available: true },
        { name: "1 Device at a time", available: true },
        { name: "Cancel Anytime", available: true },
      ],
    },
    {
      name: "Standard",
      price: "$12.99/month",
      features: [
        { name: "Full HD Streaming", available: true },
        { name: "Unlimited Movies", available: true },
        { name: "2 Devices at a time", available: true },
        { name: "Cancel Anytime", available: true },
      ],
    },
    {
      name: "Premium",
      price: "$19.99/month",
      features: [
        { name: "4K Ultra HD Streaming", available: true },
        { name: "Unlimited Movies", available: true },
        { name: "4 Devices at a time", available: true },
        { name: "Cancel Anytime", available: true },
      ],
    },
  ];

  return (
    <div className="pricing">
      <h2 className="features-heading">Choose the plan that's right for you</h2>

      <div className="cards">
        {plans.map((plan, index) => (
          <div className="card" key={index}>
            <h2 className="card-name">{plan.name}</h2>
            <p className="card-price">{plan.price}</p>
            <ul className="features">
              {plan.features.map((feature, index) => (
                <li key={index}>
                  {feature.available ? (
                    <FaCheck className="feature-icon available" />
                  ) : (
                    <FaTimes className="feature-icon not-available" />
                  )}
                  {feature.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
