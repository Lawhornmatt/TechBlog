  // ====================
  //  LOG IN
  // ====================

const loginPage = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#loginUsername').value.trim();
  const password = document.querySelector('#loginPassword').value.trim();

  if (username && password) {
    const response = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Log In Failed: Response Not Okay');
    }
  }
};

  // ====================
  //  SIGN UP
  // ====================
  
const signupPage = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#signupName').value.trim();
  const email = document.querySelector('#signupEmail').value.trim();
  const password = document.querySelector('#signupPassword').value.trim();
  const RETYPEpassword = document.querySelector('#retypePassword').value.trim();

  if (username && email && password) {
    const response = await fetch('/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Cannot create that user');
    }
  }
};
    

  // ====================
  //  QUERY SELECTORS
  // ====================

// Log In user
if (document.querySelector('#logmeinButton')) {
  document
      .querySelector('#logmeinButton')
      .addEventListener('click', loginPage);
} 

// Sign up new user
if (document.querySelector('#signmeupButton')) {
  document
      .querySelector('#signmeupButton')
      .addEventListener('click', signupPage);
}

  