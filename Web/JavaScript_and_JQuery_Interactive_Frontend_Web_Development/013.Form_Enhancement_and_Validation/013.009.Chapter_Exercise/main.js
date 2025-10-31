this.document.addEventListener('DOMContentLoaded', () => {
    main();
});

function main() {
    const form = this.document.forms[0];
    for(let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i];

        if (element.type === 'text') {
            addEventListenerForText(element, 3);
        }

        else if (element.type === 'email') {
            addEventListenerForEmail(element);
        }

        else if (element.type === 'date') {
            addEventListenerForDate(element);
        }

        else if (element.type === 'password') {
            const label = element.labels[0].textContent;

            if (label === 'Password') {
                addEventListenerForText(element, 8);
                addEventListenerForPassword(element, ['!', '-', '_', '#', '$', '%']);
            }

            else if (label === 'Confirm Password') {
                addEventListenerForConfirmPassword(element);
            }
        }

        else if (element.type === 'textarea') {
            addEventListenerForText(element, 10, 140);
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        validateForm(form.elements)

        const errors = form.querySelectorAll('.div-error');

        if (errors.length > 0) {
            alert('Please fix the errors before submitting');
        }

        else {
            alert('Form submitted successfully');
            form.reset();
        }
    });
}

function validateForm(elements) {
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.type === 'text' || element.type === 'email' || element.type === 'date' || element.type === 'password' || element.type === 'textarea') {
            element.focus();
            element.blur();
        }
    }
}

function addEventListenerForConfirmPassword(element) {
    const passwords = this.document.querySelectorAll('input[type="password"]');
    const errorMsg = 'Passwords must match';

    if (passwords.length !== 2) {
        return;
    }

    let firstTime = true;
    element.addEventListener('blur', () => {
        firstTime = false;

        if (passwords[0].value === passwords[1].value) {
            removeError(element);
        }

        else if (!firstTime) {
            addError(element, errorMsg);
        }
    });

    element.addEventListener('input', () => {
       if (passwords[0].value === passwords[1].value) {
           removeError(element);
       }

       else if (!firstTime) {
           addError(element, errorMsg);
       }
    });
}

function addEventListenerForPassword(element, specialChars) {
    let firstTime = true;
    const errorMsg = 'Must contain an upper case letter, a lower case letter, a number, and least one special character: ';

    element.addEventListener('input', () => {
        if (hasSpecialChar(element.value, specialChars) && /[A-Z]/.test(element.value) &&
            /[a-z]/.test(element.value) && /\d/.test(element.value)) {
            removeError(element);
        }

        else if (!firstTime) {
            addError(element, errorMsg + specialChars.join(', '));
        }
    });

    element.addEventListener('blur', () => {
        firstTime = false;

        if (hasSpecialChar(element.value, specialChars) && /[A-Z]/.test(element.value) &&
            /[a-z]/.test(element.value) && /\d/.test(element.value)) {
            removeError(element);
        }

        else if (!firstTime) {
            addError(element, errorMsg + specialChars.join(', '));
        }
    })
}

function hasSpecialChar(str, specialChars) {
    for (let i = 0; i < specialChars.length; i++) {
        if (str.includes(specialChars[i])) {
            return true;
        }
    }
    return false;
}

function addEventListenerForDate(element) {
    const regex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/

    element.addEventListener('blur', () => {
        if (regex.test(element.value)) {
            removeError(element);
        } else {
            addError(element, 'Enter a valid date');
        }
    });
}

function addEventListenerForText(element, minLength = -1, maxLength = -1) {
    let firstTime = true;
    const minErrorMsg = minLength >= 1 ? 'Must be at least ' + minLength + ' characters long' : '';
    const maxErrorMsg = maxLength >= 1 ? 'Must be at most ' + maxLength + ' characters long' : '';
    const errorMsg = minLength >= 1 && maxLength >= 1 ? minErrorMsg + ' AND ' + maxErrorMsg : minErrorMsg + maxErrorMsg;

    element.addEventListener('input', () => {
       if (validateLength(element, minLength, maxLength)) {
           removeError(element);
       }

       else if (!firstTime) {
           addError(element, errorMsg);
       }
    });

    element.addEventListener('blur', () => {
        firstTime = false;
       if (!validateLength(element, minLength, maxLength)) {
           addError(element, errorMsg);
       } else {
           removeError(element);
       }
    });
}

function addEventListenerForEmail(element) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    let firstTime = true;
    const errorMsg = 'Enter a valid email address';

    element.addEventListener('input', () => {
        if (regex.test(element.value)) {
            removeError(element);
        }

        else if (!firstTime) {
            addError(element, errorMsg);
        }
    });

    element.addEventListener('blur', () => {
        firstTime = false;

        if (!regex.test(element.value)) {
            addError(element, errorMsg);
        } else {
            removeError(element);
        }
    });
}

function validateLength(element, minLength = -1, maxLength = -1) {
    return (minLength < 0 && maxLength < 0) ||
        (minLength > 0 && maxLength < 0 && element.value.length >= minLength) ||
        (minLength < 0 && maxLength > 0 && element.value.length <= maxLength) ||
        (minLength > 0 && maxLength > 0 && element.value.length >= minLength && element.value.length <= maxLength);
}

function addError(element, error) {
    element.parentElement.parentElement.querySelectorAll('.div-error').forEach(e => {
        if (e.querySelector('span').textContent === error) {
            e.remove();
        }
    });

    const div = this.document.createElement('div');
    div.classList.add('mt-2');
    div.classList.add('text-xs');
    div.classList.add('div-error');
    div.style.color = 'red';

    const icon = this.document.createElement('i');
    icon.classList.add('fa-solid');
    icon.classList.add('fa-circle-exclamation');
    icon.classList.add('mr-1')

    const span = this.document.createElement('span');
    span.textContent = error;

    div.appendChild(icon);
    div.appendChild(span);
    div.style.width = element.parentElement.parentElement.offsetWidth + 'px';
    element.parentElement.parentElement.appendChild(div);
}

function removeError(element) {
    const div = element.parentElement.parentElement.querySelector('.div-error');
    if (div) {
        div.remove();
    }
}