function SendMessage(event) {
    // Получаем элемент формы и кнопку отправки
    const form = event.target;
    const submitButton = form.querySelector('.feedback-form__submit-button');

    // Блокируем кнопку и меняем текст, чтобы избежать повторных кликов
    submitButton.disabled = true;
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = "Надсилання...";

    const serviceID = "service_cp0keqn";
    const templateID = "template_4e3lg5c";

    let params = {
        lastname: document.getElementById("LastName").value,
        firstname: document.getElementById("FirstName").value,
        email: document.getElementById("email").value,
        phonenumber: document.getElementById("PhoneNumber").value,
        message: document.getElementById("message").value,
    };

    emailjs.send(serviceID, templateID, params)
        .then(response => {
            console.log("SUCCESS:" + response.status);
            alert("Повідомлення успішно відправлено!");

            // Очищаем форму для нового заполнения
            form.reset();
        })
        .catch(error => {
            console.log("ERROR:", error);
            alert("Сталася помилка при відправці. Спробуйте ще раз.");
        })
        .finally(() => {
            // В любом случае (успех или ошибка) возвращаем кнопку в исходное состояние
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        });
}