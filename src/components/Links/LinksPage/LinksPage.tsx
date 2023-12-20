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
import { getAuth } from "firebase/auth";
import { addLink, deleteLink, getAllLinks, setSearch, setSorting } from "../../../redux/actions/LinkActionCreator";
import { deleteFolder, setFolder, updateFolder } from "../../../redux/actions/FolderActionCreator";
import { RootState } from "../../../store";
import { LinkSortField } from "../../../Enums/LinkSortField";
import { LinkType } from "../../../Models/LinkType";
import { FolderType } from "../../../Models/FolderType";

function LinksPage() {
    const [isShowFolderList, setIsShowFolderList] = useState(true);
    const [selectedCard, setSelectedCard] = useState<LinkType>();
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [isRemoveFolderDialogOpen, setIsRemoveFolderDialogOpen] = useState(false);
    const [isRemoveLinkDialogOpen, setIsRemoveLinkDialogOpen] = useState(false);
    const [removedCardId, setRemovedCardId] = useState<string | null>(null);
    const dispatch = useDispatch();

    const links: LinkType[] = useSelector(
        (state: RootState) => state.links.links
    );

    const folder: FolderType = useSelector(
        (state: RootState) => state.links.folder
    );

    useEffect(() => {
        // TODO: refactor (no dependency on firebase)
        getAuth().onAuthStateChanged(() => {
            dispatch(getAllLinks());
        });
    }, []);

    async function handleAddClick(event: any) {
        event.preventDefault();
        dispatch(addLink(folder?.id))
    };

    function closeModal() {
        setIsCardModalOpen(false);
        setSelectedCard(undefined);
    };

    function handleEdit(card: LinkType) {
        setSelectedCard(card);
        setIsCardModalOpen(true);
    }

    async function handleDeleteCard(card: LinkType) {
        setSelectedCard(card);
        setIsRemoveLinkDialogOpen(true);
    }

    async function closeRemoveLinkDialog(result: boolean) {
        setIsRemoveLinkDialogOpen(false)
        if (result && selectedCard) {
            setRemovedCardId(selectedCard.id);
            setTimeout(() => {
                dispatch(deleteLink(selectedCard.id))
            }, 500);
        }
    }

    function handleDeleteFolder() {
        setIsRemoveFolderDialogOpen(true);
    }

    async function closeRemoveFolderDialog(result: boolean) {
        setIsRemoveFolderDialogOpen(false);
        dispatch(deleteFolder(folder.id));
    }

    async function filterBySearch(event: any) {
        const value = event.target.value;
        dispatch(setSearch(value))
    };

    async function onSortingChange(sorting: string)  {
        if (sorting === 'by Title') {
            dispatch(setSorting(LinkSortField.title));
        } else {
            dispatch(setSorting(LinkSortField.createDate));
        }
    };

    function clickFolderList() {
        setIsShowFolderList((prevIsShowFolderList) => !prevIsShowFolderList);
    }

    function getCardClass(cardId: string): string | undefined {
        return removedCardId === cardId ? 'deleteAnimation' : '';
    }

    function handleInputChange(event: any) {
        dispatch(setFolder({
            id: folder.id,
            title: event.target.value,
            linksCount: folder.linksCount
        }));
    };

    async function handleInputBlur() {
        if (folder) {
            dispatch(updateFolder({
                id: folder.id,
                title: folder.title,
            }))
        }
    }

    return (
        <div className='card__page'>
            <DndProvider backend={HTML5Backend}>
                <Folders clickFolderList={clickFolderList} />
                <div className={`links__wrapper ${isShowFolderList ? 'hide-list-folders' : ' show-list-folders'}`}>
                    <div className='folder-title'>
                        <div className={`${folder ? 'folder-title__delete' : 'folder-title__none-delete'}`} onClick={handleDeleteFolder}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9Z" fill="rgba(147, 147, 146,1)"></path></svg>
                            <p>Delete folder</p>
                        </div>
                        <input
                            type="text"
                            required
                            disabled={!folder}
                            placeholder={folder?.title === '' ? 'Untitled' : folder?.title}
                            value={folder?.title ?? 'All Links'}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                        />
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
                                <LinkItem link={link} editCard={handleEdit} deleteCard={handleDeleteCard} />
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
                        isOpen={isRemoveLinkDialogOpen}
                        closeDialog={closeRemoveLinkDialog}
                        message='Do you want to delete the Card?'
                    />
                    <ConfirmationDialog
                        isOpen={isRemoveFolderDialogOpen}
                        closeDialog={closeRemoveFolderDialog}
                        message='Do you want to delete the Folder?'
                    />
                </div>
            </DndProvider>
        </div >
    )
}

export default LinksPage;