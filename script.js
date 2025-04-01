// Function to handle search
function searchFunction() {
  // Get the search query
  const query = document.getElementById("searchInput").value.trim();
  
  if (!query) {
    alert("Please enter a search term.");
    return;
  }

  // Construct the API URL for Open Library
  const apiUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`;

  // Fetch data from Open Library API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Check if we have books
      if (data.docs.length > 0) {
        displayBooks(data.docs);
      } else {
        document.getElementById("bookResults").innerHTML = "<p>No books found.</p>";
      }
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      alert("An error occurred while fetching books.");
    });
}

// Function to display books
function displayBooks(books) {
  const resultsContainer = document.getElementById("bookResults");
  
  // Clear previous results
  resultsContainer.innerHTML = "";

  // Loop through the books and display them
  books.forEach(book => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");

    const bookTitle = book.title ? book.title : "Untitled";
    const bookAuthor = book.author_name ? book.author_name.join(", ") : "Unknown Author";
    const bookCover = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : "https://via.placeholder.com/150";
    
    bookItem.innerHTML = `
      <img src="${bookCover}" alt="Book Cover">
      <h3>${bookTitle}</h3>
      <p><strong>Author:</strong> ${bookAuthor}</p>
    `;
    
    resultsContainer.appendChild(bookItem);
  });
}




  

  //RANDOM QUOTES 

  // JavaScript to fetch a random quote
  document.addEventListener("DOMContentLoaded", () => {
    const quoteButton = document.getElementById("quoteButton");
    const quoteDisplay = document.getElementById("quoteDisplay");

    async function fetchQuotes() {
        try {
            const response = await fetch("http://localhost:3001/quotes"); // Adjust if API URL is different
            const quotes = await response.json();
            return quotes;
        } catch (error) {
            console.error("Error fetching quotes:", error);
            return [];
        }
    }

    async function displayRandomQuote() {
        const quotes = await fetchQuotes();
        if (quotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const randomQuote = quotes[randomIndex];
            quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.author}`;
        } else {
            quoteDisplay.textContent = "No quotes available.";
        }
    }

    quoteButton.addEventListener("click", displayRandomQuote);
});


//SIGN UP PAGE CODE

function toggleForm() {
  const signUpForm = document.getElementById("sign-up-form");
  const signInForm = document.getElementById("sign-in-form");
  const userDisplay = document.getElementById("userDisplay");

  const loggedInUser = JSON.parse(localStorage.getItem("loggedIn"));

  if (loggedInUser) {
      // User is already signed in
      signUpForm.style.display = "none";
      signInForm.style.display = "none";
      userDisplay.innerHTML = `Welcome, ${loggedInUser.email}!`;
      userDisplay.style.display = "block";
  } else {
      // Toggle between sign-up and sign-in forms
      if (signUpForm.style.display === "none") {
          signUpForm.style.display = "block";
          signInForm.style.display = "none";
      } else {
          signUpForm.style.display = "none";
          signInForm.style.display = "block";
      }
  }
}

// Run on page load to check if the user is logged in
document.addEventListener("DOMContentLoaded", toggleForm);


//SIGN UP

document.getElementById("signup").addEventListener("submit", function(event) {
  event.preventDefault();

  const email = event.target.querySelector("input[type='email']").value;
  const password = event.target.querySelector("input[type='password']").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if user already exists
  const userExists = users.find(user => user.email === email);
  if (userExists) {
      alert("User already exists! Please sign in.");
      return;
  }

  // Save new user
  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Sign-up successful! You can now sign in.");
  event.target.reset(); // Clear form
});

//SIGN IN 

document.getElementById("signin").addEventListener("submit", function(event) {
  event.preventDefault();

  const email = event.target.querySelector("input[type='email']").value;
  const password = event.target.querySelector("input[type='password']").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Find the user
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
      localStorage.setItem("loggedIn", JSON.stringify(user));
      alert("Sign-in successful! Welcome back.");
      window.location.reload(); // Reload page to update UI
  } else {
      alert("Invalid credentials! Please try again.");
  }
});

//LOG OUT

document.getElementById("logoutButton").addEventListener("click", function() {
  localStorage.removeItem("loggedIn");
  alert("You have been logged out.");
  window.location.reload(); // Refresh to show sign-in form again
});

// Show logout button if user is logged in
document.addEventListener("DOMContentLoaded", function() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedIn"));
  const logoutButton = document.getElementById("logoutButton");

  if (loggedInUser) {
      logoutButton.style.display = "block";
  }
});
