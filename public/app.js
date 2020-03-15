window.addEventListener('submit', event => {
  if (event.target.dataset.confirm) {
    if(!confirm(event.target.dataset.confirm)) {
      event.preventDefault();
    }
  }
}, true);
