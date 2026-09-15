import { getRepositories, getUser } from "./github-api.js";
import { renderRepositories } from "./render.js";
import { formatNumber } from "./utils.js";

const form = document.querySelector("form");
const searchBar = document.querySelector(".js-search-input");
const profileCardSection = document.querySelector(".js-profile-card");
const repoGridSection = document.querySelector(".js-repo-grid");

let currentPage = 1;
const reposPerPage = 6;

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
    
    const user = await getUser(currentUsername);

    currentPage = 1;

    let result;

    try{
       result = await getRepositories(currentUsername, currentPage, reposPerPage);
    }catch(error){
      repoGridSection.innerHTML = `
        <div class="state-banner-error" role="alert">
          <svg class="state-error-icon" viewBox="0 0 24 24"
            fill="none" stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>

          <div class="state-error-content">
            <h4 class="state-error-title">
              Repositories Unavailable
            </h4>

            <p class="state-error-text">
              We couldn't retrieve this developer's repositories.
              Please try again.
            </p>
          </div>
        </div>
      `;
      return;
    }

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
              <button type="button" class="btn btn-favorite" id="addFavoriteBtn" aria-label="Add developer to favorites">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span>Favorited</span>
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

    if(result.repositories.length === 0){
      repoGridSection.innerHTML = `
        <div class="state-card-empty">
          <div class="state-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </div>
          <h3 class="state-card-title">No Public Repositories</h3>
          <p class="state-card-text">
            This developer doesn't have any public repositories.
          </p>
        </div>
      `;
    }else{
      renderRepositories(result, repoGridSection);
      setUpPagination(result, currentUsername, reposPerPage);
    }

  }catch(error){
    profileCardSection.innerHTML = `
      <div>
        <div class="state-banner-error" role="alert">
          <svg class="state-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <div class="state-error-content">
            <h4 class="state-error-title">User Not Found</h4>
            <p class="state-error-text">No GitHub user matching the query could be retrieved. Please check the username spelling or try another query.</p>
          </div>
        </div>
      </div>
    `;

    repoGridSection.innerHTML = `
      <div class="state-banner-error" role="alert">
        ...
        <div class="state-error-content">
          <h4 class="state-error-title">Repositories Unavailable</h4>
          <p class="state-error-text">
            We couldn't retrieve repositories because the GitHub user
            could not be found.
          </p>
        </div>
      </div>
    `;
  }
  
});

function setUpPagination(result, currentUsername, reposPerPage){
  if(result.hasNextPage || result.hasPreviousPage){
  const prevPageButton = document.querySelector(".js-prev-page");
  const nextPageButton = document.querySelector(".js-next-page");
  const pageNumber = document.querySelector(".js-page-number");

  prevPageButton.disabled = !result.hasPreviousPage;
  nextPageButton.disabled = !result.hasNextPage;
  pageNumber.textContent = `Page ${currentPage}`;

  nextPageButton.addEventListener('click', async () => {
    const nextPage = currentPage + 1;

    try {
      const result = await getRepositories(
        currentUsername,
        nextPage,
        reposPerPage
      );

      currentPage = nextPage;

      renderRepositories(result, repoGridSection);
      setUpPagination(result, currentUsername, reposPerPage);

    }catch(error) {
      repoGridSection.innerHTML = `
        <div class="state-banner-error" role="alert">
          <svg class="state-error-icon" viewBox="0 0 24 24"
            fill="none" stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>

          <div class="state-error-content">
            <h4 class="state-error-title">
              Repositories Unavailable
            </h4>

            <p class="state-error-text">
              We couldn't retrieve this developer's repositories.
              Please try again.
            </p>
          </div>
        </div>
      `;
    }
  }); 

  prevPageButton.addEventListener('click', async () => {
    const previousPage = currentPage - 1;

    try {
      const result = await getRepositories(
        currentUsername,
        previousPage,
        reposPerPage
      );

      currentPage = previousPage;

      renderRepositories(result, repoGridSection);
      setUpPagination(result, currentUsername, reposPerPage);

    } catch(error) {
      repoGridSection.innerHTML = `
        <div class="state-banner-error" role="alert">
          <svg class="state-error-icon" viewBox="0 0 24 24"
            fill="none" stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>

          <div class="state-error-content">
            <h4 class="state-error-title">
              Repositories Unavailable
            </h4>

            <p class="state-error-text">
              We couldn't retrieve this developer's repositories.
              Please try again.
            </p>
          </div>
        </div>
      `;
    }
  });
}
}