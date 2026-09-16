import { getUser, getRepositories } from "./github-api.js";
import { renderProfile, renderRepositories, showError } from "./render.js";

const profileCardSection = document.querySelector(".js-profile-card");
const repoGridSection = document.querySelector(".js-repo-grid");

let currentPage = 1;
const reposPerPage = 6;

export async function loadDeveloper(username){

  const user = await getUser(username);

  renderProfile(user, profileCardSection);
  
  currentPage = 1;

  let result;

  try{
      result = await getRepositories(username, currentPage, reposPerPage);
  }catch(error){
    showError(
      "Repositories Unavailable",
      "We couldn't retrieve this developer's repositories. Please try again.",
      repoGridSection
    );

    return user;
  } 

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
    setUpPagination(result, username, reposPerPage, repoGridSection);
  }

  return user;

}

function setUpPagination(result, currentUsername, reposPerPage, repoGridSection){
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
        setUpPagination(result, currentUsername, reposPerPage, repoGridSection);

      }catch(error) {
        showError(
          "Repositories Unavailable",
          "We couldn't retrieve this developer's repositories. Please try again.",
          repoGridSection
        );
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
        setUpPagination(result, currentUsername, reposPerPage, repoGridSection);

      } catch(error) {
        showError(
          "Repositories Unavailable",
          "We couldn't retrieve this developer's repositories. Please try again.",
          repoGridSection
        );
      }
    });
  }
}