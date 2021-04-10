import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import api from '../../services/api';

interface FoodItem {
  id: number;
  image: string;
  name: string;
  description: string;
  price: string;
  available: boolean;
}

interface FoodProps {
  food: FoodItem;
  handleEditFood: (food: FoodItem) => void;
  handleDelete: (foodId: number) => void;
}

function Food({ food: FoodItem, handleEditFood, handleDelete }: FoodProps) {
  const [isAvailable, setIsAvailable] = useState(FoodItem.available);

  async function toggleAvailable() {
    await api.put(`/foods/${FoodItem.id}`, {
      ...FoodItem,
      available: !isAvailable,
    });
    setIsAvailable(!isAvailable);
  }

  function setEditingFood() {
    handleEditFood(FoodItem);
  }

  return (
    <Container available={isAvailable}>
      <header>
        <img src={FoodItem.image} alt={FoodItem.name} />
      </header>
      <section className="body">
        <h2>{FoodItem.name}</h2>
        <p>{FoodItem.description}</p>
        <p className="price">
          R$ <b>{FoodItem.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${FoodItem.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(FoodItem.id)}
            data-testid={`remove-food-${FoodItem.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${FoodItem.id}`} className="switch">
            <input
              id={`available-switch-${FoodItem.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${FoodItem.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}

export default Food;
