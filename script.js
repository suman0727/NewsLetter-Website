//api key built fro news webiste 
const API_KEY = "8b9ad4b9c4934a9c9e067c2e2cf3209c";//apikey from news 
const url = "https://newsapi.org/v2/everything?q=";//my url of api_news

//window open and fecth news of india
window.addEventListener("load", () => fetchNews("India"))
//when loaded query will be shown like this

//for reloading page when clicked on logo
function reload(){
  window.location.reload();
}

//for fetching data from the other news using api
async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
  const data = await res.json();//await promising to give data
  console.log(data);
  bindData(data.articles);//binding data by making fn
}

//to bind data and clone as much articles is shown and inline with html to use it properties
function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  //for each card when agin called api it becomes empty and then load contents
  cardsContainer.innerHTML ="";

  articles.forEach(article => {
    if(!article.urlToImage) return;
    //if article not contain image we will not show

    //deep cloning all the contents inside div will get cloned
    const cardClone =newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone,article);
    cardsContainer.appendChild(cardClone);
  });
}

//to fill contents of the data
function fillDataInCard(cardClone,article){
    const newsImg =cardClone.querySelector('#news-img');
    const newsTitle =cardClone.querySelector('#news-title');
    const newsSource =cardClone.querySelector('#news-source');
    const newsDesc =cardClone.querySelector('#news-desc');
    
    //for filling api data in our cards 
    newsImg.src= article.urlToImage;
    newsTitle.innerHTML =article.title;
    newsDesc.innerHTML= article.description;
    
    //for date, time  of article to be wrote
    const date= new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    //for every souce date will be shown in card
    newsSource.innerHTML=`${article.source.name} . ${date}`;

    //for specific navbar news
    cardClone.firstElementChild.addEventListener("click", () => {
      window.open(article.url,"blank");
    })
}

//for navbar link active whwn webpage opened
let curSelectedNav =null;
function onNavItemClick(id){
  fetchNews(id);
  const navItem=document.getElementById(id);
  curSelectedNav?.classList.remove('active');
  curSelectedNav=navItem;
  curSelectedNav.classList.add('active');
}

//searchbutton 
const searchButton =document.getElementById('search-button');
const searchText =document.getElementById('search-text');

searchButton.addEventListener('click',() =>{
  const query =searchText.value;
  if(!query) return;
  fetchNews(query);
  //if search there should be no link selected
  curSelectedNav?.classList.remove('active');
  curSelectedNav=null;
})