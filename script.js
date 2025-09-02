function toggleView(){
  const timeline = document.getElementById('timeline');
  const checklist = document.getElementById('checklist');
  const btn = document.getElementById('toggle-btn');
  timeline.classList.toggle('hidden');
  checklist.classList.toggle('hidden');
  btn.textContent = checklist.classList.contains('hidden') ? 'Show Checklist' : 'Show Timeline';
}
