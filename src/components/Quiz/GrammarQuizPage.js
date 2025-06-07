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

// --- START OF PAST SIMPLE QUESTIONS DATA ---
const pastSimpleQuestions = [
  // Easy Level
  { id: 1, level: "Easy", questionText: "She ________ TV last night.", options: ["watch", "watches", "watched", "watching"], correctAnswerIndex: 2, explanation: "For regular verbs in the past simple, add -ed. 'Last night' indicates past time." },
  { id: 2, level: "Easy", questionText: "They ________ football yesterday.", options: ["play", "plays", "played", "playing"], correctAnswerIndex: 2, explanation: "Regular verbs like 'play' add -ed in the past simple. 'Yesterday' indicates past time." },
  { id: 3, level: "Easy", questionText: "I ________ to music after school.", options: ["listen", "listens", "listened", "listening"], correctAnswerIndex: 2, explanation: "Past simple is used for completed actions in the past. 'Listened' is the past form of 'listen'." },
  { id: 4, level: "Easy", questionText: "He ________ his room this morning.", options: ["clean", "cleans", "cleaned", "cleaning"], correctAnswerIndex: 2, explanation: "'This morning' can refer to a completed past time if the current time is later in the day. 'Cleaned' is the past simple form." },
  { id: 5, level: "Easy", questionText: "We ________ pizza for dinner.", options: ["eat", "eats", "ate", "eaten"], correctAnswerIndex: 2, explanation: "'Ate' is the irregular past simple form of 'eat'." },
  { id: 6, level: "Easy", questionText: "The dog ________ in the park.", options: ["run", "runs", "ran", "running"], correctAnswerIndex: 2, explanation: "'Ran' is the irregular past simple form of 'run'." },
  { id: 7, level: "Easy", questionText: "You ________ late for class.", options: ["are", "were", "was", "is"], correctAnswerIndex: 1, explanation: "The past simple form of 'to be' for 'you' is 'were'." },
  { id: 8, level: "Easy", questionText: "It ________ rainy yesterday.", options: ["is", "are", "was", "were"], correctAnswerIndex: 2, explanation: "The past simple form of 'to be' for 'it' is 'was'. 'Yesterday' indicates past time." },
  { id: 9, level: "Easy", questionText: "My friends ________ to the beach.", options: ["go", "goes", "went", "going"], correctAnswerIndex: 2, explanation: "'Went' is the irregular past simple form of 'go'." },
  { id: 10, level: "Easy", questionText: "She ________ her homework quickly.", options: ["finish", "finishes", "finished", "finishing"], correctAnswerIndex: 2, explanation: "Regular verbs like 'finish' add -ed in the past simple." },
  // Intermediate Level
  { id: 11, level: "Intermediate", questionText: "He ________ the bus to work.", options: ["didn’t take", "didn’t took", "don’t take", "doesn’t take"], correctAnswerIndex: 0, explanation: "For negative sentences in past simple, use 'didn’t' + base form of the verb (take)." },
  { id: 12, level: "Intermediate", questionText: "________ they visit the museum?", options: ["Do", "Did", "Does", "Are"], correctAnswerIndex: 1, explanation: "Use 'Did' to start questions in the past simple for most subjects." },
  { id: 13, level: "Intermediate", questionText: "She ________ her keys at home.", options: ["leave", "leaves", "left", "leaving"], correctAnswerIndex: 2, explanation: "'Left' is the irregular past simple form of 'leave'." },
  { id: 14, level: "Intermediate", questionText: "We ________ any messages.", options: ["didn’t get", "didn’t got", "don’t get", "not get"], correctAnswerIndex: 0, explanation: "Negative past simple: 'didn’t' + base form of the verb (get)." },
  { id: 15, level: "Intermediate", questionText: "________ he fix the computer?", options: ["Do", "Does", "Did", "Is"], correctAnswerIndex: 2, explanation: "Past simple questions: 'Did' + subject + base form of the verb (fix)." },
  { id: 16, level: "Intermediate", questionText: "The children ________ quiet during the movie.", options: ["wasn’t", "weren’t", "didn’t", "aren’t"], correctAnswerIndex: 1, explanation: "Negative past simple of 'to be' for plural 'children' is 'weren’t'." },
  { id: 17, level: "Intermediate", questionText: "I ________ my wallet at the café.", options: ["forget", "forgets", "forgot", "forgotten"], correctAnswerIndex: 2, explanation: "'Forgot' is the irregular past simple form of 'forget'." },
  { id: 18, level: "Intermediate", questionText: "They ________ to the concert because they were sick.", options: ["don’t go", "doesn’t go", "didn’t go", "not go"], correctAnswerIndex: 2, explanation: "Negative past simple: 'didn’t' + base form of the verb (go)." },
  { id: 19, level: "Intermediate", questionText: "________ she angry when she heard the news?", options: ["Do", "Does", "Was", "Were"], correctAnswerIndex: 2, explanation: "Past simple question with 'to be': 'Was' + singular subject (she)." },
  { id: 20, level: "Intermediate", questionText: "He ________ understand the instructions.", options: ["didn’t", "don’t", "doesn’t", "isn’t"], correctAnswerIndex: 0, explanation: "To make a negative statement in the past simple with most verbs, use 'didn’t' before the base form of the verb ('understand' is implied here)." },
  // Advanced Level
  { id: 21, level: "Advanced", questionText: "The package ________ until Friday.", options: ["didn’t arrive", "don’t arrive", "not arrive", "arrives not"], correctAnswerIndex: 0, explanation: "Negative past simple for a completed action (or non-action) up to a certain past point." },
  { id: 22, level: "Advanced", questionText: "She ________ her phone before leaving.", options: ["had", "has", "have", "had had"], correctAnswerIndex: 3, explanation: "This is Past Perfect ('had had'), indicating an action completed before another past action ('leaving'). While advanced, it's often contrasted with Past Simple." },
  { id: 23, level: "Advanced", questionText: "The meeting ________ longer than expected.", options: ["last", "lasts", "lasted", "lasting"], correctAnswerIndex: 2, explanation: "'Lasted' is the regular past simple form, indicating the duration of a completed event." },
  { id: 24, level: "Advanced", questionText: "________ anyone see the accident?", options: ["Do", "Does", "Did", "Done"], correctAnswerIndex: 2, explanation: "Past simple question: 'Did' + subject (anyone) + base form of the verb (see)." },
  { id: 25, level: "Advanced", questionText: "He ________ the truth when questioned.", options: ["tell", "tells", "told", "telling"], correctAnswerIndex: 2, explanation: "'Told' is the irregular past simple form of 'tell'." },
  { id: 26, level: "Advanced", questionText: "The train ________ on time despite the delay.", options: ["arrive", "arrives", "arrived", "arriving"], correctAnswerIndex: 2, explanation: "Past simple for a completed action in the past." },
  { id: 27, level: "Advanced", questionText: "They ________ their grandparents every summer.", options: ["visit", "visits", "visited", "visiting"], correctAnswerIndex: 2, explanation: "Past simple can also describe repeated or habitual actions in the past (similar to 'used to visit')." },
  { id: 28, level: "Advanced", questionText: "She ________ the answer until I explained it.", options: ["didn’t know", "don’t know", "not know", "knows not"], correctAnswerIndex: 0, explanation: "Negative past simple to describe a state that was true until another past action occurred." },
  { id: 29, level: "Advanced", questionText: "The team ________ the championship last year.", options: ["win", "wins", "won", "winned"], correctAnswerIndex: 2, explanation: "'Won' is the irregular past simple form of 'win'. 'Last year' indicates past time." },
  { id: 30, level: "Advanced", questionText: "________ the weather cold during your trip?", options: ["Do", "Does", "Was", "Were"], correctAnswerIndex: 2, explanation: "Past simple question with 'to be': 'Was' + singular subject (the weather)." }
];
// --- END OF PAST SIMPLE QUESTIONS DATA ---

