import { useState, useEffect } from "react";
import anime from "animejs"
import "./creditCard.css"

const CreditCard = () => {
    const [card, setCard] = useState({
        cardNumber: "0000 0000 0000 0000",
        cardHolderName: "",
        cardExpirationDate: "",
        cardCVV: "",
        cardType: "💳"
    });

    const flipCard = () => {
        anime({
            targets: ".credit-card-inner",
            rotateY: "180deg",
            duration: "100",
            easing: "linear"
        });
    };

    const unFlipCard = () => {
        anime({
            targets: ".credit-card-inner",
            rotateY: "360deg",
            duration: "100",
            easing: "linear"
        });
    };

    const setCardType = (type) => {
        setCard(prevState => ({ ...prevState, cardType: type }));
    };

    const checkSubstring = (length, match) => {
        return card.cardNumber.substring(0, length) === match;
    };

    const setNumber = (e) => {
        const cardNumber = e.target.value;
        setCard(prevState => ({ ...prevState, cardNumber }));
        if (cardNumber[0] === "4") {
            setCardType("Visa");
        } else if (checkSubstring(4, "6011")) {
            setCardType("Discover");
        } else if (checkSubstring(2, "51")) {
            setCardType("MasterCard");
        } else if (checkSubstring(2, "34")) {
            setCardType("American Express");
        } else if (checkSubstring(3, "300")) {
            setCardType("Diners Club");
        } else if (checkSubstring(2, "35")) {
            setCardType("JCB");
        } else {
            setCardType("💳");
        }
    };

    const setName = (e) => {
        const cardHolderName = e.target.value.toUpperCase();
        setCard(prevState => ({ ...prevState, cardHolderName }));
    };

    const setDate = (e) => {
        let data = e.target.value.split("");
        let cardExpirationDate = data.map((x) => x === "-" ? "/" : x).join("");
        setCard(prevState => ({ ...prevState, cardExpirationDate }));
    };

    const setCVV = (e) => {
        const cardCVV = e.target.value;
        setCard(prevState => ({ ...prevState, cardCVV }));
    };

    return (
        <div className="container_on_credit">
            <div className="credit-card">
                <div className="credit-card-inner">
                    <div className="credit-card-front">
                        <div id="card-type">{card.cardType}</div>
                        <div id="card-number">{card.cardNumber}</div>
                        <div id="card-expiration">
                            {card.cardExpirationDate !== "" && <div id="validthru">Valid Thru</div>}
                            {card.cardExpirationDate}
                        </div>
                        <div id="card-holder-name">{card.cardHolderName}</div>
                    </div>
                    <div className="credit-card-back">
                        <div className="card-stripe" />
                        <div className="card-sig-container">
                            <div className="signature">{card.cardHolderName}</div>
                            CVC {card.cardCVV}
                        </div>
                        <p className="credits">Built with Cleave.js, Anime.js, and React Icons.</p>
                    </div>
                </div>
            </div>
            <form className="card-form">
                <label className="input-label">Номер кредитной карты</label>
                <input
                    placeholder="Введите номер вашей кредитной карты"
                    options={{ creditCard: true }}
                    id="number-input"
                    name="number-input"
                    className="text-input"
                    maxLength="16"
                    onChange={setNumber}
                />
                <label className="input-label">Имя владельца карты</label>
                <input
                    type="text"
                    placeholder="Введите имя владельца карты"
                    value={card.cardHolderName}
                    onChange={setName}
                    className="text-input"
                    maxLength="30"
                />
                <div className="date-and-csv" style={{ display: "flex" }}>
                    <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
                        <label className="input-label">
                            Cрок годности
                        </label>
                        <input
                            type="month"
                            placeholder="Введите дату истечения срока действия"
                            className="text-input"
                            onChange={setDate}
                            style={{ height: "23px", fontSize: "16px", fontWeight: "100" }}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
                        <label className="input-label">Защитный код CVC</label>
                        <input
                            options={{
                                numeral: "true"
                            }}
                            placeholder="Введите CVC"
                            maxLength="3"
                            value={card.cardCVV}
                            className="text-input"
                            onChange={setCVV}
                            onFocus={flipCard}
                            onBlur={unFlipCard}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreditCard;