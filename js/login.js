window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const link = document.querySelector('.info-message a');
    link.addEventListener('click', function(event) {
        event.preventDefault();
        
        const popup = document.createElement('div');
        popup.classList.add('popup');

        popup.innerHTML = `
            <div class="popup-content">
                <h2>Recuperar Senha</h2>
                <div class="form-group">
                    <input type="email" id="recovery-email" name="recovery-email" placeholder="Email" required>
                    <button type="submit" class="submit-btn">Recuperar</button>
                </div>
            </div>
        `;

        document.body.appendChild(popup);

        const recoverButton = popup.querySelector('.submit-btn');
        recoverButton.addEventListener('click', function() {
            const emailInput = popup.querySelector('#recovery-email');
            const email = emailInput.value;
            const popupContent = popup.querySelector('.popup-content');
            popupContent.innerHTML = `<p><span class="material-symbols-outlined"> mark_email_read </span>Email de recuperação enviado para <span>${email}</span></p>`;

            setTimeout(function() {
                document.body.removeChild(popup);
            }, 3000);
        });

        popup.addEventListener('click', function(event) {
            if (event.target === popup) {
                document.body.removeChild(popup);
            }
        });
    });
});