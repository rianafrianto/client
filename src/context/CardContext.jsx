import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { API_URL } from '../config/api'; 
import Swal from 'sweetalert2';
import { Form } from 'antd';

export const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingAddUpdate, setLoadingAddUpdate] = useState(false)
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [form] = Form.useForm();


  // Fetch cards from API
  const fetchCards = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/cards`); 
      if (response.data.success) {
        setCards(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
      setError('Failed to fetch cards. Please try again later.');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch cards. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

   // Add new card
   const addCard = async (newCard) => {
    setLoadingAddUpdate(true);
    try {
      const response = await axios.post(`${API_URL}/cards`, newCard); 
      if (response.data.success) {
        await fetchCards();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message,
        });
      }
    } catch (error) {
      console.error('Error adding card:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add card. Please try again later.',
      });
    } finally {
      setLoadingAddUpdate(false);
    }
  };

  // Update card in the API and local state
  const updateCard = async (id, updatedCard) => {
    setLoadingAddUpdate(true);
    try {
      const response = await axios.put(`${API_URL}/cards/${id}`, updatedCard); 
      if (response.data.success) {
        await fetchCards()
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Card updated successfully!',
        });
      }
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Card updated successfully!',
      });
    } catch (error) {
      console.error('Error updating card:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update card. Please try again later.',
      });
    } finally {
      setLoadingAddUpdate(false);
    }
  };

  // Remove card from the API and local state with confirmation
  const removeCard = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/cards/${id}`); 
        await fetchCards()
        Swal.fire(
          'Deleted!',
          'Your card has been deleted.',
          'success'
        );
      } catch (error) {
        console.error('Error removing card:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to remove card. Please try again later.',
        });
      }
    }
  };

  const handleGenerate = async () => {
    setLoadingGenerate(true);
    try {
      const response = await axios.post(`${API_URL}/generate-content`, {
        prompt: 'Generate random content for a new card' 
      });
      const { title, description } = response.data.data;
      form.setFieldsValue({
        title: title || '', 
        description: description || '',
      });
    } catch (error) {
      console.error('Error generating content:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to generate content. Please try again later.',
      });
    } finally {
      setLoadingGenerate(false); 
    }
  };
  

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <CardContext.Provider value={{ cards, loading, error, updateCard, removeCard , addCard, form, handleGenerate, loadingGenerate , loadingAddUpdate }}>
      {children}
    </CardContext.Provider>
  );
};
