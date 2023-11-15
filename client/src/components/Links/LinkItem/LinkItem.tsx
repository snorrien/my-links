import { useState } from "react";
import { LinkModel } from "../../../Models/LinkModel";
import "./LinkItem.css";


type Props = {
    card: LinkModel;
    editCard: any;
    deleteCard: any;
};

function LinkItem({ card, editCard, deleteCard }: Props) {

    const handleEditCard = (card: LinkModel) => {
        editCard(card);
    };

    const handleDeleteCard = (card: LinkModel) => {
        deleteCard(card);
    };

    return (
        <div className="linkItem">
            <img className="linkItem_image" src="./imgs/dog.jpg" />
            <div className="linkItem__content">
                <div className="content__title">
                    <div>{card.title}</div>
                    <div className='content__buttons'>
                        <div className="button_edit" onClick={() => handleEditCard(card)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 18.89H6.41421L15.7279 9.57629L14.3137 8.16207L5 17.4758V18.89ZM21 20.89H3V16.6474L16.435 3.21233C16.8256 2.8218 17.4587 2.8218 17.8492 3.21233L20.6777 6.04075C21.0682 6.43128 21.0682 7.06444 20.6777 7.45497L9.24264 18.89H21V20.89ZM15.7279 6.74786L17.1421 8.16207L18.5563 6.74786L17.1421 5.33365L15.7279 6.74786Z" fill="rgba(182,176,176,1)"></path></svg>
                        </div>
                        <div className="button_edit" onClick={() => handleDeleteCard(card)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9Z" fill="rgba(173,184,194,1)"></path></svg>
                        </div>
                    </div> 
                </div>
                <div className="content__link">
                   <a href= {card.description} target="_blank">{card.description} </a> 
                </div>
            </div>
        </div >
    );
}

export default LinkItem;
