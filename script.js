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
document.getElementById('quoteButton').addEventListener('click', fetchRandomQuote);

function fetchRandomQuote() {
    fetch('https://github.com/lukePeavey/quotable')
        .then(response => response.json())
        .then(data => {
            const quoteText = data.content;
            const author = data.author;

            // Display the fetched quote and author
            document.getElementById('quoteDisplay').textContent = `"${quoteText}" - ${author}`;
        })
        .catch(error => {
            console.error('Error fetching quote:', error);
            document.getElementById('quoteDisplay').textContent = 'Oops! Something went wrong. Please try again.';
        });
}

//SIGN UP PAGE CODE

function toggleForm() {
  const signUpForm = document.getElementById("sign-up-form");
  const signInForm = document.getElementById("sign-in-form");

  if (signUpForm.style.display === "none") {
      signUpForm.style.display = "block";
      signInForm.style.display = "none";
  } else {
      signUpForm.style.display = "none";
      signInForm.style.display = "block";
  }
}

// Handle form submission for Sign In
document.getElementById("signin").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  const email = event.target.querySelector("input[type='email']").value;
  const password = event.target.querySelector("input[type='password']").value;

  // Here, you can add code to send the login data to the server
  alert(`Signed in with email: ${email}, password: ${password}`);
});
