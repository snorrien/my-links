import "./Button.css";

type Props = {
    text: string;
}

const Button: React.FC<Props> = ({ text }) => {
    return (
        <button>
            {text}
        </button>
    );
}

export default Button;