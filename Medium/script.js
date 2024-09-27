const fetchButton = document.getElementById('fetch-button');
const imageGrid = document.getElementById('image-grid');
const loadingIndicator = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');
const pagination = document.getElementById('pagination');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');


let currentPage = 1;


function renderData(data) {
    imageGrid.innerHTML = '';  

    
    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        
        const img = document.createElement('img');
        img.src = item.url;
        img.alt = 'Cat Image';

        
        card.appendChild(img);

        
        imageGrid.appendChild(card);
    });
}


function fetchData(page = 1) {
    
    loadingIndicator.style.display = 'block';
    errorMessage.style.display = 'none';

    
    fetch(`https://api.thecatapi.com/v1/images/search?limit=5&page=${page}&order=Desc`)
        .then(response => response.json())
        .then(data => {
            
            loadingIndicator.style.display = 'none';

            
            if (data.length > 0) {
                renderData(data);
                pagination.style.display = 'block';  
            } else {
                imageGrid.innerHTML = '<p>No data available.</p>';
            }

            
            prevButton.disabled = currentPage === 1;
        })
        .catch(error => {
            
            loadingIndicator.style.display = 'none';
            errorMessage.style.display = 'block';
            console.error('Error fetching data:', error);
        });
}


fetchButton.addEventListener('click', () => {
    currentPage = 1;  
    fetchData(currentPage);
});


nextButton.addEventListener('click', () => {
    currentPage++;  
    fetchData(currentPage);
});


prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;  
        fetchData(currentPage);
    }
});