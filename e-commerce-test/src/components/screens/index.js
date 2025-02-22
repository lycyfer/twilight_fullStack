import React, { useState, useRef, useCallback, useContext } from 'react';
import CForm from './components/form';
import Card from './components/card';
import { AuthContext } from '../context/AuthContext';
import apiRequest from '../../lib/apiRequest';

const initialState = {
    cardNumber: '#### #### #### ####',
    cardHolder: 'FULL NAME',
    cardMonth: '',
    cardYear: '',
    cardCvv: '',
    isCardFlipped: false
};

const MainScreen = () => {
    const [state, setState] = useState(initialState);
    const [currentFocusedElm, setCurrentFocusedElm] = useState(null);


    const updateStateValues = useCallback(
        (keyName, value) => {
            setState({
                ...state,
                [keyName]: value || initialState[keyName]
            });
        },
        [state]
    );

    const { currentUser } = useContext(AuthContext);

    const handledCard = async () => {
        try {
            await apiRequest.post(`/users/card/${currentUser.id}`, {
                cardNumber: state.cardNumber,
                cardHolderName: state.cardHolder,
                expirationMonth: state.cardMonth,
                expirationYear: state.cardYear,
                cvv: state.cardCvv,
            });

        } catch (err) {
            console.log(err)
        }
    };

    let formFieldsRefObj = {
        cardNumber: useRef(),
        cardHolder: useRef(),
        cardDate: useRef(),
        cardCvv: useRef()
    };

    let focusFormFieldByKey = useCallback((key) => {
        formFieldsRefObj[key].current.focus();
    });

    // This are the references for the Card DIV elements.
    let cardElementsRef = {
        cardNumber: useRef(),
        cardHolder: useRef(),
        cardDate: useRef()
    };

    let onCardFormInputFocus = (_event, inputName) => {
        const refByName = cardElementsRef[inputName];
        setCurrentFocusedElm(refByName);
    };

    let onCardInputBlur = useCallback(() => {
        setCurrentFocusedElm(null);
    }, []);

    return (
        <div className="wrapper-testt">
            <CForm
                cardMonth={state.cardMonth}
                cardYear={state.cardYear}
                onUpdateState={updateStateValues}
                cardNumberRef={formFieldsRefObj.cardNumber}
                cardHolderRef={formFieldsRefObj.cardHolder}
                cardDateRef={formFieldsRefObj.cardDate}
                onCardInputFocus={onCardFormInputFocus}
                onCardInputBlur={onCardInputBlur}
            >
                <Card
                    cardNumber={state.cardNumber}
                    cardHolder={state.cardHolder}
                    cardMonth={state.cardMonth}
                    cardYear={state.cardYear}
                    cardCvv={state.cardCvv}
                    isCardFlipped={state.isCardFlipped}
                    currentFocusedElm={currentFocusedElm}
                    onCardElementClick={focusFormFieldByKey}
                    cardNumberRef={cardElementsRef.cardNumber}
                    cardHolderRef={cardElementsRef.cardHolder}
                    cardDateRef={cardElementsRef.cardDate}
                ></Card>
            </CForm>
            <button onClick={handledCard} className='saveCreditCard'>Сохранить карту</button>
        </div>
    );
};

export default MainScreen;
