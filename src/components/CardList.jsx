import { useContext } from 'react';
import { CardContext } from '../context/CardContext';
import Card from './Card';
import { Empty, Spin } from 'antd';

const CardList = () => {
  const { cards, updateCard, removeCard, loading } = useContext(CardContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap">
      {cards.length > 0 ? (
        cards
          .map((card) => (
            <Card key={card.id} card={card} onEdit={updateCard} onRemove={removeCard} />
          ))
      ) : (
        <Empty description="No cards available" className="w-full mt-10" />
      )}
    </div>
  );
};

export default CardList;
