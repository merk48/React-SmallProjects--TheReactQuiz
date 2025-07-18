import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Quesion from "./Quesion";

const initialState = {
  questions: [],
  index: 0, // cur question index
  status: "loading", // loading, error , ready, active, finished
  answer: null, // seleced option index of options
};

function reduser(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return { ...state, status: "active" };

    case "newAnswer":
      return { ...state, answer: action.payload };

    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reduser,
    initialState
  );
  const numQuestions = questions.length;

  useEffect(() => {
    async function getQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed", payload: err.message });
      }
    }

    getQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Quesion
            question={questions[index]}
            index={index}
            dispatch={dispatch}
            answer={answer}
          ></Quesion>
        )}
        {/* {status === "active" && <Error />} */}
        {/* {status === "fiished" && <Error />} */}
      </Main>
    </div>
  );
}
