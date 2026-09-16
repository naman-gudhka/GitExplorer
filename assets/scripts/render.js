import { favorites } from "../../data/favorites.js";
import { formatNumber, formatRelativeDate, saveToStorage } from "./utils.js";

const favoritesGridSection = document.querySelector(".js-favorites-grid");
const favoriteCount = document.querySelector(".js-favorites-count");

export function renderRepositories(result, repoGridSection){

  const repoHTML = result.repositories.map((repo) => {
      return `
        <article class="repo-card">
          <div class="repo-card-top">
            <div class="repo-card-header">
              <div class="repo-title-wrapper">
                <svg class="repo-book-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                <a href="https://github.com/${repo.full_name}" class="repo-name-link">${repo.name}</a>
              </div>
              <span class="badge">Public</span>
            </div>

            <p class="repo-description">
              ${repo.description}
            </p>
          </div>

          <div class="repo-card-footer">
            <div class="repo-meta-group">
              <span class="repo-lang-badge">
                <span class="lang-dot ts" aria-hidden="true"></span>
                <span>${repo.language}</span>
              </span>

              <span class="repo-stat-item" title="60,340 Stars">
                <svg class="repo-stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                ${formatNumber(repo.stargazers_count)}
              </span>

              <span class="repo-stat-item" title="15,400 Forks">
                <svg class="repo-stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <circle cx="12" cy="18" r="3"></circle>
                  <circle cx="6" cy="6" r="3"></circle>
                  <circle cx="18" cy="6" r="3"></circle>
                  <path d="M18 9v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"></path>
                  <path d="M12 12v3"></path>
                </svg>
                ${formatNumber(repo.forks_count)}
              </span>

              <span class="repo-updated">${formatRelativeDate(repo.updated_at)}</span>
            </div>

            <a href="${repo.html_url}" class="btn btn-view-repo">View Repo &rarr;</a>
          </div>
        </article>
      `;
  }).join("");

  let paginationHTML = "";

  if(result.hasNextPage || result.hasPreviousPage){
    paginationHTML = `
      <div class="pagination js-pagination">
        <button type="button" class="js-prev-page">← Previous</button>
        <span class="js-page-number">Page 1</span>
        <button type="button" class="js-next-page">Next →</button>
      </div>
    `;
  }

  repoGridSection.innerHTML = repoHTML + paginationHTML;

}

export function renderFavorites(){

  if(favorites.length === 0){
    favoritesGridSection.innerHTML = `
      <div class="state-card-empty">
        <div class="state-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>

        <h3 class="state-card-title">No Favorites Yet</h3>

        <p class="state-card-text">
          Add GitHub developers to your favorites to see them here.
        </p>
      </div>
    `;
  }else{
    const favoritesGridHTML = favorites.map((favorite) => {
    return `
      <div class="favorite-item is-active">
        <a href="#profile" class="favorite-profile-link" aria-label="View ${favorite.name} profile (currently active)">
          <img class="favorite-avatar" src="${favorite.avatar_url}" alt="${favorite.name} avatar" loading="lazy" width="38" height="38">
          <div class="favorite-info">
            <span class="favorite-name">${favorite.name}</span>
            <span class="favorite-handle">${favorite.login}</span>
          </div>
        </a>
        <button type="button" class="btn-icon btn-icon-danger favorite-remove-btn" title="Remove from favorites" aria-label="Remove ${favorite.name} from favorites" data-login="${favorite.login}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    `;
    }).join("");

    favoritesGridSection.innerHTML = favoritesGridHTML;

    const deleteButtons = document.querySelectorAll(".favorite-remove-btn");

    deleteButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const deleteButton = button.dataset.login;
        const index = favorites.findIndex((favorite) => favorite.login === deleteButton);
        favorites.splice(index, 1);
        saveToStorage("favorites", favorites);
        renderFavorites();
      });
    });

  }

  favoriteCount.textContent = `${favorites.length} Saved Developers`;

}