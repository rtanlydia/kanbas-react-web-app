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

  const [quiz, setQuiz] = useState<any>({
    title: '',
    description: '',
    points: 0,
    quizType: 'Graded Quiz',
    assignmentGroup: 'Quizzes',
    shuffleAnswers: false,
    timeLimit: 20,
    multipleAttempts: false,
    showCorrectAnswers: '',
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
      [id]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setQuiz((prevQuiz: any) => ({
      ...prevQuiz,
      [id]: checked
    }));
  };

  const handleSave = async () => {
    try {
      if (isNewQuiz) {
        const createdQuiz = await client.createQuiz(cid as string, quiz);
        dispatch(addQuizzes(createdQuiz));
      } else {
        await client.updateQuiz({ ...quiz, _id: qid as string, course: cid });
        dispatch(updateQuizzes({ ...quiz, _id: qid as string, course: cid }));
      }
      navigate(`/Kanbas/Courses/${cid}/QuizDetail/${qid}`);
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
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
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
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
              <label htmlFor="quizType" className="form-label me-2 mb-0 col-md-2" style={{whiteSpace: 'nowrap'}}>
                Assignment Group
              </label>
              <select id="quizType" className="form-select" value={quiz.quizType} onChange={handleChange}
                      style={{flex: 0.341}}>
                <option value="Graded Quiz">Quizzes</option>
                <option value="Practice Quiz">Exams</option>
                <option value="Graded Survey">Assignments</option>
                <option value="Ungraded Survey">Project</option>
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
            <div className="mb-3">
              <label htmlFor="multipleAttempts" className="form-label me-2">Allow Multiple Attempts</label>
              <input id="multipleAttempts" className="form-check-input" type="checkbox" checked={quiz.multipleAttempts}
                     onChange={handleCheckboxChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="showCorrectAnswers" className="form-label me-2">Show Correct Answers</label>
              <input id="showCorrectAnswers" className="form-check-input ms-2" type="checkbox"
                     checked={quiz.showCorrectAnswers}
                     onChange={handleCheckboxChange}/>

              <div className="col-md-4">
                <input id="showCorrectAnswers" className="form-control" type="datetime-local"
                       value={quiz.showCorrectAnswers}
                       onChange={handleChange}/>
              </div>
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
            <div className="row mb-3">
              <div className="col-md-2">
                <label htmlFor="dueDate" className="form-label">Due Date</label>
              </div>
              <div className="col-md-4">
                <input id="dueDate" className="form-control" type="datetime-local" value={quiz.dueDate}
                       onChange={handleChange}/>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-2">
                <label htmlFor="availableFrom" className="form-label">Available From</label>
              </div>
              <div className="col-md-4">
                <input id="availableFrom" className="form-control" type="datetime-local" value={quiz.availableFrom}
                       onChange={handleChange}/>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-2">
                <label htmlFor="availableUntil" className="form-label">Available Until</label>
              </div>
              <div className="col-md-4">
                <input id="availableUntil" className="form-control" type="datetime-local" value={quiz.availableUntil}
                       onChange={handleChange}/>
              </div>
            </div>
          </Tab>
          <Tab eventKey="questions" title="Questions">
            <div>
              {questions.map((question, index) => (
                  <div key={index} className="mb-3">
                    {question.editMode ? (
                        <div>
                          <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                              {question.type}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => handleQuestionChange(index, 'type', 'Multiple Choice')}>Multiple Choice</Dropdown.Item>
                              <Dropdown.Item onClick={() => handleQuestionChange(index, 'type', 'True/False')}>True/False</Dropdown.Item>
                              <Dropdown.Item onClick={() => handleQuestionChange(index, 'type', 'Fill in Multiple Blanks')}>Fill in Multiple Blanks</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>


                          <Dropdown.Item onClick={() => navigate(`/Kanbas/Courses/${cid}/QuestionEditor/${quiz._id}`)}>
                            <FaEdit className="me-2"/> questionEditor
                          </Dropdown.Item>


                          <Button variant="danger" className="mt-2" onClick={() => handleSaveQuestion(index)}>Save</Button>
                          <Button variant="secondary" className="mt-2 ms-2" onClick={() => handleCancelQuestion(index)}>Cancel</Button>
                        </div>
                    ) : (
                        <div className="d-flex justify-content-between align-items-center">
                          <div>{question.text} ({question.type})</div>
                          <Button variant="secondary" onClick={() => handleEditQuestion(index)}>Edit</Button>
                        </div>
                    )}
                  </div>
              ))}
            </div>
            <div className="mb-3 text-center">
              <Button variant="secondary" onClick={() => navigate(`/Kanbas/Courses/${cid}/QuestionEditor/${quiz._id}`)}>
                + New Question</Button>
            </div>
          </Tab>
        </Tabs>
        <hr/>
        <div className="d-flex justify-content-end">
          <button className="btn btn-secondary me-2" onClick={handleCancel}>Cancel</button>
          <button className="btn btn-danger me-2" onClick={handleSaveAndPublish}>Save and Publish</button>
          <button className="btn btn-danger" onClick={handleSave}>Save</button>
        </div>
      </div>
  );
}

