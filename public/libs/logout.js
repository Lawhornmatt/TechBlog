  // ====================
  //  LOG OUT
  // ====================

const logout = async () => {
  const response = await fetch('/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Log out failed');
  }
};

  // ====================
  //  NEW POST
  // ====================
  
const writeNewPost = async (event) => {
  event.preventDefault();

  const postTitle = document.querySelector('#postTitle').value.trim();
  const postBody = document.querySelector('#postBody').value.trim();

  if (postTitle && postBody) {
    const response = await fetch('/post', {
      method: 'POST',
      body: JSON.stringify({ postTitle, postBody }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Post cannot be made');
    }
  }
};

  // ====================
  //  QUERY SELECTORS
  // ====================

// LogOut Button
if (document.querySelector('#logoutButton')) {
  document
      .querySelector('#logoutButton')
      .addEventListener('click', logout);
} 

// New Post Button
if (document.querySelector('#newpostButton')) {
  document
      .querySelector('#newpostButton')
      .addEventListener('click', writeNewPost);
} 

