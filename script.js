document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('view-toggle-btn');
  const timelineView = document.getElementById('timeline-view');
  const checklistView = document.getElementById('checklist-view');
  const pageTitle = document.getElementById('page-title');
  const pageSubtitle = document.getElementById('page-subtitle');

  let isTimeline = true;

  const setupClickEvents = (parentSelector) => {
    const listItems = document.querySelectorAll(`${parentSelector} li`);
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
  };

  const animateTimeline = () => {
    const timelineItems = document.querySelectorAll('#timeline-wrapper > ul > li');
    timelineItems.forEach((item, index) => {
      setTimeout(() => {
        if (!item.classList.contains('animate-line')) {
          item.classList.add('animate-line');
        }
      }, index