// --- START OF PRESENT PROGRESSIVE QUESTIONS DATA ---
const presentProgressiveQuestions = [
  // Easy Level
  { id: 1, level: "Easy", questionText: "She ________ dinner right now.", options: ["cooks", "is cooking", "has cooked", "cooked"], correctAnswerIndex: 1, explanation: "'is cooking' is used for actions happening at the moment of speaking. 'Right now' is a key indicator." },
  { id: 2, level: "Easy", questionText: "They ________ TV at the moment.", options: ["watch", "are watching", "watched", "have watched"], correctAnswerIndex: 1, explanation: "'are watching' describes an action in progress at the current time, indicated by 'at the moment'." },
  { id: 3, level: "Easy", questionText: "I ________ for the exam this week.", options: ["study", "am studying", "studied", "have studied"], correctAnswerIndex: 1, explanation: "'am studying' is used for temporary actions happening around the present time (this week)." },
  { id: 4, level: "Easy", questionText: "The dog ________ in the garden.", options: ["barks", "is barking", "barked", "has barked"], correctAnswerIndex: 1, explanation: "If this is observed happening now, 'is barking' is appropriate for an ongoing action." },
  { id: 5, level: "Easy", questionText: "Look! It ________ outside.", options: ["rains", "rained", "is raining", "has rained"], correctAnswerIndex: 2, explanation: "'Look!' indicates an action happening now, so 'is raining' is correct." },
  { id: 6, level: "Easy", questionText: "We ________ to London tomorrow.", options: ["travel", "are traveling", "traveled", "have traveled"], correctAnswerIndex: 1, explanation: "Present progressive ('are traveling') can be used to talk about fixed future arrangements." },
  { id: 7, level: "Easy", questionText: "He ________ his car right now.", options: ["fixes", "fixed", "is fixing", "has fixed"], correctAnswerIndex: 2, explanation: "'is fixing' is for an action in progress at the moment of speaking, indicated by 'right now'." },
  { id: 8, level: "Easy", questionText: "The children ________ in the pool.", options: ["swim", "swam", "are swimming", "have swum"], correctAnswerIndex: 2, explanation: "'are swimming' describes an ongoing action at the present moment." },
  { id: 9, level: "Easy", questionText: "You ________ too fast! Slow down.", options: ["drive", "drove", "are driving", "have driven"], correctAnswerIndex: 2, explanation: "This describes an action happening now that prompts a reaction ('Slow down!')." },
  { id: 10, level: "Easy", questionText: "The phone ________. Can you answer it?", options: ["rings", "rang", "is ringing", "has rung"], correctAnswerIndex: 2, explanation: "'is ringing' indicates an action happening at the moment of speaking." },
  // Intermediate Level
  { id: 11, level: "Intermediate", questionText: "She ________ a novel this month.", options: ["writes", "is writing", "has written", "wrote"], correctAnswerIndex: 1, explanation: "'is writing' is used for ongoing projects or longer actions happening around the present time period ('this month')." },
  { id: 12, level: "Intermediate", questionText: "Why ________ you ________ sunglasses? It's cloudy!", options: ["do / wear", "are / wearing", "have / worn", "did / wear"], correctAnswerIndex: 1, explanation: "For questions about actions happening now, use 'Are you wearing...?'." },
  { id: 13, level: "Intermediate", questionText: "They ________ their house this week.", options: ["paint", "painted", "are painting", "have painted"], correctAnswerIndex: 2, explanation: "'are painting' describes a temporary activity occurring over a period around now ('this week')." },
  { id: 14, level: "Intermediate", questionText: "I ________ overtime this month.", options: ["work", "worked", "am working", "have worked"], correctAnswerIndex: 2, explanation: "'am working' is used for temporary situations or actions happening over a period around the present." },
  { id: 15, level: "Intermediate", questionText: "The team ________ hard for the tournament.", options: ["practices", "practiced", "is practicing", "has practiced"], correctAnswerIndex: 2, explanation: "'is practicing' indicates an ongoing preparation for a future event." },
  { id: 16, level: "Intermediate", questionText: "________ she ________ to the party tonight?", options: ["Is / coming", "Does / come", "Did / come", "Has / come"], correctAnswerIndex: 0, explanation: "Present progressive ('Is she coming...?') is used for future arrangements." },
  { id: 17, level: "Intermediate", questionText: "We ________ a new project this quarter.", options: ["start", "started", "are starting", "have started"], correctAnswerIndex: 2, explanation: "'are starting' can refer to a planned action or one that is in its early stages around the present." },
  { id: 18, level: "Intermediate", questionText: "He ________ his behavior lately.", options: ["doesn't change", "isn't changing", "didn't change", "hasn't changed"], correctAnswerIndex: 1, explanation: "'isn't changing' describes an ongoing lack of change or a current trend around the present ('lately')." },
  { id: 19, level: "Intermediate", questionText: "The company ________ its policies now.", options: ["reviews", "reviewed", "is reviewing", "has reviewed"], correctAnswerIndex: 2, explanation: "'is reviewing' indicates an action in progress at the current time." },
  { id: 20, level: "Intermediate", questionText: "I ________ why they’re late.", options: ["wonder", "wondered", "am wondering", "have wondered"], correctAnswerIndex: 2, explanation: "'am wondering' describes a mental process happening at the moment of speaking." },
  // Advanced Level
  { id: 21, level: "Advanced", questionText: "The population ________ rapidly these days.", options: ["grows", "grew", "is growing", "has grown"], correctAnswerIndex: 2, explanation: "'is growing' is used to describe current trends or changes happening over a period of time." },
  { id: 22, level: "Advanced", questionText: "Scientists ________ climate change effects now.", options: ["monitor", "monitored", "are monitoring", "have monitored"], correctAnswerIndex: 2, explanation: "'are monitoring' indicates an ongoing activity at the present time." },
  { id: 23, level: "Advanced", questionText: "She ________ temporary work while studying.", options: ["does", "did", "is doing", "has done"], correctAnswerIndex: 2, explanation: "'is doing' describes a temporary situation that is ongoing concurrently with another ('while studying')." },
  { id: 24, level: "Advanced", questionText: "________ the government ________ new laws?", options: ["Is / introducing", "Does / introduce", "Did / introduce", "Has / introduced"], correctAnswerIndex: 0, explanation: "Present progressive ('Is the government introducing...?') for actions or plans currently in progress." },
  { id: 25, level: "Advanced", questionText: "They ________ their grandparents this weekend.", options: ["visit", "visited", "are visiting", "have visited"], correctAnswerIndex: 2, explanation: "Present progressive ('are visiting') is often used for fixed plans or arrangements in the near future." },
  { id: 26, level: "Advanced", questionText: "I ________ this book, so no spoilers!", options: ["don't finish", "didn't finish", "am not finishing", "haven't finished"], correctAnswerIndex: 2, explanation: "'am not finishing' can imply an ongoing process of not yet being finished, fitting the context of avoiding spoilers. 'Haven't finished' (Present Perfect) is also very common here." },
  { id: 27, level: "Advanced", questionText: "The committee ________ the report currently.", options: ["discusses", "discussed", "is discussing", "has discussed"], correctAnswerIndex: 2, explanation: "'is discussing' is used for actions happening at the present moment, indicated by 'currently'." },
  { id: 28, level: "Advanced", questionText: "Why ________ he always ________ his phone?", options: ["does / lose", "is / losing", "did / lose", "has / lost"], correctAnswerIndex: 1, explanation: "Present progressive with 'always' ('is always losing') can express annoyance or criticism about a frequently repeated action." },
  { id: 29, level: "Advanced", questionText: "We ________ profits steadily this year.", options: ["increase", "increased", "are increasing", "have increased"], correctAnswerIndex: 2, explanation: "'are increasing' describes a trend happening over a period of time that includes the present ('this year')." },
  { id: 30, level: "Advanced", questionText: "The forest ________ due to deforestation.", options: ["disappears", "disappeared", "is disappearing", "has disappeared"], correctAnswerIndex: 2, explanation: "'is disappearing' describes an ongoing process or trend happening now." }
];
// --- END OF PRESENT PROGRESSIVE QUESTIONS DATA ---

