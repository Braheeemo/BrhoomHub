import React, { useState } from 'react';
import { getAIHelp } from '../../services/ai';

const Question = ({ question, onAnswerSubmit, grammarSection }) => {
  const [aiHelp, setAiHelp] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetAIHelp = async () => {
    setIsLoading(true);
    try {
      const helpText = await getAIHelp(question.questionText);
      setAiHelp(helpText);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (event) => {
    setSelectedAnswer(parseInt(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (hasSubmitted) return; // Prevent multiple submissions
    const correct = selectedAnswer === question.correctAnswer;
    setIsCorrect(correct);
    onAnswerSubmit(question.id, correct);
    setHasSubmitted(true);
  };

  return (
    <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '5px' }}>
      <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
        {question.questionText}
      </p>
      <form onSubmit={handleSubmit}>
        {question.options.map((option, index) => (
          <div key={index} style={{ marginBottom: '5px' }}>
            <label>
              <input
                type="radio"
                value={index}
                checked={selectedAnswer === index}
                onChange={handleAnswerChange}
                required
                disabled={hasSubmitted}
              />
              {option}
            </label>
          </div>
        ))}
        <button type="submit" disabled={hasSubmitted || isLoading} style={{ padding: '8px 12px', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '5px', cursor: 'pointer' }}>
          {hasSubmitted ? 'Submitted' : 'Submit'}
        </button>
      </form>
      {isCorrect !== null && (
        <p style={{ marginTop: '10px', color: isCorrect ? 'green' : 'red' }}>
          {isCorrect ? 'Correct!' : 'Incorrect. The correct answer was: ' + question.options[question.correctAnswer]}
        </p>
      )}
      <button onClick={handleGetAIHelp} disabled={hasSubmitted || isLoading} style={{ marginTop: '10px', padding: '8px 12px', backgroundColor: '#e0e0e0', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer' }}>
        {isLoading ? 'Loading...' : 'Get AI Help'}
      </button>
      {aiHelp && <p style={{ marginTop: '10px', fontStyle: 'italic', color: '#777' }}>{aiHelp}</p>}
      <p style={{ fontSize: '0.8em', color: '#888', marginTop: '15px' }}>Section: {grammarSection}</p>
    </div>
  );
};

export default Question;