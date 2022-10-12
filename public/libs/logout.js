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
  //  NEW COMMENT
  // ====================
  
const writeNewComment = async (event) => {
  event.preventDefault();

  const commentBody = document.querySelector('#commentBody').value.trim();

  if (commentBody) {
    const response = await fetch('/comment', {
      method: 'POST',
      body: JSON.stringify({ commentBody }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Comment cannot be made');
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

// New Post Button
if (document.querySelector('#newcommentButton')) {
  document
      .querySelector('#newcommentButton')
      .addEventListener('click', writeNewComment);
} 

