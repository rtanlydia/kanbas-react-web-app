// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { addQuizzes, updateQuizzes } from './reducer';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css';
// import * as client from './client';
//
// export default function QuizEditor() {
//   const { cid, qid } = useParams<{ cid: string, qid: string }>();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isNewQuiz = qid === "new";
//
//   const [quiz, setQuiz] = useState<any>({
//     title: '',
//     description: '',
//     points: 100,
//     dueDate: '',
//     availableFrom: '',
//     availableUntil: ''
//   });
//
//   useEffect(() => {
//     if (!isNewQuiz && qid) {
//       const fetchQuiz = async () => {
//         try {
//           const existingQuiz = await client.findQuizById(qid);
//           if (existingQuiz) {
//             setQuiz(existingQuiz);
//           }
//         } catch (error) {
//           console.error('Error fetching quiz:', error);
//         }
//       };
//       fetchQuiz();
//     }
//   }, [qid, isNewQuiz]);
//
//
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { id, value } = e.target;
//     setQuiz((prevQuiz: any) => ({
//       ...prevQuiz,
//       [id]: value
//     }));
//   };
//
//   const handleSave = async () => {
//     try {
//       if (isNewQuiz) {
//         const createdQuiz = await client.createQuiz(cid as string, quiz);
//         dispatch(addQuizzes(createdQuiz));
//       } else {
//         await client.updateQuiz({ ...quiz, _id: qid, course: cid });
//         dispatch(updateQuizzes({ ...quiz, _id: qid, course: cid }));
//       }
//       navigate(`/Kanbas/Courses/${cid}/Quizzes`);
//     } catch (error) {
//       console.error('Error saving quiz:', error);
//     }
//   };
//
//   const handleCancel = () => {
//     navigate(`/Kanbas/Courses/${cid}/Quizzes`);
//   };
//
//   return (
//       <div id="wd-quizzes-editor" className="container mt-4">
//         <div className="mb-3">
//           <label htmlFor="title" className="form-label">Quiz Name</label>
//           <input id="title" className="form-control" value={quiz.title} onChange={handleChange} />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="description" className="form-label">Description</label>
//           <textarea id="description" className="form-control" rows={6} value={quiz.description} onChange={handleChange} />
//         </div>
//         <div className="row mb-3">
//           <div className="col-md-2">
//             <label htmlFor="points" className="form-label">Points</label>
//           </div>
//           <div className="col-md-4">
//             <input id="points" className="form-control" type="number" value={quiz.points} onChange={handleChange} />
//           </div>
//         </div>
//         <div className="row mb-3">
//           <div className="col-md-2">
//             <label htmlFor="dueDate" className="form-label">Due Date</label>
//           </div>
//           <div className="col-md-4">
//             <input id="dueDate" className="form-control" type="datetime-local" value={quiz.dueDate} onChange={handleChange} />
//           </div>
//         </div>
//         <div className="row mb-3">
//           <div className="col-md-2">
//             <label htmlFor="availableFrom" className="form-label">Available From</label>
//           </div>
//           <div className="col-md-4">
//             <input id="availableFrom" className="form-control" type="datetime-local" value={quiz.availableFrom} onChange={handleChange} />
//           </div>
//         </div>
//         <div className="row mb-3">
//           <div className="col-md-2">
//             <label htmlFor="availableUntil" className="form-label">Available Until</label>
//           </div>
//           <div className="col-md-4">
//             <input id="availableUntil" className="form-control" type="datetime-local" value={quiz.availableUntil} onChange={handleChange} />
//           </div>
//         </div>
//         <hr />
//         <div className="d-flex justify-content-end">
//           <button className="btn btn-secondary me-2" onClick={handleCancel}>Cancel</button>
//           <button className="btn btn-danger" onClick={handleSave}>Save</button>
//         </div>
//       </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addQuizzes, updateQuizzes } from './reducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as client from './client';

export default function QuizEditor() {
  const { cid, qid } = useParams<{ cid: string, qid: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNewQuiz = qid === "new";

  const [quiz, setQuiz] = useState<any>({
    title: '',
    description: '',
    points: 100,
    dueDate: '',
    availableFrom: '',
    availableUntil: ''
  });

  useEffect(() => {
    if (!isNewQuiz && qid) {
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
    }
  }, [qid, isNewQuiz]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setQuiz((prevQuiz: any) => ({
      ...prevQuiz,
      [id]: value
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
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
  };

  return (
      <div id="wd-quizzes-editor" className="container mt-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Quiz Name</label>
          <input id="title" className="form-control" value={quiz.title} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea id="description" className="form-control" rows={6} value={quiz.description} onChange={handleChange} />
        </div>
        <div className="row mb-3">
          <div className="col-md-2">
            <label htmlFor="points" className="form-label">Points</label>
          </div>
          <div className="col-md-4">
            <input id="points" className="form-control" type="number" value={quiz.points} onChange={handleChange} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-2">
            <label htmlFor="dueDate" className="form-label">Due Date</label>
          </div>
          <div className="col-md-4">
            <input id="dueDate" className="form-control" type="datetime-local" value={quiz.dueDate} onChange={handleChange} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-2">
            <label htmlFor="availableFrom" className="form-label">Available From</label>
          </div>
          <div className="col-md-4">
            <input id="availableFrom" className="form-control" type="datetime-local" value={quiz.availableFrom} onChange={handleChange} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-2">
            <label htmlFor="availableUntil" className="form-label">Available Until</label>
          </div>
          <div className="col-md-4">
            <input id="availableUntil" className="form-control" type="datetime-local" value={quiz.availableUntil} onChange={handleChange} />
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-end">
          <button className="btn btn-secondary me-2" onClick={handleCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={handleSave}>Save</button>
        </div>
      </div>
  );
}

