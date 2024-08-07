import React, { useState, useEffect } from 'react';
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { updateQuizzes } from "./reducer";

function QuestionEditor() {
  const [points, setPoints] = useState(0);
  const [questionText, setQuestionText] = useState('');
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionType, setQuestionType] = useState('Multiple Choice');
  const [choices, setChoices] = useState([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false }
  ]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [quiz, setQuiz] = useState<any>(null);
  const navigate = useNavigate();
  const { cid, qid, questionId } = useParams<{ cid: string, qid: string, questionId: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (qid) {
      const fetchQuiz = async () => {
        try {
          const fetchedQuiz = await client.findQuizById(qid);
          setQuiz(fetchedQuiz);

          if (questionId) {
            const question = fetchedQuiz.questions.find((q: any) => q._id === questionId);
            if (question) {
              setQuestionTitle(question.questionTitle);
              setPoints(question.points);
              setQuestionText(question.questionText);
              setQuestionType(question.questionType);
              setChoices(question.options.map((option: any) => ({
                text: option.optionText,
                isCorrect: option.isCorrect
              })));
              setCorrectAnswer(question.correctAnswer);
            }
          } else {
            setQuestionTitle('');
            setPoints(0);
            setQuestionText('New Question');
            setQuestionType('Multiple Choice');
            setChoices([
              { text: 'Default1', isCorrect: true },
              { text: 'Default2', isCorrect: false },
              { text: 'Default3', isCorrect: false },
              { text: 'Default4', isCorrect: false }
            ]);
            setCorrectAnswer('Default1');
          }
        } catch (error) {
          console.error('Error fetching quiz:', error);
        }
      };

      fetchQuiz();
    }
  }, [qid, questionId]);


  const handleChoiceChange = (index: number, text: string, isCorrect: boolean) => {
    const newChoices = choices.map((choice, i) =>
      i === index ? { ...choice, text, isCorrect } : { ...choice, isCorrect: false }
    );
    setChoices(newChoices);
  };




  const handleAddChoice = () => {
    setChoices([...choices, { text: '', isCorrect: false }]);
  };

  const handleRemoveChoice = (index: number) => {
    setChoices(choices.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/QuizEditor/${qid}`);
  };

  const handleSave = async () => {
    if (quiz) {
      const questionData = {
        questionText: questionText,
        questionTitle,
        points,
        questionType,
        options: choices.map((choice) => ({
          optionText: choice.text,
          isCorrect: choice.isCorrect,
        })),
        correctAnswer: correctAnswer
      };

      try {
        let updatedQuestions;
        if (questionId) {
          updatedQuestions = quiz.questions.map((q: any) =>
            q._id === questionId ? { ...q, ...questionData } : q
          );
        } else {
          updatedQuestions = [...quiz.questions, questionData];
        }

        const updatedQuiz = {
          ...quiz,
          questions: updatedQuestions
        };

        await client.updateQuiz(updatedQuiz);
        dispatch(updateQuizzes(updatedQuiz));

        setQuiz(updatedQuiz);

        if (!questionId) {
          const newQuestionId = updatedQuiz.questions[updatedQuiz.questions.length - 1]._id;
          navigate(`/Kanbas/Courses/${cid}/QuizEditor/${qid}/${newQuestionId}`);
        } else {
          navigate(`/Kanbas/Courses/${cid}/QuizEditor/${qid}`);
        }
      } catch (error) {
        console.error('Error saving question:', error);
      }
    }
  };


  const renderAnswersSection = () => {
    switch (questionType) {
      case 'Multiple Choice':
        return (
          <div>
            <h5 style={{ fontWeight: 'bold' }}>Answer:</h5>
            {choices.map((choice, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ marginRight: '10px', marginLeft: '50px', fontSize: '20px', marginTop: '20px' }}>Possible Answer</span>
                <input
                  type="text"
                  value={choice.text}
                  onChange={(e) => handleChoiceChange(index, e.target.value, choice.isCorrect)}
                  style={{ flex: 1, marginRight: '10px', fontSize: '20px', marginTop: '20px' }}
                />
                <input
                  type="radio"
                  name="multiple-choice"
                  checked={choice.isCorrect}
                  onChange={() => handleChoiceChange(index, choice.text, true)}
                  style={{ marginLeft: '10px', marginTop: '20px' }}
                />
                <label style={{ marginLeft: '5px', marginTop: '20px' }}>Correct</label>
                <CiEdit className="alert-primary" onClick={handleSave} style={{ marginLeft: '10px', marginTop: '20px' }} />
                <GoTrash className="alert-primary" onClick={() => handleRemoveChoice(index)} style={{ marginLeft: '10px', marginTop: '20px' }} />
              </div>
            ))}
            <button
              onClick={handleAddChoice}
              style={{
                color: '#d61a1a',
                fontSize: '20px',
                marginTop: '40px',
                marginLeft: '420px',
                border: 'none',
                background: 'none',
                cursor: 'pointer'
              }}
            >
              + Add Another Answer
            </button>
          </div>
        );


      case 'True/False':
        return (
          <div>
            <h5 style={{ fontWeight: 'bold' }}>Answer:</h5>
            <div>
              <label style={{ fontSize: '20px', marginTop: '10px' }}>
                <input
                  type="radio"
                  name="true-false"
                  value="true"
                  checked={choices[0].isCorrect}
                  onChange={() => setChoices([{ text: 'True', isCorrect: true }, { text: 'False', isCorrect: false }])}
                  style={{ marginRight: '10px', marginTop: '20px' }}
                />
                True
              </label>
            </div>
            <div>
              <label style={{ fontSize: '20px', marginTop: '10px' }}>
                <input
                  type="radio"
                  name="true-false"
                  value="false"
                  checked={!choices[0].isCorrect}
                  onChange={() => setChoices([{ text: 'True', isCorrect: false }, { text: 'False', isCorrect: true }])}
                  style={{ flex: 1, marginRight: '10px', fontSize: '20px', marginTop: '20px' }}
                />
                False
              </label>
            </div>
          </div>
        );
      case 'Fill In The Blank':
        return (
          <div>
            <h5 style={{ fontWeight: 'bold' }}>Answer:</h5>
            {choices.map((choice, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ marginRight: '10px', marginLeft: '50px', fontSize: '20px', marginTop: '20px' }}>Possible Answer</span>
                <input
                  type="text"
                  value={choice.text}
                  onChange={(e) => handleChoiceChange(index, e.target.value, true)}
                  style={{ flex: 1, marginRight: '10px', fontSize: '20px', marginTop: '20px' }}
                />
                <GoTrash className="alert-primary" onClick={() => handleRemoveChoice(index)} style={{ marginLeft: '120px', marginTop: '20px' }} />
              </div>
            ))}
            <button
              onClick={handleAddChoice}
              style={{
                color: '#d61a1a',
                fontSize: '20px',
                marginTop: '40px',
                marginLeft: '420px',
                border: 'none',
                background: 'none',
                cursor: 'pointer'
              }}
            >
              + Add Another Answer
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'white', padding: '20px' }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '700px',
        width: '100%'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '20px', fontWeight: 'bold', marginRight: '10px' }}>Title:</label>
          <input
            type="text"
            placeholder="Easy Question"
            style={{ padding: '5px', fontSize: '20px', flex: '1' }}
            value={questionTitle}
            onChange={(e) => setQuestionTitle(e.target.value)}
          />
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            style={{ padding: '9px', fontSize: '20px', flex: '1' }}
          >
            <option value="Multiple Choice">Multiple Choice</option>
            <option value="True/False">True/False</option>
            <option value="Fill In The Blank">Fill In The Blank</option>
          </select>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: '1' }}>
            <span style={{ padding: '5px', fontSize: '20px', fontWeight: 'bold' }}>pts:</span>
            <input
              type="number"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              style={{ padding: '5px', fontSize: '20px', width: '60px' }}
            />
          </div>
        </div>
        <hr />
        <div>
          <h6>Enter your question details, then set the correct answer.</h6>
          <h5 style={{ fontWeight: 'bold' }}>Question:</h5>
          <label>
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              style={{
                width: '270%',
                marginBottom: '10px',
                height: '100px',
                fontSize: '20px',
                resize: 'none',
                boxSizing: 'border-box',
                padding: '10px'
              }}
            />
          </label>
        </div>
        <div>
          <h5 style={{ fontWeight: 'bold' }}>Correct Answer:</h5>
          <input
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            style={{
              width: '99%',
              marginBottom: '10px',
              height: '50px',
              fontSize: '20px',
              resize: 'none',
              boxSizing: 'border-box',
              padding: '10px'
            }}
          />
        </div>
        {renderAnswersSection()}
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={handleCancel} style={{
            backgroundColor: 'lightgray',
            color: 'black',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '4px',
            marginRight: '10px',
            fontSize: '20px'
          }}>Cancel
          </button>
          <button onClick={handleSave} style={{
            backgroundColor: '#d61a1a',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '20px'
          }}>Save Question
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionEditor;
