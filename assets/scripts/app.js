import { renderFavorites, showError } from "./render.js";
import { saveToStorage } from "./utils.js";
import { favorites } from "../../data/favorites.js";
import { loadDeveloper } from "./developer.js";

const form = document.querySelector("form");
const searchBar = document.querySelector(".js-search-input");
const profileCardSection = document.querySelector(".js-profile-card");
const repoGridSection = document.querySelector(".js-repo-grid");

let currentUsername = "";

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  try{
    profileCardSection.innerHTML = `
    <div>
      <div class="skeleton-box" aria-hidden="true">
        <div class="skeleton-header">
          <div class="skeleton-avatar skeleton-shimmer"></div>
          <div class="skeleton-meta">
            <div class="skeleton-line title skeleton-shimmer"></div>
            <div class="skeleton-line w-50 skeleton-shimmer"></div>
            <div class="skeleton-line w-70 skeleton-shimmer"></div>
          </div>
        </div>
        <div class="skeleton-line w-90 skeleton-shimmer"></div>
        <div class="skeleton-line w-30 skeleton-shimmer"></div>
      </div>
    </div>
    `;

    repoGridSection.innerHTML = `
      <div class="skeleton-box" aria-hidden="true">
        <div class="skeleton-line title skeleton-shimmer"></div>
        <div class="skeleton-line w-90 skeleton-shimmer"></div>
        <div class="skeleton-line w-70 skeleton-shimmer"></div>

        <div class="skeleton-line w-30 skeleton-shimmer"></div>
        <div class="skeleton-line w-50 skeleton-shimmer"></div>
      </div>

      <div class="skeleton-box" aria-hidden="true">
        <div class="skeleton-line title skeleton-shimmer"></div>
        <div class="skeleton-line w-90 skeleton-shimmer"></div>
        <div class="skeleton-line w-70 skeleton-shimmer"></div>

        <div class="skeleton-line w-30 skeleton-shimmer"></div>
        <div class="skeleton-line w-50 skeleton-shimmer"></div>
      </div>

      <div class="skeleton-box" aria-hidden="true">
        <div class="skeleton-line title skeleton-shimmer"></div>
        <div class="skeleton-line w-90 skeleton-shimmer"></div>
        <div class="skeleton-line w-70 skeleton-shimmer"></div>

        <div class="skeleton-line w-30 skeleton-shimmer"></div>
        <div class="skeleton-line w-50 skeleton-shimmer"></div>
      </div>

      <div class="skeleton-box" aria-hidden="true">
        <div class="skeleton-line title skeleton-shimmer"></div>
        <div class="skeleton-line w-90 skeleton-shimmer"></div>
        <div class="skeleton-line w-70 skeleton-shimmer"></div>

        <div class="skeleton-line w-30 skeleton-shimmer"></div>
        <div class="skeleton-line w-50 skeleton-shimmer"></div>
      </div>

      <div class="skeleton-box" aria-hidden="true">
        <div class="skeleton-line title skeleton-shimmer"></div>
        <div class="skeleton-line w-90 skeleton-shimmer"></div>
        <div class="skeleton-line w-70 skeleton-shimmer"></div>

        <div class="skeleton-line w-30 skeleton-shimmer"></div>
        <div class="skeleton-line w-50 skeleton-shimmer"></div>
      </div>

      <div class="skeleton-box" aria-hidden="true">
        <div class="skeleton-line title skeleton-shimmer"></div>
        <div class="skeleton-line w-90 skeleton-shimmer"></div>
        <div class="skeleton-line w-70 skeleton-shimmer"></div>

        <div class="skeleton-line w-30 skeleton-shimmer"></div>
        <div class="skeleton-line w-50 skeleton-shimmer"></div>
      </div>
    `;
    
    currentUsername = searchBar.value.trim();
    
    const user = await loadDeveloper(currentUsername);

    setupFavoriteButton(user);

  }catch(error){

    if(error.message === "User not found!"){
      showError(
        "User Not Found",
        "No GitHub user matching the username could be found. Please check the username and try again.",
        profileCardSection
      );

      showError(
        "Repositories Unavailable",
        "We couldn't load the repositories because the GitHub user could not be retrieved.",
        repoGridSection
      );

    }else if(error.message === "Access Restricted"){
      showError(
        "Access Restricted",
        "GitHub has temporarily restricted this request. You may have reached the API rate limit. Please try again later.",
        profileCardSection
      );

      showError(
        "Repositories Unavailable",
        "We couldn't load the repositories because the GitHub user request was restricted. Please try again later.",
        repoGridSection
      );

    }else if(error.message === "GitHub Server Error"){
      showError(
        "GitHub Server Error",
        "GitHub is currently experiencing a server-side problem. Please try again later.",
        profileCardSection
      );

      showError(
        "Repositories Unavailable",
        "We couldn't load the repositories because GitHub is currently experiencing a server-side problem.",
        repoGridSection
      );

    }else{
      showError(
        "Something Went Wrong",
        "We couldn't retrieve the GitHub user right now. Please try again.",
        profileCardSection
      );

      showError(
        "Repositories Unavailable",
        "We couldn't load the repositories because the GitHub user could not be retrieved.",
        repoGridSection
      );

    }

  }
  
});

const favoritesGridSection = document.querySelector(".js-favorites-grid");

