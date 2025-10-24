// This ensures the script runs only after the HTML document is fully loaded.
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Get references to HTML elements ---
    // We need to connect our script to the HTML elements on the page.
    // NOTE: Make sure your index.html has elements with these EXACT IDs.
    // If your IDs are different, change them here.
    const problemElement = document.getElementById('problem-display');
    const answerInput = document.getElementById('answer-input');
    const submitButton = document.getElementById('submit-button');
    const feedbackElement = document.getElementById('feedback-message');

    // --- 2. State variables ---
    // We need to store the two numbers of the current problem.
    let currentNum1 = 0;
    let currentNum2 = 0;
    let currentAnswer = 0;

    // --- 3. Function to generate a new problem ---
    function generateNewProblem() {
        // Generate two random numbers between 2 and 9 (for a standard multiplication table).
        currentNum1 = Math.floor(Math.random() * 8) + 2; // 2 ~ 9
        currentNum2 = Math.floor(Math.random() * 8) + 2; // 2 ~ 9
        currentAnswer = currentNum1 * currentNum2;

        // Display the new problem to the user.
        problemElement.textContent = `${currentNum1} x ${currentNum2} = ?`;

        // Clear the previous answer and feedback.
        answerInput.value = '';
        feedbackElement.textContent = '';
        feedbackElement.classList.remove('correct', 'incorrect');

        // Set focus back to the input field for the user.
        answerInput.focus();
    }

    // --- 4. Function to check the user's answer ---
    function checkAnswer() {
        // Get the user's answer from the input box and convert it to a number.
        const userAnswer = parseInt(answerInput.value, 10);

        // Check if the input is a valid number.
        if (isNaN(userAnswer)) {
            feedbackElement.textContent = '숫자를 입력해 주세요!';
            feedbackElement.className = 'feedback incorrect';
            answerInput.value = '';
            answerInput.focus();
            return; // Stop the function here.
        }

        // Check if the answer is correct.
        if (userAnswer === currentAnswer) {
            // Correct answer
            feedbackElement.textContent = `정답입니다! ${currentNum1} x ${currentNum2} = ${currentAnswer}`;
            feedbackElement.className = 'feedback correct';

            // Wait for a moment, then show a new problem.
            setTimeout(generateNewProblem, 1500); // 1.5초 후에 새 문제
        } else {
            // Incorrect answer
            feedbackElement.textContent = '아쉽네요, 다시 시도해 보세요!';
            feedbackElement.className = 'feedback incorrect';
            answerInput.value = '';
            answerInput.focus();
        }
    }

    // --- 5. Add Event Listeners ---
    // We need to make the "submit" button and "Enter" key work.

    // Run checkAnswer() when the submit button is clicked.
    if (submitButton) {
        submitButton.addEventListener('click', checkAnswer);
    } else {
        console.error('Error: "submit-button" ID를 가진 요소를 찾을 수 없습니다.');
    }

    // Run checkAnswer() when the user presses 'Enter' in the input field.
    if (answerInput) {
        answerInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                checkAnswer();
            }
        });
    } else {
        console.error('Error: "answer-input" ID를 가진 요소를 찾을 수 없습니다.');
    }
    
    // --- 6. Initial setup ---
    // Generate the very first problem when the page loads.
    if (problemElement && answerInput && feedbackElement) {
        generateNewProblem();
    } else {
        console.error('Error: 필수 HTML 요소 (problem, input or feedback)가 없습니다.');
    }

});
