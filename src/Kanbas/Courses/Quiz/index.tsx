import React, { useState, useEffect } from 'react';
import { FaSearch, FaCheckCircle, FaEllipsisV, FaTrash, FaEdit, FaUpload, FaDownload } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsGripVertical } from "react-icons/bs";
import { HiOutlinePlus } from "react-icons/hi2";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import "./index.css";
import { MdAssignmentAdd } from "react-icons/md";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {setQuizzes, addQuizzes, deleteQuizzes, updateQuizzes} from './reducer';
import * as client from './client';
import Dropdown from 'react-bootstrap/Dropdown';

interface Attempt {
  username: string;
  score: number;
  attempt: number;
}

interface Quiz {
  _id: string;
  title: string;
  course: string;
  availableFrom?: Date;
  availableUntil?: Date;
  dueDate?: Date;
  points?: number;
  numberOfQuestions?: number;
  results: Attempt[];
  userScore?: number | null;
  publishStatus: false;
}


export default function Quizzes() {
  const { cid } = useParams<{ cid: string }>();
  const [quizName, setQuizName] = useState("");
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizzes: Quiz[] = await client.findQuizzesForCourse(cid as string);
      const quizzesWithUserScore = await Promise.all(
        quizzes.map(async (quiz:any) => {
          const userAttempt = quiz.results.find((result: any) => result.username === currentUser.username);
          return {
            ...quiz,
            userScore: userAttempt ? userAttempt.score : null,
          };
        })
      );
      dispatch(setQuizzes(quizzesWithUserScore));
    };
    fetchQuizzes();
  }, [cid, dispatch, currentUser.username]);


  const addQuiz = async () => {
    const newQuiz = { title: quizName, course: cid };
    const createdQuiz = await client.createQuiz(cid as string, newQuiz);
    dispatch(addQuizzes(createdQuiz));
    setQuizName("");
  };

  const deleteQuizById = async (quizId: string) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await client.deleteQuiz(quizId);
      dispatch(deleteQuizzes(quizId));
    }
  };

  const handlePublish = async (quizId: string) => {
    try {
      const updatedQuiz = await client.publishQuiz(quizId, true);
      dispatch(updateQuizzes(updatedQuiz));
    } catch (error) {
      console.error('Error publishing quiz:', error);
    }
  };

  const handleUnpublish = async (quizId: string) => {
    try {
      const updatedQuiz = await client.publishQuiz(quizId, false);
      dispatch(updateQuizzes(updatedQuiz));
    } catch (error) {
      console.error('Error unpublishing quiz:', error);
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

  const getQuizStatus = (quiz:any) => {
    const now = new Date();
    const availableFrom = quiz.availableFrom ? new Date(quiz.availableFrom) : null;
    const availableUntil = quiz.availableUntil ? new Date(quiz.availableUntil) : null;
    if (availableFrom && now < availableFrom) {
      return `Not available until ${formatDateTime(availableFrom)}`;
    }

    if (availableUntil && now > availableUntil) {
      return 'Closed';
    }

    if (availableFrom && availableUntil && now >= availableFrom && now <= availableUntil) {
      return `Available until ${formatDateTime(availableUntil)}`;
    }
    return 'Status unknown';
  };

  const publishQuiz = async (quizId: string, publish: boolean) => {
    // Implement your publish/unpublish logic here
    // Example: await client.publishQuiz(quizId, publish);
  };
  //const quizStatus = getQuizStatus(quiz);

  return (
      <div id="wd-quizzes" className="container mt-4">
        <div className="d-flex justify-content-between mb-3">
          <div className="input-group w-50">
            <span className="input-group-text"><FaSearch/></span>
            <input id="wd-search-quiz" className="form-control" placeholder="Search for Quiz" />
          </div>
          <div className="custom-button">
            <button id="wd-add-quiz" className="btn btn-danger" onClick={addQuiz}>
              <HiOutlinePlus className="me-1" style={{fontSize: '25px'}}/> <strong>Quiz</strong>
            </button>
          </div>
        </div>
        <div className="wd-title p-3 ps-2 bg-secondary">
          <BsGripVertical className="me-1 fs-3"/>
          <button className="btn-no-border ms-2"><TbTriangleInvertedFilled style={{fontSize: '8px'}} className="me-2"/></button>
          <strong className="me-auto align-text-top">Quizzes</strong>
        </div>
        <ul id="wd-quiz-list" className="list-group">
          {quizzes.filter((quiz: any) => quiz.course === cid).map((quiz: any) => (
              <li key={quiz._id} className="wd-title wd-quiz-list-item list-group-item d-flex justify-content-between align-items-center with-border-left">
                <div className="d-flex align-items-center">
                  <div className="border-start border-success border-3 me-0" style={{height: '100%'}}></div>
                  <BsGripVertical className="me-2 text-muted" style={{fontSize: '25px'}}/>
                  <MdAssignmentAdd className="me-3 custom-text-color-quiz-icon" style={{fontSize: '20px'}}/>
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-center">
                      {currentUser.role === 'STUDENT' && !quiz.publishStatus ? (
                        <span className="wd-quiz-link fw-bold me-2 custom-text-color2">{quiz.title}</span>
                      ) : (
                        <Link className="wd-quiz-link fw-bold me-2 custom-text-color2 no-underline" to={`/Kanbas/Courses/${cid}/QuizDetail/${quiz._id}`}>
                          {quiz.title}
                        </Link>
                      )}
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="custom-text-color-multiple-module me-2">Multiple Modules</span>
                      <span className="text-muted me-2">|</span>
                      {/*<span className="text-muted"><span className="fw-bold">Available until</span> {quiz.availableUntil || 'N/A'}</span>*/}
                      <span className="text-muted">{getQuizStatus(quiz)}</span>
                    </div>
                    <div className="small text-muted mt-1">
                      <span className="fw-bold">Due</span> {formatDateTime(quiz.dueDate) || 'N/A'} | {quiz.points || 100} pts | {quiz.questions.length} Questions
                      {currentUser.role === 'STUDENT' && quiz.userScore !== null && (
                        <>
                          <span className="ms-1">| Your Score</span> {quiz.userScore}/{quiz.points}pts
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <FaCheckCircle className={`me-3 ${quiz.publishStatus ? 'text-success' : 'text-muted'}`} />
                  {currentUser.role === 'FACULTY' && (
                    <Dropdown>
                      <Dropdown.Toggle variant="link" bsPrefix="p-0">
                        <FaEllipsisV className="text-muted"/>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => navigate(`/Kanbas/Courses/${cid}/QuizEditor/${quiz._id}`)}>
                          <FaEdit className="me-2"/> Edit
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => deleteQuizById(quiz._id)}>
                          <FaTrash className="me-2"/> Delete
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handlePublish(quiz._id)}>
                          <FaUpload className="me-2"/> Publish
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleUnpublish(quiz._id)}>
                          <FaDownload className="me-2"/> Unpublish
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
              </li>
          ))}
        </ul>
      </div>
  );
}

