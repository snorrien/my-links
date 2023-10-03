import "./Input.css";

type Props = {
    valid: any,
    label: string,
    placeholder: string,
    value: string,
    handleChange: any;
}

const ValidateInput: React.FC<Props> = ({ valid, label, placeholder, value, handleChange }) => {

    return (
        <div className={`text__input ${valid ? ' ' : 'invalid'}`}>
            <label>{label}</label>
            <input className='input' placeholder={placeholder} value={value} onChange={handleChange} />
        </div>
    );
}

export default ValidateInput;