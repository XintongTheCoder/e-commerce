import React, { useEffect, useState } from 'react';
import parse from '../../parse';
// import { GlobalContext } from '../GlobalContext.jsx';
import AnswerListEntry from './AnswerListEntry.jsx';
import AnswerForm from './AnswerForm.jsx';
import './questions.css';

function QuestionListEntry({ question }) {
  const [answers, setAnswers] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [helpful, setHelpful] = useState(question.question_helpfulness);
  const [burn, setBurn] = useState(false);
  // const [toggle, setToggle] = useState(false);
  // console.log('I AM A QUESTION', question)

  useEffect(() => {
    parse.get(`/qa/questions/${question.question_id}/answers`)
      .then((data) => {
        setAllAnswers(data.results);
        setAnswers(data.results.slice(0, 2));
      })
      .catch((err) => console.log(err));
  }, [question.question_id, burn]);

  // console.log('I AM ANSWERS', answers);
  // console.log('I AM A QUESTION ID', question.question_id)

  const updateHelp = (event) => {
    event.preventDefault();
    setHelpful(helpful + 1);
    parse.put(`qa/questions/${question.question_id}/helpful`, {
      helpfulness: question.question_helpfulness + 1,
    })
      .then(() => console.log('I am helpful'))
      .catch((err) => console.log('I did not update helpfulnerss', err));
  };

  return (
    <div>
      <section className="qSection">
        <span className="questionList">
          Q:&ensp;
          <span className="qbody">{question.question_body}</span>

        </span>
        <span className="navQ">
          Helpful?
          <button
            type="button"
            className="Btn"
            data-testid="helpBtn"
            onClick={(event) => updateHelp(event)}
          >
            Yes
          </button>
          &#40;
          {helpful}
          &#41;
          &emsp;|&emsp;
          <button type="button" className="Btn" data-testid="addAnswer" onClick={() => setOpenForm(true)}>Add Answer</button>
          {openForm && <AnswerForm setOpenForm={setOpenForm} question={question} setBurn={setBurn} burn={burn} />}
        </span>
        <div className="answer-list-section">
          {answers.map((answer, i) => <AnswerListEntry key={i} answer={answer} />) }
        </div>
        {allAnswers.length > answers.length ? (
          <button type="button" className="moreAnswersBtn" onClick={() => setAnswers(allAnswers.slice(0, answers.length + 2)) && setBurn(!burn)}>LOAD MORE ANSWERS</button>) : ''}
        <br />
      </section>
    </div>
  );
}

export default QuestionListEntry;
