const imageList = document.getElementById('image-list');
const loadingIndicator = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');


let currentPage = 1;
let isLoading = false;


function renderData(data) {
    
    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        
        const img = document.createElement('img');
        img.src = item.url;
        img.alt = 'Cat Image';

        
        card.appendChild(img);

        
        imageList.appendChild(card);
    });
}


function fetchData(page = 1) {
    
    loadingIndicator.style.display = 'block';
    errorMessage.style.display = 'none';
    isLoading = true;

    
    fetch(`https://api.thecatapi.com/v1/images/search?limit=5&page=${page}&order=Desc`)
        .then(response => response.json())
        .then(data => {
            
            loadingIndicator.style.display = 'none';
            isLoading = false;

            
            if (data.length > 0) {
                renderData(data);
            } else {
                imageList.innerHTML += '<p>No more data available.</p>';
            }
        })
        .catch(error => {
            
            loadingIndicator.style.display = 'none';
            isLoading = false;
            errorMessage.style.display = 'block';
            console.error('Error fetching data:', error);
        });
}


function handleScroll() {
    
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;

    
    if (scrollPosition >= pageHeight - 100 && !isLoading) {
        currentPage++;  
        fetchData(currentPage);  
    }
}


window.addEventListener('scroll', handleScroll);

// Initial data fetch when the page loads
fetchData(currentPage);