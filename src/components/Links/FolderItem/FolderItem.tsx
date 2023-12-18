import { FolderType } from "../../../Models/FolderType";
import { useDrop } from "react-dnd";
import "./FolderItem.css";
import { useDispatch, useSelector } from 'react-redux';
import { setFolder } from "../../../redux/actions/FolderActionCreator";

type Props = {
    folder: FolderType,
};

function FolderItem({ folder }: Props) {
    const dispatch = useDispatch();

    function handleClickFolder() {
        dispatch(setFolder(folder));
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
        <div ref={drop} key={folder.id} className="folder-item" onClick={handleClickFolder}>{folder.title === '' ? 'Untitled' : folder.title}
            <span className="folder-item__number">{folder.linksCount}</span>
        </div>
    );
}

export default FolderItem;
