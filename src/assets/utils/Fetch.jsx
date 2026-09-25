const myFetch = (route = "", methode = "GET", body = "") => {
  return fetch(`http://localhost:80/${route}`, {
    method: methode,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  });
};

// const call = async () => {
//   const res = await myFetch("POST", "firstname=Nicolas&lastname=Texier");
//   const json = await res.json();
//   console.log(json);
// };

export default myFetch;
