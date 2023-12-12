import "./LinksPage.css";
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
import { useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


function LinksPage() {
    const [isShowFolderList, setIsShowFolderList] = useState(true);
    const [selectedCard, setSelectedCard] = useState<LinkModel>();
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [confirmationDialog, setConfirmationDialog] = useState(false);
    const [filteredCards, setFilteredCards] = useState<LinkModel[]>([]);
    const [search, setSearch] = useState<string>();
    const [sorting, setSorting] = useState<string>();
    const [removedCardId, setRemovedCardId] = useState<string | null>(null);
    const [folderId, setFolderId] = useState<string | undefined>();

    useEffect(() => {
        getAuth().onAuthStateChanged(() => {
            fetchCards();
        })

    }, [search, sorting, folderId]);

    const handleAddClick = async (event: any) => {
        event.preventDefault();
        await addLink();
        await fetchCards();
    };

    const fetchCards = async () => {
        const links = await getLinks(search, sorting, folderId);
        setFilteredCards(links);
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
        if (selectedOption === 'by Title') {
            setSorting('title');
        } else {
            setSorting(undefined);
        }
    };

    function clickFolderList() {
        setIsShowFolderList((prevIsShowFolderList) => !prevIsShowFolderList);
    }

    function openFolder(folderId: string) {
        setFolderId(folderId);
    }

    function getCardClass(cardId: string): string | undefined {
        return removedCardId === cardId ? 'deleteAnimation' : '';
    }

    return (
        <div className='card__page'>
            <DndProvider backend={HTML5Backend}>
                <Folders clickFolderList={clickFolderList} openFolder={openFolder} />
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

                    <div className={filteredCards.length >= 5 ? "big-cards-grid" : "small-cards-grid"} >
                        {filteredCards.map((link, index) => (
                            <div key={link.id}
                                className={`draggable ${getCardClass(link.id)}`}
                            >
                                <LinkItem link={link} editCard={handleEdit} deleteCard={handleDelete} />
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
            </DndProvider>
        </div >
    )
}

export default LinksPage;