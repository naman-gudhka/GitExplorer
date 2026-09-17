const repoSearch = document.querySelector("#repoSearchInput");
const langFilter = document.querySelector("#langFilterSelect");
const sortSelect = document.querySelector("#sortSelect");

export function processRepositories(allRepositories){
  const repoSearchInput = repoSearch.value.trim().toLowerCase();
  const langFilterInput = langFilter.value;
  const sortSelectInput = sortSelect.value;

  const filterByName = allRepositories.filter((repository) => {
    return repository.name.toLowerCase().includes(repoSearchInput);
  });

  const filterByLanguage = filterByName.filter((repository) => {
    if(langFilterInput === "all"){
      return true;
    }
    return repository.language === langFilterInput;
  });

  const sortedRepositories = filterByLanguage.sort((a, b) => {
    if(sortSelectInput === "stars-desc"){
      return b.stargazers_count - a.stargazers_count;
    }
    if(sortSelectInput === "name-asc"){
      return a.name.localeCompare(b.name);
    }
    if(sortSelectInput === "updated-desc"){
      return new Date(b.updated_at) - new Date(a.updated_at);
    }
  });

  return sortedRepositories;

}

export function setupRepositoryControls(callback) {

  repoSearch.addEventListener("input", () => {
    callback();
  });

  langFilter.addEventListener("change", () => {
    callback();
  });

  sortSelect.addEventListener("change", () => {
    callback();
  });

}

export function resetRepositoryControls() {
  repoSearch.value = "";
  langFilter.value = "all";
  sortSelect.value = "stars-desc";
}

export function populateLanguageFilter(allRepositories){
  const languages = [];

  allRepositories.forEach((repository) => {
    if(repository.language && !languages.includes(repository.language)){
      languages.push(repository.language);
    }
  });

  languages.sort();

  let languageHTML = `<option value="all">All Languages</option>`;

  languages.forEach((language) => {
    languageHTML += `
      <option value="${language}">${language}</option>
    `;
  });

  langFilter.innerHTML = languageHTML;

}