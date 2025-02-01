const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm){
    if (!searchTerm.trim()) {
        console.error("Search term is empty");
        return;
    }

    const url = `http://localhost:3000/artists?name_like=${encodeURIComponent(searchTerm)}`;
    console.log(`Fetching URL: ${url}`); // Debugging line

    fetch(url)
        .then((response) => {
            console.log('Response status:', response.status); // Debugging line
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((result) => {
            console.log('Fetch result:', result); // Debugging line
            displayResults(result);
        })
        .catch((error) => console.error('Fetch error:', error));
}

function displayResults(result){
    resultPlaylist.classList.add("hidden");
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    if (result.length === 0) {
        console.log('No results found'); // Debugging line
        artistName.innerText = 'No results found';
        artistImage.src = '';
        return;
    }

    result.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
    });

    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        return;
    }
    
    requestApi(searchTerm);
});