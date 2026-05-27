const founderCards = document.querySelectorAll('.founder-card');

founderCards.forEach(card => {
  card.addEventListener('click', () => {
    // Close other cards
    founderCards.forEach(c => {
      if(c !== card) c.classList.remove('active');
    });
    // Toggle this card
    card.classList.toggle('active');
  });
});
