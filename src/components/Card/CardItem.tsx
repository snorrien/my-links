import { useState, useRef, useEffect, DragEvent } from "react";
import { CardModel } from "../Models/CardModel";
import Button from '@mui/material/Button';
import { deleteLink } from "../Firebase/Link/deleteLink";
import "./CardItem.css";

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
        event.preventDefault();
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
            <div className="card__body ">
                <img src="./imgs/dog.jpg" className="card__img" />
                <div className="card__content">
                    <div className="card__title">
                        <h2 >Title</h2>
                        <div className="edit"
                            onMouseEnter={showBtnCorrection}
                            onMouseLeave={hideBtnCorrection}
                            ref={menuRef}
                            draggable={true}
                            onDragStart={handleDragEvent}
                            key={card.id}>
                            <button
                             className={`btnCorrection ${isButtonVisible ? 'show' : ''}`}
                             onClick={clickBtnCorrection}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 18.89H6.41421L15.7279 9.57629L14.3137 8.16207L5 17.4758V18.89ZM21 20.89H3V16.6474L16.435 3.21233C16.8256 2.8218 17.4587 2.8218 17.8492 3.21233L20.6777 6.04075C21.0682 6.43128 21.0682 7.06444 20.6777 7.45497L9.24264 18.89H21V20.89ZM15.7279 6.74786L17.1421 8.16207L18.5563 6.74786L17.1421 5.33365L15.7279 6.74786Z" fill="rgba(182,176,176,1)"></path>
                                </svg>
                            </button>
                            {isMenuVisible &&
                            <ul className="btnCorrectionMenu">
                                <li>
                                    <img className="dotsImg" src="/imgs/trash.png" />
                                    <a href="#"
                                        onClick={(event) => handleDeleteClick(event)}>Delete</a>
                                </li>
                                <li>
                                    <img className="dotsImg" src="/imgs/flag.png" />
                                    <a href="#">Add importance</a>
                                </li>
                            </ul>}
                        </div>

                       
                    </div>


                </div>
                <p className="card__description">   {card.title}</p>
            </div>
            <Button variant="contained">Hello world</Button>
        </div>
    );
}

export default CardItem;
