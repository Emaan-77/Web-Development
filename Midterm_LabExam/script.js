
var image = document.querySelector('.custom-row img');


var altTextSpan = document.getElementById('altTextSpan');


image.addEventListener('mouseover', function() {
   
    altTextSpan.style.display = 'inline-block';

    altTextSpan.textContent = this.alt;
});

image.addEventListener('mouseout', function() {
    altTextSpan.style.display = 'none';

    altTextSpan.textContent = '';
});
