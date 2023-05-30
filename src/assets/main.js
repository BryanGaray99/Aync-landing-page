const url = 'https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PLiD-IJzweXR9WOeQj7zTVbDvQfqxE4ssA&part=snippet&maxResults=70';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd792c92effmsh3cc2bd709e745a8p1e0d76jsnecf7b8a71344',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

// Escuchador del id para content
const content = null || document.getElementById('content');

async function fetchData(urlAPI) {
    const response = await fetch(urlAPI, options);
    const data = await response.json();
    return data;
}

// Función que se llama automáticamente
(async () => {
    try {
        const videos = await fetchData(url);
        // Creamos un template
        let view = `
            ${videos.items.map(video => `
                <div class="group relative">
                    <a href="https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}" target="_blank" rel="noopener noreferrer" class="cursor-pointer">
                        <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.channelTitle}" class="w-full">
                        </div>
                        <div class="mt-4 flex justify-between">
                            <h3 class="text-sm text-gray-700">
                                <span aria-hidden="true" class="absolute inset-0"></span>
                                ${video.snippet.title}
                            </h3>
                        </div>
                    </a>
                </div>
            `).slice(0, 25).join('')}
        `;
        // Insertamos el view en el html 
        content.innerHTML = view;
    } catch (error){
        console.log(error);
    }
})();