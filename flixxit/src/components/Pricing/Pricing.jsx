import React from "react";
import "./Pricing.css";
import { Link } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "$9.99/month",
      features: [
        { name: "Feature 1", available: true },
        { name: "Feature 2", available: true },
        { name: "Feature 3", available: false },
        { name: "Feature 4", available: true },
        { name: "Feature 4", available: true },
        { name: "Feature 4", available: true },
        { name: "Feature 4", available: true },
      ],
    },
    {
      name: "Standard",
      price: "$19.99/month",
      features: [
        { name: "Feature 1", available: true },
        { name: "Feature 2", available: true },
        { name: "Feature 3", available: true },
        { name: "Feature 4", available: true },
        { name: "Feature 3", available: false },
        { name: "Feature 3", available: false },
        { name: "Feature 3", available: false },
      ],
    },
    {
      name: "Premium",
      price: "$29.99/month",
      features: [
        { name: "Feature 1", available: true },
        { name: "Feature 2", available: true },
        { name: "Feature 3", available: true },
        { name: "Feature 4", available: true },
        { name: "Feature 4", available: true },
        { name: "Feature 4", available: true },
        { name: "Feature 4", available: true },
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
            <Link to="/signin">
              <button className="choose-plan-button">Choose Plan</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
