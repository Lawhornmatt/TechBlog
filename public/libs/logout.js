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

if (document.querySelector('#logoutButton')) {
  document
      .querySelector('#logoutButton')
      .addEventListener('click', logout);
} 

