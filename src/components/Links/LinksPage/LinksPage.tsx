import "./LinksPage.css";
import React from "react";
import LinkItem from "../LinkItem/LinkItem";
import { useState, useEffect } from 'react';
import { LinkModel } from '../../../Models/LinkModel';
import { FolderModel } from "../../../Models/FolderModel";
import { addLink } from '../../../Firebase/Link/addLink';
import { getLinks } from '../../../Firebase/Link/getLinks';
import ConfirmationDialog from '../../Shared/ConfirmationDialog/ConfirmationDialog';
import LinkFormModal from '../LinkForm/LinkFormModal';
import { deleteLink } from "../../../Firebase/Link/deleteLink";
import Folders from "../Folders/Folders";
import Dropdown from "../../Shared/Dropdown/Dropdown";
import { getAuth } from "firebase/auth";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";

function LinksPage() {
    const [isShowFolderList, setIsShowFolderList] = useState(true);
    const [selectedCard, setSelectedCard] = useState<LinkModel>();
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [confirmationDialog, setConfirmationDialog] = useState(false);
    const [filteredCards, setFilteredCards] = useState<LinkModel[]>([]);
    const [search, setSearch] = useState<string>();
    const [sorting, setSorting] = useState<string>();
    const [removedCardId, setRemovedCardId] = useState<string | null>(null);

    useEffect(() => {
        getAuth().onAuthStateChanged(() => {
            fetchCards();
        })

    }, [search, sorting]);

    const fetchCards = async () => {
        const cards = await getLinks(search, sorting);
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

    const handleEdit = (card: LinkModel) => {
        setSelectedCard(card);
        setIsCardModalOpen(true);
    }

    const handleDelete = async (card: LinkModel) => {
        setSelectedCard(card);
        setConfirmationDialog(true);
    }

    const closeConfirmationDialog = async (result: boolean) => {
        setConfirmationDialog(false)
        if (result && selectedCard) {
            setRemovedCardId(selectedCard.id);
            setTimeout(() => {
                setRemovedCardId(null);
            }, 500);
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

    const onSortingChange = async (selectedOption: string) => {
        if (selectedOption === 'byTitle') {
            setSorting('title');
        } else {
            setSorting(undefined);
        }
    };

    function clickFolderList() {
        setIsShowFolderList((prevIsShowFolderList) => !prevIsShowFolderList);
    }

    function handleOpenFolder(folder: FolderModel) {
        
    }


    function getCardClass(cardId: string): string | undefined {
        return removedCardId === cardId ? 'deleteAnimation' : '';
    }


    const onDragEnd = (result: DropResult) => {
        console.log(result)
    }

    return (
        <div className='card__page'>
            <DragDropContext onDragEnd={onDragEnd}>
                <Folders clickFolderList={clickFolderList} />

                <div className={`links__wrapper ${isShowFolderList ? 'hide-list-folders' : ' show-list-folders'}`}>
                    <div className="nav__search">
                        <div className="search">
                            <Dropdown
                                items={["by Date", "by Title"]}
                                onChange={onSortingChange} />
                            <input className="search__input" placeholder="Search..." type="text" name="text" onChange={filterBySearch} />
                        </div>
                    </div>
                    <button onClick={handleAddClick} className="add-link-button">
                        + Add new link
                    </button>
                    <Droppable droppableId="filteredCards" isDropDisabled={true} >
                        {(provided, snapshot) => (
                            <div className="cards-grid" ref={provided.innerRef} data-DraggingOver={snapshot.isDraggingOver}>
                                {filteredCards.map((card, index) => (
                                    <Draggable
                                        key={card.id}
                                        draggableId={card.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <React.Fragment>
                                                <div key={card.id}
                                                    style={
                                                        provided.draggableProps
                                                            .style
                                                    }
                                                    className={`draggable ${getCardClass(card.id)}`}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}>
                                                    <LinkItem card={card} editCard={handleEdit} deleteCard={handleDelete} />
                                                </div>
                                                {snapshot.isDragging && (
                                                    <div className="clone">
                                                        <LinkItem card={card} editCard={handleEdit} deleteCard={handleDelete} />
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        )}
                                    </Draggable>
                                ))}
                            </div>
                        )}
                    </Droppable>
                    {selectedCard &&
                        <LinkFormModal
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
            </DragDropContext>
        </div >
    )
}

export default LinksPage;