// Variable Setup - Simple counters for trackers
let currentScore = 0;
let currentStreak = 0;

// FUNCTION 1: Adds typed goal elements to the dynamic list view
function addGoalToList() {
    let currentInput = document.getElementById("goal-input-box").value;

    // Verify input box isn't empty
    if (currentInput == "") {
        alert("Please write a goal description first!");
        return;
    }

    let dynamicList = document.getElementById("my-goals-list");

    // Injects the list row with custom action buttons
    dynamicList.innerHTML += "<li>" + currentInput + 
        " <div>" +
            "<button class='done-btn' onclick='clickDoneBtn(this)'>Done</button> " +
            "<button class='fail-btn' onclick='clickFailBtn(this)'>Missed</button>" +
        "</div>" +
    "</li>";

    // Reset text inside the input slot
    document.getElementById("goal-input-box").value = "";
}

// FUNCTION 2: Handles clicking the "Done" button
function clickDoneBtn(buttonObject) {
    // 1. Give standard 10 points for completing a goal
    let pointsAwarded = 10;

    // STREAK BOOSTER LOGIC: If the user already has a high streak, give them bonus points!
    if (currentStreak >= 3) {
        pointsAwarded = 20; // Double points reward
        alert("🔥 STREAK BOOSTER ACTIVE! You got double points (+20) for this task!");
    } else {
        alert("Goal completed! You got +10 points.");
    }

    currentScore = currentScore + pointsAwarded;
    document.getElementById("score-text").innerText = currentScore;
    
    // 2. Remove the current completed row from the screen
    buttonObject.parentElement.parentElement.remove();

    // 3. DAILY TRACKER CHECK: Look at the list container. 
    // If the list container is completely empty, it means you finished ALL tasks for the day!
    let dynamicList = document.getElementById("my-goals-list");
    
    if (dynamicList.children.length == 0) {
        currentStreak = currentStreak + 1; // Advance the day streak!
        document.getElementById("streak-text").innerText = currentStreak;
        alert("🎉 Awesome! You completed all your goals for today! Your streak is now: " + currentStreak);
    }
}

// FUNCTION 3: Handles clicking the "Missed" button
function clickFailBtn(buttonObject) {
    // 1. Penalise the user by taking away 5 points
    currentScore = currentScore - 5;
    
    // Keep score floor value at zero
    if (currentScore < 0) {
        currentScore = 0; 
    }

    // 2. STREAK RESET LOGIC: Missing a single goal breaks your day's streak down to 0
    currentStreak = 0;

    // 3. Refresh display interface data values
    document.getElementById("score-text").innerText = currentScore;
    document.getElementById("streak-text").innerText = currentStreak;
    
    alert("Oh no! You missed a goal. Points deducted and your daily streak is broken!");
    
    // Remove the row from the screen
    buttonObject.parentElement.parentElement.remove();
}

// FUNCTION 4: Handles purchasing items in the Reward Shop
function buyReward(pointCost, rewardName) {
    // Check if the user has enough points to cover the cost
    if (currentScore >= pointCost) {
        // Subtract point balance
        currentScore = currentScore - pointCost;
        
        // Refresh display score values
        document.getElementById("score-text").innerText = currentScore;
        
        alert("🛒 Purchase Successful! You unlocked: " + rewardName + ". Enjoy your break!");
    } else {
        // Not enough points alert prompt
        alert("🔒 Locked! You don't have enough points yet. Complete more goals!");
    }
}
