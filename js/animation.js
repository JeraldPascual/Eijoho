export function animateRecentMovies() {
  const recentMoviesList = document.getElementById('recentMoviesList');
  const movieCards = recentMoviesList.querySelectorAll('.movie-card');
  gsap.from(movieCards, {
    duration: 1,
    opacity: 0,
    y: 20,
    stagger: 0.2
  });
}

// Function to animate movie poster and text
export function animateMovieDetails() {
  const moviePoster = document.querySelector('#movieInfo img');
  const movieText = document.querySelectorAll('#movieInfo h2, #movieInfo p');

  // Animate the poster
  gsap.from(moviePoster, {
    duration: 1,
    opacity: -1,
    ease: 'power3.out'
  });

  // Animate the text
  gsap.from(movieText, {
    duration: 1,
    opacity: 0,
    y: 50,
    stagger: 0.2,
    ease: 'power3.out'
  });
}

// Function to animate the hero element
export function animateHeroLogo() {
  // Initial animation: Slide in from left with a fade-in effect
  gsap.fromTo(
    ".heroLogo",
    { x: 0, opacity: 0 },
    { x: 0, opacity: .6, duration: 1.5, ease: "power2.inOut" }
  );

  // Neon blinking effect
  gsap.to(".heroLogo", {
    textShadow: "0 0 8px rgba(255, 255, 255, 0.6), 0 0 16px rgba(255, 255, 255, 0.4)",
    repeat: -1,
    yoyo: true,
    duration: 0.5,
    ease: "power1.inOut",
  });
}
