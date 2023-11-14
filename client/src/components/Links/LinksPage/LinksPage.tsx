import "./LinksPage.css";
import LinkItem from "../LinkItem/LinkItem";
import { useState, useEffect, ChangeEvent, useRef } from 'react';
import { LinkModel } from '../../../Models/LinkModel';
import { addLink } from '../../../Firebase/Link/addLink';
import { getLinks } from '../../../Firebase/Link/getLinks';
import ConfirmationDialog from '../../Shared/ConfirmationDialog/ConfirmationDialog';
import LinkFormModal from '../LinkForm/LinkFormModal';
import { deleteLink } from "../../../Firebase/Link/deleteLink";
import LinksFolders from "../LinksFolders/LinksFolders";

function LinksPage() {
    const [isShowFolderList, setIsShowFolderList] = useState(true);
    const [selectedCard, setSelectedCard] = useState<LinkModel>();
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [confirmationDialog, setConfirmationDialog] = useState(false);
    const [filteredCards, setFilteredCards] = useState<LinkModel[]>([]);
    const [search, setSearch] = useState<string>();
    const [sorting, setSorting] = useState<string>();
    const [removedCardId, setRemovedCardId] = useState<string | null>(null);
    const inputRef = useRef(null);


    useEffect(() => {
        fetchCards();
    }, [search, sorting]);

    const fetchCards = async () => {
        const cards = await getLinks(search, sorting);
        setFilteredCards(cards);
        console.log(filteredCards)
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

    const onSortingChange = async (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === 'byTitle') {
            setSorting('title');
        }
        else {
            setSorting(undefined);
        }
    }

    function clickFolderList() {
        setIsShowFolderList((prevIsShowFolderList) => !prevIsShowFolderList);
    }

    function getCardClass(cardId:string): string | undefined {
        return removedCardId===cardId ? 'deleteAnimation' : '';
    }

    return (
        <div className='card__page'>
            <LinksFolders clickFolderList={clickFolderList} />
            <div className={`links__wrapper ${isShowFolderList ? 'show-list-folders' : 'hide-list-folders'}`}>
                <div className="nav__search">
                    <div className="search">
                        <select onChange={onSortingChange} className="sort">
                            <option className='sort-item' value="byDate">By Date</option>
                            <option className='sort-item' value="byTitle">By Title</option>
                        </select>
                        <input className="search__input" placeholder="Search..." type="text" name="text" onChange={filterBySearch} />
                    </div>
                </div>
                <button onClick={handleAddClick} className="add-link-button">
                    + Add new link
                </button>
                <div className="cards-grid">
                    {filteredCards.map((card) => (
                        <div key={card.id} className={getCardClass(card.id)}>
                            <LinkItem card={card} editCard={handleEdit} deleteCard={handleDelete} />
                        </div>
                    ))}
                </div>
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
        </div>
    )
}

export default LinksPage;