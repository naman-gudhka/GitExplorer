import { formatNumber, formatRelativeDate } from "./utils.js";

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
