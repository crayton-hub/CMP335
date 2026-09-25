function checkWord() {

    // Get the information from the form
    let word = document.getElementById("word").value;
    let algorithm = document.getElementById("algorithm").value;
    let caseOption = document.getElementById("caseOption").value;

    // Make sure a word was entered
    if (word == "") {

        alert("Please enter a word.");

        return;
    }
    // Create a version of the word to use for checking
    let wordToCheck = word;

    // If case insensitive is selected convert the word to lowercase
    if (caseOption == "insensitive") {
        wordToCheck = word.toLowerCase();
    }
    let result;

    // Choose which algorithm to use
    if (algorithm == "1") {

        result = algorithm1(wordToCheck);
        //print out results of alg 1
        document.getElementById("algorithm1List").innerHTML +=
            "<p>" + word + ": " + result + "</p>";

    }
    else if (algorithm == "2") {

        result = algorithm2(wordToCheck);
        //print out results of alg 2
        document.getElementById("algorithm2List").innerHTML +=
            "<p>" + word + ": " + result + "</p>";
    }
    else if (algorithm == "3") {

        result = algorithm3(wordToCheck);
        //print out results of alg 3
        document.getElementById("algorithm3List").innerHTML +=
            "<p>" + word + ": " + result + "</p>";
    }
}



//ALGORITHM 1: Outside → Inside Compare the first character to the last character. Continue moving toward the middle.
function algorithm1(word) {
    //loops through each character
    for (let i = 0; i < word.length / 2; i++) {
        //check if first matches last etc. 
        if (word[i] != word[word.length - 1 - i]) {
            return false;
        }
    }
    return true;
}

//ALGORITHM 2: Reverse → Compare Create a reversed version of the word.Then compare the original word
function algorithm2(word) {

    let reversedWord = "";
    // Start at the last character and move toward first 
    for (let i = word.length - 1; i >= 0; i--) {
        reversedWord += word[i];
    }
    // Compare reversed word with word they entered 
    return word == reversedWord;
}

//ALGORITHM 3: Middle → Outside Start at the middle of the word.
function algorithm3(word) {

    let left;
    let right;
    // If the word has an even number of characters, start between the two middle characters.
    if (word.length % 2 == 0) {

        left = word.length / 2 - 1;
        right = word.length / 2;
    }
    // If the word has an odd number of characters, start at the middle character.
    else {

        left = Math.floor(word.length / 2) - 1;
        right = Math.floor(word.length / 2) + 1;

    }
    // Move outward from the middle

    while (left >= 0 && right < word.length) {

        if (word[left] != word[right]) {

            return false;

        }
        //moving left and right through the word to check next leve 
        left--;
        right++;
    }
    return true;
}
function clearList(algorithm) {
    if (algorithm == 1) {
        document.getElementById("algorithm1List").innerHTML = "";
    }
    if (algorithm == 2) {
        document.getElementById("algorithm2List").innerHTML = "";
    }
    if (algorithm == 3) {
        document.getElementById("algorithm3List").innerHTML = "";
    }
}