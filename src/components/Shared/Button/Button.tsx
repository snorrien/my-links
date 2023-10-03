import "./Button.css";

type Props = {
    text: string;
    onClick: any;
}

const Button: React.FC<Props> = ({ text, onClick }) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    );
}

export default Button;