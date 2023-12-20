import "./Input.css";

type Props = {
    onChange: any;
    label?: string,
    placeholder?: string,
    error?: string;
    type?: string;
    autoComplete?: string;
    value?: any;
    required?: boolean;
}

const Input: React.FC<Props> = ({ label, placeholder, onChange, error, type, autoComplete, value, required }) => {

    return (
        <div className='text__input'>
            <div className='labels'>
                <label>{label}</label>
                <label className={`error-message ${error ? 'error' : ''}`}>{error}</label>
            </div>
            <input className={`input ${error ? 'invalid' : ''}`} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} type={type} name={autoComplete} autoComplete={autoComplete} defaultValue={value} required={required} />
        </div>
    );
}

export default Input;