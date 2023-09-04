import { useState, useRef, useEffect, DragEvent, MouseEventHandler } from "react";
import { CardModel } from "../Models/CardModel";
import { deleteLink } from "../Firebase/Link/deleteLink";
import "./CardItem.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Input } from "@mui/material";

type Props = {
    card: CardModel;
    fetchCards: () => Promise<void>;
};

function CardItem({ card, fetchCards }: Props) {
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [isMenuVisible, setIsisMenuVisible] = useState(false);

    const showBtnCorrection = () => {
        setIsButtonVisible(true);
    };
    const hideBtnCorrection = () => {
        setIsButtonVisible(false);
    };

    const menuRef = useRef<HTMLDivElement>(null);

    const clickBtnCorrection = () => {
        setIsisMenuVisible(!isMenuVisible);
    };
    const clickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsisMenuVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', clickOutside);
        return () => {
            document.removeEventListener('mousedown', clickOutside);
        };
    }, []);

    const handleDeleteClick = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        await deleteLink(card.id);
        await fetchCards();
        setIsisMenuVisible(false);
    }
    
    const handleEditClick = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        await deleteLink(card.id);
        await fetchCards();
        setIsisMenuVisible(false);
    }

    const handleDragEvent = (event: DragEvent<HTMLDivElement>) => {
        //event.preventDefault();
        event.dataTransfer.setData("text/plain", JSON.stringify(card));
    };

    return (
        <div className="card">
            <Card sx={{
                maxWidth: 345,
                borderRadius: 5,
            }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image="./imgs/dog.jpg"
                />
                <CardContent>
                    <div className="card__title">
                    <Input defaultValue={card.title} />

                        <div className="edit"
                            onMouseEnter={showBtnCorrection}
                            onMouseLeave={hideBtnCorrection}
                            ref={menuRef}
                            draggable={true}
                            onDragStart={handleDragEvent}
                            key={card.id}>
                            <div
                                className={`btnCorrection ${isButtonVisible ? 'show' : ''}`}
                                onClick={clickBtnCorrection}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 18.89H6.41421L15.7279 9.57629L14.3137 8.16207L5 17.4758V18.89ZM21 20.89H3V16.6474L16.435 3.21233C16.8256 2.8218 17.4587 2.8218 17.8492 3.21233L20.6777 6.04075C21.0682 6.43128 21.0682 7.06444 20.6777 7.45497L9.24264 18.89H21V20.89ZM15.7279 6.74786L17.1421 8.16207L18.5563 6.74786L17.1421 5.33365L15.7279 6.74786Z" fill="rgba(182,176,176,1)"></path>
                                </svg>
                            </div>
                            {isMenuVisible &&
                            <ul className="btn-correction">
                                <li>
                                <i className="ri-delete-bin-line"></i>
                                    <a className="btn-correction__action" onClick={handleDeleteClick}>Delete</a>
                                </li>
                                <li>
                                <i className ="ri-pencil-line"></i>
                                    <a className="btn-correction__action" onClick={handleEditClick}>Correct</a>
                                </li>
                                <li>
                                <i className="ri-sticky-note-line"></i>
                                    <a className="btn-correction__action">Save to</a>
                                </li>
                            </ul>}
                        </div>
                        
                    </div>

                    <Typography variant="body2" color="text.secondary">
                    {card.description}
                    </Typography>
                </CardContent>
                <CardActions>



                </CardActions>

            </Card>

        </div>
    );
}

export default CardItem;