// --- START OF PRESENT PERFECT QUESTIONS DATA ---
const presentPerfectQuestions = [
  // Easy Level
  { id: 1, level: "Easy", questionText: "She ________ her homework.", options: ["finishes", "finished", "has finished", "is finishing"], correctAnswerIndex: 2, explanation: "Present perfect ('has finished') is used for recently completed actions with relevance to the present." },
  { id: 2, level: "Easy", questionText: "They ________ to Paris twice.", options: ["go", "went", "have been", "are going"], correctAnswerIndex: 2, explanation: "'have been' is used to talk about experiences in the past where the exact time is not important, and 'twice' indicates a number of times." },
  { id: 3, level: "Easy", questionText: "I ________ that movie yet.", options: ["don't see", "didn't see", "haven't seen", "am not seeing"], correctAnswerIndex: 2, explanation: "Present perfect ('haven't seen') with 'yet' is used for actions that were expected but have not happened up to the present." },
  { id: 4, level: "Easy", questionText: "He ________ his keys.", options: ["loses", "lost", "has lost", "is losing"], correctAnswerIndex: 2, explanation: "'has lost' implies he lost them recently and they are still lost, which has a present consequence." },
  { id: 5, level: "Easy", questionText: "We ________ breakfast already.", options: ["eat", "ate", "have eaten", "are eating"], correctAnswerIndex: 2, explanation: "Present perfect ('have eaten') with 'already' indicates an action completed sooner than expected, with present relevance." },
  { id: 6, level: "Easy", questionText: "The train ________ just ________.", options: ["has / left", "is / leaving", "did / leave", "does / leave"], correctAnswerIndex: 0, explanation: "Present perfect ('has just left') is used for very recent past actions, indicated by 'just'." },
  { id: 7, level: "Easy", questionText: "You ________ a great job!", options: ["do", "did", "have done", "are doing"], correctAnswerIndex: 2, explanation: "'have done' refers to a completed action whose result is evident now (the great job)." },
  { id: 8, level: "Easy", questionText: "It ________ raining for hours.", options: ["stops", "stopped", "has stopped", "is stopping"], correctAnswerIndex: 2, explanation: "'has stopped' indicates the rain finished recently and is relevant now. If it were still raining, 'has been raining' (Present Perfect Continuous) would be used for duration." },
  { id: 9, level: "Easy", questionText: "My parents ________ the house.", options: ["sell", "sold", "have sold", "are selling"], correctAnswerIndex: 2, explanation: "'have sold' indicates a completed action in the past with a result in the present (the house is sold)." },
  { id: 10, level: "Easy", questionText: "She ________ her phone all morning.", options: ["uses", "used", "has used", "is using"], correctAnswerIndex: 2, explanation: "'has used' can imply the action happened repeatedly or was completed within 'all morning' (a period leading up to now). 'Has been using' would emphasize the continuous nature of the action throughout the morning." },
  // Intermediate Level
  { id: 11, level: "Intermediate", questionText: "________ you ever ________ sushi?", options: ["Do / eat", "Did / eat", "Have / eaten", "Are / eating"], correctAnswerIndex: 2, explanation: "Present perfect ('Have you ever eaten...?') is used to ask about life experiences." },
  { id: 12, level: "Intermediate", questionText: "He ________ in London since 2020.", options: ["lives", "lived", "has lived", "is living"], correctAnswerIndex: 2, explanation: "Present perfect ('has lived') with 'since' is used for actions or states that started in the past and continue to the present." },
  { id: 13, level: "Intermediate", questionText: "The team ________ the project yet.", options: ["doesn't complete", "didn't complete", "hasn't completed", "isn't completing"], correctAnswerIndex: 2, explanation: "Present perfect negative ('hasn't completed') with 'yet' for actions not completed up to now." },
  { id: 14, level: "Intermediate", questionText: "How long ________ she ________ Spanish?", options: ["has / studied", "did / study", "does / study", "is / studying"], correctAnswerIndex: 0, explanation: "'Has she studied' is correct for asking about the duration of an action up to the present. 'Has she been studying' would emphasize the continuous nature of the study." },
  { id: 15, level: "Intermediate", questionText: "I ________ my wallet. Can you help me find it?", options: ["lose", "lost", "have lost", "am losing"], correctAnswerIndex: 2, explanation: "'have lost' indicates a past action with a present result (the wallet is currently missing)." },
  { id: 16, level: "Intermediate", questionText: "They ________ each other for ten years.", options: ["know", "knew", "have known", "are knowing"], correctAnswerIndex: 2, explanation: "Present perfect ('have known') with 'for' is used for states that started in the past and continue to the present. 'Know' is a stative verb." },
  { id: 17, level: "Intermediate", questionText: "The movie ________ yet. Let's hurry!", options: ["doesn't start", "didn't start", "hasn't started", "isn't starting"], correctAnswerIndex: 2, explanation: "Present perfect negative ('hasn't started') with 'yet' for something expected that hasn't occurred." },
  { id: 18, level: "Intermediate", questionText: "She ________ three books this year.", options: ["writes", "wrote", "has written", "is writing"], correctAnswerIndex: 2, explanation: "'has written' is used for actions completed within a time period that is not yet finished ('this year')." },
  { id: 19, level: "Intermediate", questionText: "________ he ________ the news?", options: ["Does / hear", "Did / hear", "Has / heard", "Is / hearing"], correctAnswerIndex: 2, explanation: "Present perfect ('Has he heard...?') to ask about recent events or news." },
  { id: 20, level: "Intermediate", questionText: "We ________ that museum before.", options: ["visit", "visited", "have visited", "are visiting"], correctAnswerIndex: 2, explanation: "'have visited' with 'before' indicates a past experience at an unspecified time." },
  // Advanced Level
  { id: 21, level: "Advanced", questionText: "Scientists ________ a new species in the rainforest.", options: ["discover", "discovered", "have discovered", "are discovering"], correctAnswerIndex: 2, explanation: "Present perfect ('have discovered') for a past action with current relevance or news." },
  { id: 22, level: "Advanced", questionText: "The CEO ________ the company's strategy recently.", options: ["changes", "changed", "has changed", "is changing"], correctAnswerIndex: 2, explanation: "'has changed' with 'recently' points to a completed action in the near past that is relevant now." },
  { id: 23, level: "Advanced", questionText: "________ the package ________ yet?", options: ["Does / arrive", "Did / arrive", "Has / arrived", "Is / arriving"], correctAnswerIndex: 2, explanation: "Present perfect question ('Has the package arrived yet?') with 'yet' inquires about an expected event." },
  { id: 24, level: "Advanced", questionText: "I ________ here for ages! Where were you?", options: ["wait", "waited", "have been waiting", "am waiting"], correctAnswerIndex: 2, explanation: "Present Perfect Continuous ('have been waiting') is used to emphasize the duration of an action that started in the past and has continued up to the present moment (or just stopped)." },
  { id: 25, level: "Advanced", questionText: "She ________ her goals despite the challenges.", options: ["achieves", "achieved", "has achieved", "is achieving"], correctAnswerIndex: 2, explanation: "'has achieved' refers to accomplishments completed up to the present." },
  { id: 26, level: "Advanced", questionText: "The internet ________ since we last spoke.", options: ["doesn't work", "didn't work", "hasn't worked", "isn't working"], correctAnswerIndex: 2, explanation: "Present perfect negative ('hasn't worked') with 'since' for an action or state that has not been true from a past point until now." },
  { id: 27, level: "Advanced", questionText: "________ you ________ your passport?", options: ["Do / renew", "Did / renew", "Have / renewed", "Are / renewing"], correctAnswerIndex: 2, explanation: "Present perfect ('Have you renewed...?') to ask about a completed action that has relevance to the present (e.g., is it valid now?)." },
  { id: 28, level: "Advanced", questionText: "They ________ the contract after weeks of negotiation.", options: ["sign", "signed", "have signed", "are signing"], correctAnswerIndex: 2, explanation: "'have signed' indicates a recently completed action, often the culmination of a process." },
  { id: 29, level: "Advanced", questionText: "This is the best cake I ________.", options: ["ever eat", "ever ate", "have ever eaten", "am ever eating"], correctAnswerIndex: 2, explanation: "Present perfect ('have ever eaten') with 'ever' and superlatives ('the best') is used to talk about unique experiences up to the present." },
  { id: 30, level: "Advanced", questionText: "The patient ________ any improvement yet.", options: ["doesn't show", "didn't show", "hasn't shown", "isn't showing"], correctAnswerIndex: 2, explanation: "Present perfect negative ('hasn't shown') with 'yet' for something that hasn't happened up to the present time but might be expected." }
];
];
// --- END OF PRESENT PERFECT QUESTIONS DATA ---

