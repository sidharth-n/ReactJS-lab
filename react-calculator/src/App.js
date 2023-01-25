import "./style.css";
import { useReducer } from "react";
import DigitButton from "./digitBtn";
import OperationButton from "./operationBtn";
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  DELETE_DIGIT: "delete-digit",
  CLEAR: "clear",
  CHOOSE_OPERATION: "choose-operation",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT: {
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    }
    case ACTIONS.CLEAR: {
      return {
        ...state,
        currentOperand: "",
      };
    }
    case ACTIONS.CHOOSE_OPERATION: {
      if (state.currentOperand === null && state.previousOperand === null) {
        return state;
      }
      if (state.currentOperand === null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          operation: payload.operation,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    }
    case ACTIONS.EVALUATE: {
      if (
        state.currentOperand === null ||
        state.previousOperand === null ||
        state.operation === null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
    }
    case ACTIONS.DELETE_DIGIT: {
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: null,
          overwrite: false,
        };
      }
      if (state.currentOperand === null) {
        return state;
      }
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    }
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(current) || isNaN(prev)) {
    return "";
  }
  let computation = "";
  switch (operation) {
    case "+":
      computation = current + prev;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = current * prev;
      break;
    case "/":
      computation = prev / current;
      break;
  }
  return computation.toString();
}

function Calculator() {
  const [{ currentOperand = "Use me", previousOperand, operation }, dispatch] =
    useReducer(reducer, {});

  return (
    <div className="calculator-grid">
      <div className="calc-top">
        <div className="top-1">
          {previousOperand}
          {operation}
        </div>
        <div className="top-2">{currentOperand}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
      <OperationButton dispatch={dispatch} operation="/" />
      <DigitButton dispatch={dispatch} digit="1" />
      <DigitButton dispatch={dispatch} digit="2" />
      <DigitButton dispatch={dispatch} digit="3" />
      <OperationButton dispatch={dispatch} operation="*" />
      <DigitButton dispatch={dispatch} digit="4" />
      <DigitButton dispatch={dispatch} digit="5" />
      <DigitButton dispatch={dispatch} digit="6" />
      <OperationButton dispatch={dispatch} operation="+" />
      <DigitButton dispatch={dispatch} digit="7" />
      <DigitButton dispatch={dispatch} digit="8" />
      <DigitButton dispatch={dispatch} digit="9" />
      <OperationButton dispatch={dispatch} operation="-" />
      <DigitButton dispatch={dispatch} digit="." />
      <DigitButton dispatch={dispatch} digit="0" />
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

function App() {
  return <Calculator />;
}

export default App;
