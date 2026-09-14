const BASE_URL = "https://api.github.com";

export async function getUser(username){
  const response = await fetch(`${BASE_URL}/users/${username}`);
  if(!response.ok){
    throw new Error("User not found!");
  }
  const user = await response.json();
  return user;
}

export async function getRepositories(username, page, perPage){
  const response = await fetch(`${BASE_URL}/users/${username}/repos?per_page=${perPage}&page=${page}`);
  if(!response.ok){
    throw new Error("Failed to fetch repositories");
  }
  const linkHeader = response.headers.get("Link");
  const hasNextPage = !!linkHeader && linkHeader.includes('rel="next"');
  const hasPreviousPage = !!linkHeader && linkHeader.includes('rel="prev"');
  const repositories = await response.json();
  return {  
    repositories, 
    hasNextPage, 
    hasPreviousPage
  };
}