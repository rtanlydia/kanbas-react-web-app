import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as client from './client';

export default function QuizDetail() {
  const { cid, qid } = useParams<{ cid: string, qid: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        if (qid) { // Ensure qid is not undefined
          const existingQuiz = await client.findQuizById(qid);
          if (existingQuiz) {
            setQuiz(existingQuiz);
          }
        }
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };
    fetchQuiz();
  }, [qid]);

  const handleEdit = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`);
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
      <div className="container mt-4">
        <h1>{quiz.title}</h1>
        <p>{quiz.description}</p>
        <div className="row">
          <div className="col-md-6">
            <p>Quiz Type: {quiz.quizType}</p>
            <p>Points: {quiz.points}</p>
            <p>Assignment Group: {quiz.assignmentGroup}</p>
            <p>Shuffle Answers: {quiz.shuffleAnswers ? 'Yes' : 'No'}</p>
            <p>Time Limit: {quiz.timeLimit} Minutes</p>
            <p>Multiple Attempts: {quiz.multipleAttempts ? 'Yes' : 'No'}</p>
            <p>Show Correct Answers: {quiz.showCorrectAnswers}</p>
            <p>One Question at a Time: {quiz.oneQuestionAtATime ? 'Yes' : 'No'}</p>
            <p>Webcam Required: {quiz.webcamRequired ? 'Yes' : 'No'}</p>
            <p>Lock Questions After Answering: {quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No'}</p>
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
      </div>
  );
}
