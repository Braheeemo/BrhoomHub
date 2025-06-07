# BrhoomHub Application Testing Procedures

This document outlines the testing procedures for the BrhoomHub application, especially after recent changes to authentication, Firestore integration, and routing.

## I. Environment Setup (Local Development)

1.  **Prerequisites:**
    *   Node.js and npm/yarn installed.
    *   Firebase project created with Authentication and Firestore services enabled.
    *   In Firestore, ensure the `users` collection is ready to store documents with fields like `email`, `isApproved` (boolean), and `isAdmin` (boolean).

2.  **Firebase Configuration for Local Use:**
    *   Create a `.env` file in the project root directory (it should be in `.gitignore`).
    *   **Crucial:** Populate this `.env` file with all the required `REACT_APP_FIREBASE_...` variables (e.g., `REACT_APP_FIREBASE_API_KEY`, `REACT_APP_FIREBASE_AUTH_DOMAIN`, etc.) using the actual values from your Firebase project. Refer to the specific list of variables provided separately. The application will not connect to Firebase without these.
    *   Example entry: `REACT_APP_FIREBASE_API_KEY=your_actual_api_key`
        ```
        REACT_APP_FIREBASE_API_KEY=your_actual_api_key
        REACT_APP_FIREBASE_AUTH_DOMAIN=your_actual_auth_domain
        REACT_APP_FIREBASE_PROJECT_ID=your_actual_project_id
        REACT_APP_FIREBASE_STORAGE_BUCKET=your_actual_storage_bucket
        REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_actual_messaging_sender_id
        REACT_APP_FIREBASE_APP_ID=your_actual_app_id
        REACT_APP_FIREBASE_MEASUREMENT_ID=your_actual_measurement_id
        ```
        *Note: `react-scripts` automatically loads environment variables prefixed with `REACT_APP_` from `.env` files.*

## II. Build and Serve Verification

1.  **Install Dependencies:**
    *   Open a terminal in the project root.
    *   Run: `npm install`
    *   *Expected Outcome:* All dependencies from `package.json` are installed without critical errors. A `node_modules` directory is created.

2.  **Create Production Build:**
    *   Run: `npm run build`
    *   *Expected Outcome:* The build process completes successfully. A `build` directory is generated, containing optimized static assets for deployment.

3.  **(Optional) Test Production Build Locally:**
    *   Install `serve` globally if you haven't: `npm install -g serve`
    *   Run: `serve -s build`
    *   Open your browser and navigate to the local address provided by `serve` (e.g., `http://localhost:3000` or another port).
    *   *Expected Outcome:* The application loads and appears functional, mimicking a deployed state.

## III. Functional Testing (Using Development Server)

1.  **Start Development Server:**
    *   Run: `npm start`
    *   *Expected Outcome:* The application opens in your default web browser, typically at `http://localhost:3000`. The console should be free of critical errors related to Firebase initialization or routing.

2.  **Test Case: New User Signup & Approval Workflow:**
    *   **Action:** Navigate to `/signup`. Fill in the form with a new email and password. Submit.
    *   **Expected:**
        *   User is created in Firebase Authentication.
        *   A new document is created in the Firestore `users` collection for this user, with `isApproved` set to `false` and `isAdmin` set to `false`.
        *   User is redirected to the `/waiting-approval` page.
        *   Attempts to navigate to `/courses` or `/admin` should redirect back to `/waiting-approval` or `/login` if rules are strict.
    *   **Action (Manual DB Intervention):** In your Firebase console, find the newly created user in Firestore and change their `isApproved` field to `true`.
    *   **Action:** Log out (if a logout button is available, otherwise clear session/re-login). Log in as the now-approved user.
    *   **Expected:** User is redirected to `/grammar-hub`. They can access `/grammar-hub`, `/quiz/grammar/:sectionId`, `/progress`. They cannot access `/admin` (should redirect to `/grammar-hub` or `/`).

3.  **Test Case: Admin User Workflow:**
    *   **Action (Manual DB Intervention):** In Firestore, set `isApproved` to `true` and `isAdmin` to `true` for a test user.
    *   **Action:** Log in as this admin user.
    *   **Expected:**
        *   User is redirected to `/admin` (or `/` which then goes to `/admin`).
        *   User can access admin-specific routes like `/admin`.
        *   User can also access general approved user routes like `/grammar-hub` and `/courses`.
    *   **Action (Manual DB Intervention):** Change `isAdmin` to `false` for this user in Firestore.
    *   **Action:** Refresh the page or navigate within the app.
    *   **Expected:** User loses access to `/admin` and is redirected appropriately (e.g., to `/grammar-hub`).

