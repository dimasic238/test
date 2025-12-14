document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const counterElement = document.getElementById('counter');
    const changeBgBtn = document.getElementById('changeBgBtn');
    const resetBtn = document.getElementById('resetBtn');
    const body = document.body;
    
    // Цвета для фона
    const colors = [
        'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
        'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
        'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
        'linear-gradient(135deg, #a6c0fe 0%, #f68084 100%)',
        'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)'
    ];
    
    // Получаем счетчик из localStorage или устанавливаем 0
    let counter = parseInt(localStorage.getItem('clickCounter')) || 0;
    updateCounterDisplay();
    
    // Функция обновления счетчика на экране
    function updateCounterDisplay() {
        counterElement.textContent = counter;
        
        // Добавляем анимацию
        counterElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            counterElement.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Функция смены фона
    function changeBackground() {
        // Выбираем случайный цвет
        const randomIndex = Math.floor(Math.random() * colors.length);
        body.style.background = colors[randomIndex];
        
        // Увеличиваем счетчик
        counter++;
        localStorage.setItem('clickCounter', counter);
        updateCounterDisplay();
        
        // Показываем уведомление
        showNotification(`Фон изменен! Цвет #${randomIndex + 1}`);
    }
    
    // Функция сброса счетчика
    function resetCounter() {
        counter = 0;
        localStorage.setItem('clickCounter', counter);
        updateCounterDisplay();
        body.style.background = colors[0];
        showNotification('Счетчик сброшен!');
    }
    
    // Функция показа уведомления
    function showNotification(message) {
        // Удаляем старое уведомление, если есть
        const oldNotification = document.querySelector('.notification');
        if (oldNotification) {
            oldNotification.remove();
        }
        
        // Создаем новое уведомление
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        // Стили для уведомления
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2ecc71;
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        // Добавляем анимацию
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Удаляем уведомление через 3 секунды
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            
            // Добавляем анимацию исчезновения
            const slideOutStyle = document.createElement('style');
            slideOutStyle.textContent = `
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(slideOutStyle);
            
            setTimeout(() => {
                notification.remove();
                document.head.removeChild(slideOutStyle);
            }, 300);
        }, 3000);
    }
    
    // Обработчики событий
    changeBgBtn.addEventListener('click', changeBackground);
    resetBtn.addEventListener('click', resetCounter);
    
    // Добавляем возможность управления с клавиатуры
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' || event.code === 'Enter') {
            changeBackground();
        }
        
        if (event.code === 'Escape') {
            resetCounter();
        }
    });
    
    // Информация в консоли для разработчика
    console.log('Приложение для тренировки Git веток загружено!');
    console.log('Команды:');
    console.log('1. Нажмите пробел или Enter для смены фона');
    console.log('2. Нажмите Escape для сброса счетчика');
});