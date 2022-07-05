import { createStore } from 'redux';
import initialState from './initialState';
import shortid from 'shortid';
import strContains from '../utills/strContains';
import { useSelector } from 'react-redux';

//selectors

export const AllColumn = () => {
  const getAllColumns = useSelector( state => state.columns )
  return(getAllColumns);
};

export const AllLists = () => {
  const getAllLists = useSelector( state => state.lists )
  return(getAllLists);
};

export const AllCards = () => {
  const getAllCards = useSelector( state => state.cards)
  return(getAllCards);
}

export const getFilteredCards = ({ cards, searchString }, columnId) => cards
  .filter(card => card.columnId === columnId && strContains(card.title, searchString));

export const getListById = ({ lists }, listId) => lists.find(list => list.id === listId);

export const getColumnsByList = ({ columns }, id) => columns.filter(column => column.listId === id)

export const getCardsById = ({ cards }, id) => cards.find(card => card.id === id);

export const getFavoriteCards = ({ cards }) => cards.filter(card => card.isFavorite === true)

// action creators
export const addColumn = payload => ({ type: 'ADD_COLUMN', payload });

export const addCard = payload => ({ type: 'ADD_CARD', payload});

export const addList = payload => ({ type: 'ADD_LIST', payload});

export const updateSearch = payload => ({ type: 'UPDATE_SEARCHSTRING', payload});

export const toggleCardFavorite = payload => ({ type: 'TOGGLE_CARD_FAVORITE', payload})

const reducer = (state, action) => {
  switch(action.type)
    {
    case 'ADD_COLUMN':
        return {...state, columns: [...state.columns, {id:shortid(), ...action.payload }]}
    case 'ADD_CARD':
        return {...state, cards: [...state.cards, {id:shortid(), ...action.payload}]}  
    case 'ADD_LIST':
        return{...state, lists: [...state.lists, {id:shortid(), ...action.payload}]}
    case 'UPDATE_SEARCHSTRING':
        return {...state, searchString: action.payload}
    case 'TOGGLE_CARD_FAVORITE':
        return {...state, cards: state.cards.map(card => (card.id === action.payload.id) ? { ...card, isFavorite: !card.isFavorite } : card) };
      default:
    return state;
    }
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;