4.  **Test Case: Login/Logout and Redirection:**
    *   **Action:** While logged out, try accessing `/grammar-hub` or `/admin`.
    *   **Expected:** Redirected to `/login`.
    *   **Action:** Log in with any user type. Then, try accessing `/login` or `/signup` pages directly via URL.
    *   **Expected:** Redirected away from `/login`/`/signup` to the appropriate dashboard/page (e.g., `/grammar-hub`, `/waiting-approval`, or `/admin`).
    *   **Action:** Log out.
    *   **Expected:** User is redirected to `/login`. All privileged access is revoked.

## IV. General Checks
*   Open the browser's developer console. Check for any errors, especially related to Firebase, routing, or rendering.
*   **Firebase Initialization:** Open the browser's developer console. Check for any errors related to Firebase initialization (e.g., "Firebase: Error (auth/invalid-api-key)"). Successful initialization (no specific Firebase errors) indicates that the environment variables are likely loaded and processed correctly, especially during local testing with a `.env` file.
*   **Firebase Analytics (Optional Check):** If Firebase Analytics is enabled, you might observe network requests to `google-analytics.com` or `firebaseanalytics.googleapis.com` in the browser's "Network" tab during application use. This is an indirect way to see if Analytics is attempting to send data.
*   Verify that the `Watermark` component is visible on all pages.
*   Click through various links and navigation items to ensure routes are working as expected.

---

**V. Grammar Hub & Dynamic Quiz Page Testing:**

1.  **Accessing Grammar Hub:**
    *   **Action:** Log in as an approved, non-admin user.
    *   **Expected:**
        *   User should be redirected to `/grammar-hub`.
        *   The "Grammar Hub" title should be visible.
        *   A list of grammar sections (Present Simple, Past Simple, etc.) should be displayed as clickable items.
    *   **Action:** While logged in as an approved, non-admin user, try to navigate directly to `/` (root path).
    *   **Expected:** User should be redirected to `/grammar-hub`.

2.  **Grammar Section Items Verification:**
    *   **Action:** On the `/grammar-hub` page, inspect the list of grammar sections.
    *   **Expected:**
        *   All specified grammar sections are present: Present Simple, Past Simple, Present Progressive, Present Perfect, Past Perfect, Present Perfect Progressive, Clauses, If Conditionals, Passive Voice, Reported Speech, Prepositions, Phrasal Verbs.
        *   Each section name should be clearly displayed.
        *   Items should be visually responsive on hover (if applicable based on styling).

3.  **Navigation to Grammar Quiz Pages:**
    *   **Action:** From the `/grammar-hub` page, click on one of the grammar section items (e.g., "Present Simple").
    *   **Expected:**
        *   User is navigated to the corresponding dynamic quiz page (e.g., `/quiz/grammar/present-simple`).
        *   The page title should correctly display "Quiz for Present Simple" (or the name of the clicked section).
    *   **Action:** Repeat for a few different grammar sections.
    *   **Expected:** Navigation and dynamic page titles work correctly for each selected section.

4.  **Grammar Quiz Page Structure Verification:**
    *   **Action:** On any ` /quiz/grammar/:sectionId` page (before full quiz implementation):
    *   **Expected:**
        *   The main title "Quiz for [Section Name]" is displayed.
        *   A placeholder area for "Quiz Area" indicates questions will appear.
        *   A placeholder for "Answer Log" indicates results will appear.
        *   A button "View Overall Progress" links to `/progress`.
    *   **Action:** Click the "View Overall Progress" button.
    *   **Expected:** User is navigated to the `/progress` page.

5.  **Redirection for Non-Approved/Non-Logged-In Users (Grammar Quiz Page):**
    *   **Action:** Log out. Try to directly access a grammar quiz page URL (e.g., `/quiz/grammar/present-simple`).
    *   **Expected:** User is redirected to `/login`.
    *   **Action:** Log in as an unapproved user. Try to directly access a grammar quiz page URL.
    *   **Expected:** User is redirected to `/waiting-approval`.

