const myFetch = (route = "", methode = "GET", body = "") => {
  // Si body est vide et methode est GET, on ne passe pas de body
  const options = {
    method: methode,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    credentials: "include",
  };

  if (methode !== "GET" && body) {
    options.body = body;
  }

  return fetch(`/api/${route}`, options);
};

export default myFetch;
