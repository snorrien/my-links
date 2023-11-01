import "./Input.css";

type Props = {
    onChange: any;
    label: string,
    placeholder?: string,
    error?: string;
}

const Input: React.FC<Props> = ({ label, placeholder, onChange, error }) => {

    return (
        <div className='text__input'>
            <div className='labels'>
                <label>{label}</label>
                <label className={`error-message ${error ? 'error' : ''}`}>{error}</label>
            </div>
            <input className={`input ${error ? 'invalid' : ''}`} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
        </div>
    );
}

export default Input;