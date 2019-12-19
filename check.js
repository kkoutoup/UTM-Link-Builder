// Global variables
const urlButton = document.getElementsByTagName("button")[0];

// object with all url parameters
let urlParameters = {
  BaseURL: '',
  Source: '',
  Medium: '',
  Campaign: '',
  Term: '',
  Content: ''
}

// Event Listeners
urlButton.addEventListener("click", checkDropdown("source", "sourceError", "Source"), false);
urlButton.addEventListener("click", checkDropdown("medium", "mediumError", "Medium"), false);
urlButton.addEventListener("click", checkDropdown("term", "termError", "Term"), false);
urlButton.addEventListener("click", checkDropdown("content", "contentError", "Content"), false);
urlButton.addEventListener("click", checkCampaignName);
urlButton.addEventListener("click", checkBaseURL);

// test
urlButton.addEventListener("click", logParams);

// check base URL
function checkBaseURL(){
  // target element
  const baseURLContainer= document.getElementById("baseURL");
  // error container
  const errorContainer = document.getElementById("baseURLError");
  // regex to test for valid url entry
  const urlRegex = /(https:\/\/houseofcommons.shorthandstories.com\/[\w]+\/index\.html$)|(https:\/\/www\.parliament\.uk\/.*)/;
  if(!urlRegex.test(baseURLContainer.value)){
    errorContainer.style.display = "block";
    errorContainer.textContent = "Please make sure you enter a valid URL";
  }else{
    errorContainer.style.display = "none";
    errorContainer.textContent = "";
    urlParameters.BaseURL = baseURLContainer.value;
  }
}

// re-usable for all dropdowns on page
function checkDropdown(elementID, errorContainerID, parameterName){
  return function(){
    // target element
    const element = document.getElementById(elementID);
    // error message container
    const errorContainer = document.getElementById(errorContainerID);
    // check input
    if(element.value == "Select an option..."){
      errorContainer.style.display = "block";
      errorContainer.textContent = "Please make sure one of the dropdown options is selected";
    }else{
      errorContainer.style.display = "none";
      errorContainer.textContent = "";
      urlParameters[parameterName] = ("utm_"+parameterName+"="+element.value).toLowerCase();
    }
  }
}

// check campaign name
function checkCampaignName(){
  // target campaign field and get its value
  const campaignFieldValue = document.getElementById("campaign").value;
  // use regex to check input and inform user of errors, offer examples
  const campaignFieldRegex = /^[a-z0-9]+\-?([a-z0-9]+\-)*[a-z0-9]+$/;
  const onlyNumbersRegex = /^\d+$/;
  const campaignFieldError = document.getElementById("campaignError");
  // check input
  if(campaignFieldValue.length < 4 || campaignFieldValue.length > 40){
    campaignFieldError.style.display = "block";
    campaignFieldError.textContent = "Please make sure this part of the URL is between 4 and 40 characters";
  }else if(!campaignFieldRegex.test(campaignFieldValue)){
    campaignFieldError.style.display = "block";
    campaignFieldError.textContent = "Please make sure this field is not empty and follows the correct structure";
  }else if(onlyNumbersRegex.test(campaignFieldValue)){
    campaignFieldError.style.display = "block";
    campaignFieldError.textContent = "Please make sure this field is a combination of numbers and letters";
  }else{
    campaignFieldError.style.display = "none";
    campaignFieldError.textContent = '';
    urlParameters.Campaign = ("utm_campaign="+campaignFieldValue.trim()).toLowerCase();
  }
}

// test
function logParams(){
  console.log(urlParameters);
}