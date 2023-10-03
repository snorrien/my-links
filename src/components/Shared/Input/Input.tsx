import "./Input.css";

type Props = {
    label: string,
    placeholder: string,
    value: string,
    handleChange: any;
}

const Input: React.FC<Props> = ({ label, placeholder, value, handleChange }) => {

    return (
        <div className='text__input'>
            <label>{label}</label>
            <input className='input' placeholder={placeholder} value={value} onChange={handleChange} />
        </div>
    );
}

export default Input;