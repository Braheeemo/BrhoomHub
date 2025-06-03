import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Paper, Button, Box, Grid, Alert } from '@mui/material';
import { alpha } from '@mui/material/styles';

// --- START OF QUESTIONS DATA ---
const presentSimpleQuestions = [
  // Easy Level
  { id: 1, level: "Easy", questionText: "She ________ coffee every morning.", options: ["drink", "drinks", "drinking", "drank"], correctAnswerIndex: 1, explanation: "For singular subjects (She, He, It) in present simple, add -s to the verb for habitual actions." },
  { id: 2, level: "Easy", questionText: "They ________ to school by bus.", options: ["go", "goes", "going", "gone"], correctAnswerIndex: 0, explanation: "For plural subjects (They, We, You) and 'I' in present simple, use the base form of the verb." },
  { id: 3, level: "Easy", questionText: "The sun ________ in the east.", options: ["rise", "rises", "rising", "rose"], correctAnswerIndex: 1, explanation: "Facts or general truths are expressed in present simple. 'Sun' is singular, so 'rises'." },
  { id: 4, level: "Easy", questionText: "Cats ________ milk.", options: ["like", "likes", "liking", "liked"], correctAnswerIndex: 0, explanation: "General preferences or habits use present simple. 'Cats' is plural, so 'like'." },
  { id: 5, level: "Easy", questionText: "I ________ my homework after dinner.", options: ["do", "does", "doing", "did"], correctAnswerIndex: 0, explanation: "For 'I' in present simple, use the base form of the verb for routines." },
  { id: 6, level: "Easy", questionText: "We ________ TV on weekends.", options: ["watch", "watches", "watching", "watched"], correctAnswerIndex: 0, explanation: "For plural subjects like 'We', use the base form of the verb for habits." },
  { id: 7, level: "Easy", questionText: "He ________ his room every Saturday.", options: ["clean", "cleans", "cleaning", "cleaned"], correctAnswerIndex: 1, explanation: "For singular subjects like 'He', add -s to the verb for routines." },
  { id: 8, level: "Easy", questionText: "Birds ________ in the sky.", options: ["fly", "flies", "flying", "flew"], correctAnswerIndex: 0, explanation: "General truths use present simple. 'Birds' is plural, so 'fly'." },
  { id: 9, level: "Easy", questionText: "Water ________ at 100°C.", options: ["boil", "boils", "boiling", "boiled"], correctAnswerIndex: 1, explanation: "Scientific facts use present simple. 'Water' (uncountable) is treated as singular, so 'boils'." },
  { id: 10, level: "Easy", questionText: "My parents ________ in London.", options: ["live", "lives", "living", "lived"], correctAnswerIndex: 0, explanation: "For plural subjects like 'My parents', use the base form for current situations." },
  // Intermediate Level
  { id: 11, level: "Intermediate", questionText: "She never ________ meat because she’s vegetarian.", options: ["eat", "eats", "ate", "eaten"], correctAnswerIndex: 1, explanation: "Adverbs of frequency like 'never' are common with present simple. 'She' is singular, so 'eats'." },
  { id: 12, level: "Intermediate", questionText: "________ they play football on Fridays?", options: ["Do", "Does", "Is", "Are"], correctAnswerIndex: 0, explanation: "Use 'Do' to start questions with 'I/you/we/they' in present simple." },
  { id: 13, level: "Intermediate", questionText: "The train ________ at 7 PM daily.", options: ["leave", "leaves", "left", "leaving"], correctAnswerIndex: 1, explanation: "Scheduled events often use present simple. 'Train' is singular, so 'leaves'." },
  { id: 14, level: "Intermediate", questionText: "He ________ how to fix computers.", options: ["know", "knowing", "knows", "knew"], correctAnswerIndex: 2, explanation: "States of being or knowing use present simple. 'He' is singular, so 'knows'." },
  { id: 15, level: "Intermediate", questionText: "________ your brother work here?", options: ["Do", "Does", "Is", "Are"], correctAnswerIndex: 1, explanation: "Use 'Does' to start questions with singular subjects (he/she/it/your brother) in present simple." },
  { id: 16, level: "Intermediate", questionText: "Plants ________ sunlight to grow.", options: ["need", "needs", "needing", "needed"], correctAnswerIndex: 0, explanation: "General truths or needs. 'Plants' is plural, so 'need'." },
  { id: 17, level: "Intermediate", questionText: "We ________ movies at the cinema.", options: ["doesn’t watch", "don’t watch", "not watch", "aren’t watch"], correctAnswerIndex: 1, explanation: "Use 'don't' (do not) for negative sentences with 'I/you/we/they' in present simple." },
  { id: 18, level: "Intermediate", questionText: "She ________ late for meetings.", options: ["am never", "is never", "never is", "never"], correctAnswerIndex: 1, explanation: "For 'to be', the adverb of frequency (never) usually comes after the verb 'is'." },
  { id: 19, level: "Intermediate", questionText: "________ this store sell books?", options: ["Do", "Does", "Is", "Are"], correctAnswerIndex: 1, explanation: "Use 'Does' for questions with singular subjects like 'this store'." },
  { id: 20, level: "Intermediate", questionText: "They ________ to the gym on Sundays.", options: ["doesn’t go", "don’t go", "not go", "aren’t go"], correctAnswerIndex: 1, explanation: "Use 'don't' (do not) for negative sentences with plural subjects like 'they'." },
  // Advanced Level
  { id: 21, level: "Advanced", questionText: "The news ________ always depressing.", options: ["are", "is", "am", "be"], correctAnswerIndex: 1, explanation: "'News' is an uncountable noun and always takes a singular verb." },
  { id: 22, level: "Advanced", questionText: "Mathematics ________ her favorite subject.", options: ["are", "is", "were", "being"], correctAnswerIndex: 1, explanation: "Subjects like 'Mathematics', 'Physics', though ending in -s, are singular." },
  { id: 23, level: "Advanced", questionText: "Ten dollars ________ too much for coffee.", options: ["are", "is", "were", "am"], correctAnswerIndex: 1, explanation: "Sums of money, periods of time, or distances are often treated as singular units." },
  { id: 24, level: "Advanced", questionText: "The police ________ patrolling the area.", options: ["is", "are", "am", "be"], correctAnswerIndex: 1, explanation: "'Police' is a collective noun that is always treated as plural." },
  { id: 25, level: "Advanced", questionText: "Neither the teacher nor the students ________ happy.", options: ["is", "are", "am", "be"], correctAnswerIndex: 1, explanation: "With 'neither...nor', the verb agrees with the subject closest to it. 'Students' is plural, so 'are'." },
  { id: 26, level: "Advanced", questionText: "Everyone ________ to be respected.", options: ["deserve", "deserves", "deserving", "deserved"], correctAnswerIndex: 1, explanation: "Indefinite pronouns like 'everyone', 'someone', 'nobody' take singular verbs." },
  { id: 27, level: "Advanced", questionText: "The committee ________ its decision tomorrow.", options: ["announce", "announces", "announcing", "announced"], correctAnswerIndex: 1, explanation: "Present simple can be used for scheduled future events. 'Committee' (as a single body) is singular, so 'announces'." },
  { id: 28, level: "Advanced", questionText: "A pair of shoes ________ under the bed.", options: ["are", "is", "were", "am"], correctAnswerIndex: 1, explanation: "'A pair' is singular, so it takes a singular verb 'is'." },
  { id: 29, level: "Advanced", questionText: "The staff ________ lunch at noon daily.", options: ["takes", "take", "taking", "took"], correctAnswerIndex: 0, explanation: "Collective nouns like 'staff' can be singular (as a unit) or plural (as individuals). 'Takes' (singular) is used here, aligning with one common usage." },
  { id: 30, level: "Advanced", questionText: "Either John or his sisters ________ the dishes.", options: ["wash", "washes", "washing", "washed"], correctAnswerIndex: 0, explanation: "With 'either...or', the verb agrees with the subject closest to it. 'Sisters' is plural, so 'wash'." }
];
// --- END OF QUESTIONS DATA ---

