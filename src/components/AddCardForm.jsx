import { useContext, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { CardContext } from '../context/CardContext';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

const AddCardForm = ({ card, onClose }) => {
  const { addCard, updateCard, form, handleGenerate, loadingGenerate, loadingAddUpdate  } = useContext(CardContext);

  useEffect(() => {
    if (card) {
      form.setFieldsValue({
        title: card.title,
        description: card.description,
      });
    } else {
      form.resetFields();
    }
  }, [card, form]);

  const onFinish = (values) => {
    if (card) {
      updateCard(card.id, values);
      form.resetFields();
      onClose();
    } else {
      addCard(values);
      form.resetFields();
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: 'Please input the title!' }]}
      >
        <Input
          placeholder='Input Title'
          prefix={<EditOutlined />}
        />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please input the description!' }]}
      >
        <Input.TextArea
          placeholder='Input Description'
          prefix={<EditOutlined />} 
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          icon={card ? <EditOutlined /> : <PlusOutlined />}
          loading={loadingAddUpdate}
        >
          {card ? ' Update Card' : ' Add Card'}
        </Button>
        <Button
          type="dashed"
          onClick={handleGenerate}
          icon={<PlusOutlined />}
          style={{ marginLeft: '15px', height:"100%" }} 
          loading={loadingGenerate}
        >
          Generate Suggestion
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddCardForm;
