import { useEffect, useState } from 'react';
import './Folders.css'
import { FolderType } from '../../../Models/FolderType';
import { getAuth } from 'firebase/auth';
import FolderItem from '../FolderItem/FolderItem';
import { addFolder, getFolders, setFolder } from '../../../redux/actions/FolderActionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';

type Props = {
    clickFolderList: any;
};

function Folders({ clickFolderList }: Props) {
    const [isArrow, setIsArrow] = useState(true);
    const [listOfFolders, setListOfFolders] = useState(false);
    const dispatch = useDispatch();

    const folders: FolderType[] = useSelector(
        (state: RootState) => state.folders.folders
    );

    async function handleClick(event: any) {
        event.preventDefault();
        event.stopPropagation();
        setListOfFolders(true);
        dispatch(addFolder());
    };

    useEffect(() => {
        getAuth().onAuthStateChanged(() => {
            dispatch(getFolders());
        });
    }, []);

    function toggleArrow() {
        setIsArrow((prevIsArrow) => !prevIsArrow);
        clickFolderList();
    };

    function showListOfFolders() {
        setListOfFolders(!listOfFolders);
    }

    function showAllLinks() {
        dispatch(setFolder(undefined));
    };

    return (
        <div className={`folders ${isArrow ? 'move-left' : ''}`}>
            <div className="arrows-button" onClick={toggleArrow}>
                <div className={`arrow arrow-one ${isArrow ? 'left-one' : ''}`} ></div>
                <div className={`arrow arrow-two ${isArrow ? 'left-two' : ''}`} ></div>
            </div>
            <div className='folders__list' >
                <div className={`folders__list-item `} onClick={showAllLinks}>All links</div>
                <div className={`folders__list-item folders__button`} title="Add new folder" onClick={showListOfFolders} >
                    <p>Folders</p>
                    <div className='add-folder-button' onClick={(event) => { handleClick(event) }}>
                        <svg className='add-folder-button-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill="rgba(173,184,194,1)"></path></svg>
                    </div>
                </div>
                <div className={` ${listOfFolders ? 'folders__items' : 'folders__items-hidden'}`}>
                    {folders.map((folder) => (
                        <div key={folder.id}>
                            <FolderItem folder={folder} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Folders;
