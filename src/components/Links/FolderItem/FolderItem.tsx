import { useEffect, useState } from "react";
import { FolderModel } from "../../../Models/FolderModel";
import { useDrop } from "react-dnd";

import "./FolderItem.css";
import { getLinksCount } from "../../../Firebase/Link/getLinksCount";
import { getAuth } from "firebase/auth";

type Props = {
    folder: FolderModel,
    openFolder: any;
    
};

function FolderItem({ folder, openFolder }: Props) {
    const [linksCount, setLinksCount] = useState(0);

    useEffect(() => {
        getAuth().onAuthStateChanged(() => {
            fetchLinksCount();
        })
    }, []);

    const fetchLinksCount = async () => {
        const count = await getLinksCount(folder.id);
        setLinksCount(count);
    };

    function handleClickFolder() {
        openFolder(folder.id);
    }

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'link',
        drop: () => ({ id: folder.id }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))

    return (
        <div ref={drop} key={folder.id} className="folder-item" onClick={handleClickFolder}>{folder.title}
            <span className="folder-item__number">{linksCount}</span>
        </div>
    );
}

export default FolderItem;
