document.addEventListener('DOMContentLoaded', function() {
    // Initialize elements
    const continueBtn = document.getElementById('continueBtn');
    const mainContent = document.querySelector('.main-content');

    // Form validation
    function validateForm() {
        const q1Answered = document.querySelector('input[name="q1"]:checked');
        const q3Answered = document.querySelector('input[name="q3"]:checked');
        const businessTypeSelected = document.querySelector('.option-card.selected');
        continueBtn.disabled = !(q1Answered && q3Answered && businessTypeSelected);
    }

    // Event listeners
    document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
        input.addEventListener('change', validateForm);
    });

    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            validateForm();
        });
    });

    // Continue button handler
    continueBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (!validateForm()) {
            alert('Please complete all required sections');
            return;
        }
        document.querySelector('.questionnaire-container').style.display = 'none';
        mainContent.classList.add('visible');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(handleScrollAnimation, 500);
    });

    // Scroll animations
    function handleScrollAnimation() {
        document.querySelectorAll('[data-scroll]').forEach(el => {
            if (el.getBoundingClientRect().top <= window.innerHeight) {
                el.setAttribute('data-scroll', 'in');
            }
        });
    }
    
    // Initialize
    validateForm();
    window.addEventListener('scroll', handleScrollAnimation);
});