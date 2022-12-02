# Brad's Movie Lookup App
Webapp to search for movies and display information about them - Made with React.

<img src="/src/assets/moviesGif.gif">

### Live Demo Deployed @
https://brthomiu.github.io/movie-app/

## Functionality
Fetches data from a remote API and uses it to render a list of movie card components.
Clicking the movie card component brings up more information about the movie.
User can search for movies by title and filter by genre.

## Design Patterns
Movie Lookup is written in React with modern ES6 syntax.
It is a responsive single page application that utilizes modular component design.

### State Management
States are declared with the useEffect hook, managed at the application level, and are passed down to child components as props.

### Responsiveness
The main list utilizes a CSS grid layout that scales with the screen size, and the movie details are displayed in a modal that is responsive to the screen size.
A few other attributes such as font and button size also scale using media queries as the screen size becomes smaller.

### Accessibility
The app is designed to be fully accessible to screen readers and keyboard navigation and utilizes semantic HTML elements.
The main list is a tab-able list that can be navigated with the arrow keys. The movie details modal can be closed with the escape key.

