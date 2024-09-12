import React, { useState } from 'react';
import { CreditCardInput } from 'react-credit-card-input';

const CreditCardIntake = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCVC] = useState('');

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleCardExpiryChange = (e) => {
    setExpiry(e.target.value);
  };

  return (
    <div>
      <CreditCardInput
        cardNumberInputProps={{ value: cardNumber, onChange: handleCardNumberChange }}
        cardExpiryInputProps={{ value: expiry, onChange: handleCardExpiryChange }}
        fieldClassName="input"
      />
    </div>
  );
};

export default CreditCardIntake;
