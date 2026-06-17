document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('order-modal');
    const closeBtn = document.querySelector('.modal__close');
    const orderForm = document.getElementById('order-form');
    const selectedTariffText = document.getElementById('selected-tariff-name');
    const hiddenTariffInput = document.getElementById('hidden-tariff-name');

    // Находим все кнопки "Замовити" на странице
    const orderButtons = document.querySelectorAll('.tariffs__card-button');

    // Открытие модального окна при клике на "Замовити"
    orderButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Находим карточку, в которой была нажата кнопка
            const card = e.target.closest('.tariffs__card');

            // Вытаскиваем данные из этой конкретной карточки
            const packageName = card.querySelector('.tariffs__card-name p').textContent.trim();
            const packageSpeed = card.querySelector('.tariffs__card-desc-speed').textContent.trim();
            const packageCost = card.querySelector('.tariffs__card-desc-cost').textContent.trim();

            const fullTariffInfo = `${packageName} (${packageSpeed}) — ${packageCost}/міс`;

            // Подставляем данные в текст модалки и в скрытое поле формы
            selectedTariffText.textContent = fullTariffInfo;
            hiddenTariffInput.value = fullTariffInfo;

            // Показываем модалку
            modal.classList.add('is-open');
        });
    });

    // Закрытие при клике на крестик
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('is-open');
    });

    // Закрытие при клике на серую область вокруг модалки
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('is-open');
        }
    });

    // Отправка формы через EmailJS
    orderForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем перезагрузку страницы

        const submitBtn = orderForm.querySelector('.form__submit-btn');
        submitBtn.textContent = 'Відправка...';
        submitBtn.disabled = true;

        // Отправляем форму в EmailJS
        // "ВАШ_SERVICE_ID" и "ВАШ_TEMPLATE_ID" нужно взять из личного кабинета EmailJS
        emailjs.sendForm('service_cp0keqn', 'template_z13riho', this)
            .then(() => {
                alert('Дякуємо! Ваша заявка успішно надіслана. Ми зв\'яжемося з вами найближчим часом.');
                orderForm.reset();
                modal.classList.remove('is-open');
            }, (error) => {
                alert('Помилка при відправці заявки. Спробуйте пізніше або зателефонуйте нам.');
                console.error('EmailJS Error:', error);
            })
            .finally(() => {
                submitBtn.textContent = 'Надіслати заявку';
                submitBtn.disabled = false;
            });
    });
});