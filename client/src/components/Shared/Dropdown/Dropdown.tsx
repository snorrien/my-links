import { useState } from "react";
import "./Dropdown.css";

type Props = {
    items: string[];
    onChange?: (selectedOption: string) => void;
}

const Dropdown: React.FC<Props> = ({ items, onChange }) => {

    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => setIsOpen(!isOpen);

    function onItemClicked(value: string) {
        setSelectedOption(value);
        setIsOpen(false);
        if (onChange) {
            onChange(value);
          }
    };
    
    return (
        <div className="dropdown" onClick={toggling}>
            <div className="dropdown__label">
                {selectedOption} 
            </div>
            <div className={`dropdown__arrow ${isOpen ? '' : 'dropdown__arrow-expanded'}`}></div>
            <div className={` ${isOpen ? 'dropdown__items' : 'dropdown__items-hidden'}`}>
                <ul className="">
                    {items.map(item => (
                        <li className="dropdown__item"
                            onClick={() => onItemClicked(item)} key={Math.random()}> {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Dropdown;
