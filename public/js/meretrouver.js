const toggleBtn = document.getElementById('BoutonMeRetrouver');
const myDiv = document.getElementById('MeRetrouver');
const toggleclose = document.getElementById('BoutonClose');

toggleBtn.addEventListener('click', function() {
    myDiv.classList.toggle('show');
})

toggleclose.addEventListener('click', function() {
    myDiv.classList.remove('show');
})

function downloadCV(){
    const link = document.createElement('a');
    link.href = '../../pdf/CV.pdf'; 
    link.download = 'CV-BLAS Guillaume.pdf'; 
    link.click();
}
