import React from 'react';
import AddCardForm from '../components/AddCardForm';
import { Divider } from 'antd';
import CardList from '../components/CardList';

const AddCard = () => {
  return (
    <div>
      <h2 className="text-2xl mb-4">Add New Card</h2>
      <AddCardForm />
      <Divider />
      <h2 className="text-2xl mb-4">Latest Cards</h2>
      <CardList updated={true} />
    </div>
  );
};

export default AddCard;