// --- START OF PAST PERFECT PROGRESSIVE QUESTIONS DATA --- // Corrected name based on current subtask
const pastPerfectProgressiveQuestions = [ // Corrected variable name
  // Easy Level
  { id: 1, level: "Easy", questionText: "She was tired because she __________ all day.", options: ["worked", "had worked", "had been working"], correctAnswerIndex: 2, explanation: "Past Perfect Progressive ('had been working') emphasizes the duration of an activity that occurred before another past event (being tired)." },
  { id: 2, level: "Easy", questionText: "Why were his eyes red? He __________ for hours.", options: ["cried", "had cried", "had been crying"], correctAnswerIndex: 2, explanation: "The redness of his eyes was a result of a continuous action ('crying') that happened for hours before the observation." },
  { id: 3, level: "Easy", questionText: "The kids were muddy because they __________ in the garden.", options: ["played", "had played", "had been playing"], correctAnswerIndex: 2, explanation: "Emphasizes the continuous action of playing that caused them to be muddy before they were seen." },
  { id: 4, level: "Easy", questionText: "I was hungry because I __________ since breakfast.", options: ["didn't eat", "hadn't eaten", "hadn't been eating"], correctAnswerIndex: 2, explanation: "Past Perfect Progressive negative ('hadn't been eating') indicates a continuous lack of action leading up to a past state (being hungry)." },
  { id: 5, level: "Easy", questionText: "The ground was wet because it __________ all morning.", options: ["rained", "had rained", "had been raining"], correctAnswerIndex: 2, explanation: "Highlights the continuous action of raining over a period before the ground was observed as wet." },
  { id: 6, level: "Easy", questionText: "They were out of breath because they __________.", options: ["ran", "had run", "had been running"], correctAnswerIndex: 2, explanation: "The state of being out of breath was due to the continuous action of running that happened just before." },
  { id: 7, level: "Easy", questionText: "James knew the answer because he __________ the chapter.", options: ["studied", "had studied", "had been studying"], correctAnswerIndex: 2, explanation: "His knowledge was a result of the continuous action of studying the chapter prior to knowing." },
  { id: 8, level: "Easy", questionText: "The workers were exhausted because they __________ for 10 hours.", options: ["worked", "had worked", "had been working"], correctAnswerIndex: 2, explanation: "Emphasizes the duration of the work that led to their exhaustion." },
  { id: 9, level: "Easy", questionText: "Mia’s hands were dirty because she __________ the car.", options: ["repaired", "had repaired", "had been repairing"], correctAnswerIndex: 2, explanation: "Her dirty hands were a result of the continuous action of repairing the car." },
  { id: 10, level: "Easy", questionText: "We were late because our car __________ properly.", options: ["didn’t run", "hadn’t run", "hadn’t been running"], correctAnswerIndex: 2, explanation: "The lateness was due to the continuous problem of the car not running properly before that point." },
  // Intermediate Level
  { id: 11, level: "Intermediate", questionText: "Before the alarm rang, the firefighters __________ all night.", options: ["worked", "had worked", "had been working"], correctAnswerIndex: 2, explanation: "Describes a continuous action (working all night) that was in progress before another past event (alarm rang)." },
  { id: 12, level: "Intermediate", questionText: "The pianist was flawless because she __________ the piece for months.", options: ["practiced", "had practiced", "had been practicing"], correctAnswerIndex: 2, explanation: "Her flawless performance was a result of continuous practice over a long period before." },
  { id: 13, level: "Intermediate", questionText: "Why __________ when I called you yesterday?", options: ["were you sleeping", "had you slept", "had you been sleeping"], correctAnswerIndex: 2, explanation: "Past Perfect Progressive question asking about an action that was in progress over a period leading up to a specific time in the past (when I called)." },
  { id: 14, level: "Intermediate", questionText: "The students understood quantum physics because the professor __________ it clearly.", options: ["explained", "had explained", "had been explaining"], correctAnswerIndex: 2, explanation: "Their understanding resulted from the professor's continuous act of explaining prior to that point." },
  { id: 15, level: "Intermediate", questionText: "The athlete collapsed because he __________ too intensely.", options: ["trained", "had trained", "had been training"], correctAnswerIndex: 2, explanation: "The collapse was due to the continuous intense training that occurred before it." },
  { id: 16, level: "Intermediate", questionText: "The soup tasted amazing because Mom __________ it for hours.", options: ["cooked", "had cooked", "had been cooking"], correctAnswerIndex: 2, explanation: "The amazing taste was a result of the continuous cooking process over a duration." },
  { id: 17, level: "Intermediate", questionText: "They finally found the dog after they __________ for it all afternoon.", options: ["searched", "had searched", "had been searching"], correctAnswerIndex: 2, explanation: "Finding the dog was the result of a continuous search that lasted all afternoon." },
  { id: 18, level: "Intermediate", questionText: "The garden flourished because the gardener __________ it daily.", options: ["watered", "had watered", "had been watering"], correctAnswerIndex: 2, explanation: "The flourishing garden was due to the repeated, continuous action of watering over a period." },
  { id: 19, level: "Intermediate", questionText: "By the time the concert started, the crowd __________ for an hour.", options: ["waited", "had waited", "had been waiting"], correctAnswerIndex: 2, explanation: "Emphasizes the duration of the waiting that occurred before the concert started." },
  { id: 20, level: "Intermediate", questionText: "The laptop overheated because he __________ games nonstop.", options: ["played", "had played", "had been playing"], correctAnswerIndex: 2, explanation: "The overheating was a result of the continuous, nonstop playing of games." },
  // Advanced Level
  { id: 21, level: "Advanced", questionText: "The archaeologists were thrilled because they __________ for that artifact for decades.", options: ["looked", "had looked", "had been looking"], correctAnswerIndex: 2, explanation: "Emphasizes the very long duration of the continuous search that led to their thrill." },
  { id: 22, level: "Advanced", questionText: "By 2020, scientists __________ a solution for years without success.", options: ["researched", "had researched", "had been researching"], correctAnswerIndex: 2, explanation: "Highlights the continuous research activity over years leading up to a specific past point (2020), emphasizing the duration of the unsuccessful effort." },
  { id: 23, level: "Advanced", questionText: "She finally quit the job she __________ since college.", options: ["hated", "had hated", "had been hating"], correctAnswerIndex: 2, explanation: "While 'hate' is often stative, Past Perfect Progressive can be used to emphasize the duration of a strong feeling or situation leading to a significant change." },
  { id: 24, level: "Advanced", questionText: "The bridge collapsed because engineers __________ its flaws for too long.", options: ["ignored", "had ignored", "had been ignoring"], correctAnswerIndex: 2, explanation: "The collapse was a result of a continuous period of ignoring flaws." },
  { id: 25, level: "Advanced", questionText: "The novel felt authentic because the author __________ about war for years.", options: ["wrote", "had written", "had been writing"], correctAnswerIndex: 2, explanation: "The authenticity was due to the author's long, continuous process of writing about the subject." },
  { id: 26, level: "Advanced", questionText: "His Spanish was fluent because he __________ in Madrid for a decade.", options: ["lived", "had lived", "had been living"], correctAnswerIndex: 2, explanation: "His fluency was a result of the continuous experience of living in Madrid for a long duration." },
  { id: 27, level: "Advanced", questionText: "The patient recovered after she __________ medication for six months.", options: ["took", "had taken", "had been taking"], correctAnswerIndex: 2, explanation: "The recovery followed a continuous period of taking medication." },
  { id: 28, level: "Advanced", questionText: "By the time peace talks began, the nations __________ for years.", options: ["fought", "had fought", "had been fighting"], correctAnswerIndex: 2, explanation: "Emphasizes the duration of the fighting that occurred before the peace talks started." },
  { id: 29, level: "Advanced", questionText: "The artist’s technique was refined because she __________ realism since childhood.", options: ["studied", "had studied", "had been studying"], correctAnswerIndex: 2, explanation: "The refined technique was a result of continuous study over a long period starting in childhood." },
  { id: 30, level: "Advanced", questionText: "The policy failed because the government __________ warnings for months.", options: ["dismissed", "had dismissed", "had been dismissing"], correctAnswerIndex: 2, explanation: "The failure was due to a continuous period of dismissing warnings." }
];
// --- END OF PAST PERFECT PROGRESSIVE QUESTIONS DATA ---

