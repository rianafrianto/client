import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { API_URL } from '../config/api'; 
import Swal from 'sweetalert2';

export const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    }
  };

  // Update card in the API and local state
  const updateCard = async (id, updatedCard) => {
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
  

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <CardContext.Provider value={{ cards, loading, error, updateCard, removeCard , addCard}}>
      {children}
    </CardContext.Provider>
  );
};
