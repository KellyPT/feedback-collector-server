// write a function to retrieve a blob of json
// make an ajax request! use the 'fetch' function
// https://rallycoding.herokuapp.com/api/music_albums

function fetchAlbums() {
    fetch('https://rallycoding.herokuapp.com/api/music_albums')
        .then(res => res.json())
        .then(json => console.log(json));
}

fetchAlbums();
