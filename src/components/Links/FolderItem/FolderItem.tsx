import { useState } from "react";
import { FolderModel } from "../../../Models/FolderModel";
import { useDrag, useDrop } from "react-dnd";


type Props = {
    folder: FolderModel,
    openFolder: any
};

function FolderItem({ folder, openFolder }: Props) {
    const [numberOfCards, setNumberOfCards] = useState(0);

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
        <div ref={drop} key={folder.id} className="folders_list-item" onClick={handleClickFolder}>{folder.title}
            <span className="folders_list-number">{numberOfCards}</span>
        </div>
    );
}

export default FolderItem;
