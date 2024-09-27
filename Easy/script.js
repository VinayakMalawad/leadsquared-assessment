const fetchButton = document.getElementById('fetch-button');
const imageGrid = document.getElementById('image-grid');
const loadingIndicator = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');


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


function fetchData() {
    
    loadingIndicator.style.display = 'block';
    errorMessage.style.display = 'none'; 

    
    fetch('https://api.thecatapi.com/v1/images/search?limit=5&page=10&order=Desc')
        .then(response => response.json())
        .then(data => {
            
            loadingIndicator.style.display = 'none';

            
            if (data.length > 0) {
                renderData(data);
            } else {
                imageGrid.innerHTML = '<p>No data available.</p>';
            }
        })
        .catch(error => {
           
            loadingIndicator.style.display = 'none';
            errorMessage.style.display = 'block';
            console.error('Error fetching data:', error);
        });
}


fetchButton.addEventListener('click', fetchData);