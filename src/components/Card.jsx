import { useState, useContext } from 'react';
import { Card as AntCard, Button, Modal, Space, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { CardContext } from '../context/CardContext';
import AddCardForm from './AddCardForm';

const Card = ({ card }) => {
  const { removeCard } = useContext(CardContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleEdit = () => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <>
      <AntCard
        title={card.title}
        bordered={true}
        hoverable
        style={{
          margin: '10px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
        bodyStyle={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
      >
        <div style={{ flexGrow: 1 }}>{card.description}</div>

        <Row justify="space-between" align="middle" style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Space size="middle" style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={handleEdit}
              >
                Edit
              </Button>

              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => removeCard(card.id)}
              >
                Remove
              </Button>
            </Space>
          </Col>
        </Row>
      </AntCard>

      <Modal
        title="Edit Card"
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        centered
        destroyOnClose
      >
        <AddCardForm card={selectedCard} onClose={handleModalClose} />
      </Modal>
    </>
  );
};

export default Card;