// --- START OF IF CONDITIONALS QUESTIONS DATA ---
const ifConditionalsQuestions = [
  // Easy Level (Zero & First Conditionals)
  { id: 1, level: "Easy", questionText: "If you heat ice, it __________.", options: ["melts", "melted", "will melt"], correctAnswerIndex: 0, explanation: "Zero Conditional: Used for general truths or scientific facts. Structure: If + Present Simple, Present Simple." },
  { id: 2, level: "Easy", questionText: "If it rains, we __________ the picnic.", options: ["cancel", "will cancel", "would cancel"], correctAnswerIndex: 1, explanation: "First Conditional: Used for real future possibilities. Structure: If + Present Simple, will + base verb." },
  { id: 3, level: "Easy", questionText: "Plants die if they __________ water.", options: ["don't get", "didn't get", "won't get"], correctAnswerIndex: 0, explanation: "Zero Conditional: General truth. Structure: If + Present Simple, Present Simple." },
  { id: 4, level: "Easy", questionText: "She’ll pass the exam if she __________ hard.", options: ["studies", "studied", "will study"], correctAnswerIndex: 0, explanation: "First Conditional: Real future possibility. Structure: will + base verb, If + Present Simple. ('studies' for third person singular)." },
  { id: 5, level: "Easy", questionText: "If you mix red and blue, you __________ purple.", options: ["get", "got", "will get"], correctAnswerIndex: 0, explanation: "Zero Conditional: General truth/fact. Structure: If + Present Simple, Present Simple." },
  { id: 6, level: "Easy", questionText: "I’ll call you if I __________ late.", options: ["am", "was", "will be"], correctAnswerIndex: 0, explanation: "First Conditional: Real future possibility. Structure: will + base verb, If + Present Simple ('am' for 'I')." },
  { id: 7, level: "Easy", questionText: "If you don’t hurry, you __________ the bus.", options: ["miss", "will miss", "would miss"], correctAnswerIndex: 1, explanation: "First Conditional: Likely consequence of a present action. Structure: If + Present Simple, will + base verb." },
  { id: 8, level: "Easy", questionText: "If the phone __________, can you answer it?", options: ["rings", "rang", "will ring"], correctAnswerIndex: 0, explanation: "First Conditional: Real possibility in the present/future, often with an imperative. Structure: If + Present Simple, ... ." },
  { id: 9, level: "Easy", questionText: "She feels sick if she __________ too much candy.", options: ["eats", "ate", "will eat"], correctAnswerIndex: 0, explanation: "Zero Conditional: Habitual reaction or general truth. Structure: If + Present Simple, Present Simple." },
  { id: 10, level: "Easy", questionText: "We’ll go hiking if the weather __________ nice.", options: ["is", "was", "will be"], correctAnswerIndex: 0, explanation: "First Conditional: Real future possibility. Structure: will + base verb, If + Present Simple." },
  // Intermediate Level (Second & Third Conditionals)
  { id: 11, level: "Intermediate", questionText: "If I __________ rich, I would travel the world.", options: ["am", "was", "were"], correctAnswerIndex: 2, explanation: "Second Conditional: Unreal/hypothetical present or future situations. Structure: If + Past Simple (often 'were' for all persons), would + base verb." },
  { id: 12, level: "Intermediate", questionText: "She would have come if you __________ her.", options: ["invited", "had invited", "would invite"], correctAnswerIndex: 1, explanation: "Third Conditional: Unreal past situations (things that didn't happen). Structure: would have + past participle, If + Past Perfect." },
  { id: 13, level: "Intermediate", questionText: "If he studied more, he __________ better grades.", options: ["gets", "would get", "will get"], correctAnswerIndex: 1, explanation: "Second Conditional: Hypothetical present/future. Structure: If + Past Simple, would + base verb." },
  { id: 14, level: "Intermediate", questionText: "They __________ the train if they had left earlier.", options: ["caught", "would catch", "would have caught"], correctAnswerIndex: 2, explanation: "Third Conditional: Unreal past. Structure: would have + past participle, If + Past Perfect." },
  { id: 15, level: "Intermediate", questionText: "If I won the lottery, I __________ a house.", options: ["buy", "would buy", "bought"], correctAnswerIndex: 1, explanation: "Second Conditional: Hypothetical present/future. Structure: If + Past Simple, would + base verb." },
  { id: 16, level: "Intermediate", questionText: "You wouldn’t be tired if you __________ to bed earlier.", options: ["went", "had gone", "go"], correctAnswerIndex: 0, explanation: "Second Conditional: Hypothetical present situation. Structure: would + base verb, If + Past Simple. ('had gone' would pair with 'wouldn't have been tired' for Third Conditional)." },
  { id: 17, level: "Intermediate", questionText: "If she __________ about the meeting, she would have attended.", options: ["knew", "had known", "knows"], correctAnswerIndex: 1, explanation: "Third Conditional: Unreal past. Structure: If + Past Perfect, would have + past participle." },
  { id: 18, level: "Intermediate", questionText: "He’d help you if he __________ time.", options: ["has", "had", "would have"], correctAnswerIndex: 1, explanation: "Second Conditional: Hypothetical present/future. 'He’d' is 'He would'. Structure: would + base verb, If + Past Simple." },
  { id: 19, level: "Intermediate", questionText: "If we hadn’t missed the flight, we __________ in Paris now.", options: ["are", "would be", "had been"], correctAnswerIndex: 1, explanation: "Mixed Conditional: Past unreal condition (hadn't missed) with a present unreal result (would be). Structure: If + Past Perfect, would + base verb." },
  { id: 20, level: "Intermediate", questionText: "I __________ happier if I had a different job.", options: ["am", "would be", "will be"], correctAnswerIndex: 1, explanation: "Second Conditional: Hypothetical present situation. Structure: would + base verb, If + Past Simple." },
  // Advanced Level (Mixed & Inverted Conditionals)
  { id: 21, level: "Advanced", questionText: "If she __________ the instructions, she wouldn’t be confused now.", options: ["read", "had read", "would read"], correctAnswerIndex: 1, explanation: "Mixed Conditional: Past unreal condition (had read) with a present unreal result (wouldn’t be confused)." },
  { id: 22, level: "Advanced", questionText: "__________ earlier, you’d have avoided traffic.", options: ["If you left", "Had you left", "Would you leave"], correctAnswerIndex: 1, explanation: "Inverted Third Conditional: 'Had' replaces 'If' and comes before the subject. Structure: Had + subject + past participle, would have + past participle." },
  { id: 23, level: "Advanced", questionText: "If I were you, I __________ that job offer.", options: ["accept", "would accept", "accepted"], correctAnswerIndex: 1, explanation: "Second Conditional: Common form for giving advice. Structure: If + I were you, I would + base verb." },
  { id: 24, level: "Advanced", questionText: "He’d be healthier today if he __________ smoking years ago.", options: ["quit", "had quit", "would quit"], correctAnswerIndex: 1, explanation: "Mixed Conditional: Past unreal condition (had quit) with a present unreal result (He’d be healthier)." },
  { id: 25, level: "Advanced", questionText: "__________ more careful, the vase wouldn’t have broken.", options: ["If she was", "Had she been", "If she would be"], correctAnswerIndex: 1, explanation: "Inverted Third Conditional: 'Had' replaces 'If'. Structure: Had + subject + past participle, would have + past participle." },
  { id: 26, level: "Advanced", questionText: "If the team __________ better, they might be winning now.", options: ["prepared", "had prepared", "prepares"], correctAnswerIndex: 1, explanation: "Mixed Conditional: Past unreal condition (had prepared) with a present unreal (but possible continuous) result (might be winning)." },
  { id: 27, level: "Advanced", questionText: "__________ a map, we wouldn’t be lost.", options: ["If we brought", "If we had brought", "Had we bring"], correctAnswerIndex: 1, explanation: "Mixed Conditional: Past unreal condition (had brought) with a present unreal result (wouldn't be lost). 'If we had brought' is the standard form here." },
  { id: 28, level: "Advanced", questionText: "If you __________ me, I’d have helped you.", options: ["ask", "asked", "had asked"], correctAnswerIndex: 2, explanation: "Third Conditional: Unreal past condition. Structure: If + Past Perfect, would have + past participle." },
  { id: 29, level: "Advanced", questionText: "She wouldn’t be exhausted if she __________ all night.", options: ["didn’t work", "hadn’t worked", "hasn’t worked"], correctAnswerIndex: 1, explanation: "Mixed Conditional: Past unreal condition (hadn’t worked all night) with a present unreal result (wouldn’t be exhausted)." },
  { id: 30, level: "Advanced", questionText: "__________ the weather, we’d have gone to the beach.", options: ["If it improved", "Had it improved", "Would it improve"], correctAnswerIndex: 1, explanation: "Inverted Third Conditional: 'Had' replaces 'If'. Structure: Had + subject + past participle, would have + past participle." }
];
// --- END OF IF CONDITIONALS QUESTIONS DATA ---

