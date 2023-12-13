import { useEffect, useState } from 'react';
import './Folders.css'
import { FolderModel } from '../../../Models/FolderModel';
import { addFolder } from '../../../Firebase/folders/addFolder';
import { getFolders } from '../../../Firebase/folders/getFolders';
import { getAuth } from 'firebase/auth';
import FolderItem from '../FolderItem/FolderItem';
import { getAllLinks } from '../../../redux/actions/actionCreator';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
    clickFolderList: any;
    openFolder: any;
};

function Folders({ clickFolderList, openFolder }: Props) {
    const [filteredFolders, setFilteredFolders] = useState<FolderModel[]>([]);
    const [isArrow, setIsArrow] = useState(true);
    const [listOfFolders, setListOfFolders] = useState(false);

    const handleClick = async (event: any) => {
        event.preventDefault();
        await addFolder();
        await fetchFolders();
    };

    useEffect(() => {
        getAuth().onAuthStateChanged(() => {
            fetchFolders();
        });
    }, []);

    const fetchFolders = async () => {
        const folders = await getFolders();
        setFilteredFolders(folders);
    };

    const toggleArrow = () => {
        setIsArrow((prevIsArrow) => !prevIsArrow);
        clickFolderList();
    };

    const showListOfFolders = () => {
        setListOfFolders(!listOfFolders);
    }

    const dispatch = useDispatch();

    const showAllLinks = () => {
        dispatch(getAllLinks());
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
                    {filteredFolders.map((folder) => (
                        <div key={folder.id}>
                            <FolderItem folder={folder} openFolder={openFolder} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Folders;
function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}

