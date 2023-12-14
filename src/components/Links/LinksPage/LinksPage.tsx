import "./LinksPage.css";
import LinkItem from "../LinkItem/LinkItem";
import ConfirmationDialog from '../../Shared/ConfirmationDialog/ConfirmationDialog';
import LinkFormModal from '../LinkForm/LinkFormModal';
import Folders from "../Folders/Folders";
import Dropdown from "../../Shared/Dropdown/Dropdown";
import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDispatch, useSelector } from 'react-redux';
import { deleteLink } from "../../../Firebase/Link/deleteLink";
import { saveLink } from '../../../Firebase/Link/addLink';
import { getAuth } from "firebase/auth";
import { getAllLinks, setFolderId, setSearch, setSorting } from "../../../redux/actions/actionCreator";
import { RootState } from "../../../store";
import { LinkSortField } from "../../../Enums/LinkSortField";
import { LinkType } from "../../../Models/LinkType";

function LinksPage() {
    const [isShowFolderList, setIsShowFolderList] = useState(true);
    const [selectedCard, setSelectedCard] = useState<LinkType>();
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [confirmationDialog, setConfirmationDialog] = useState(false);
    const [removedCardId, setRemovedCardId] = useState<string | null>(null);

    const links: LinkType[] = useSelector(
        (state: RootState) => state.links.links
    );

    const folderId: string = useSelector(
        (state: RootState) => state.links.folderId
    );

    const dispatch = useDispatch();

    useEffect(() => {
        getAuth().onAuthStateChanged(() => {
            dispatch(getAllLinks());
        });
    }, []);

    const handleAddClick = async (event: any) => {
        event.preventDefault();
        await saveLink(folderId);
        dispatch(getAllLinks())
    };

    const closeModal = () => {
        setIsCardModalOpen(false);
        setSelectedCard(undefined);
        dispatch(getAllLinks())
    };

    const handleEdit = (card: LinkType) => {
        setSelectedCard(card);
        setIsCardModalOpen(true);
    }

    const handleDelete = async (card: LinkType) => {
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
            dispatch(getAllLinks())
        }
    }

    const filterBySearch = async (event: any) => {
        const value = event.target.value;
        dispatch(setSearch(value))
    };

    const onSortingChange = async (sorting: string) => {
        if (sorting === 'by Title') {
            dispatch(setSorting(LinkSortField.title));
        } else {
            dispatch(setSorting(LinkSortField.createDate));
        }
    };

    function clickFolderList() {
        setIsShowFolderList((prevIsShowFolderList) => !prevIsShowFolderList);
    }

    function openFolder(folderId: string) {
        dispatch(setFolderId(folderId))
    }

    function getCardClass(cardId: string): string | undefined {
        return removedCardId === cardId ? 'deleteAnimation' : '';
    }

    const handleEditFolder = () => {

    };

    return (
        <div className='card__page'>
            <DndProvider backend={HTML5Backend}>
                <Folders clickFolderList={clickFolderList} openFolder={openFolder} />
                <div className={`links__wrapper ${isShowFolderList ? 'hide-list-folders' : ' show-list-folders'}`}>
                    <div className='card__page-title'>
                        <p> All links</p>
                        <svg onClick={() => handleEditFolder()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10ZM19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="rgba(173,184,194,1)"></path></svg>
                    </div>

                    <div className="nav__search">
                        <button onClick={handleAddClick} className="add-link-button">
                            + Add new link
                        </button>
                        <div className="search">
                            <Dropdown
                                items={["by Date", "by Title"]}
                                onChange={onSortingChange} />
                            <input className="search__input" placeholder="Search..." type="text" name="text" onChange={filterBySearch} />
                        </div>
                    </div>

                    <div className={links.length >= 5 ? "big-cards-grid" : "small-cards-grid"} >
                        {links.map((link, index) => (
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