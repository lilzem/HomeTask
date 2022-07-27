document.querySelectorAll('.modal-link').forEach((element) => {
    element.addEventListener('click', () => {
        modalOpen(element.dataset.modal);
    });
});

document.querySelectorAll('.close-modal').forEach((element) => {
    element.addEventListener('click', () => {
        modalCloseByElement(element.closest('.modal'));
    });
});

document.querySelectorAll('.modal').forEach((element) => {
    element.addEventListener('click', (event) => {
        if (!event.target.closest('.modal__content')) {
            modalCloseByElement(element);
        }
    });
});

function closeOpenedModals() {
    document.querySelectorAll('.modal.open').forEach((element) => {
        modalCloseByElement(element, false);

        unlockBody();
    });
}

function modalOpen(modalId) {
    const modal = document.querySelector(modalId);

    if (!modal) {
        return;
    }

    closeOpenedModals();

    modal.classList.add('open');

    lockBody();
}

function modalCloseByElement(modal, unlock = true) {
    if (!modal) {
        return;
    }

    animateModelHiding(modal, () => modal.classList.remove('open'));

    if (!unlock) {
        return;
    }

    unlockBody();
}

function lockBody() {
    document.body.classList.add('lock');
}

function unlockBody() {
    document.body.classList.remove('lock');
}

function animateModelHiding(modal, callback = null) {
    if (!modal) {
        return;
    }

    const duration = 500;

    modal.animate([{
            opacity: 1
        },
        {
            opacity: 0
        }
    ], {
        duration
    });

    if (!callback) {
        return;
    }

    setTimeout(callback, duration);
}