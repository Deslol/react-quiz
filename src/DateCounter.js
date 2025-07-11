import {useReducer, useState} from "react";

function reducer(state, action) {
    switch (action.type) {
        case 'inc':
            return {...state, count: state.count + state.step};
        case 'dec':
            return {...state, count: state.count - state.step};
        case 'reset':
            return {count: 0, step: 1}
        case 'setStep':
            return {...state, step: action.payload}
        case 'setCount':
            return {...state, count: action.payload};
        default:
            throw new Error('Unknown Action')
    }
}

function DateCounter() {
    // const [count, setCount] = useState(0);
    // const [count, dispatch] = useReducer(reducer, 0);
    // const [step, setStep] = useState(1);
    const initialState = {count: 0, step: 1}
    const [state, dispatch] = useReducer(reducer, initialState)

    const {count, step} = state;

    // This mutates the date object.
    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + count);

    const dec = function () {
        dispatch({type: "dec"})
        // setCount((count) => count - 1);
        // setCount((count) => count - step);
    };

    const inc = function () {
        dispatch({type: "inc"})
        // setCount((count) => count + 1);
        // setCount((count) => count + step);
    };

    const defineCount = function (e) {
        dispatch({
            type: "setCount", payload: Number(e.target.value)
        })
        // setCount(Number(e.target.value));
    };

    const defineStep = function (e) {
        // setStep(Number(e.target.value));
        dispatch({type: 'setStep', payload: Number(e.target.value)})
    };

    const reset = function () {
        // setCount(0);
        // setStep(1);
        dispatch({type: 'reset'})
    };

    return (
        <div className="counter">
            <div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={step}
                    onChange={defineStep}
                />
                <span>{step}</span>
            </div>

            <div>
                <button onClick={dec}>-</button>
                <input value={count} onChange={defineCount}/>
                <button onClick={inc}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default DateCounter;
