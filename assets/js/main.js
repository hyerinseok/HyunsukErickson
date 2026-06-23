const artOpen = document.querySelectorAll('.art img');

artOpen.forEach(element => {
  element.addEventListener('click', function() {
    window.open(this.src, '_blank');
    });
});