// --- START OF EMAR VOCAB IDIOMS QUESTIONS DATA ---
const emarVocabIdiomsQuestions = [
  { id: 1, level: "Vocabulary", questionText: "What does "to break the ice" mean?", options: ["To shatter ice", "To start a conversation", "To freeze", "To swim in ice"], correctAnswerIndex: 1, explanation: ""To break the ice" means to initiate conversation in a social setting, especially to relieve tension." },
  { id: 2, level: "Vocabulary", questionText: "Match the idiom: "To give someone pumpkins" means ______.", options: ["To reject someone", "To feed someone", "To give gifts", "To plant pumpkins"], correctAnswerIndex: 0, explanation: "This is a less common idiom, but in some contexts, "to give someone pumpkin" can mean to reject or jilt them, particularly in older American slang." },
  { id: 3, level: "Vocabulary", questionText: "What does "to lose face" mean?", options: ["To physically lose one’s face", "To be embarrassed", "To remove a mask", "To lose a game"], correctAnswerIndex: 1, explanation: ""To lose face" means to lose the respect of others or to be humiliated." },
  { id: 4, level: "Vocabulary", questionText: "Identify the idiom: "He has a wide face" means ______.", options: ["His face is broad", "He is well-liked", "He is stubborn", "He is dishonest"], correctAnswerIndex: 1, explanation: "In some cultures or contexts, "to have a wide face" (or similar expressions about face/connections) can imply being well-connected or influential, hence well-liked. This can be region-specific." },
  { id: 5, level: "Vocabulary", questionText: "What does "to save face" mean?", options: ["To protect oneself from embarrassment", "To wash one’s face", "To apply makeup", "To hide emotions"], correctAnswerIndex: 0, explanation: ""To save face" means to avoid or mitigate humiliation or loss of respect." },
  { id: 6, level: "Vocabulary", questionText: "Match the idiom: "To join the ranks of" means ______.", options: ["To climb a mountain", "To become part of a group", "To read a book", "To write a song"], correctAnswerIndex: 1, explanation: ""To join the ranks of" means to become a member of a particular group or organization." },
  { id: 7, level: "Vocabulary", questionText: "What does "to be dead in the water" mean?", options: ["Literally dead in water", "Failing to make progress", "Swimming well", "Boating safely"], correctAnswerIndex: 1, explanation: "If a plan or project is "dead in the water," it has failed and is not expected to make any progress." },
  { id: 8, level: "Vocabulary", questionText: "Identify the idiom: "To ace a test" means ______.", options: ["To fail a test", "To pass a test with excellence", "To avoid taking a test", "To cheat on a test"], correctAnswerIndex: 1, explanation: ""To ace a test" means to perform exceptionally well on it, usually getting a very high score." },
  { id: 9, level: "Vocabulary", questionText: "What does "to back the wrong horse" mean?", options: ["To support a loser", "To ride a horse", "To win a race", "To bet on a winner"], correctAnswerIndex: 0, explanation: ""To back the wrong horse" means to support someone or something that ultimately fails or is unsuccessful." },
  { id: 10, level: "Vocabulary", questionText: "Match the idiom: "To be on a roll" means ______.", options: ["To be in a good streak", "To fall down", "To drive a car", "To eat bread"], correctAnswerIndex: 0, explanation: ""To be on a roll" means to be experiencing a period of success or good luck." },
  { id: 11, level: "Vocabulary", questionText: "What does "to reach out" mean?", options: ["To physically extend one’s hand", "To offer help", "To climb a mountain", "To touch something"], correctAnswerIndex: 1, explanation: "In a communicative sense, "to reach out" means to make an effort to communicate with someone, often to offer or ask for help or to connect." },
  { id: 12, level: "Vocabulary", questionText: "Identify the idiom: "To fit in" means ______.", options: ["To wear tight clothes", "To belong in a group", "To exercise", "To hide"], correctAnswerIndex: 1, explanation: ""To fit in" means to be accepted by a group of people because you are similar to them or they approve of you." },
  { id: 13, level: "Vocabulary", questionText: "What does "to run into" mean?", options: ["To physically collide", "To encounter unexpectedly", "To exercise", "To drive fast"], correctAnswerIndex: 1, explanation: ""To run into" someone means to meet them by chance, without planning to." },
  { id: 14, level: "Vocabulary", questionText: "Match the idiom: "To keep up with" means ______.", options: ["To maintain pace", "To stop", "To fall behind", "To sleep"], correctAnswerIndex: 0, explanation: ""To keep up with" means to stay at the same level or rate as someone or something." },
  { id: 15, level: "Vocabulary", questionText: "What does "to give up" mean?", options: ["To surrender", "To stand up", "To climb", "To shout"], correctAnswerIndex: 0, explanation: ""To give up" means to stop trying to do something; to surrender." },
  { id: 16, level: "Vocabulary", questionText: "Identify the idiom: "To take up" means ______.", options: ["To put down", "To begin a new activity", "To tear", "To fold"], correctAnswerIndex: 1, explanation: ""To take up" something means to start doing it as a hobby or new interest." },
  { id: 17, level: "Vocabulary", questionText: "What does "to carry on" mean?", options: ["To stop", "To continue", "To break", "To hide"], correctAnswerIndex: 1, explanation: ""To carry on" means to continue doing something." },
  { id: 18, level: "Vocabulary", questionText: "Match the idiom: "To put on" means ______.", options: ["To remove", "To wear", "To tear", "To fold"], correctAnswerIndex: 1, explanation: ""To put on" clothing or accessories means to place them on your body." },
  { id: 19, level: "Vocabulary", questionText: "What does "to look up" mean?", options: ["To lower one’s gaze", "To search for information", "To dig", "To hide"], correctAnswerIndex: 1, explanation: ""To look up" information means to search for it in a reference source like a dictionary or database." },
  { id: 20, level: "Vocabulary", questionText: "Identify the idiom: "To back down" means ______.", options: ["To retreat", "To advance", "To climb", "To shout"], correctAnswerIndex: 0, explanation: ""To back down" means to withdraw from a position or argument; to retreat." }
];
// --- END OF EMAR VOCAB IDIOMS QUESTIONS DATA ---

