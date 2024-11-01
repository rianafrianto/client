import { useContext, useState } from 'react';
import { CardContext } from '../context/CardContext';
import Card from './Card';
import { Empty, Pagination, Spin } from 'antd';

const CardList = (props) => {
  const { cards, updateCard, removeCard, loading } = useContext(CardContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const { updated = false } = props;

  const currentItems = updated
    ? cards.slice(0, 3)
    : cards.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Empty description="No cards available" />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((card) => (
          <Card key={card.id} card={card} onEdit={updateCard} onRemove={removeCard} />
        ))}
      </div>
      {!updated && (
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={cards.length}
          onChange={handlePageChange}
          className="mt-4"
        />
      )}
    </>
  );
};

export default CardList;
