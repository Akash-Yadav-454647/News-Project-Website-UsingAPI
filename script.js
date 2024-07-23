const apikey = "c637e678bed7426eac426c3154d2c069";
const blogContainer = document.getElementById("blog-container");

const searchQuery = document.getElementById("search-input");

const button = document.getElementById("search-button");

async function fetchNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apikey=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.log("fetching news error ", error);
    return [];
  }
}

button.addEventListener("click", async () => {
  const query = searchQuery.value.trim();
  if (query !== "") {
    try {
      const articles = await fetchNewsQuery(query);
      displayBlogs(articles);
    } catch (error) {
      console.log("Error fecth using query", error);
    }
  }
});

async function fetchNewsQuery(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json(); // Await the JSON parsing
    return data.articles; // Return the articles array
  } catch (error) {
    console.log("fetching news error ", error);
    return [];
  }
}

function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    const title = document.createElement("h2");
    const shorttitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "..."
        : article.title;
    title.textContent = shorttitle;
    const description = document.createElement("p");
    description.textContent = article.description;
    console.log(article);

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
    blogContainer.appendChild(blogCard);
  });
}

(async () => {
  try {
    const articles = await fetchNews();
    displayBlogs(articles);
  } catch (error) {
    console.log(error);
  }
})();
