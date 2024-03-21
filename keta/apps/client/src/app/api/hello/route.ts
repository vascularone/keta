import { type SelectParam, generateSelectJWT } from './encryption'

export async function GET(obj: SelectParam) {

  const url = "http://localhost:4400/api/users";
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      // "Content-Type": "application/json;charset=UTF-8",
      s_p: generateSelectJWT(obj)
    },
  };
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
  }
