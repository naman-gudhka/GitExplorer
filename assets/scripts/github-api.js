import { allRepositories } from '../../data/allRepositories.js'

const BASE_URL = "https://api.github.com";

export async function getUser(username){
  const response = await fetch(`${BASE_URL}/users/${username}`);
  if(!response.ok){
    if(response.status === 404){
      throw new Error("User not found!");
    }else if(response.status === 403){
      throw new Error("Access Restricted");
    }else if(response.status >= 500 && response.status < 600){
      throw new Error("GitHub Server Error");
    }else{
      throw new Error("Something Went Wrong");
    }
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

export async function getAllRepositories(username){
  
  allRepositories.length = 0;

  let page = 1;
  const perPage = 100;
  let hasNextPage = true;

  while(hasNextPage){
    let response = await getRepositories(username, page, perPage);
    allRepositories.push(...response.repositories);
    hasNextPage = response.hasNextPage;
    page++;
  }
  
  return allRepositories;
  
}

