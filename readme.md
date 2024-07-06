# Eijōhō (映情報)

![Alt text](./assets/heroLogo.png)


## Overview
Eijōhō (映情報) is a web application designed to provide users with comprehensive information about movies and series. The name "Eijōhō" combines the Japanese characters:

- "映" (ei): which refers to "film" or "movie."
- "情報" (jōhō): which means "information" or "news."
Together, "Eijōhō" can be interpreted as "movie information" or "film news," succinctly describing the focus of the website.

## Features
- Search Functionality: Users can search for movies by title and get detailed information, including plot, director, and release date.
- Recent Movies: The homepage showcases recent movies, which are fetched and displayed dynamically.
- Responsive Design: The layout adjusts for different screen sizes, with a carousel for recent movies on small screens.
- Animations: Smooth GSAP animations enhance the user experience for various UI elements.
-Persistent State: The application uses local storage to save the state, ensuring that search results, movie details, and recent movies are maintained across page reloads.

## Technology Stack
 - HTML5 & CSS3: For structuring and styling the web pages.
 - JavaScript: For client-side scripting.
 - GSAP (GreenSock Animation Platform): For animations.
-  OMDb API: For fetching movie data.

### How to Use
1. Search for Movies:

- Enter a movie title in the search bar and press enter or click the search icon.
- Select a suggestion from the autocomplete dropdown to view detailed information.

2. View Recent Movies:

- Recent movies are displayed on the homepage.
- Click on a movie card to see more details.

## Installation and Setup
1. Clone the repository:

```
  git clone https://github.com/yourusername/eijōhō.git
 
```
 2. Navigate to the project directory:
 ```
cd eijōhō
```
3. Open index.html in your web browser to view the application.



##  License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements
- OMDb API: For providing the movie data.
- GSAP: For the animation library.
- FontAwesome: For nice and neat fonts.