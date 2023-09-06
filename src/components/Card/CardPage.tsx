import * as React from 'react';
import "./CardPage.css";
import CardItem from "./CardItem";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { CardModel } from '../Models/CardModel';
import { addLink } from '../Firebase/Link/addLink';
import { getLinks } from '../Firebase/Link/getLinks';
import CardFormModal from './CardForm/CardFormModal';
import ConfirmationDialog from '../Library/ConfirmationDialog/ConfirmationDialog';


function CardPage() {
    const [filter, setFilter] = React.useState('');
    const [selectedCard, setSelectedCard] = useState<CardModel>();
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [confirmationDialog, setConfirmationDialog] = useState(false);

    const handleChange = (event: SelectChangeEvent) => {
        setFilter(event.target.value);
    };

    const [cards, setCards] = useState<CardModel[]>([]);

    const fetchCards = async () => {
        setCards(await getLinks());
    };

    useEffect(() => {
        fetchCards();
    }, []);

    const handleAddClick = async (event: any) => {
        event.preventDefault();
        await addLink();
        await fetchCards();
    };

    const closeModal = () => {
        setIsCardModalOpen(false);
    };

    const editCard = (card: CardModel) => {
        setSelectedCard(card);
        setIsCardModalOpen(true);
    }

    const deleteCard = (card: CardModel) => {
        setSelectedCard(card);
        setConfirmationDialog(true);
    }

    const closeConfirmationDialog = () => {
        setConfirmationDialog(false)
    }


    return (
        <div className="card__page">
            <div className="nav__search">
                <div className="search">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} >
                        <InputLabel id="demo-simple-select-standard-label">Filter</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={filter}
                            onChange={handleChange}
                            label="Filter"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>By date</MenuItem>
                            <MenuItem value={20}>By name</MenuItem>
                        </Select>
                    </FormControl>
                    <input className="search__input" placeholder="Search..." type="text" name="text" />
                </div>
            </div>
            <Button onClick={handleAddClick} variant="contained" size="large" sx={{ maxWidth: 200 }}>
                + Add new link
            </Button>
            <div className="cards-grid">
                {cards.map((card) => (
                    <div key={card.id}>
                        <CardItem card={card} editCard={editCard} deleteCard={deleteCard} />
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
                closeModal={closeConfirmationDialog}
            />
        </div>
    )
}

export default CardPage;

