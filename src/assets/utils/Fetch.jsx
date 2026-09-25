const myFetch = (route = "", methode = "GET", body = "") => {
  // Si body est vide et methode est GET, on ne passe pas de body
  const options = {
    method: methode,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  if (methode !== "GET" && body) {
    options.body = body;
  }

  return fetch(`/api/${route}`, options);
};

// const call = async () => {
//   const res = await myFetch("POST", "firstname=Nicolas&lastname=Texier");
//   const json = await res.json();
//   console.log(json);
// };

export default myFetch;
