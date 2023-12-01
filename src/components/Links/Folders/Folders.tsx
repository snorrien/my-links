import { useEffect, useState } from 'react';
import './Folders.css'
import { FolderModel } from '../../../Models/FolderModel';
import { addFolder } from '../../../Firebase/folders/addFolder';
import { getFolders } from '../../../Firebase/folders/getFolders';
import { getAuth } from 'firebase/auth';

type Props = {
    clickFolderList: any;
};

function Folders({ clickFolderList }: Props) {
    const [filteredFolders, setFilteredFolders] = useState<FolderModel[]>([]);
    const [isArrow, setIsArrow] = useState(true);
    const [numberOfCards, setNumberOfCards] = useState(0);

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


    function handleClickFolder(folder: FolderModel) {
        return (
            console.log("folder")
        )
        

    }

    return (
        <div className={`folders__wrapper ${isArrow ? 'move-left' : ''}`}>

            <div className='folders_list'>
                <div className="ring-button" onClick={toggleArrow}>
                    <div className={`arrow ${isArrow ? 'left' : ''}`} ></div>
                </div>
                <button onClick={handleClick}>Add folder</button>
                {filteredFolders.map((folder) => (

                    <div key={folder.id} className="folders_list-item" onClick={(e) => handleClickFolder}>{folder.title}
                        <span className="folders_list-number">{numberOfCards}</span>
                    </div>

                ))}
            </div>

        </div>
    );
}

export default Folders;
