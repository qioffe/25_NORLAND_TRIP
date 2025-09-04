document.addEventListener('DOMContentLoaded', () => {
  // Expand/collapse behavior
  const listItems = document.querySelectorAll('li.cursor-pointer');
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

  // Animate timeline only on timeline.html
  const timelineItems = document.querySelectorAll('#timeline-wrapper > ul > li');
  if (timelineItems.length > 0) {
    timelineItems.forEach((item, index) => {
      setTimeout(() => {
        if (!item.classList.contains('animate-line')) {
          item.classList.add('animate-line');
        }
      }, index * 500);
    });
  }
});
