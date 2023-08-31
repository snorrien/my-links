import * as React from 'react';
import "./CardPage.css";
import CardItem from "./CardItem";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { CardModel } from '../Models/CardModel';
import { addLink } from '../Firebase/Link/addLink';
import { getLinks } from '../Firebase/Link/getLinks';


function CardPage() {
    const [filter, setFilter] = React.useState('');

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
                    <TextField id="standard-basic" label="Standard" variant="standard" />
                    <input type="text" className="search__input" placeholder="Type your text" />
                    <button className="search__button">
                        <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
                            <g>
                                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div className="board-name">
                <button onClick={handleAddClick}>+ Add new link</button>
            </div>
            <div className="body-board cards-grid">
                {cards.map((card) => (
                    <div key={card.id} style={{ marginRight: '10px' }}>
                        <CardItem card={card} fetchCards={fetchCards} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CardPage;

