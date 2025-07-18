import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Quesion from "./Quesion";
import MoveButton from "./MoveButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SEC_PER_QUESTION = 30;

const initialState = {
  questions: [],
  index: 0, // cur question index
  status: "loading", // loading, error , ready, active, finished
  answer: null, // seleced option index of options
  points: 0,
  highScore: 0,
  secondsRemaining: null,
  reloadKey: 0,
};

function reduser(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case "newAnswer":
      const curQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === curQuestion.correctOption
            ? state.points + curQuestion.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };

    case "newQuiz":
      return {
        ...initialState,
        highScore: state.highScore,
        reloadKey: state.reloadKey + 1,
        status: "loading",
      };
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highScore,
      reloadKey,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reduser, initialState);

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
  }, [reloadKey]);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, q) => acc + q.points, 0);

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
          <>
            <Main>
              <Progress
                numQuestions={numQuestions}
                index={index}
                points={points}
                maxPossiblePoints={maxPossiblePoints}
                answer={answer}
              />
              <Quesion
                question={questions[index]}
                index={index}
                dispatch={dispatch}
                answer={answer}
              />
            </Main>
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              {answer !== null && (
                <MoveButton
                  type={`${
                    index < numQuestions - 1 ? "nextQuestion" : "finish"
                  }`}
                  className={`${index < numQuestions - 1 ? "next" : "finish"}`}
                  dispatch={dispatch}
                  answer={answer}
                >
                  {index < numQuestions - 1 ? "Next" : "Show Score"}
                </MoveButton>
              )}
            </Footer>
          </>
        )}

        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
}
