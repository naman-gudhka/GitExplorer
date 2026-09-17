import { favorites } from "../../data/favorites.js";
import { formatNumber, formatRelativeDate, saveToStorage } from "./utils.js";

const favoritesGridSection = document.querySelector(".js-favorites-grid");
const favoriteCount = document.querySelector(".js-favorites-count");

export function renderProfile(user, profileCardSection){

  let profileDetails = '';
  let profileBio = '';

  if(user.bio){
    profileBio = `
      <p class="profile-bio">
          ${user.bio}
      </p>
    `;
  }

  if(user.location){
    profileDetails += `
      <li class="profile-detail-item">
        <svg class="profile-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <span>${user.location}</span>
      </li>
    `;
  }

  if(user.blog){
    profileDetails += `
      <li class="profile-detail-item">
        <svg class="profile-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
        <a href="${user.blog}" target="_blank" rel="noopener noreferrer">${user.blog}</a> 
      </li> 
    `;
  }

  if(user.company){
    profileDetails += `
      <li class="profile-detail-item"> 
        <svg class="profile-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"> 
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect> 
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path> 
        </svg> 
        <span>${user.company}</span> 
      </li> 
    `;
  }

  profileCardSection.classList.add("profile-card");

  profileCardSection.innerHTML = `
    <div class="profile-header">
      <!-- Avatar -->
      <div class="profile-avatar-container">
        <img 
          class="profile-avatar" 
          src="${user.avatar_url}" 
          alt="${user.name} GitHub avatar" 
          width="104" 
          height="104"
        >
      </div>

      <!-- Main Meta & Identity -->
      <div class="profile-main-meta">
        <div class="profile-title-row">
          <div class="profile-name-group">
            <h2 class="profile-name" id="profile-name-heading">${user.name}</h2>
            <span class="profile-username">${user.login}</span>
          </div>

          <!-- Profile Actions -->
          <div class="profile-actions">
            <!-- Add to Favorites button placeholder -->
            <button type="button" class="btn btn-favorite js-favorite-btn" id="addFavoriteBtn" aria-label="Add developer to favorites">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span>${favorites.some((developer) => developer.login === user.login) ? "Favorited" : "Add to Favorites"}</span>
            </button>

            <!-- View on GitHub link placeholder -->
            <a href="${user.html_url}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer" aria-label="View ${user.name} profile on GitHub">
              <span>GitHub</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>

        <!-- Bio -->
        ${profileBio}

        <!-- Profile Attributes List -->
        <ul class="profile-details-list">
          ${profileDetails}
        </ul> 
      </div> 
    </div> 

    <!-- Stats Bar --> 
    <div class="profile-stats-grid"> 
      <div class="stat-box"> 
        <span class="stat-value">${formatNumber(user.followers)}</span> 
        <span class="stat-label">Followers</span> 
      </div> 
      <div class="stat-box"> 
        <span class="stat-value">${formatNumber(user.following)}</span> 
        <span class="stat-label">Following</span> 
      </div> 
      <div class="stat-box"> 
        <span class="stat-value">${user.public_repos}</span> 
        <span class="stat-label">Public Repos</span> 
      </div> 
    </div> 
  `;
}

export function renderRepositories(repositories, repoGridSection){

  const repoHTML = repositories.map((repo) => {
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

  const paginationHTML = `
    <div class="pagination js-pagination">
      <button type="button" class="js-prev-page">← Previous</button>
      <span class="js-page-number">Page 1</span>
      <button type="button" class="js-next-page">Next →</button>
    </div>
  `;

  repoGridSection.innerHTML = repoHTML + paginationHTML;

}

export function renderFavorites(currentUsername){

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
      <div class="favorite-item">
        <a href="#profile" class="favorite-profile-link" aria-label="View ${favorite.name} profile" data-login="${favorite.login}">
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
        if(deleteButton === currentUsername){
          const favoriteButton = document.querySelector(".js-favorite-btn");
          favoriteButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>Add to Favorites</span>
          `;
        }
      });
    });

  }

  favoriteCount.textContent = `${favorites.length} Saved Developers`;

}

export function showError(title, message, section){
  section.innerHTML = 
  `<div>
    <div class="state-banner-error" role="alert">
      <svg class="state-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <div class="state-error-content">
        <h4 class="state-error-title">${title}</h4>
        <p class="state-error-text">${message}</p>
      </div>
    </div>
  </div>
  `;
}