6.  **Verification of Updated Default Redirections (General):**
    *   **Action:** Log in as an approved, non-admin user.
    *   **Expected:** Default redirect is to `/grammar-hub`.
    *   **Action:** Sign up as a new user. After signup, the flow should eventually lead an approved user to `/grammar-hub` as their main page (potentially after `/waiting-approval` if that step is involved).
    *   **Action:** Attempt to access `/admin` as an approved, non-admin user.
    *   **Expected:** Redirect to `/grammar-hub`.
    *   **Action (Manual DB Intervention):** In your Firebase console, find the newly created user in Firestore and change their `isApproved` field to `true`.
    *   **Action:** Log out (if a logout button is available, otherwise clear session/re-login). Log in as the now-approved user.
    *   **Expected:** User is redirected to `/grammar-hub` (previously `/courses`). They can access `/grammar-hub`, `/quiz/grammar/:sectionId`, `/progress`. They cannot access `/admin` (should redirect to `/grammar-hub`).
    *   **Action (Manual DB Intervention):** In Firestore, set `isApproved` to `true` and `isAdmin` to `true` for a test user.
    *   **Action:** Log in as this admin user.
    *   **Expected:** User can also access general approved user routes like `/grammar-hub` (previously `/courses`).
    *   **Action (Manual DB Intervention):** Change `isAdmin` to `false` for this user in Firestore.
    *   **Action:** Refresh the page or navigate within the app.
    *   **Expected:** User loses access to `/admin` and is redirected appropriately (e.g., to `/grammar-hub`).
    *   **Action:** While logged out, try accessing `/grammar-hub`.
    *   **Expected:** Redirected to `/login`.
    *   **Action:** Log in with any user type. Then, try accessing `/login` or `/signup` pages directly via URL.
    *   **Expected:** Redirected away from `/login`/`/signup` to the appropriate dashboard/page (e.g., `/grammar-hub`, `/waiting-approval`, or `/admin`).

*Note: Some tests in section III were updated to reflect `/grammar-hub` as the new default instead of `/courses`. The "Grammar Quiz Page Structure Verification" in section V was updated to reflect pre-full-quiz-implementation state.*

---

**VI. Visual Theme and UI Polish Verification:**

1.  **Color Palette Application:**
    *   **Action:** Navigate through all key pages (Login, Signup, Waiting Approval, Grammar Hub, Grammar Quiz Pages, Admin Dashboard, Progress Page).
    *   **Expected:**
        *   Overall page background should be the light lavender (`#F5F4FF`).
        *   Primary actions, headers, and key accents should use the deep lavender purple (`#6A509C`).
        *   Secondary elements (e.g., outlined buttons, some highlights) should use the soft periwinkle (`#A78BFA`).
        *   Text should be dark gray (`#1A1A1A`) for high readability.
        *   Success messages or specific accents should use the teal green (`#4ECDC4`).

2.  **Typography Verification:**
    *   **Action:** Inspect text on various pages.
    *   **Expected:**
        *   Headings (H1-H6) should render in "Montserrat" font.
        *   Body text, labels, and other general text should render in "Lato" font.
        *   Font weights should generally align with the theme (bold for Montserrat headers).

3.  **Card and Paper Styling:**
    *   **Action:** Observe card-like elements (e.g., on Grammar Hub, auth pages, quiz page content areas).
    *   **Expected:**
        *   Cards/Paper components should have a white or very light soft-gray background (`#FFFFFF` or similar).
        *   Corners should be rounded (8px radius).
        *   Subtle shadows should be present as per the theme.

4.  **Button Styling:**
    *   **Action:** Examine buttons across the application.
    *   **Expected:**
        *   Primary buttons: Deep lavender purple background (`#6A509C`) with white text, and default elevation.
        *   Secondary buttons (outlined): Soft periwinkle (`#A78BFA`) border and text.
        *   Buttons should have `textTransform: 'none'`.
        *   Hover states for buttons should match the theme's definitions (darker primary, slightly filled secondary outlined).

5.  **Interactive Feedback:**
    *   **Action:** Interact with cards on Grammar Hub and buttons.
    *   **Expected:**
        *   Grammar Hub cards should have a scale effect on hover.
        *   Buttons should exhibit ripple effects and themed hover states.

6.  **Layout and Spacing:**
    *   **Action:** Assess the overall layout of key pages.
    *   **Expected:**
        *   Generous padding and spacing should be used to avoid clutter and provide an "airy," clean feel.
        *   Content should be well-centered and aligned.

7.  **Iconography:**
    *   **Action:** Check elements where icons were added (Logout button, Admin approve button).
    *   **Expected:** Icons should be visible and appropriately aligned with the button text.

8.  **Overall Aesthetic:**
    *   **Action:** Consider the overall look and feel.
    *   **Expected:** The UI should feel more polished, modern, and aligned with the "elegant" and "ADHD-friendly" (clear, uncluttered) design goals, incorporating the new theme.

---

**VII. Interactive Quiz Functionality - Present Simple (`/quiz/grammar/present-simple`):**