// Helper function to format the section ID into a displayable name
const formatSectionName = (id) => {
  if (!id) return 'Unknown Section';
  return id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const GrammarQuizPage = () => {
  const { sectionId } = useParams();
  const sectionName = formatSectionName(sectionId);

  const [questionsToDisplay, setQuestionsToDisplay] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answerLog, setAnswerLog] = useState([]);

  useEffect(() => {
    // In a real app, you might fetch questions based on sectionId
    if (sectionId === 'present-simple') {
      setQuestionsToDisplay(presentSimpleQuestions);
    } else {
      setQuestionsToDisplay([]);
    }
    // Reset state when sectionId changes (important if navigating between quizzes)
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setIsCorrect(null);
    setScore(0);
    setShowResults(false);
    setAnswerLog([]);
  }, [sectionId]);

  const currentQuestion = questionsToDisplay[currentQuestionIndex];

  const handleOptionSelect = (optionIndex) => {
    if (!isAnswerSubmitted) {
      setSelectedOptionIndex(optionIndex);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null) return;

    setIsAnswerSubmitted(true);
    const correct = selectedOptionIndex === currentQuestion.correctAnswerIndex;
    setIsCorrect(correct);
    if (correct) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const recordAnswer = () => {
     setAnswerLog(prevLog => [
      ...prevLog,
      {
        questionText: currentQuestion.questionText,
        userAnswerText: currentQuestion.options[selectedOptionIndex],
        correctAnswerText: currentQuestion.options[currentQuestion.correctAnswerIndex],
        isCorrect: selectedOptionIndex === currentQuestion.correctAnswerIndex,
        explanation: currentQuestion.explanation
      }
    ]);
  }

  const handleNextQuestion = () => {
    recordAnswer();
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setIsCorrect(null);
  };

  const handleShowResults = () => {
    recordAnswer();
    setShowResults(true);
  };

  if (questionsToDisplay.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" align="center">Quiz not available for "{sectionName}".</Typography>
      </Container>
    );
  }

  if (showResults) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Quiz Results for {sectionName}
        </Typography>
        <Typography variant="h5" align="center" gutterBottom sx={{ mb: 3 }}>
          You scored {score} out of {questionsToDisplay.length}.
        </Typography>
        <Paper elevation={2} sx={{ p: 2, mb: 2}}>
            <Typography variant="h6" gutterBottom>Answer Log:</Typography>
            {answerLog.map((logEntry, index) => (
            <Paper key={index} elevation={1} sx={(theme) => ({ p: 2, mb: 2, backgroundColor: logEntry.isCorrect ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.error.main, 0.1) })}>
                <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>{index + 1}. {logEntry.questionText}</Typography>
                <Typography variant="body2" sx={{ color: logEntry.isCorrect ? 'success.dark' : 'error.dark', mt:0.5 }}>
                Your answer: {logEntry.userAnswerText} {logEntry.isCorrect ? "✔" : "✘"}
                </Typography>
                {!logEntry.isCorrect && (
                <Typography variant="body2" sx={{ color: 'success.dark' }}>Correct answer: {logEntry.correctAnswerText}</Typography>
                )}
                <Typography variant="caption" display="block" sx={{mt:1, color: 'text.secondary'}}>Explanation: {logEntry.explanation}</Typography>
            </Paper>
            ))}
        </Paper>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
          <Button variant="outlined" color="primary" component={RouterLink} to="/grammar-hub">
            Back to Grammar Hub
          </Button>
          <Button variant="contained" color="primary" component={RouterLink} to="/progress">
            View Overall Progress
          </Button>
        </Box>
      </Container>
    );
  }

  if (!currentQuestion) {
     // This can happen if questionsToDisplay is set asynchronously and is initially empty
     return <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}><Typography variant="h5" align="center">Loading questions...</Typography></Container>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: 'secondary.main', fontWeight: 'bold', mb:1 }}>
        {`Quiz: ${sectionName}`}
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{mb:3, color: 'text.secondary'}}>
        Question {currentQuestionIndex + 1} of {questionsToDisplay.length}
      </Typography>

      <Paper elevation={3} sx={{ p: {xs: 2, sm: 3, md: 4}, mt: 3, mb: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, fontWeight: 'medium' }}>
          {currentQuestion.questionText}
        </Typography>

        <Grid container spacing={1}>
          {currentQuestion.options.map((option, index) => (
            <Grid item xs={12} key={index}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handleOptionSelect(index)}
                disabled={isAnswerSubmitted}
                sx={(theme) => {
                  let styles = {
                    mb: 1, p: 1.5, justifyContent: 'flex-start', textAlign: 'left',
                    textTransform: 'none', // From theme, but ensure
                    borderRadius: theme.shape.borderRadius, // From theme
                    borderColor: theme.palette.mode === 'dark' ? 'grey.700' : 'grey.300',
                    color: 'text.primary',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    },
                  };
                  if (isAnswerSubmitted) {
                    if (index === currentQuestion.correctAnswerIndex) {
                      styles = {...styles, backgroundColor: alpha(theme.palette.success.main, 0.15), borderColor: theme.palette.success.main, color: theme.palette.success.dark, '&:hover': { backgroundColor: alpha(theme.palette.success.main, 0.25)}};
                    } else if (index === selectedOptionIndex && !isCorrect) {
                      styles = {...styles, backgroundColor: alpha(theme.palette.error.main, 0.15), borderColor: theme.palette.error.main, color: theme.palette.error.dark, '&:hover': { backgroundColor: alpha(theme.palette.error.main, 0.25)}};
                    }
                  } else if (index === selectedOptionIndex) {
                    styles = {...styles, borderColor: 'primary.main', borderWidth: 2, backgroundColor: alpha(theme.palette.primary.main, 0.08)};
                  }
                  return styles;
                }}
              >
                {option}
              </Button>
            </Grid>
          ))}
        </Grid>

        {isAnswerSubmitted && (
          <Alert
            severity={isCorrect ? "success" : "error"}
            sx={{ mt: 3, '& .MuiAlert-message': { flexGrow: 1 } }}
            action={
                 (isAnswerSubmitted && currentQuestionIndex < questionsToDisplay.length - 1) ? (
                    <Button color="inherit" size="small" onClick={handleNextQuestion} sx={{ml:2}}>Next Question</Button>
                 ) : (isAnswerSubmitted && currentQuestionIndex === questionsToDisplay.length - 1) ? (
                    <Button color="inherit" size="small" onClick={handleShowResults} sx={{ml:2}}>Show Results</Button>
                 ) : null
            }
          >
            {isCorrect ? "Correct!" : `Not quite. The correct answer was: "${currentQuestion.options[currentQuestion.correctAnswerIndex]}"`}
            <Typography variant="caption" display="block" sx={{mt:0.5}}>{currentQuestion.explanation}</Typography>
          </Alert>
        )}

        {!isAnswerSubmitted && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitAnswer}
                disabled={selectedOptionIndex === null}
                >
                Submit Answer
                </Button>
            </Box>
        )}
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="text"
          color="inherit"
          component={RouterLink}
          to="/grammar-hub"
        >
          Back to Grammar Hub
        </Button>
      </Box>
    </Container>
  );
};

export default GrammarQuizPage;
