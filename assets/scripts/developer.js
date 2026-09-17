import { getUser, getAllRepositories } from "./github-api.js";
import { renderProfile, renderRepositories, showError, showNoMatchingRepositories } from "./render.js";
import { processRepositories, resetRepositoryControls, setupRepositoryControls, populateLanguageFilter } from "./controls.js";

const profileCardSection = document.querySelector(".js-profile-card");
const repoGridSection = document.querySelector(".js-repo-grid");

let currentPage = 1;
const reposPerPage = 6;

let currentRepositories = [];

export async function loadDeveloper(username){

  const user = await getUser(username);

  renderProfile(user, profileCardSection);

  try{
      currentRepositories = await getAllRepositories(username);
      populateLanguageFilter(currentRepositories);
  }catch(error){
    showError(
      "Repositories Unavailable",
      "We couldn't retrieve this developer's repositories. Please try again.",
      repoGridSection
    );

    return user;
  } 

  updateRepositoryView();

  return user;

}

function setUpPagination(processedRepositories) {
  const prevPageButton = document.querySelector(".js-prev-page");
  const nextPageButton = document.querySelector(".js-next-page");
  const pageNumber = document.querySelector(".js-page-number");

  const totalPages = Math.ceil(processedRepositories.length / reposPerPage);

  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === totalPages;
  pageNumber.textContent = `Page ${currentPage} of ${totalPages}`;

  nextPageButton.addEventListener("click", () => {
    currentPage++;

    const paginatedRepositories = getPaginatedRepositories(processedRepositories, currentPage);

    renderRepositories(paginatedRepositories, repoGridSection);

    setUpPagination(processedRepositories);
  });

  prevPageButton.addEventListener("click", () => {
    currentPage--;

    const paginatedRepositories = getPaginatedRepositories(processedRepositories, currentPage);

    renderRepositories(paginatedRepositories, repoGridSection);

    setUpPagination(processedRepositories);
  });
}

function getPaginatedRepositories(processedRepositories, currentPage){
  const startIndex = (currentPage - 1) * reposPerPage;
  const endIndex = startIndex + reposPerPage;
  const currentRepositories = processedRepositories.slice(startIndex, endIndex);
  return currentRepositories;
} 

function updateRepositoryView(){
  currentPage = 1;

  if (currentRepositories.length === 0) {
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

    return;
  }

  const processedRepositories = processRepositories(currentRepositories);
  
  if (processedRepositories.length === 0) {
    
    showNoMatchingRepositories(repoGridSection);
    const resetButton = document.querySelector(".js-clear-filters");
    
    resetButton.addEventListener('click', () => {
      resetRepositoryControls();
      updateRepositoryView();
    });
    
    return;
  
  }
  const paginatedRepositories = getPaginatedRepositories(processedRepositories, currentPage);
  
  renderRepositories(paginatedRepositories, repoGridSection);
  
  setUpPagination(processedRepositories);
}

setupRepositoryControls(updateRepositoryView);