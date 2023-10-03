import "./CardPage.css";
import CardItem from "./CardItem/CardItem";
import { Button } from '@mui/material';
import { useState, useEffect, ChangeEvent } from 'react';
import { CardModel } from '../../Models/CardModel';
import { addLink } from '../../Firebase/Link/addLink';
import { getLinks } from '../../Firebase/Link/getLinks';
import ConfirmationDialog from '../Shared/ConfirmationDialog/ConfirmationDialog';
import CardFormModal from './CardForm/CardFormModal';
import { deleteLink } from "../../Firebase/Link/deleteLink";

function CardPage() {
    const [selectedCard, setSelectedCard] = useState<CardModel>();
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [confirmationDialog, setConfirmationDialog] = useState(false);
    const [filteredCards, setFilteredCards] = useState<CardModel[]>([]);
    const [cards, setCards] = useState<CardModel[]>([]);
    const [search, setSearch] = useState<string>();
    const [sorting, setSorting] = useState<string>();

    useEffect(() => {
        fetchCards();
    }, [search, sorting]);

    const fetchCards = async () => {
        const cards = await getLinks(search, sorting);
        setCards(cards);
        setFilteredCards(cards);
    };

    const handleAddClick = async (event: any) => {
        event.preventDefault();
        await addLink();
        await fetchCards();
    };

    const closeModal = () => {
        setIsCardModalOpen(false);
        setSelectedCard(undefined);
    };

    const handleEdit = (card: CardModel) => {
        setSelectedCard(card);
        setIsCardModalOpen(true);
    }

    const handleDelete = async (card: CardModel) => {
        setSelectedCard(card);
        setConfirmationDialog(true);
    }

    const closeConfirmationDialog = async (result: boolean) => {
        setConfirmationDialog(false)

        if (result && selectedCard) {
            await deleteLink(selectedCard.id);
            await fetchCards();
        }
    }

    const filterBySearch = async (event: any) => {
        const value = event.target.value;
        if (value === '') {
            setSearch(undefined);
        } else {
            setSearch(value);
        }
    };

    const onSortingChange = async (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === 'byTitle') {
            setSorting('title');
        }
        else {
            setSorting(undefined);
        }
    }

    return (
        <div className="card__page">
            <div className="nav__search">
                <div className="search">
                    <label>Sort</label>
                    <select onChange={onSortingChange}>
                        <option value="byDate">By Date</option>
                        <option value="byTitle">By Title</option>
                    </select>
                    <input className="search__input" placeholder="Search..." type="text" name="text" onChange={filterBySearch} />
                </div>
            </div>
            <Button onClick={handleAddClick} variant="contained" size="large" sx={{ maxWidth: 200 }}>
                + Add new link
            </Button>
            <div className="cards-grid">
                {filteredCards.map((card) => (
                    <div key={card.id}>
                        <CardItem card={card} editCard={handleEdit} deleteCard={handleDelete} />
                    </div>
                ))}
            </div>
            {selectedCard &&
                <CardFormModal
                    card={selectedCard}
                    isOpen={isCardModalOpen}
                    closeModal={closeModal}
                    fetchCards={fetchCards}
                />
            }
            <ConfirmationDialog
                isOpen={confirmationDialog}
                closeDialog={closeConfirmationDialog}
            />
        </div>
    )
}

export default CardPage;