// --- START OF CLAUSES QUESTIONS DATA ---
const clausesQuestions = [
  // Easy Level
  { id: 1, level: "Easy", questionText: "Which part is the main clause? "She smiled when she saw him."", options: ["She smiled", "when she saw him", "She saw him"], correctAnswerIndex: 0, explanation: "A main clause (or independent clause) can stand alone as a complete sentence. 'She smiled' is a complete thought." },
  { id: 2, level: "Easy", questionText: "Identify the subordinate clause: "Because it was raining, we stayed inside."", options: ["we stayed inside", "Because it was raining", "it was raining"], correctAnswerIndex: 1, explanation: "A subordinate clause (or dependent clause) starts with a subordinating conjunction (like 'Because') and cannot stand alone as a sentence." },
  { id: 3, level: "Easy", questionText: "What type of clause is "who lives next door" in "The man who lives next door is friendly."?", options: ["Main clause", "Adjective clause", "Adverb clause"], correctAnswerIndex: 1, explanation: "An adjective clause (or relative clause) modifies a noun or pronoun. 'who lives next door' describes 'The man'." },
  { id: 4, level: "Easy", questionText: "Is "although he was tired" a main or subordinate clause?", options: ["Main clause", "Subordinate clause"], correctAnswerIndex: 1, explanation: "'Although' is a subordinating conjunction, making this a subordinate clause." },
  { id: 5, level: "Easy", questionText: "Which sentence contains an adverb clause? "He reads before he sleeps."", options: ["He reads.", "before he sleeps.", "The whole sentence."], correctAnswerIndex: 1, explanation: "An adverb clause modifies a verb, adjective, or another adverb. 'before he sleeps' tells when he reads." },
  { id: 6, level: "Easy", questionText: "The sentence "I know that he is honest" contains a _____ clause.", options: ["noun", "adjective", "adverb"], correctAnswerIndex: 0, explanation: "A noun clause functions as a noun. 'that he is honest' acts as the direct object of the verb 'know'." },
  { id: 7, level: "Easy", questionText: "Find the main clause: "While I was walking, I saw a bird."", options: ["While I was walking", "I saw a bird", "I was walking"], correctAnswerIndex: 1, explanation: "'I saw a bird' can stand alone as a complete sentence." },
  { id: 8, level: "Easy", questionText: "The clause "where she grew up" in "This is the town where she grew up" is a(n) _____ clause.", options: ["noun", "adjective", "adverb"], correctAnswerIndex: 1, explanation: "It's an adjective clause (relative clause) modifying 'town', specifying which town." },
  { id: 9, level: "Easy", questionText: "Identify the type of clause: "If you study hard..."", options: ["Main clause", "Subordinate (Adverb) clause"], correctAnswerIndex: 1, explanation: "'If' is a subordinating conjunction, introducing a conditional adverb clause." },
  { id: 10, level: "Easy", questionText: "In "The book that I lent you is interesting," what is "that I lent you"?", options: ["Main clause", "Adjective clause", "Noun clause"], correctAnswerIndex: 1, explanation: "It's an adjective clause (relative clause) modifying 'The book'." },
  // Intermediate Level
  { id: 11, level: "Intermediate", questionText: "Which sentence uses a noun clause as a subject?", options: ["What he said was surprising.", "I don't know what he said.", "Tell me what he said."], correctAnswerIndex: 0, explanation: "'What he said' is the subject of the verb 'was'." },
  { id: 12, level: "Intermediate", questionText: "Identify the function of "whoever wins the race" in "A prize will be given to whoever wins the race."", options: ["Subject", "Direct object", "Object of a preposition"], correctAnswerIndex: 2, explanation: "The noun clause 'whoever wins the race' is the object of the preposition 'to'." },
  { id: 13, level: "Intermediate", questionText: "What type of clause is "that the Earth is round" in "The fact that the Earth is round is well known."?", options: ["Appositive clause", "Adjective clause", "Adverb clause"], correctAnswerIndex: 0, explanation: "This is a noun clause acting as an appositive, renaming 'The fact'." },
  { id: 14, level: "Intermediate", questionText: "Which type of clause is underlined? "She left the party _because she was tired_."", options: ["Adjective clause of reason", "Adverb clause of reason", "Noun clause of reason"], correctAnswerIndex: 1, explanation: "It's an adverb clause modifying 'left', explaining why she left." },
  { id: 15, level: "Intermediate", questionText: "In "I'll go where you go," "where you go" is a(n) _____.", options: ["adverb clause of place", "adjective clause of place", "noun clause as object"], correctAnswerIndex: 0, explanation: "It's an adverb clause modifying 'go', indicating the place." },
  { id: 16, level: "Intermediate", questionText: "Identify the restrictive relative clause: "The car that is parked outside is mine."", options: ["The car is mine", "that is parked outside", "is parked outside"], correctAnswerIndex: 1, explanation: "A restrictive relative clause ('that is parked outside') is essential to identify the noun it modifies ('The car')." },
  { id: 17, level: "Intermediate", questionText: "Which sentence contains a non-restrictive relative clause?", options: ["Students who study hard get good grades.", "My brother, who lives in London, is a doctor.", "The book that I lost was valuable."], correctAnswerIndex: 1, explanation: "A non-restrictive clause ('who lives in London') provides extra information and is set off by commas." },
  { id: 18, level: "Intermediate", questionText: "The clause "unless you apologize" is an adverb clause of _____.", options: ["time", "condition", "concession"], correctAnswerIndex: 1, explanation: "'Unless' introduces a condition." },
  { id: 19, level: "Intermediate", questionText: "What is the function of "why he resigned" in "The reason why he resigned is unknown."?", options: ["Adjective clause modifying reason", "Noun clause as predicate nominative", "Adverb clause of reason"], correctAnswerIndex: 0, explanation: "It's an adjective (relative) clause modifying 'reason'. 'Why' can act as a relative adverb here." },
  { id: 20, level: "Intermediate", questionText: "The phrase "so that she could pass" is an adverb clause of _____.", options: ["result", "purpose", "manner"], correctAnswerIndex: 1, explanation: "'So that' introduces a clause of purpose." },
  // Advanced Level
  { id: 21, level: "Advanced", questionText: "Identify the type of clause: "Whether we win or lose, we must try our best."", options: ["Noun clause", "Adverb clause of concession", "Adjective clause"], correctAnswerIndex: 1, explanation: "'Whether...or' introduces an adverb clause of concession, indicating that the main clause holds true regardless of the condition." },
  { id: 22, level: "Advanced", questionText: "In "The problem is that we have no money," the clause "that we have no money" is a _____.", options: ["noun clause as subject complement", "adjective clause", "adverb clause of result"], correctAnswerIndex: 0, explanation: "It's a noun clause functioning as a subject complement (or predicate nominative), renaming 'The problem'." },
  { id: 23, level: "Advanced", questionText: "Which sentence contains a reduced adverb clause? "Walking home, I saw a friend."", options: ["Walking home", "I saw a friend", "The whole sentence"], correctAnswerIndex: 0, explanation: "'Walking home' is a participial phrase, which is a form of reduced adverb clause (originally 'While I was walking home')." },
  { id: 24, level: "Advanced", questionText: "The clause "whose theories revolutionized physics" is an adjective clause modifying _____.", options: ["A scientist", "Physics", "Theories"], correctAnswerIndex: 0, explanation: "This clause would modify a preceding noun like 'Einstein' or 'a scientist'. 'Whose' is a possessive relative pronoun." },
  { id: 25, level: "Advanced", questionText: "What type of clause is "as if he knew the answer" in "He nodded as if he knew the answer."?", options: ["Adverb clause of manner", "Adverb clause of comparison", "Adverb clause of condition"], correctAnswerIndex: 0, explanation: "'As if' introduces an adverb clause of manner, describing how he nodded." },
  { id: 26, level: "Advanced", questionText: "Identify the function of the underlined clause: "_That she would succeed_ was never in doubt."", options: ["Subject", "Object", "Appositive"], correctAnswerIndex: 0, explanation: "The noun clause 'That she would succeed' is the subject of the verb 'was'." },
  { id: 27, level: "Advanced", questionText: "The sentence "He is taller than I am" contains an elliptical adverb clause. What is omitted?", options: ["tall", "taller", "than I am tall"], correctAnswerIndex: 0, explanation: "The full form would be 'He is taller than I am tall'. 'Tall' is omitted from the subordinate clause." },
  { id: 28, level: "Advanced", questionText: "In "Give the award to whomever you think deserves it most," "whomever you think deserves it most" is a _____.", options: ["noun clause, object of preposition", "adjective clause", "adverb clause"], correctAnswerIndex: 0, explanation: "It's a noun clause functioning as the object of the preposition 'to'." },
  { id: 29, level: "Advanced", questionText: "Which of these introduces a concessive clause? "_____ he is rich, he is not happy."", options: ["Because", "Although", "Since"], correctAnswerIndex: 1, explanation: "'Although' is a common subordinating conjunction used to introduce concessive clauses, showing contrast." },
  { id: 30, level: "Advanced", questionText: "The clause "The older he gets" in "The older he gets, the wiser he becomes" is part of a _____ structure.", options: ["correlative conjunction", "comparative conditional", "parallel structure with comparatives"], correctAnswerIndex: 2, explanation: "This is a 'the...the...' comparative structure, indicating a parallel increase or decrease. Both clauses are interdependent." }
];
// --- END OF CLAUSES QUESTIONS DATA ---

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
    } else if (sectionId === 'past-simple') {
      setQuestionsToDisplay(pastSimpleQuestions);
    } else if (sectionId === 'present-progressive') {
      setQuestionsToDisplay(presentProgressiveQuestions);
    } else if (sectionId === 'present-perfect') {
      setQuestionsToDisplay(presentPerfectQuestions);
    } else if (sectionId === 'past-perfect-progressive') {
      setQuestionsToDisplay(pastPerfectProgressiveQuestions);
    } else if (sectionId === 'if-conditionals') {
      setQuestionsToDisplay(ifConditionalsQuestions);
    } else if (sectionId === 'emar-tenses') {
      setQuestionsToDisplay(emarTensesQuestions);
    } else if (sectionId === 'emar-vocab-idioms') {
      setQuestionsToDisplay(emarVocabIdiomsQuestions);
    } else if (sectionId === 'clauses') {
      setQuestionsToDisplay(clausesQuestions);
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
