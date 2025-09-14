function createDecryptEffect(element) {
    const originalText = element.textContent;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    
    let interval;
    let currentIndex = 0;
    
    element.addEventListener('mouseenter', () => {
        currentIndex = 0;
        // Calculate speed based on text length - longer texts decrypt slower
        const baseSpeed = 1/3;
        const lengthFactor = Math.max(0.5, Math.min(2, originalText.length / 10)); // Scale factor between 0.5x and 2x
        const decryptSpeed = baseSpeed / lengthFactor;
        
        interval = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < currentIndex) {
                        return originalText[index];
                    }
                    return characters[Math.floor(Math.random() * characters.length)];
                })
                .join('');
            
            currentIndex += decryptSpeed;
            
            if (currentIndex >= originalText.length) {
                clearInterval(interval);
                element.textContent = originalText;
            }
        }, 30);
    });
    
    element.addEventListener('mouseleave', () => {
        clearInterval(interval);
        element.textContent = originalText;
    });
}

// Initialize the effect on all elements with the decrypt-effect class
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.decrypt-effect').forEach(createDecryptEffect);
}); 