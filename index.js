
const submit = document.querySelector('#submit')

submit.addEventListener("click", () => {
    if (document.querySelector('.news')){
        document.querySelector('.news').style.display = 'none';
    }
    const input = document.querySelector('#input-News').value

    if (!input) {
        alert("please Enter News for Serch")
        return;
    }
    let section1 = document.querySelector('.section1');
    section1.innerHTML = "";

    const fetchNews = async () => {
        try {
            let response = await fetch(`https://newsdata.io/api/1/news?apikey=pub_41500c1fdd58e9e2c78b7491a43cd6cc09380&q=${input}`);

            if (!response.ok) throw new Error("API request failed");

            let data = await response.json();
            console.log(data); // Debug: Check API response

            if (!data.results || data.results.length === 0) {
                section1.innerHTML = "<p>No news available.</p>";
                return;
            }

            data.results.forEach(article => {  

                const newDiv = document.createElement('div');
                
                newDiv.classList.add("news");

                const imgNew = document.createElement('img');
                imgNew.setAttribute('src' , article.image_url);
                imgNew.setAttribute('alt' , article.article_id);
                imgNew.style.width = '100%';
            
                
                const heading = document.createElement('h2');
                heading.innerText = article.title || "No Title Available";

                const author = document.createElement('p');
                author.innerText = `Author: ${article.description || "Unknown"}`;

                newDiv.appendChild(imgNew);
                newDiv.appendChild(heading);
                newDiv.appendChild(author);
                section1.appendChild(newDiv);

                newDiv.addEventListener('click', () => {
                    window.open(article.source_url, "_blank"); 
                });
            });
            document.querySelector('.news').display = 'block';

        } catch (error) {
            console.error("Error fetching data:", error);
            section1.innerHTML = "<p>Error loading news. Please try again later.</p>";
        }
    };

    fetchNews();
});
