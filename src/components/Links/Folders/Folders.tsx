import { useEffect, useState } from 'react';
import './Folders.css'
import { FolderModel } from '../../../Models/FolderModel';
import { addFolder } from '../../../Firebase/folders/addFolder';
import { getFolders } from '../../../Firebase/folders/getFolders';
import { getAuth } from 'firebase/auth';
import FolderItem from '../FolderItem/FolderItem';

type Props = {
    clickFolderList: any;
    openFolder: any;
};

function Folders({ clickFolderList, openFolder }: Props) {
    const [filteredFolders, setFilteredFolders] = useState<FolderModel[]>([]);
    const [isArrow, setIsArrow] = useState(true);

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

    return (
        <div className={`folders__wrapper ${isArrow ? 'move-left' : ''}`}>
            <div className="arrows-button" onClick={toggleArrow}>
                <div className={`arrow arrow-one ${isArrow ? 'left-one' : ''}`} ></div>
                <div className={`arrow arrow-two ${isArrow ? 'left-two' : ''}`} ></div>
            </div>
            <div className='folders_list' >

                <button onClick={handleClick}>Add folder</button>
                {filteredFolders.map((folder) => (
                    <div key={folder.id}>
                        <FolderItem folder={folder} openFolder={openFolder} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Folders;
