async function getBaconipsum() {
  // first build the API call string by starting with the URL
  let apiString = "https://baconipsum.com/api/";
  // next add the parameters to the string using the drop down lists
  let theNewType = document.getElementById("newType").value;
  let theNewParagraphs = document.getElementById("newParagraphs").value;
  let theNewEncrypt = document.getElementById("newEncrypt").value;
  apiString = apiString + "?type=" + theNewType + "&paras=" + theNewParagraphs;
  alert(apiString);  // show the API string

  // now make the API call to the web service using the string and store what is returned in response
  let response = await fetch(apiString);

  // finally, print the response in the various formats
  document.getElementById("myRawData").innerHTML = "";   // clear what was previously shown
  document.getElementById("myFormattedData").innerHTML = "";   // clear what was previously shown
  document.getElementById("myEncryptedData").innerHTML = ""; // clear what was previously shown 

  let jsonData = await response.json();  // read the response as JSON
  
  // stringify and print out the JSON object in the RawData section
  document.getElementById("myRawData").innerHTML = JSON.stringify(jsonData);
 
  // loop through the JSON object one paragraph at a time and print each in the FormattedData section
  for (let para in jsonData) {   
      document.getElementById("myFormattedData").innerHTML += "<p>" + jsonData[para] + "</p>";
    }

// ENCRYPT DATA
let myEncryptedData = "";

let encryptionType = document.getElementById("newEncrypt").value;

for (let para in jsonData) {

    let encryptedParagraph = "";

    for (let char of jsonData[para]) {

        let charCode = char.charCodeAt(0);
        let newCharCode;

        if (encryptionType == "ceaser") {
            // Caesar Cipher: always goes up by 3
            newCharCode = charCode + 3;
        }

        else if (encryptionType == "Crays") {
            // Cray's Cipher: alternates between +4 and +2
            if (encryptedParagraph.length % 2 == 0) {
                newCharCode = charCode + 4;
            }
            else {
                newCharCode = charCode + 2;
            }
        }

        encryptedParagraph += String.fromCharCode(newCharCode);
    }

    // Put each encrypted paragraph into its own paragraph
    myEncryptedData += "<p>" + encryptedParagraph + "</p>";
}

document.getElementById("myEncryptedData").innerHTML = myEncryptedData;

return true;
}

