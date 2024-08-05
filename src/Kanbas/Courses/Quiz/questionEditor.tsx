// import React, { useState } from 'react';
// import { GoTrash} from "react-icons/go";
// import { CiEdit } from "react-icons/ci";
//
//
//
// function QuestionEditor() {
//   const [title, setTitle] = useState('');
//   const [points, setPoints] = useState(0);
//   const [question, setQuestion] = useState('');
//   const [questionType, setQuestionType] = useState('multiple-choice');
//   const [choices, setChoices] = useState([
//     { text: '', isCorrect: false },
//     { text: '', isCorrect: false },
//     { text: '', isCorrect: false },
//     { text: '', isCorrect: false }
//   ]);
//
//   const handleChoiceChange = (index: number, text: string, isCorrect: boolean) => {
//     const newChoices = choices.map((choice, i) =>
//         i === index ? { ...choice, text, isCorrect } : { ...choice, isCorrect: false }
//     );
//     setChoices(newChoices);
//   };
//
//   const handleAddChoice = () => {
//     setChoices([...choices, { text: '', isCorrect: false }]);
//   };
//
//   const handleRemoveChoice = (index: number) => {
//     setChoices(choices.filter((_, i) => i !== index));
//   };
//
//   const handleCancel = () => {
//     // Logic to handle cancel action
//   };
//
//   const handleSave = () => {
//     // Logic to handle save action
//   };
//   const handleEdit = () => {
//     // Logic to handle save action
//   };
//
//
//   return (
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'white', padding: '20px' }}>
//         <div style={{
//           backgroundColor: '#fff',
//           padding: '20px',
//           borderRadius: '8px',
//           boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//           maxWidth: '700px',
//           width: '100%'
//         }}>
//           <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
//             <input
//                 type="text"
//                 placeholder="Easy Question"
//                 style={{padding: '5px', fontSize: '20px', flex: '1'}}
//             />
//             <select
//                 defaultValue="Multiple Choice"
//                 style={{padding: '9px', fontSize: '20px', flex: '1'}}
//             >
//               <option value="Multiple Choice">Multiple Choice</option>
//               <option value="True/False">True/False</option>
//               <option value="Fill In The Blank">Fill In The Blank</option>
//             </select>
//             <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: '1'}}>
//               <span style={{ padding: '5px', fontSize: '20px', fontWeight: 'bold' }}>pts:</span>
//               <input
//                   type="number"
//                   style={{padding: '5px', fontSize: '20px', width: '60px'}}
//               />
//             </div>
//           </div>
//           <hr/>
//           <div>
//             <h6>Enter your question and multiple answers,the select the one correct answer.</h6>
//             <h5 style={{fontWeight: 'bold'}}>Question:</h5>
//
//             <label>
//               <textarea
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   style={{width: '270%', marginBottom: '10px', height: '100px',fontSize: '20px', resize: 'none',
//                     boxSizing: 'border-box', padding: '10px'}}
//               />
//             </label>
//           </div>
//           <div>
//             <h5 style={{fontWeight: 'bold'}}>Answer:</h5>
//           </div>
//
//           <div>
//
//           </div>
//           <div>
//             {/*<label>*/}
//             {/*  Question Type:*/}
//             {/*  <select*/}
//             {/*      value={questionType}*/}
//             {/*      onChange={(e) => setQuestionType(e.target.value)}*/}
//             {/*      style={{width: '100%', marginBottom: '10px'}}*/}
//             {/*  >*/}
//             {/*    <option value="multiple-choice">Multiple Choice</option>*/}
//             {/*    <option value="true-false">True/False</option>*/}
//             {/*    <option value="fill-in-the-blank">Fill in the Blank</option>*/}
//             {/*  </select>*/}
//             {/*</label>*/}
//           </div>
//           {questionType === 'multiple-choice' && (
//               <div>
//                 {choices.map((choice, index) => (
//                     <div key={index} style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
//                       <span style={{marginRight: '10px', marginLeft: '50px', fontSize: '20px', marginTop: '20px'}}>Possible Answer</span>
//                       <input
//                           type="text"
//                           value={choice.text}
//                           onChange={(e) =>
//                               handleChoiceChange(index, e.target.value, choice.isCorrect)
//                           }
//                           style={{flex: 1, marginRight: '10px', fontSize: '20px', marginTop: '20px'}}
//                       />
//                       <CiEdit className="alert-primary" onClick={() => handleEdit()}
//                               style={{marginLeft: '120px', marginTop: '20px'}}/>
//                       <GoTrash className="alert-primary" onClick={() => handleRemoveChoice(index)}
//                                style={{marginLeft: '10px', marginTop: '20px'}}/>
//                     </div>
//                 ))}
//                 <button
//                     onClick={handleAddChoice}
//                     style={{
//                       color: '#d61a1a',
//                       fontSize: '20px',
//                       marginTop: '40px',
//                       marginLeft: '420px',
//                       border: 'none',
//                       background: 'none',
//                       cursor: 'pointer'
//                     }}
//                 >
//                   + Add Another Answer
//                 </button>
//
//               </div>
//           )}
//           <div style={{marginTop: '20px', display: 'flex', justifyContent: 'flex-end'}}>
//             <button onClick={handleCancel} style={{
//               backgroundColor: 'lightgray',
//               color: 'black',
//               border: 'none',
//               padding: '10px 20px',
//               cursor: 'pointer',
//               borderRadius: '4px',
//               marginRight: '10px',
//               fontSize: '20px'
//             }}>Cancel
//             </button>
//             <button onClick={handleSave} style={{
//               backgroundColor: '#d61a1a',
//               color: 'white',
//               border: 'none',
//               padding: '10px 20px',
//               cursor: 'pointer',
//               borderRadius: '4px',
//               fontSize: '20px'
//             }}>Update Question
//             </button>
//           </div>
//         </div>
//
//
// {questionType === 'true-false' && (
//             <div>
//               <h3>True/False</h3>
//               <div>
//                 <label>
//                   <input
//                       type="radio"
//                       name="true-false"
//                       value="true"
//                       checked={choices[0].isCorrect}
//                       onChange={() => setChoices([{ text: 'True', isCorrect: true }, { text: 'False', isCorrect: false }])}
//                   />
//                   True
//                 </label>
//               </div>
//               <div>
//                 <label>
//                   <input
//                       type="radio"
//                       name="true-false"
//                       value="false"
//                       checked={!choices[0].isCorrect}
//                       onChange={() => setChoices([{ text: 'True', isCorrect: false }, { text: 'False', isCorrect: true }])}
//                   />
//                   False
//                 </label>
//               </div>
//             </div>
//         )}
//         {questionType === 'fill-in-the-blank' && (
//             <div>
//               <h3>Possible Answers</h3>
//               {choices.map((choice, index) => (
//                   <div key={index}>
//                     <input
//                         type="text"
//                         value={choice.text}
//                         onChange={(e) =>
//                             handleChoiceChange(index, e.target.value, true)
//                         }
//                     />
//                     <button onClick={() => handleRemoveChoice(index)}>Remove</button>
//                   </div>
//               ))}
//               <button onClick={handleAddChoice}>Add Another Answer</button>
//             </div>
//         )}
//       </div>
//   );
// }
//
// export default QuestionEditor;


import React, { useState } from 'react';
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";

function QuestionEditor() {
  const [title, setTitle] = useState('');
  const [points, setPoints] = useState(0);
  const [questionType, setQuestionType] = useState('multiple-choice');
  const [choices, setChoices] = useState([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false }
  ]);

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
    // Logic to handle cancel action
  };

  const handleSave = () => {
    // Logic to handle save action
  };
  const handleEdit = () => {
    // Logic to handle edit action
  };

  const renderAnswersSection = () => {
    switch (questionType) {
      case 'multiple-choice':
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
                    <CiEdit className="alert-primary" onClick={handleEdit} style={{ marginLeft: '120px', marginTop: '20px' }} />
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
      case 'true-false':
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
                      style={{marginRight: '10px', marginTop: '20px' }}
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
      case 'fill-in-the-blank':
        return (
            <div>
              <h5 style={{ fontWeight: 'bold' }}>Answer:</h5>
              {choices.map((choice, index) => (
                  <div key={index} style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                    <span style={{marginRight: '10px', marginLeft: '50px', fontSize: '20px', marginTop: '20px'}}>Possible Answer</span>
                    <input
                        type="text"
                        value={choice.text}
                        onChange={(e) => handleChoiceChange(index, e.target.value, true)}
                        style={{flex: 1, marginRight: '10px', fontSize: '20px', marginTop: '20px'}}
                    />
                    <GoTrash className="alert-primary" onClick={() => handleRemoveChoice(index)}
                             style={{marginLeft: '120px', marginTop: '20px'}}/>
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
            <input
                type="text"
                placeholder="Easy Question"
                style={{ padding: '5px', fontSize: '20px', flex: '1' }}
            />
            <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                style={{ padding: '9px', fontSize: '20px', flex: '1' }}
            >
              <option value="multiple-choice">Multiple Choice</option>
              <option value="true-false">True/False</option>
              <option value="fill-in-the-blank">Fill In The Blank</option>
            </select>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: '1' }}>
              <span style={{ padding: '5px', fontSize: '20px', fontWeight: 'bold' }}>pts:</span>
              <input
                  type="number"
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
            }}>Update Question
            </button>
          </div>
        </div>
      </div>
  );
}

export default QuestionEditor;
