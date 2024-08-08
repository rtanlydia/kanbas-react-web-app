import React, { useState, useEffect } from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import * as client from './client';
import {useSelector} from "react-redux";

export default function QuizDetail() {
  const { cid, qid } = useParams<{ cid: string, qid: string }>();
  const navigate = useNavigate();
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const [quiz, setQuiz] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (qid && currentUser?.username) {
      const fetchQuiz = async () => {
        try {
          const existingQuiz = await client.findQuizById(qid);
          if (existingQuiz) {
            setQuiz(existingQuiz);
            const userAttempt = existingQuiz.results.find((result: any) => result.username === currentUser.username);
            setAttempt(userAttempt || null);
          }
        } catch (error) {
          console.error('Error fetching quiz:', error);
          setError('Error fetching quiz');
        } finally {
          setLoading(false);
        }
      };
      fetchQuiz();
    }
  }, [qid, currentUser]);

  const handleEdit = () => {
    navigate(`/Kanbas/Courses/${cid}/QuizEditor/${qid}`);
  };

  const handleLastAttempt = () => {
    navigate(`/Kanbas/Courses/${cid}/QuizDetail/${qid}/ViewLastAttempt`);
  };
  const handlePreview = () => {
    navigate(`/Kanbas/Courses/${cid}/QuizDetail/${qid}/TakeQuiz`);
  };

  const handleTakeQuiz = () => {
    if (attempt && attempt.attempt >= quiz.howManyAttempts) {
      alert('You have reached the maximum number of attempts for this quiz.');
    } else {
      navigate(`/Kanbas/Courses/${cid}/QuizDetail/${qid}/TakeQuiz`);
    }
  };

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

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
      <div className="container mt-4">
        <div>
          <div style={{textAlign: 'center'}}>
            <div>
              {currentUser?.role === 'FACULTY' ? (
                <button className="btn btn-danger me-2" onClick={handlePreview}>Preview</button>
              ) : (
                <button className="btn btn-danger me-2" onClick={handleTakeQuiz}>Take Quiz</button>
              )}
              {currentUser?.role === 'FACULTY' && (
                <button className="btn btn-secondary me-2" onClick={handleEdit}>Edit</button>
              )}
              <button className="btn btn-secondary" onClick={handleLastAttempt}>Check Your Last Attempt</button>
            </div>
          </div>
          <hr/>

        </div>
        <div className="d-flex justify-content-between">
          <h1>{quiz.title}</h1>
        </div>
        <br/>
        <div className="row">
          <div className="col-md-4 text-end">
            <p><strong>Quiz Type:</strong> {quiz.quizType}</p>
            <p><strong>Points:</strong> {quiz.points}</p>
            <p><strong>Assignment Group:</strong> {quiz.assignmentGroup}</p>
            <p><strong>Shuffle Answers:</strong> {quiz.shuffleAnswers ? 'No' : 'Yes'}</p>
            <p><strong>Time Limit:</strong> {quiz.timeLimit} Minutes</p>
            <p><strong>Multiple Attempts:</strong> {quiz.allowMultipleAttempts ? 'Yes' : 'No'}</p>
            <p><strong>How Many Attempts:</strong> {quiz.howManyAttempts}</p>
            <p><strong>Show Correct Answers:</strong> {formatDateTime(quiz.showCorrectAnswersDate)}</p>
            <p><strong>Access Code:</strong> {quiz.accessCode}</p>
            <p><strong>One Question at a Time:</strong> {quiz.oneQuestionAtATime ? 'Yes' : 'No'}</p>
            <p><strong>Webcam Required:</strong> {quiz.webcamRequired ? 'Yes' : 'No'}</p>
            <p><strong>Number of Questions:</strong> {quiz.numberOfQuestions}</p>
            <p><strong>Lock Questions After Answering:</strong> {quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No'}</p>
          </div>
        </div>
        <table className="table mt-4">
          <thead>
          <tr>
            <th>Due</th>
            <th>Available from</th>
            <th>Until</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{formatDateTime(quiz.dueDate)}</td>
            <td>{formatDateTime(quiz.availableFrom)}</td>
            <td>{formatDateTime(quiz.availableUntil)}</td>
          </tr>
          </tbody>
        </table>
      </div>
  );
}