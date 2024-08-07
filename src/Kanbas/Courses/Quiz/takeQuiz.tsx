// src/components/takeQuiz.tsx

import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import * as client from "./client";

// 定义问题和选项的类型
interface Option {
  optionText: string;
  isCorrect: boolean;
}

interface Question {
  questionText: string;
  questionType: string;
  questionTitle?: string;
  options: Option[];
  correctAnswer?: string;
  points?: number;
}

interface Quiz {
  title: string;
  course: string;
  description: string;
  quizType: string;
  assignmentGroup: string;
  allowMultipleAttempts: boolean;
  howManyAttempts: number;
  shuffleAnswers: boolean;
  showCorrectAnswers: boolean;
  showCorrectAnswersDate: Date | null;
  timeLimit: number;
  accessCode: string | null;
  oneQuestionAtaTime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  availableFrom: Date | null;
  availableUntil: Date | null;
  dueDate: Date | null;
  points: number;
  numberOfQuestions: number;
  score: number | null;
  questions: Question[];
}

export default function TakeQuiz() {
  const { cid, qid } = useParams<{ cid: string, qid: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (qid) {
      const fetchQuiz = async () => {
        try {
          if (qid) {
            const existingQuiz = await client.findQuizById(qid);
            if (existingQuiz) {
              setQuiz(existingQuiz);
              setQuestions(existingQuiz.questions || []);
            }
          }
        } catch (error) {
          console.error('Error fetching quiz:', error);
        }
      };
      fetchQuiz();
    }
  }, [qid]);

  return (
    <div>
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
          <hr/>
          <div className="question-content">
            <div className="question-text">{question.questionText}</div>
            <hr/>
            <div className="question-options">
              {question.options.map((option: { optionText: string; isCorrect: boolean }, optIndex: number) => (
                <div key={optIndex} className="option">
                  <input type="radio" name={`question-${index}`} id={`option-${optIndex}`}/>
                  <label htmlFor={`option-${optIndex}`}>
                    {option.optionText} {option.isCorrect ? "(Correct)" : ""}
                  </label>
                </div>
              ))}

            </div>
          </div>
          <div><strong>Correct Answer:</strong> {question.correctAnswer}</div>
          <hr/>
        </div>
      ))}
    </div>
  );
}
