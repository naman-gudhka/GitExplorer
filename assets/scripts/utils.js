export function saveToStorage(key, value){
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadFromStorage(key){
  return JSON.parse(localStorage.getItem(key));
}

export function formatNumber(number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(number);
}

export function formatRelativeDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const differenceInSeconds = Math.floor((now - date) / 1000);

  const days = Math.floor(differenceInSeconds / 86400);

  if (days > 0) {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  const hours = Math.floor(differenceInSeconds / 3600);

  if (hours > 0) {
    return `${hours} hr${hours === 1 ? "" : "s"} ago`;
  }

  const minutes = Math.floor(differenceInSeconds / 60);

  return `${minutes} min${minutes === 1 ? "" : "s"} ago`;
}