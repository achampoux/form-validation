function checkZIP() {
  // For each country, defines the pattern that the ZIP has to follow
  const constraints = {
    ch: [
      "^(CH-)?\\d{4}$",
      "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
  };

  // Read the country id
  const country = document.getElementById("Country").value;

  // Get the NPA field
  const ZIPField = document.getElementById("ZIP");

  // Build the constraint checker
  const constraint = new RegExp(constraints[country][0], "");
  console.log(constraint);

  // Check it!
  if (constraint.test(ZIPField.value)) {
    // The ZIP follows the constraint, we use the ConstraintAPI to tell it
    ZIPField.setCustomValidity("");
  } else {
    // The ZIP doesn't follow the constraint, we use the ConstraintAPI to
    // give a message about the format required for this country
    ZIPField.setCustomValidity(constraints[country][1]);
    ZIPField.reportValidity();
  }
}

function checkEmail(){
  const regex = 
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ;
  const constraint = new RegExp(regex, "");
  const email = document.getElementById("Email").value;
  const emailField = document.getElementById("Email");

  if (constraint.test(email)){
    emailField.setCustomValidity("");
  } else {
    emailField.setCustomValidity("Enter a valid e-mail");
    emailField.reportValidity();
  }
}

function checkPassword(){
  const password = document.getElementById('Password').value;
  const passwordConfirmation = document.getElementById('PasswordConfirmation').value;

  const passwordConfirmationField = document.getElementById('PasswordConfirmation');

  if(passwordConfirmation === password){
    passwordConfirmationField.setCustomValidity("");
  } else {
    passwordConfirmationField.setCustomValidity("Passwords do not match");
    passwordConfirmationField.reportValidity();
  }
}

function validateForm() {
  var email = document.getElementById("Email");
  var zip = document.getElementById("ZIP");
  var passwordConfirmation = document.getElementById("PasswordConfirmation");

  if (email.checkValidity() && zip.checkValidity() && passwordConfirmation.checkValidity()) {
    document.getElementById("form1").submit();
  } else {
    return;
  }
}

window.onload = () => {
  document.getElementById("Country").onchange = checkZIP;
  document.getElementById("ZIP").oninput = checkZIP;

  document.getElementById("Email").onchange = checkEmail;
  document.getElementById("Email").oninput = checkEmail;

  document.getElementById("PasswordConfirmation").onchange = checkPassword;
  document.getElementById("PasswordConfirmation").oninput = checkPassword;

  document.getElementById("form1").addEventListener("submit", function(event){ 
    event.preventDefault();
    validateForm();
  });
};