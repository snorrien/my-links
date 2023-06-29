import "./Card.css";

function Card() {
    return (
        <div className="card">
            <div className="card__container">
                <article className="card__article">
                    <div className="card__data">
                        <img src="assets/img/img1.png" alt="card image" className="card__img" />
                        <h1 className="card__title">Shield & Shining Star</h1>
                        <p className="card__description">Beautiful card, with hover effects</p>
                    </div>
                </article>
                <article className="card__article">
                    <div className="card__data">
                        <img src="assets/img/img1.png" alt="card image" className="card__img" />
                        <h1 className="card__title">Shield & Shining Star</h1>
                        <p className="card__description">Beautiful card, with hover effects</p>
                    </div>
                </article>
                <article className="card__article">
                    <div className="card__data">
                        <img src="assets/img/img1.png" alt="card image" className="card__img" />
                        <h1 className="card__title">Shield & Shining Star</h1>
                        <p className="card__description">Beautiful card, with hover effects</p>
                    </div>
                </article>
            </div>

        </div>
    );
}

export default Card;
