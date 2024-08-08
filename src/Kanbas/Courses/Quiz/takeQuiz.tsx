import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import * as client from "./client";

export default function TakeQuiz() {
  const { cid, qid } = useParams<{ cid: string, qid: string }>();
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (qid) {
      const fetchQuiz = async () => {
        try {
          if (qid) {
            const existingQuiz = await client.findQuizById(qid);
            if (existingQuiz) {
              setQuiz(existingQuiz);
              setQuestions(existingQuiz.questions || []);
              // 初始化 answers 数组，所有问题的回答都为空字符串
              setAnswers(existingQuiz.questions.map(() => ""));
              setLoading(false);
            }
          }
        } catch (error) {
          console.error('Error fetching quiz:', error);
          setError('Error fetching quiz');
          setLoading(false);
        }
      };
      fetchQuiz();
    }
  }, [qid]);

  const handleAnswerChange = (questionIndex: number, value: string | number) => {
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = value.toString();
      return newAnswers;
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        username: currentUser.username,
        answers: answers,
      };
      await client.submitQuizAnswers(qid as string, payload);
      alert('Quiz submitted successfully!');
      navigate(-1);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Error submitting quiz.');
    }
  };

  const handleEdit = async () => {
    navigate(`/Kanbas/Courses/${cid}/QuizEditor/${qid}`);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>{quiz?.title}</h1>
        <p>{quiz?.description}</p>
      </div>
      {questions.map((question, index) => (
        <div key={index} className="question-box mb-3">
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
          <hr />
          <div className="question-content">
            <div className="question-text">{question.questionText}</div>
            <hr />
            <div className="question-options">
              {question.questionType === 'Fill In The Blank' ? (
                <div className="fill-in-the-blank">
                  <input
                    type="text"
                    name={`question-${index}`}
                    placeholder="Enter your answer here"
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  />
                </div>
              ) : (
                question.options.map((option: { optionText: string; isCorrect: boolean }, optIndex: number) => (
                  <div key={optIndex} className="option">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      id={`option-${optIndex}`}
                      onChange={() => handleAnswerChange(index, option.optionText)}
                    />
                    <label htmlFor={`option-${optIndex}`}>
                      {option.optionText} {option.isCorrect ? "(Correct)" : ""}
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>
          <div><strong>Correct Answer:</strong> {question.correctAnswer}</div>
          <hr />
        </div>
      ))}
      <div className="quiz-footer text-right">
        {currentUser?.role === 'FACULTY' && (
          <button className="btn btn-secondary me-2" onClick={handleEdit}>
            Keep Editing Quiz
          </button>
        )}
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit Quiz
        </button>
      </div>
    </div>
  );
}
