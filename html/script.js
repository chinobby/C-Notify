window.addEventListener('message', (event) => {
    if (event.data.type === 'notification') {
        showNotification(event.data.notificationType, event.data.title, event.data.message, event.data.sender);
    }
});

function showNotification(type, title, message) {
    
    if (!title) {
        switch (type) {
            case 'warning':
                title = 'Warning';
                break;
            case 'error':
                title = 'Error';
                break;
            case 'info':
                title = 'Info';
                break;
            case 'success':
                title = 'Success';
                break;
            case 'custom':
                title = 'Custom';
                break;

            default:
                title = 'Notification';
        }
    }
    const container = document.getElementById('notifications-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    
    const sound = document.getElementById(`${type}-sound`);
    if (sound) {
    
        sound.currentTime = 0;
        
        if (!sound.src) {
            console.warn(`El archivo de sonido para ${type} no está configurado correctamente`);
            return;
        }

        sound.onerror = (e) => {
            console.warn(`Error al cargar el sonido ${type}: No se pudo encontrar el archivo de audio`);
        };

        const playPromise = sound.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                if (error.name === 'NotSupportedError') {
                    console.warn(`Error al reproducir el sonido ${type}: Formato no soportado o archivo no encontrado`);
                } else if (error.name === 'NotAllowedError') {
                    console.warn(`Error al reproducir el sonido ${type}: Reproducción bloqueada por el navegador`);
                } else {
                    console.warn(`Error al reproducir el sonido ${type}: ${error.message}`);
                }
            });
        }
    }

    let iconHtml;
    let icon;
    switch (type) {
        case 'warning':
            icon = 'fa-triangle-exclamation';
            break;
        case 'error':
            icon = 'fa-circle-xmark';
            break;
        case 'info':
            icon = 'fa-circle-info';
            break;
        case 'success':
            icon = 'fa-circle-check';
            break;
        case 'custom':
            icon = 'fa-house';
            break;
        default:
            icon = 'fa-bell';
    }
    iconHtml = `<i class="fa-solid ${icon}"></i>`;

    notification.innerHTML = `
        ${iconHtml}
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
    `;

    container.appendChild(notification);

    setTimeout(() => removeNotification(notification), 5000);
}

function removeNotification(notification) {
    notification.classList.add('fade-out');
    setTimeout(() => {
        if (notification.parentElement) {
            notification.parentElement.removeChild(notification);
        }
    }, 500);
}