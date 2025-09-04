document.addEventListener('DOMContentLoaded', () => {
  const listItems = document.querySelectorAll('li');
  listItems.forEach(item => {
    item.addEventListener('click', () => {
      const detailsCard = item.querySelector('.details-card');
      const expandIcon = item.querySelector('.expand-icon');
      if (detailsCard && expandIcon) {
        detailsCard.classList.toggle('is-visible');
        expandIcon.classList.toggle('rotate-90');
      }
    });
  });
});
