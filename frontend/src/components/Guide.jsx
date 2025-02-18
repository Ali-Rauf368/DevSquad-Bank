import React from "react";
import "./Guide.css";

const Guide = () => {
  return (
    <div className="guide-container">
      <h1>Devsquad User Guide</h1>
      <p>
        Welcome to Devsquad! Here, you will find all the information and
        resources you need to make the most of our banking services. Whether
        you're opening an account or managing your finances online, this guide
        will help you every step of the way.
      </p>

      <div className="guide-section">
        <h2>1. Opening an Account</h2>
        <p>
          To open an account with Devsquad, follow these simple steps:
        </p>
        <ul>
          <li>Visit the nearest Devsquad branch or go online.</li>
          <li>Complete the account application form with your personal details.</li>
          <li>Submit identification documents for verification.</li>
          <li>Once your account is approved, you'll receive a confirmation.</li>
          <li>Download our mobile app or log in to online banking to manage your account.</li>
        </ul>
      </div>

      <div className="guide-section">
        <h2>2. Managing Your Account</h2>
        <p>
        Devsquad offers convenient ways to manage your account:
        </p>
        <ul>
          <li>
            <strong>Mobile App:</strong> Our mobile app allows you to check
            balances, transfer funds, and view transaction history.
          </li>
          <li>
            <strong>Online Banking:</strong> Use our web platform to access your
            account from any device, at any time.
          </li>
          <li>
            <strong>ATM Network:</strong> Withdraw cash, check your balance,
            and deposit money at any of our ATMs.
          </li>
        </ul>
      </div>

      <div className="guide-section">
        <h2>3. Online Banking</h2>
        <p>
        Devsquad’s online banking platform provides a wide range of services:
        </p>
        <ul>
          <li>
            <strong>View Transactions:</strong> See detailed transaction
            history, including date, amount, and merchant information.
          </li>
          <li>
            <strong>Transfer Funds:</strong> Easily transfer funds between your
            accounts or to other Devsquad users.
          </li>
          <li>
            <strong>Bill Payments:</strong> Pay your bills directly through our
            online banking platform.
          </li>
          <li>
            <strong>Security Features:</strong> Enable two-factor authentication
            for added protection.
          </li>
        </ul>
      </div>

      <div className="guide-section">
        <h2>4. Security Tips</h2>
        <p>
        Devsquad takes security very seriously. Here are a few tips to keep
          your account safe:
        </p>
        <ul>
          <li>Never share your passwords or PINs with anyone.</li>
          <li>
            Use strong passwords that include a combination of letters, numbers,
            and symbols.
          </li>
          <li>
            Enable two-factor authentication for an extra layer of security.
          </li>
          <li>Regularly monitor your account for any unauthorized activity.</li>
          <li>
            Always log out of your account when using public or shared devices.
          </li>
        </ul>
      </div>

      <div className="guide-section">
        <h2>5. Customer Support</h2>
        <p>
          If you have any questions or issues, our customer support team is
          available 24/7 to assist you.
        </p>
        <ul>
          <li>Call our helpline at 1-800-Devsquad.</li>
          <li>Email us at support@Devsquad.com.</li>
          <li>Visit our FAQ page for quick answers to common questions.</li>
        </ul>
      </div>

    
      <div className="back-to-top">
        <a href="#top">⬆ Back to Top</a>
      </div>
    </div>
  );
};

export default Guide;
