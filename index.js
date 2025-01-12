const submit = document.querySelector("#submit");

submit.addEventListener("click", () => {
    if (document.querySelector(".news")) {
        document.querySelector(".news").style.display = "none";
    }
    const input = document.querySelector("#input-News").value.trim();

    if (!input) {
        alert("Please enter news for search");
        return;
    }

    let section1 = document.querySelector(".section1");
    section1.innerHTML = "";

    const fetchNews = async () => {
        try {
            let response = await fetch(
                `https://newsdata.io/api/1/news?apikey=pub_41500c1fdd58e9e2c78b7491a43cd6cc09380&q=${input}`
            );

            if (!response.ok) throw new Error("API request failed");

            let data = await response.json();
            console.log(data); // Debugging: Check API response

            if (!data.results || data.results.length === 0) {
                section1.innerHTML = "<p>No news available.</p>";
                return;
            }

            data.results.forEach((article) => {
                const newDiv = document.createElement("div");
                newDiv.classList.add("news");

                // Create image element
                let imgNew = document.createElement("img");
                if (article.image_url && article.image_url.length > 0) {
                    imgNew.setAttribute("src", article.image_url);
                    imgNew.setAttribute("alt", "News Image");
                    imgNew.style.width = "100%";
                    imgNew.style.height = "50%";
                    newDiv.appendChild(imgNew);
                }

                // Create heading element
                const heading = document.createElement("h2");
                heading.innerText = article.title ? article.title.slice(0, 20) : "No Title Available";
                newDiv.appendChild(heading);

                // Create author/description element
                const author = document.createElement("p");
                author.innerText = `Author: ${article.description.slice(0,120).trim() || "Unknown"}`;
                newDiv.appendChild(author);

                // Append news to section
                section1.appendChild(newDiv);

                // Add event listener for opening article link
                newDiv.addEventListener("click", () => {
                    if (article.source_url) {
                        window.open(article.source_url, "_blank");
                    } else {
                        alert("No source URL available.");
                    }
                });
            });

            // Ensure news is displayed
            const firstNews = document.querySelector(".news");
            if (firstNews) {
                firstNews.style.display = "block";
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            section1.innerHTML = "<p>Error loading news. Please try again later.</p>";
        }
    };

    fetchNews();
});

const cancel = document.querySelector("#cancel");

cancel.addEventListener("click", () => {
    document.querySelector(".section1").innerHTML = "";
    document.querySelector("#input-News").value = "";
});
