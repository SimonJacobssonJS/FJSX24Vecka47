console.log("hej tisdag");

// Gör en GET-förfrågan med fetch() till JSONPlaceholder

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    console.log("datan: ", data);

    const secondTitle = document.createElement("h2");
    secondTitle.innerText = data[1].title;

    document.body.appendChild(secondTitle);
  })
  .catch((error) => {
    console.error("Ett error inträffade: ", error);
  });

//   --------------------------------------------
// Hantera fel i nätverksförfrågningar
// fetch("https://jsonplaceholder.typicode.com/posts")
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP-fel! Status: ${response.status}`);
//     }
//     console.log("response: ", response);
//     return response.json();
//   })
//   .then((data) => {
//     console.log("datan från APIet: ", data);
//   })
//   .catch((error) => {
//     console.error("Ett error inträffade: ", error);
//   });

//   --------------------------------------------
// Använd HTTPS för att hämta data från GitHub API
// fetch("https://api.github.com/users/DutenLobarn/repos")
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP-fel! Status: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log("data: ", data[0].name);
//     console.log("data: ", data);
//   })
//   .catch((err) => {
//     console.error("err: ", err);
//   });

// Hämta en användares publika repositories från GitHub API
// --------------------------------------------
