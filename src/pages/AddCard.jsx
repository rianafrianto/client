import React from 'react';
import AddCardForm from '../components/AddCardForm';
import { Divider } from 'antd';

const AddCard = () => {
  return (
    <div>
      <h2 className="text-2xl mb-4">Add New Card</h2>
      <AddCardForm />
      <Divider />
    </div>
  );
};

export default AddCard;
