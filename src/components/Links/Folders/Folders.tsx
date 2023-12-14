import { useEffect, useState } from 'react';
import './Folders.css'
import { FolderType } from '../../../Models/FolderType';
import { addFolder } from '../../../Firebase/folders/addFolder';
import { getAuth } from 'firebase/auth';
import FolderItem from '../FolderItem/FolderItem';
import { getAllLinks, getFolders, setFolderId } from '../../../redux/actions/LinkActionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';

type Props = {
    clickFolderList: any;
};

function Folders({ clickFolderList }: Props) {
    const [isArrow, setIsArrow] = useState(true);
    const [listOfFolders, setListOfFolders] = useState(false);

    const folders: FolderType[] = useSelector(
        (state: RootState) => state.folders.folders
    );


    const dispatch = useDispatch();

    const handleClick = async (event: any) => {
        event.preventDefault();
        await addFolder();
        dispatch(getFolders());
    };

    useEffect(() => {
        getAuth().onAuthStateChanged(() => {
            dispatch(getFolders());
        });
    }, []);

    const toggleArrow = () => {
        setIsArrow((prevIsArrow) => !prevIsArrow);
        clickFolderList();
    };

    const showListOfFolders = () => {
        setListOfFolders(!listOfFolders);
    }

    const showAllLinks = () => {
        dispatch(setFolderId(undefined));
    };

    return (
        <div className={`folders__wrapper ${isArrow ? 'move-left' : ''}`}>
            <div className="arrows-button" onClick={toggleArrow}>
                <div className={`arrow arrow-one ${isArrow ? 'left-one' : ''}`} ></div>
                <div className={`arrow arrow-two ${isArrow ? 'left-two' : ''}`} ></div>
            </div>
            <div className='folders__list' >
                <div className={`folders__list-item ${listOfFolders ? '' : 'folders__items-highlight'}`} onClick={showAllLinks}>All links</div>
                <div className={`folders__list-item folders__list-button ${listOfFolders ? 'folders__items-highlight' : ''}`} title="Add new folder" onClick={showListOfFolders}>
                    <p>Folders</p>
                    <div className='add-folder-button' onClick={handleClick}>
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
