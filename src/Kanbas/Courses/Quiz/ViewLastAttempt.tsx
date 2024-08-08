import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import * as client from "./client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";

export default function ViewLastAttempt() {
  const { cid, qid } = useParams<{ cid: string, qid: string }>();
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState<any>(null);

  useEffect(() => {
    if (qid && currentUser?.username) {
      const fetchQuiz = async () => {
        try {
          const existingQuiz = await client.findQuizById(qid);
          if (existingQuiz) {
            setQuiz(existingQuiz);
            const userAttempt = existingQuiz.results.find((result: any) => result.username === currentUser.username);
            setAttempt(userAttempt || null);
            //setLoading(false);
          }
        } catch (error) {
          console.error('Error fetching quiz:', error);
          setError('Error fetching quiz');
          //setLoading(false);
        } finally {
          setLoading(false);
        }
      };
      fetchQuiz();
    }
  }, [qid, currentUser]);

  const formatDateTime = (date:any) => {
    if (!date) {
      return "N/A";
    }
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
      <div className="quiz-container">
        {/*<div className="quiz-header">*/}
        {/*  <h1>{quiz?.title}</h1>*/}
        {/*  <p>{quiz?.description}</p>*/}
        {/*  <div className="attempt-info">*/}
        {/*    <p><strong>Score:</strong> {attempt?.score}</p>*/}
        {/*    <p><strong>Attempts used:</strong> {attempt?.attempt}</p>*/}
        {/*    <p><strong>Max attempts allowed:</strong> {quiz?.howManyAttempts}</p>*/}
        {/*    <p><strong>Last submitted time:</strong> {formatDateTime(attempt?.submittedAt)}</p>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="quiz-header">
          <h1>{quiz?.title}</h1>
          <p>{quiz?.description}</p>
          <div className="attempt-info">
            <p><strong>Your Score:</strong> {attempt?.score}</p>
            <p><strong>Attempts used:</strong> {attempt?.attempt}</p>
            <p><strong>Max attempts allowed:</strong> {quiz?.howManyAttempts}</p>
            <p><strong>Last submitted time:</strong> {formatDateTime(attempt?.submittedAt)}</p>
          </div>
        </div>
        {attempt && quiz.questions.map((question: any, index: number) => (
            <div key={index} className="question-box mb-3">
              <div className="question-status">
                {attempt?.answers[index] === question.correctAnswer ? (
                    <FontAwesomeIcon icon={faCheckCircle} className="text-success"/>
                ) : (
                    <FontAwesomeIcon icon={faTimesCircle} className="text-danger"/>
                )}
              </div>
              <div className="question-header d-flex justify-content-between align-items-center">
                <div className="question-title">
                  <span className="question-index">{`Question ${index + 1}`}</span>
                </div>
                <div className="question-littleTitle">
                  <span className="question-little">{question.questionTitle}</span>
                </div>
                <div className="question-points">
                  {`${question.points} pts`}
                </div>
              </div>
              <hr/>
              <div className="question-content">
                <div className="question-text">{question.questionText}</div>
                <hr/>
                <div className="question-options">
                  {question.questionType === 'Fill In The Blank' ? (
                      <div className="fill-in-the-blank">
                        <input
                            type="text"
                            name={`question-${index}`}
                            value={attempt?.answers[index] || ''}
                            readOnly
                        />
                      </div>
                  ) : (
                      question.options.map((option: { optionText: string; isCorrect: boolean }, optIndex: number) => (
                          <div key={optIndex} className="option">
                            <input
                                type="radio"
                                name={`question-${index}`}
                                id={`option-${optIndex}`}
                                checked={attempt?.answers[index] === option.optionText}
                                readOnly
                            />
                            <label htmlFor={`option-${optIndex}`}>
                              {option.optionText}
                            </label>
                          </div>
                      ))
                  )}
                </div>
              </div>
              {/*！！！！！！！！！！！！！！这个之后要删除的！！！！！！！！！！！！！！！*/}
              <div><strong>Correct Answer:</strong> {question.correctAnswer}</div>
              {/*！！！！！！！！！！！！！！这个之后要删除的！！！！！！！！！！！！！！！*/}
              <hr/>
            </div>
        ))}
        <br/>
        <hr/>
        <div className="quiz-footer text-right">
          <button className="btn btn-danger" onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
  );
}
