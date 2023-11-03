import { useEffect, useState } from 'react';
import './LinksFolders.css'
import { FolderModel } from '../../../Models/FolderModel';
import { addFolder } from '../../../Firebase/folders/addFolder';
import { getFolders } from '../../../Firebase/folders/getFolders';

type Props = {
    clickFolderList: any;
};

function LinksFolders({ clickFolderList }: Props) {
    const [isOpenFolderList, setIsOpenFolderList] = useState(true);
    const [filteredFolders, setFilteredFolders] = useState<FolderModel[]>([]);
    const [isArrow, setIsArrow] = useState(true);

    const handleClick = async (event: any) => {
        event.preventDefault();
        await addFolder();
        await fetchFolders();
    };

    useEffect(() => {
        fetchFolders()
    }, []);


    const fetchFolders = async () => {
        const folders = await getFolders();
        setFilteredFolders(folders);
    };

    const toggleArrow = () => {
        setIsArrow((prevIsArrow) => !prevIsArrow);
        setIsOpenFolderList((prevIsOpenFolderList) => !prevIsOpenFolderList);
        clickFolderList();
    };

    return (
        <div className={`folders__wrapper ${isArrow ? 'move-left' : ''}`}>
            <div className='folders_list'>
            <div className="ring-button" onClick={toggleArrow}>
                <div className={`arrow ${isArrow ? 'left' : ''}`} ></div>
            </div>
                <button onClick={handleClick}>Add folder</button>
                {filteredFolders.map((folder) => (
                    <div key={folder.id} className="folders_list-item">{folder.title}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LinksFolders;
