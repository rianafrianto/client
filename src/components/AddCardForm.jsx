import { useContext, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { CardContext } from '../context/CardContext';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

const AddCardForm = ({ card, onClose }) => {
  const { addCard, updateCard } = useContext(CardContext);
  const [form] = Form.useForm();

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
          prefix={<EditOutlined />} // Add icon to the input
        />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please input the description!' }]}
      >
        <Input.TextArea 
          placeholder='Input Description' 
          prefix={<EditOutlined />} // Add icon to the TextArea
        />
      </Form.Item>
      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          icon={card ? <EditOutlined /> : <PlusOutlined />} // Change icon based on card state
        >
          {card ? ' Update Card' : ' Add Card'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddCardForm;
