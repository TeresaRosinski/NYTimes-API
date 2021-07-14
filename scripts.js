const searchForm = document.querySelector("#searchForm");

searchForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const searchTerm = searchForm.elements.query.value;
  const res = await axios.get(
    `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${searchTerm}&api-key=cngyfAZrJbpvWyQ3tgRIxesHGlpJw2Ga`
  );

  makeMovieCard(res.data.results);
});

const makeMovieCard = (movies) => {
  let resultsContainer = document.querySelector("#results");
  resultsContainer.innerHTML = "";
  for (let result of movies) {
    const card = document.createElement("A");
    const textBox = document.createElement("DIV");
    const title = document.createElement("P");
    const summary = document.createElement("P");
    const link = document.createElement("P");
    const img = document.createElement("IMG");

    card.className = "card";
    textBox.className = "textBox";
    img.className = "img";
    title.className = "title";
    summary.className = "summary";
    link.className = "link";

    title.innerHTML = result.display_title;
    summary.innerHTML = result.summary_short;
    link.innerHTML = result.link.suggested_link_text;

    img.src = result.multimedia.src;
    card.href = result.link.url;

    textBox.appendChild(title);
    textBox.appendChild(summary);
    textBox.appendChild(link);

    card.append(img);
    card.append(textBox);

    resultsContainer.appendChild(card);
  }
};