1.  **Initial Quiz Page Load:**
    *   **Action:** Navigate to the "Present Simple" quiz from the Grammar Hub, or directly access `/quiz/grammar/present-simple`.
    *   **Expected:**
        *   The page title "Quiz for Present Simple" is displayed.
        *   The first question of the "Present Simple" set is displayed clearly.
        *   The question counter (e.g., "Question 1 of 30") is visible and accurate.
        *   Four multiple-choice options are displayed as clickable buttons, styled according to the theme (e.g., outlined, full-width).
        *   Initially, no option is selected.
        *   The "Submit" button is visible and enabled (or becomes enabled once an option is selected, if that's the design).
        *   "Next Question" and "Show Results" buttons are initially hidden.
        *   No feedback `Alert` message is visible.

2.  **Option Selection:**
    *   **Action:** Click on one of the option buttons for the current question.
    *   **Expected:**
        *   The selected option button should visually change to indicate selection (e.g., border color changes to primary, border thickens, or a subtle background change as per theme).
        *   If the "Submit" button was disabled, it should now be enabled.
        *   No other options should change appearance yet.

3.  **Answer Submission & Immediate Feedback:**
    *   **Action:** With an option selected, click the "Submit" button.
    *   **Expected:**
        *   The "Submit" button becomes hidden or disabled.
        *   All option buttons for the current question become disabled.
        *   The correctly answered option button turns green (or themed success color).
        *   If an incorrect option was selected by the user, their selected option turns red (or themed error color).
        *   An `Alert` message appears:
            *   If correct: Shows a success message (e.g., "Correct!") and the explanation for the answer.
            *   If incorrect: Shows an error/warning message (e.g., "Not quite. The correct answer was: [Correct Option Text].") and the explanation.
        *   The "Next Question" button appears (if not the last question).
        *   The "Show Results" button appears (if it is the last question and answer submitted).
        *   The score should be updated internally (not necessarily displayed yet).

4.  **Navigating to Next Question:**
    *   **Action:** Click the "Next Question" button.
    *   **Expected:**
        *   The next question and its options are displayed.
        *   The question counter updates.
        *   Option selection state is reset (no option selected).
        *   The immediate feedback `Alert` from the previous question is hidden.
        *   The "Submit" button is visible and enabled (or enabled upon option selection).
        *   "Next Question" / "Show Results" buttons are hidden until the new answer is submitted.

5.  **Completing the Quiz & Showing Results:**
    *   **Action:** Answer all questions, proceeding through "Next Question". On the last question, after submitting the answer, click the "Show Results" button.
    *   **Expected:**
        *   The quiz interface (questions, options) is replaced by a "Quiz Results" view.
        *   A summary of the final score is displayed prominently (e.g., "You scored X out of 30").
        *   A detailed "Answer Log" is displayed:
            *   Each item in the log corresponds to a question from the quiz.
            *   Each item clearly shows:
                *   The question text.
                *   The user's selected answer.
                *   The correct answer.
                *   The explanation for the answer.
                *   A clear visual indication (e.g., icon, color) of whether the user's answer was correct or incorrect for that question. (Verify background colors from theme are used for log items).
        *   Buttons like "Back to Grammar Hub" and "View Overall Progress" are visible and functional.

6.  **Attempting Quiz for Other Sections (Non-"present-simple"):**
    *   **Action:** Manually navigate to a quiz URL for a section that doesn't have questions yet (e.g., `/quiz/grammar/past-simple` before its questions were added, or another section).
    *   **Expected:**
        *   The page should display a message like "Quiz not available for this section" or "Quiz questions for '[Section Name]' will appear here soon."
        *   It should not crash or show an empty quiz interface.

7.  **UI and Theme Consistency:**
    *   **Action:** Throughout the quiz-taking process.
    *   **Expected:**
        *   All text (questions, options, feedback, logs) uses the themed fonts (Montserrat for headers, Lato for body).
        *   Colors used for feedback (green/success, red/error), buttons, and backgrounds match the application theme.
        *   Spacing and layout are clean and user-friendly.
        *   Option buttons are easily clickable and readable.

---

**VIII. Interactive Quiz Functionality - Past Simple (`/quiz/grammar/past-simple`):**

1.  **Initial Quiz Page Load:**
    *   **Action:** Navigate to the "Past Simple" quiz from the Grammar Hub, or directly access `/quiz/grammar/past-simple`.
    *   **Expected:**
        *   The page title "Quiz for Past Simple" is displayed.
        *   The first question of the "Past Simple" set is displayed clearly.
        *   The question counter (e.g., "Question 1 of 30") is visible and accurate.
        *   Four multiple-choice options are displayed as clickable buttons, styled according to the theme.
        *   Initially, no option is selected.
        *   The "Submit" button is visible and enabled (or becomes enabled once an option is selected).
        *   "Next Question" / "Show Results" buttons are initially hidden.
        *   No feedback `Alert` message is visible.

2.  **Option Selection:**
    *   **Action:** Click on one of the option buttons for the current question.
    *   **Expected:**
        *   The selected option button should visually change to indicate selection (e.g., themed border highlight).
        *   If the "Submit" button was disabled, it should now be enabled.

3.  **Answer Submission & Immediate Feedback:**
    *   **Action:** With an option selected, click the "Submit" button.
    *   **Expected:**
        *   The "Submit" button becomes hidden or disabled.
        *   All option buttons for the current question become disabled.
        *   The correctly answered option button turns green (themed success color).
        *   If an incorrect option was selected, their selected option turns red (themed error color).
        *   An `Alert` message appears with correctness and explanation.
        *   The appropriate control button ("Next Question" or "Show Results") appears.
        *   (If implemented) The "live wrong answer log" updates if the answer was incorrect.
        *   (If implemented) Auto-advance timer starts if enabled.

4.  **Navigating to Next Question (Manual or Auto):**
    *   **Action:** Click the "Next Question" button, or allow auto-advance timer to elapse.
    *   **Expected:**
        *   The next question and its options are displayed.
        *   The question counter updates.
        *   Option selection state is reset.
        *   The immediate feedback `Alert` from the previous question is hidden.
        *   The "Submit" button is visible.
        *   "Next Question" / "Show Results" buttons are hidden until the new answer is submitted.

5.  **Completing the Quiz & Showing Results:**
    *   **Action:** Answer all questions. On the last question, after submitting, click "Show Results" or let auto-advance trigger it.
    *   **Expected:**
        *   The quiz interface is replaced by a "Quiz Results" view.
        *   A summary of the final score is displayed.
        *   A detailed "Answer Log" is displayed with all questions, user answers, correct answers, explanations, and correctness indicators.
        *   Buttons like "Back to Grammar Hub" and "View Overall Progress" are visible and functional.

6.  **UI and Theme Consistency:**
    *   **Action:** Throughout the "Past Simple" quiz.
    *   **Expected:**
        *   All text and colors match the application theme.
        *   Layout is clean and user-friendly.
        *   Interactive elements behave as expected.
        *   Quiz settings (e.g., auto-advance toggle) function correctly for this quiz.

---

**IX. Interactive Quiz Functionality - Present Progressive (`/quiz/grammar/present-progressive`):**

1.  **Initial Quiz Page Load:**
    *   **Action:** Navigate to the "Present Progressive" quiz from the Grammar Hub, or directly access `/quiz/grammar/present-progressive`.
    *   **Expected:**
        *   The page title "Quiz for Present Progressive" is displayed.
        *   The first question of the "Present Progressive" set is displayed clearly.
        *   The question counter (e.g., "Question 1 of 30") is visible and accurate.
        *   Four multiple-choice options are displayed as clickable buttons, styled according to the theme.
        *   Initially, no option is selected.
        *   The "Submit" button is visible and enabled (or becomes enabled once an option is selected).
        *   "Next Question" / "Show Results" buttons are initially hidden.
        *   No feedback `Alert` message is visible.
        *   (If implemented) Quiz settings like "Auto-advance" toggle are present.

2.  **Option Selection:**
    *   **Action:** Click on one of the option buttons for the current question.
    *   **Expected:**
        *   The selected option button should visually change to indicate selection (e.g., themed border highlight).
        *   If the "Submit" button was disabled, it should now be enabled.

3.  **Answer Submission & Immediate Feedback:**
    *   **Action:** With an option selected, click the "Submit" button.
    *   **Expected:**
        *   The "Submit" button becomes hidden or disabled.
        *   All option buttons for the current question become disabled.
        *   The correctly answered option button turns green (themed success color).
        *   If an incorrect option was selected, their selected option turns red (themed error color).
        *   An `Alert` message appears with correctness and explanation relevant to Present Progressive.
        *   The appropriate control button ("Next Question" or "Show Results") appears.
        *   (If implemented) The "live wrong answer log" updates if the answer was incorrect.
        *   (If implemented) Auto-advance timer starts if enabled in settings.

4.  **Navigating to Next Question (Manual or Auto):**
    *   **Action:** Click the "Next Question" button, or allow auto-advance timer to elapse (if enabled and applicable).
    *   **Expected:**
        *   The next question and its options are displayed.
        *   The question counter updates.
        *   Option selection state is reset.
        *   The immediate feedback `Alert` from the previous question is hidden.
        *   The "Submit" button is visible.
        *   "Next Question" / "Show Results" buttons are hidden until the new answer is submitted.

5.  **Completing the Quiz & Showing Results:**
    *   **Action:** Answer all questions. On the last question, after submitting, click "Show Results" or let auto-advance trigger it.
    *   **Expected:**
        *   The quiz interface is replaced by a "Quiz Results" view.
        *   A summary of the final score is displayed.
        *   A detailed "Answer Log" is displayed with all questions, user answers, correct answers, explanations for Present Progressive, and correctness indicators.
        *   Buttons like "Back to Grammar Hub" and "View Overall Progress" are visible and functional.

6.  **Attempting Quiz for Other Sections (Non-"present-progressive" but also not implemented):**
    *   **Action:** Manually navigate to a quiz URL for a section that doesn't have questions yet (e.g., `/quiz/grammar/future-simple`).
    *   **Expected:**
        *   The page should display a message like "Quiz not available for this section" or "Quiz questions for 'Future Simple' will appear here soon."

7.  **UI and Theme Consistency:**
    *   **Action:** Throughout the "Present Progressive" quiz.
    *   **Expected:**
        *   All text and colors match the application theme.
        *   Layout is clean and user-friendly.
        *   Interactive elements behave as expected.
        *   (If implemented) Quiz settings (e.g., auto-advance toggle) function correctly for this quiz.

---

**X. Interactive Quiz Functionality - Present Perfect (`/quiz/grammar/present-perfect`):**

1.  **Initial Quiz Page Load:**
    *   **Action:** Navigate to the "Present Perfect" quiz from the Grammar Hub, or directly access `/quiz/grammar/present-perfect`.
    *   **Expected:**
        *   The page title "Quiz for Present Perfect" is displayed.
        *   The first question of the "Present Perfect" set is displayed clearly.
        *   The question counter (e.g., "Question 1 of 30") is visible and accurate.
        *   Four multiple-choice options are displayed as clickable buttons, styled according to the theme.
        *   Initially, no option is selected.
        *   The "Submit" button is visible and enabled (or becomes enabled once an option is selected).
        *   "Next Question" / "Show Results" buttons are initially hidden.
        *   No feedback `Alert` message is visible.
        *   (If implemented) Quiz settings like "Auto-advance" toggle are present.

2.  **Option Selection:**
    *   **Action:** Click on one of the option buttons for the current question.
    *   **Expected:**
        *   The selected option button should visually change to indicate selection (e.g., themed border highlight).
        *   If the "Submit" button was disabled, it should now be enabled.

3.  **Answer Submission & Immediate Feedback:**
    *   **Action:** With an option selected, click the "Submit" button.
    *   **Expected:**
        *   The "Submit" button becomes hidden or disabled.
        *   All option buttons for the current question become disabled.
        *   The correctly answered option button turns green (themed success color).
        *   If an incorrect option was selected, their selected option turns red (themed error color).
        *   An `Alert` message appears with correctness and explanation relevant to Present Perfect.
        *   The appropriate control button ("Next Question" or "Show Results") appears.
        *   (If implemented) The "live wrong answer log" updates if the answer was incorrect.
        *   (If implemented) Auto-advance timer starts if enabled in settings.

4.  **Navigating to Next Question (Manual or Auto):**
    *   **Action:** Click the "Next Question" button, or allow auto-advance timer to elapse (if enabled and applicable).
    *   **Expected:**
        *   The next question and its options are displayed.
        *   The question counter updates.
        *   Option selection state is reset.
        *   The immediate feedback `Alert` from the previous question is hidden.
        *   The "Submit" button is visible.
        *   "Next Question" / "Show Results" buttons are hidden until the new answer is submitted.

5.  **Completing the Quiz & Showing Results:**
    *   **Action:** Answer all questions. On the last question, after submitting, click "Show Results" or let auto-advance trigger it.
    *   **Expected:**
        *   The quiz interface is replaced by a "Quiz Results" view.
        *   A summary of the final score is displayed.
        *   A detailed "Answer Log" is displayed with all questions, user answers, correct answers, explanations for Present Perfect, and correctness indicators.
        *   Buttons like "Back to Grammar Hub" and "View Overall Progress" are visible and functional.

6.  **UI and Theme Consistency:**
    *   **Action:** Throughout the "Present Perfect" quiz.
    *   **Expected:**
        *   All text and colors match the application theme.
        *   Layout is clean and user-friendly.
        *   Interactive elements behave as expected.
        *   (If implemented) Quiz settings (e.g., auto-advance toggle) function correctly for this quiz.

---

**XI. Interactive Quiz Functionality - Present Perfect Progressive (`/quiz/grammar/present-perfect-progressive`):**

1.  **Initial Quiz Page Load:**
    *   **Action:** Navigate to the "Present Perfect Progressive" quiz from the Grammar Hub, or directly access `/quiz/grammar/present-perfect-progressive`.
    *   **Expected:**
        *   The page title "Quiz for Present Perfect Progressive" is displayed.
        *   The first question of the "Present Perfect Progressive" set is displayed clearly.
        *   The question counter (e.g., "Question 1 of 30") is visible and accurate.
        *   Four multiple-choice options are displayed as clickable buttons, styled according to the theme.
        *   Initially, no option is selected.
        *   The "Submit" button is visible and enabled (or becomes enabled once an option is selected).
        *   "Next Question" / "Show Results" buttons are initially hidden.
        *   No feedback `Alert` message is visible.
        *   (If implemented) Quiz settings like "Auto-advance" toggle are present.

2.  **Option Selection:**
    *   **Action:** Click on one of the option buttons for the current question.
    *   **Expected:**
        *   The selected option button should visually change to indicate selection (e.g., themed border highlight).
        *   If the "Submit" button was disabled, it should now be enabled.

3.  **Answer Submission & Immediate Feedback:**
    *   **Action:** With an option selected, click the "Submit" button.
    *   **Expected:**
        *   The "Submit" button becomes hidden or disabled.
        *   All option buttons for the current question become disabled.
        *   The correctly answered option button turns green (themed success color).
        *   If an incorrect option was selected, their selected option turns red (themed error color).
        *   An `Alert` message appears with correctness and explanation relevant to Present Perfect Progressive.
        *   The appropriate control button ("Next Question" or "Show Results") appears.
        *   (If implemented) The "live wrong answer log" updates if the answer was incorrect.
        *   (If implemented) Auto-advance timer starts if enabled in settings.

4.  **Navigating to Next Question (Manual or Auto):**
    *   **Action:** Click the "Next Question" button, or allow auto-advance timer to elapse (if enabled and applicable).
    *   **Expected:**
        *   The next question and its options are displayed.
        *   The question counter updates.
        *   Option selection state is reset.
        *   The immediate feedback `Alert` from the previous question is hidden.
        *   The "Submit" button is visible.
        *   "Next Question" / "Show Results" buttons are hidden until the new answer is submitted.

5.  **Completing the Quiz & Showing Results:**
    *   **Action:** Answer all questions. On the last question, after submitting, click "Show Results" or let auto-advance trigger it.
    *   **Expected:**
        *   The quiz interface is replaced by a "Quiz Results" view.
        *   A summary of the final score is displayed.
        *   A detailed "Answer Log" is displayed with all questions, user answers, correct answers, explanations for Present Perfect Progressive, and correctness indicators.
        *   Buttons like "Back to Grammar Hub" and "View Overall Progress" are visible and functional.

6.  **UI and Theme Consistency:**
    *   **Action:** Throughout the "Present Perfect Progressive" quiz.
    *   **Expected:**
        *   All text and colors match the application theme.
        *   Layout is clean and user-friendly.
        *   Interactive elements behave as expected.
        *   (If implemented) Quiz settings (e.g., auto-advance toggle) function correctly for this quiz.

---

**XII. Interactive Quiz Functionality - Past Perfect (`/quiz/grammar/past-perfect`):**

1.  **Initial Quiz Page Load:**
    *   **Action:** Navigate to the "Past Perfect" quiz from the Grammar Hub, or directly access `/quiz/grammar/past-perfect`.
    *   **Expected:**
        *   The page title "Quiz for Past Perfect" is displayed.
        *   The first question of the "Past Perfect" set is displayed clearly.
        *   The question counter (e.g., "Question 1 of 30") is visible and accurate.
        *   Multiple-choice options are displayed as clickable buttons, styled according to the theme.
        *   Initially, no option is selected.
        *   The "Submit" button is visible and enabled (or becomes enabled once an option is selected).
        *   "Next Question" / "Show Results" buttons are initially hidden.
        *   No feedback `Alert` message is visible.
        *   (If implemented) Quiz settings like "Auto-advance" toggle are present.

2.  **Option Selection:**
    *   **Action:** Click on one of the option buttons for the current question.
    *   **Expected:**
        *   The selected option button should visually change to indicate selection (e.g., themed border highlight).
        *   If the "Submit" button was disabled, it should now be enabled.

3.  **Answer Submission & Immediate Feedback:**
    *   **Action:** With an option selected, click the "Submit" button.
    *   **Expected:**
        *   The "Submit" button becomes hidden or disabled.
        *   All option buttons for the current question become disabled.
        *   The correctly answered option button turns green (themed success color).
        *   If an incorrect option was selected, their selected option turns red (themed error color).
        *   An `Alert` message appears with correctness and explanation relevant to Past Perfect.
        *   The appropriate control button ("Next Question" or "Show Results") appears.
        *   (If implemented) The "live wrong answer log" updates if the answer was incorrect.
        *   (If implemented) Auto-advance timer starts if enabled in settings.

4.  **Navigating to Next Question (Manual or Auto):**
    *   **Action:** Click the "Next Question" button, or allow auto-advance timer to elapse (if enabled and applicable).
    *   **Expected:**
        *   The next question and its options are displayed.
        *   The question counter updates.
        *   Option selection state is reset.
        *   The immediate feedback `Alert` from the previous question is hidden.
        *   The "Submit" button is visible.
        *   "Next Question" / "Show Results" buttons are hidden until the new answer is submitted.

5.  **Completing the Quiz & Showing Results:**
    *   **Action:** Answer all questions. On the last question, after submitting, click "Show Results" or let auto-advance trigger it.
    *   **Expected:**
        *   The quiz interface is replaced by a "Quiz Results" view.
        *   A summary of the final score is displayed.
        *   A detailed "Answer Log" is displayed with all questions, user answers, correct answers, explanations for Past Perfect, and correctness indicators.
        *   Buttons like "Back to Grammar Hub" and "View Overall Progress" are visible and functional.

6.  **UI and Theme Consistency:**
    *   **Action:** Throughout the "Past Perfect" quiz.
    *   **Expected:**
        *   All text and colors match the application theme.
        *   Layout is clean and user-friendly.
        *   Interactive elements behave as expected.
        *   (If implemented) Quiz settings (e.g., auto-advance toggle) function correctly for this quiz.

---

**XIII. Interactive Quiz Functionality - Past Perfect Progressive (`/quiz/grammar/past-perfect-progressive`):**

1.  **Initial Quiz Page Load:**
    *   **Action:** Navigate to the "Past Perfect Progressive" quiz from the Grammar Hub, or directly access `/quiz/grammar/past-perfect-progressive`.
    *   **Expected:**
        *   The page title "Quiz for Past Perfect Progressive" is displayed.
        *   The first question of the "Past Perfect Progressive" set is displayed clearly.
        *   The question counter (e.g., "Question 1 of 30") is visible and accurate.
        *   Multiple-choice options are displayed as clickable buttons, styled according to the theme.
        *   Initially, no option is selected.
        *   The "Submit" button is visible and enabled (or becomes enabled once an option is selected).
        *   "Next Question" / "Show Results" buttons are initially hidden.
        *   No feedback `Alert` message is visible.
        *   (If implemented) Quiz settings like "Auto-advance" toggle are present.

2.  **Option Selection:**
    *   **Action:** Click on one of the option buttons for the current question.
    *   **Expected:**
        *   The selected option button should visually change to indicate selection (e.g., themed border highlight).
        *   If the "Submit" button was disabled, it should now be enabled.

3.  **Answer Submission & Immediate Feedback:**
    *   **Action:** With an option selected, click the "Submit" button.
    *   **Expected:**
        *   The "Submit" button becomes hidden or disabled.
        *   All option buttons for the current question become disabled.
        *   The correctly answered option button turns green (themed success color).
        *   If an incorrect option was selected, their selected option turns red (themed error color).
        *   An `Alert` message appears with correctness and explanation relevant to Past Perfect Progressive.
        *   The appropriate control button ("Next Question" or "Show Results") appears.
        *   (If implemented) The "live wrong answer log" updates if the answer was incorrect.
        *   (If implemented) Auto-advance timer starts if enabled in settings.

4.  **Navigating to Next Question (Manual or Auto):**
    *   **Action:** Click the "Next Question" button, or allow auto-advance timer to elapse (if enabled and applicable).
    *   **Expected:**
        *   The next question and its options are displayed.
        *   The question counter updates.
        *   Option selection state is reset.
        *   The immediate feedback `Alert` from the previous question is hidden.
        *   The "Submit" button is visible.
        *   "Next Question" / "Show Results" buttons are hidden until the new answer is submitted.

5.  **Completing the Quiz & Showing Results:**
    *   **Action:** Answer all questions. On the last question, after submitting, click "Show Results" or let auto-advance trigger it.
    *   **Expected:**
        *   The quiz interface is replaced by a "Quiz Results" view.
        *   A summary of the final score is displayed.
        *   A detailed "Answer Log" is displayed with all questions, user answers, correct answers, explanations for Past Perfect Progressive, and correctness indicators.
        *   Buttons like "Back to Grammar Hub" and "View Overall Progress" are visible and functional.

6.  **UI and Theme Consistency:**
    *   **Action:** Throughout the "Past Perfect Progressive" quiz.
    *   **Expected:**
        *   All text and colors match the application theme.
        *   Layout is clean and user-friendly.
        *   Interactive elements behave as expected.
        *   (If implemented) Quiz settings (e.g., auto-advance toggle) function correctly for this quiz.

[end of TESTING_PROCEDURES.md]
