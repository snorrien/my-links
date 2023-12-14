import { FolderType } from "../../../Models/FolderType";
import { useDrop } from "react-dnd";
import "./FolderItem.css";
import { useDispatch, useSelector } from 'react-redux';
import { setFolderId } from "../../../redux/actions/LinkActionCreator";

type Props = {
    folder: FolderType,
};

function FolderItem({ folder }: Props) {
    const dispatch = useDispatch();

    function handleClickFolder() {
        dispatch(setFolderId(folder.id));
    }

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'link',
        drop: () => (
            { id: folder.id }
        ),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    }))

    return (
        <div ref={drop} key={folder.id} className="folder-item" onClick={handleClickFolder}>{folder.title}
            <span className="folder-item__number">{folder.linksCount}</span>
        </div>
    );
}

export default FolderItem;
