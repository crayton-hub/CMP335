
/*let myList1 = [];


function validateANDadd() {

    // Get the values from the form
    let lownum = Number(document.forms["myForm"]["low"].value);
    let highnum = Number(document.forms["myForm"]["high"].value);
    let Newnum = Number(document.forms["myForm"]["newNum"].value);

    // Validate the range
    if (lownum >= highnum) {
      // nonvalid range so tell user and clear the fields
      alert("Please enter a valid range.");
      document.forms["myForm"]["low"].value = "";
      document.forms["myForm"]["high"].value = "";
      return false;
    }

    // Validate the new number
     if (Newnum == "") {
      // a number was not entered so tell user and clear the field
      alert("Please enter a number.");
      document.forms["myForm"]["newNumber"].value = "";
      return false;
    }

    // Make sure the number is inside the range
    if ((Newnum < lownum) || (Newnum > highnum)) {
      // the number is not within the range so tell user and clear the field
      alert("Please enter a number within the specified range.");
      document.forms["myForm"]["newNumber"].value = "";
      return false;
    }

    // Add the number to myList1
      myList1.push(Newnum);
    var tableRef = document.getElementById("myList1");
    (tableRef.insertRow(tableRef.rows.length)).innerHTML = Newnum;

    // Display the number in the table


    // Calculate mean


    // Calculate median


    // Calculate mode

}
  function clearList1() {
    // clear the table of all rows
    var tableRef = document.getElementById("myList1");
    tableRef.innerHTML = " ";
  }

*/
// list that will hold all of the numbers
let myList1 = [];

function validateANDadd() {

    // place the values in the form into variables
    let lownum = Number(document.forms["myForm"]["low"].value);
    let highnum = Number(document.forms["myForm"]["high"].value);
    let Newnum = document.forms["myForm"]["newNum"].value;


    // validate that range is valid
    if (lownum >= highnum) {
        alert("Please enter a valid range.");
        document.forms["myForm"]["low"].value = "";
        document.forms["myForm"]["high"].value = "";
        return false;
    }


    // validate that a number was entered
    if (Newnum == "") {
        alert("Please enter a number.");
        document.forms["myForm"]["newNum"].value = "";
        return false;
    }

    // change Newnum from text to a number
    Newnum = Number(Newnum);


    // validate that the number is within the range
    if ((Newnum < lownum) || (Newnum > highnum)) {
        alert("Please enter a number within the specified range.");
        document.forms["myForm"]["newNum"].value = "";
        return false;
    }


    // add the number to the list
    myList1.push(Newnum);

    // display the number in the table
    var tableRef = document.getElementById("myList1");

    (tableRef.insertRow(tableRef.rows.length)).innerHTML = Newnum;


    // calculate the mean
    let total = 0;

    for (let i = 0; i < myList1.length; i++) {
        total = total + myList1[i];
    }

    let mean = total / myList1.length;

    document.getElementById("mean").innerHTML = mean;


    // calculate the median
    let sortedList = [...myList1];
    sortedList.sort(function(a, b) {
        return a - b;
    });

    let median;

    if (sortedList.length % 2 == 1) {
        median = sortedList[Math.floor(sortedList.length / 2)];
    } 
    else {
        let middle1 = sortedList[sortedList.length / 2 - 1];
        let middle2 = sortedList[sortedList.length / 2];

        median = (middle1 + middle2) / 2;
    }

    document.getElementById("median").innerHTML = median;


    //  calculate the mode
    let counts = {};
    let maxCount = 0;

    // count how many times each number appears
    for (let i = 0; i < myList1.length; i++) {

        let number = myList1[i];

        if (counts[number] == undefined) {
            counts[number] = 1;
        } 
        else {
            counts[number]++;
        }
    }

    // find the highest count
    for (let number in counts) {
        if (counts[number] > maxCount) {
            maxCount = counts[number];
        }
    }

    // find all numbers that have the highest count
    let modes = [];

    for (let number in counts) {
        if (counts[number] == maxCount) {
            modes.push(number);
        }
    }

    // display all modes
    document.getElementById("mode").innerHTML = modes.join(", ");

    // clear the new number input
    document.forms["myForm"]["newNum"].value = "";
}
function clearList1() {

    // clear the list
    myList1 = [];

    // clear the numbers table
    var tableRef = document.getElementById("myList1");
    tableRef.innerHTML = "";

    // clear the results
    document.getElementById("mean").innerHTML = "";
    document.getElementById("median").innerHTML = "";
    document.getElementById("mode").innerHTML = "";

}