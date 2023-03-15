import axios from "axios";

export function apiGetMessages(params = "") {
  const headers = {
    "app-id": "6411477a31865634dcd0bd67",
  };
  
  return axios
    .get(`https://dummyapi.io/data/v1/post?limit=10` + params, { headers })
    .then(response => ({ response }))
    .catch(err => {
      return { error: err.response };
    });
}

