document.addEventListener('DOMContentLoaded', () => {
    // Set initial color from localStorage or default to purple
    const storedColor = localStorage.getItem('accentColor') || '#9D00FF';
    document.documentElement.style.setProperty('--accent-color', storedColor);
    updateActiveColor(storedColor);
    
    // Remove AnchorJS links from headings that don't already contain links
    // Wait a bit for AnchorJS to finish adding links (if it's present)
    setTimeout(removeUnwantedAnchorLinks, 100);
});

// Add click handlers to color options
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', (e) => {
        const color = e.target.dataset.color;
        document.documentElement.style.setProperty('--accent-color', color);
        localStorage.setItem('accentColor', color);
        updateActiveColor(color);
    });
});

// Update active state of color options
function updateActiveColor(activeColor) {
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.toggle('active', option.dataset.color === activeColor);
    });
}

// Remove AnchorJS links from headings that don't already contain links
function removeUnwantedAnchorLinks() {
    // Find all headings
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    headings.forEach(heading => {
        // Check if this heading already contains a link (like project links)
        const hasExistingLink = heading.querySelector('a:not(.anchorjs-link)');
        
        // If heading doesn't have an existing link, remove any AnchorJS links
        if (!hasExistingLink) {
            const anchorLink = heading.querySelector('.anchorjs-link');
            if (anchorLink) {
                anchorLink.remove();
            }
        }
    });
}