import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addQuizzes, updateQuizzes } from './reducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as client from './client';
import { Tab, Tabs, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import {FaEdit} from "react-icons/fa";


export default function QuizEditor() {
  const { cid, qid } = useParams<{ cid: string, qid: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNewQuiz = qid === "new";
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [quiz, setQuiz] = useState<any>({
    title: '',
    description: '',
    points: 0,
    quizType: 'Graded Quiz',
    assignmentGroup: 'Quizzes',
    shuffleAnswers: false,
    timeLimit: 20,
    howManyAttempts: 1,
    numberOfQuestions: 10,
    allowMultipleAttempts: false,
    showCorrectAnswers: '',
    showCorrectAnswersDate: '',
    accessCode: '',
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: '',
    availableFrom: '',
    availableUntil: '',
    questions: []
  });

  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (!isNewQuiz && qid) {
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
  }, [qid, isNewQuiz]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setQuiz((prevQuiz: any) => ({
      ...prevQuiz,
      [id]: value,
    }));
  };


  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setQuiz((prevQuiz: any) => ({
      ...prevQuiz,
      [id]: checked,
      howManyAttempts: checked ? (prevQuiz.howManyAttempts || 1) : 1
    }));
  };

  const handleSave = async () => {
    try {
      const quizToSave = { ...quiz, questions };
      console.log('Saving quiz:', quizToSave);
      if (isNewQuiz) {
        const createdQuiz = await client.createQuiz(cid as string, quizToSave);
        console.log('Created quiz:', createdQuiz);
        dispatch(addQuizzes(createdQuiz));
        navigate(`/Kanbas/Courses/${cid}/QuizDetail/${createdQuiz._id}`);
      } else {
        const updatedQuiz = await client.updateQuiz({ ...quizToSave, _id: qid as string, course: cid });
        console.log('Updated quiz:', updatedQuiz);
        dispatch(updateQuizzes(updatedQuiz));
        navigate(`/Kanbas/Courses/${cid}/QuizDetail/${qid}`);
      }
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };



  const getQuizStatus = (quiz:any) => {
    const now = new Date();

    if (quiz.availableFrom && now < quiz.availableFrom) {
      return `Not available until ${quiz.availableFrom.toLocaleString()}`;
    }

    if (quiz.availableUntil && now > quiz.availableUntil) {
      return 'Closed';
    }

    if (quiz.availableFrom && quiz.availableUntil && now >= quiz.availableFrom && now <= quiz.availableUntil) {
      return `Available until ${quiz.availableUntil.toLocaleString()}`;
    }
    return 'Status unknown';
  };

  const handleSaveAndPublish = async () => {
    try {
      if (isNewQuiz) {
        const createdQuiz = await client.createQuiz(cid as string, quiz);
        dispatch(addQuizzes(createdQuiz));
        // Add publish logic
      } else {
        await client.updateQuiz({ ...quiz, _id: qid as string, course: cid });
        dispatch(updateQuizzes({ ...quiz, _id: qid as string, course: cid }));
        // Add publish logic
      }
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error('Error saving and publishing quiz:', error);
    }
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const handleCancelQuestionEditor = () => {
    navigate(`/Kanbas/Courses/${cid}/QuizDetail/${qid}`);
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

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { type: 'Multiple Choice', text: '', options: [], points: 0, editMode: true }]);
  };

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const updatedQuestions = questions.map((question, i) =>
        i === index ? { ...question, [field]: value } : question
    );
    setQuestions(updatedQuestions);
  };

  const handleEditQuestion = (index: number) => {
    const updatedQuestions = questions.map((question, i) =>
        i === index ? { ...question, editMode: true } : question
    );
    setQuestions(updatedQuestions);
  };

  const handleSaveQuestion = (index: number) => {
    const updatedQuestions = questions.map((question, i) =>
        i === index ? { ...question, editMode: false } : question
    );
    setQuestions(updatedQuestions);
  };

  const handleCancelQuestion = (index: number) => {
    const updatedQuestions = questions.map((question, i) =>
      i === index ? { ...question, editMode: false } : question
    );
    setQuestions(updatedQuestions);
  };

  const handleAttemptsChange = (event:any) => {
    const { value } = event.target;
    setQuiz((prevQuiz:any) => ({
      ...prevQuiz,
      howManyAttempts: parseInt(value, 10) || 1
    }));
  };

  const handleAddNewQuestion = async () => {
    const newQuestion = {
      questionText: 'New Question',
      questionType: 'Multiple Choice',
      questionTitle: '',
      points: 0,
      options: [
        { optionText: '', isCorrect: false },
        { optionText: '', isCorrect: false },
        { optionText: '', isCorrect: false },
        { optionText: '', isCorrect: false }
      ],
      correctAnswer: ''
    };

    try {
      const updatedQuiz = await client.addQuestionToQuiz(qid as string, newQuestion);

      dispatch(updateQuizzes(updatedQuiz));

      setQuiz((prevQuiz: any) => ({
        ...prevQuiz,
        questions: [...prevQuiz.questions, newQuestion]
      }));

      setQuestions((prevQuestions: any) => [
        ...prevQuestions,
        newQuestion
      ]);
    } catch (error) {
      console.error('Error adding new question:', error);
    }
  };





  return (
      <div id="wd-quizzes-editor" className="container mt-4">
        <Tabs defaultActiveKey="details" id="quiz-editor-tabs" className="mb-3">
          <Tab eventKey="details" title="Details">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Quiz Name</label>
              <input id="title" className="form-control" value={quiz.title} onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Quiz Instructions</label>
              <textarea id="description" className="form-control" rows={6} value={quiz.description}
                        onChange={handleChange}/>
            </div>


            <div className="mb-3 d-flex align-items-center">
              <label htmlFor="quizType" className="form-label me-2 mb-0 col-md-2" style={{whiteSpace: 'nowrap'}}>Quiz
                Type</label>
              <select id="quizType" className="form-select" value={quiz.quizType} onChange={handleChange}
                      style={{flex: 0.341}}>
                <option value="Graded Quiz">Graded Quiz</option>
                <option value="Practice Quiz">Practice Quiz</option>
                <option value="Graded Survey">Graded Survey</option>
                <option value="Ungraded Survey">Ungraded Survey</option>
              </select>
            </div>

            <div className="mb-3 d-flex align-items-center">
              <label htmlFor="assignmentGroup" className="form-label me-2 mb-0 col-md-2" style={{whiteSpace: 'nowrap'}}>
                Assignment Group
              </label>
              <select id="assignmentGroup" className="form-select" value={quiz.assignmentGroup} onChange={handleChange}
                      style={{flex: 0.341}}>
                <option value="Quizzes">Quizzes</option>
                <option value="Exams">Exams</option>
                <option value="Assignments">Assignments</option>
                <option value="Project">Project</option>
              </select>
            </div>

            <div className="row mb-3">
              <div className="col-md-2">
                <label htmlFor="points" className="form-label">Points</label>
              </div>
              <div className="col-md-4">
                <input id="points" className="form-control" type="number" value={quiz.points} onChange={handleChange}/>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="shuffleAnswers" className="form-label me-2">Shuffle Answers</label>
              <input id="shuffleAnswers" className="form-check-input ms-2" type="checkbox" checked={quiz.shuffleAnswers}
                     onChange={handleCheckboxChange}/>
            </div>
            <div className="row mb-3">
              <div className="col-md-2">
                <label htmlFor="timeLimit" className="form-label">Time Limit</label>
              </div>
              <div className="col-md-4">
                <input id="timeLimit" className="form-control" type="number" value={quiz.timeLimit}
                       onChange={handleChange}/>
              </div>
            </div>
            {/*<div className="mb-3">*/}
            {/*  <label htmlFor="multipleAttempts" className="form-label me-2">Allow Multiple Attempts</label>*/}
            {/*  <input id="multipleAttempts" className="form-check-input" type="checkbox" checked={quiz.allowMultipleAttempts}*/}
            {/*         onChange={handleCheckboxChange}/>*/}
            {/*</div>*/}
            <div className="mb-3">
              <label htmlFor="allowMultipleAttempts" className="form-label me-2">Allow Multiple Attempts</label>
              <input id="allowMultipleAttempts" className="form-check-input" type="checkbox" checked={quiz.allowMultipleAttempts}
                     onChange={handleCheckboxChange} />
            </div>

            {quiz.allowMultipleAttempts && (
              <div className="mb-3">
                <label htmlFor="allowMultipleAttempts" className="form-label me-2">How many Attempts</label>
                <input id="allowMultipleAttempts" className="form-control" type="number" min="1" value={quiz.howManyAttempts}
                       onChange={handleAttemptsChange} />
              </div>
            )}
            <div className="mb-3">
              <div className="form-check">
                <input id="showCorrectAnswers" className="form-check-input" type="checkbox"
                       checked={quiz.showCorrectAnswers}
                       onChange={handleCheckboxChange}/>
                <label htmlFor="showCorrectAnswers" className="form-check-label ms-2">Show Correct Answers</label>
              </div>

              {quiz.showCorrectAnswers && (
                <div className="mt-3">
                  <label htmlFor="showCorrectAnswersDate" className="form-label">Show Correct Answers Date</label>
                  <div className="d-flex align-items-center">
                    <span className="me-3">{formatDateTime(quiz.showCorrectAnswersDate)}</span>
                    <input id="showCorrectAnswersDate" className="form-control" type="datetime-local"
                           value={quiz.showCorrectAnswersDate || ""}
                           onChange={handleChange} style={{maxWidth: '250px'}}/>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="accessCode" className="form-label">Access Code</label>
              <input id="accessCode" className="form-control" type="text" value={quiz.accessCode}
                     onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="oneQuestionAtATime" className="form-label me-2">One Question at a Time</label>
              <input id="oneQuestionAtATime" className="form-check-input" type="checkbox"
                     checked={quiz.oneQuestionAtATime} onChange={handleCheckboxChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="webcamRequired" className="form-label me-2">Webcam Required</label>
              <input id="webcamRequired" className="form-check-input" type="checkbox" checked={quiz.webcamRequired}
                     onChange={handleCheckboxChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="lockQuestionsAfterAnswering" className="form-label me-2">Lock Questions After
                Answering</label>
              <input id="lockQuestionsAfterAnswering" className="form-check-input" type="checkbox"
                     checked={quiz.lockQuestionsAfterAnswering} onChange={handleCheckboxChange}/>
            </div>
            <div className="row mb-3 align-items-center">
              <div className="col-md-2">
                <label htmlFor="dueDate" className="form-label">Due Date</label>
              </div>
              <div className="col-md-3">
                <td>{formatDateTime(quiz.dueDate)}</td>
              </div>
              <div className="col-md-5">
                <input id="dueDate" className="form-control" type="datetime-local" value={quiz.dueDate}
                       onChange={handleChange}/>
              </div>
            </div>
            <div className="row mb-3 align-items-center">
              <div className="col-md-2">
                <label htmlFor="availableFrom" className="form-label">Available From</label>
              </div>
              <div className="col-md-3">
                <td>{formatDateTime(quiz.availableFrom)}</td>
              </div>
              <div className="col-md-5">
                <input id="availableFrom" className="form-control" type="datetime-local" value={quiz.availableFrom}
                       onChange={handleChange}/>
              </div>
            </div>
            <div className="row mb-3 align-items-center">
              <div className="col-md-2">
                <label htmlFor="availableUntil" className="form-label">Available Until</label>
              </div>
              <div className="col-md-3">
                <td>{formatDateTime(quiz.availableUntil)}</td>
              </div>
              <div className="col-md-5">
                <input id="availableUntil" className="form-control" type="datetime-local" value={quiz.availableUntil}
                       onChange={handleChange}/>
              </div>
            </div>
          </Tab>
          <Tab eventKey="questions" title="Questions">
            {/*<div>*/}
            {/*  {questions.map((question, index) => (*/}
            {/*    <div key={index} className="mb-3">*/}
            {/*      <div className="d-flex justify-content-between align-items-center">*/}
            {/*        <div>*/}
            {/*          <span className="me-2">{index + 1}.</span>*/}
            {/*          <div><strong>Question Text:</strong> {question.questionText}</div>*/}
            {/*          <div><strong>Question Type:</strong> {question.questionType}</div>*/}
            {/*          <div><strong>Points:</strong> {question.points}</div>*/}
            {/*          <div>*/}
            {/*            <strong>Options:</strong>*/}
            {/*            <ul>*/}
            {/*              {question.options.map((option:any, optIndex:any) => (*/}
            {/*                <li key={optIndex}>*/}
            {/*                  {option.optionText} {option.isCorrect ? "(Correct)" : ""}*/}
            {/*                </li>*/}
            {/*              ))}*/}
            {/*            </ul>*/}
            {/*          </div>*/}
            {/*          <div><strong>Correct Answer:</strong> {question.correctAnswer}</div>*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*          <Button variant="secondary" className="me-2" onClick={() => navigate(`/Kanbas/Courses/${cid}/QuestionEditor/${quiz._id}/${question._id}`)}>Edit</Button>*/}
            {/*          <Button variant="danger" onClick={() => handleDeleteQuestion(index)}>Delete</Button>*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  ))}*/}
            {/*</div>*/}


            <div>
              {questions.map((question, index) => (
                  <div key={index} className="question-box mb-3">
                    <div className="question-header d-flex justify-content-between align-items-center">
                      <div className="question-title">
                        <span className="question-index">{`Question ${index + 1}`}</span>
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
                        {question.options.map((option: { optionText: React.ReactNode; }, optIndex: string | number | bigint | null | undefined) => (
                            <div key={optIndex} className="option">
                              <input type="radio" name={`question-${index}`} id={`option-${optIndex}`}/>
                              <label htmlFor={`option-${optIndex}`}>{option.optionText}</label>
                            </div>
                        ))}
                      </div>
                    </div>
                    <hr/>
                    <div className="question-actions d-flex justify-content-end">
                      <Button
                          variant="secondary"
                          className="me-2"
                          onClick={() => navigate(`/Kanbas/Courses/${cid}/QuestionEditor/${quiz._id}/${question._id}`)}
                      >
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => handleDeleteQuestion(index)}>
                        Delete
                      </Button>
                    </div>
                  </div>
              ))}
            </div>


            <div className="mb-3 text-center">
              <Button variant="secondary" onClick={() => handleAddNewQuestion()}>
                + New Question</Button>
            </div>
            {/*<div className="mb-3 text-center">*/}
            {/*  <Button variant="secondary" onClick={() => navigate(`/Kanbas/Courses/${cid}/QuestionEditor/${quiz._id}/addNewQuestion`)}>*/}
            {/*    + New Question</Button>*/}
            {/*</div>*/}
          </Tab>
        </Tabs>
        <hr/>
        <div className="d-flex justify-content-end">
          <button className="btn btn-secondary me-2" onClick={handleCancelQuestionEditor}>Cancel</button>
          <button className="btn btn-danger me-2" onClick={handleSaveAndPublish}>Save and Publish</button>
          <button className="btn btn-danger" onClick={handleSave}>Save</button>
        </div>
      </div>
  );
}