favoritesGridSection.addEventListener('click', async (e) => {
  try{

    const favoriteLink = e.target.closest(".favorite-profile-link");
    if(!favoriteLink){
      return;
    }

    profileCardSection.innerHTML = `
    <div>
      <div class="skeleton-box" aria-hidden="true">
        <div class="skeleton-header">
          <div class="skeleton-avatar skeleton-shimmer"></div>
          <div class="skeleton-meta">
            <div class="skeleton-line title skeleton-shimmer"></div>
            <div class="skeleton-line w-50 skeleton-shimmer"></div>
            <div class="skeleton-line w-70 skeleton-shimmer"></div>
          </div>
        </div>
        <div class="skeleton-line w-90 skeleton-shimmer"></div>
        <div class="skeleton-line w-30 skeleton-shimmer"></div>
      </div>
    </div>
    `;

    repoGridSection.innerHTML = `
      <div class="skeleton-box" aria-hidden="true">
        <div class="skeleton-line title skeleton-shimmer"></div>
        <div class="skeleton-line w-90 skeleton-shimmer"></div>
        <div class="skeleton-line w-70 skeleton-shimmer"></div>

        <div class="skeleton-line w-30 skeleton-shimmer"></div>
        <div class="skeleton-line w-50 skeleton-shimmer"></div>
      </div>

      <div class="skeleton-box" aria-hidden="true">
        <div class="skeleton-line title skeleton-shimmer"></div>
        <div class="skeleton-line w-90 skeleton-shimmer"></div>
        <div class="skeleton-line w-70 skeleton-shimmer"></div>

        <div class="skeleton-line w-30 skeleton-shimmer"></div>
        <div class="skeleton-line w-50 skeleton-shimmer"></div>
      </div>

      <div class="skeleton-box" aria-hidden="true">
        <div class="skeleton-line title skeleton-shimmer"></div>
        <div class="skeleton-line w-90 skeleton-shimmer"></div>
        <div class="skeleton-line w-70 skeleton-shimmer"></div>

        <div class="skeleton-line w-30 skeleton-shimmer"></div>
        <div class="skeleton-line w-50 skeleton-shimmer"></div>
      </div>

      <div class="skeleton-box" aria-hidden="true">
        <div class="skeleton-line title skeleton-shimmer"></div>
        <div class="skeleton-line w-90 skeleton-shimmer"></div>
        <div class="skeleton-line w-70 skeleton-shimmer"></div>

        <div class="skeleton-line w-30 skeleton-shimmer"></div>
        <div class="skeleton-line w-50 skeleton-shimmer"></div>
      </div>

      <div class="skeleton-box" aria-hidden="true">
        <div class="skeleton-line title skeleton-shimmer"></div>
        <div class="skeleton-line w-90 skeleton-shimmer"></div>
        <div class="skeleton-line w-70 skeleton-shimmer"></div>

        <div class="skeleton-line w-30 skeleton-shimmer"></div>
        <div class="skeleton-line w-50 skeleton-shimmer"></div>
      </div>

      <div class="skeleton-box" aria-hidden="true">
        <div class="skeleton-line title skeleton-shimmer"></div>
        <div class="skeleton-line w-90 skeleton-shimmer"></div>
        <div class="skeleton-line w-70 skeleton-shimmer"></div>

        <div class="skeleton-line w-30 skeleton-shimmer"></div>
        <div class="skeleton-line w-50 skeleton-shimmer"></div>
      </div>
    `;

    const username = favoriteLink.dataset.login;
    currentUsername = username;
    const user = await loadDeveloper(username);
    setupFavoriteButton(user);

  }catch(error){

    if(error.message === "User not found!"){
      showError(
        "User Not Found",
        "No GitHub user matching the username could be found. Please check the username and try again.",
        profileCardSection
      );

      showError(
        "Repositories Unavailable",
        "We couldn't load the repositories because the GitHub user could not be retrieved.",
        repoGridSection
      );

    }else if(error.message === "Access Restricted"){
      showError(
        "Access Restricted",
        "GitHub has temporarily restricted this request. You may have reached the API rate limit. Please try again later.",
        profileCardSection
      );

      showError(
        "Repositories Unavailable",
        "We couldn't load the repositories because the GitHub user request was restricted. Please try again later.",
        repoGridSection
      );

    }else if(error.message === "GitHub Server Error"){
      showError(
        "GitHub Server Error",
        "GitHub is currently experiencing a server-side problem. Please try again later.",
        profileCardSection
      );

      showError(
        "Repositories Unavailable",
        "We couldn't load the repositories because GitHub is currently experiencing a server-side problem.",
        repoGridSection
      );

    }else{
      showError(
        "Something Went Wrong",
        "We couldn't retrieve the GitHub user right now. Please try again.",
        profileCardSection
      );

      showError(
        "Repositories Unavailable",
        "We couldn't load the repositories because the GitHub user could not be retrieved.",
        repoGridSection
      );
    }

  }

});

function setupFavoriteButton(user){
  const favoriteButton = document.querySelector(".js-favorite-btn");

  favoriteButton.addEventListener('click', () => {
    if(!favorites.some((favorite) => favorite.login === user.login)){
      favorites.push({
        login: user.login,
        name: user.name,
        avatar_url: user.avatar_url
      });
      favoriteButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        <span>Favorited</span>
      `;
      saveToStorage("favorites", favorites);
      renderFavorites(currentUsername);
    }else{
      const index = favorites.findIndex((favorite) => favorite.login === user.login);
      favorites.splice(index, 1);
      favoriteButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        <span>Add to favorites</span>
      `;
      saveToStorage("favorites", favorites);
      renderFavorites(currentUsername);
    }
  });
}