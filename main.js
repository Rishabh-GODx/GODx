//bhai banna nhi paya sorry

// Sample temple data
const temples = [
    {
        id: 1,
        name: "Sri Krishna Temple",
        distance: "1.2",
        address: "123 Temple Street",
        status: "accepting",
        collectedAmount: 65,
        capacity: 100,
        lat: 12.9716,
        lng: 77.5946
    },
    {
        id: 2,
        name: "Ganesha Temple",
        distance: "2.5",
        address: "456 Divine Road",
        status: "full",
        collectedAmount: 100,
        capacity: 100,
        lat: 12.9815,
        lng: 77.5968
    }
];

// Function to create temple cards
function createTempleCard(temple) {
    const percentage = (temple.collectedAmount / temple.capacity) * 100;
    
    return `
        <div class="temple-card">
            <div class="temple-header">
                <span class="temple-name">${temple.name}</span>
                <span class="status-badge ${temple.status === 'accepting' ? 'status-accepting' : 'status-full'}">
                    ${temple.status === 'accepting' ? 'Accepting Donations' : 'Collection Full'}
                </span>
            </div>
            
            <div class="temple-info">
                <div class="info-row">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>${temple.address}</span>
                </div>
                
                <div class="info-row">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>${temple.distance} km away</span>
                </div>
            </div>

            <div class="progress-container">
                <div class="progress-header">
                    <span>Collection Status</span>
                    <span>${temple.collectedAmount}/${temple.capacity} portions</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
            </div>

            <div class="button-container">
                <button class="donate-btn" ${temple.status !== 'accepting' ? 'disabled' : ''}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Donate Food
                </button>
                
                <button class="navigate-btn" onclick="navigateToTemple(${temple.lat}, ${temple.lng})">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                    </svg>
                    Navigate
                </button>
            </div>
        </div>
    `;
}

// Function to navigate to temple
function navigateToTemple(lat, lng) {
    // In production, integrate with maps API
    alert(`Navigating to location: ${lat}, ${lng}`);
}


// Render temple cards
document.addEventListener('DOMContentLoaded', () => {
    const templesContainer = document.getElementById('temples-list');
    const templeCards = temples.map(temple => createTempleCard(temple)).join('');
    templesContainer.innerHTML = templeCards;
});
