async function fetchData() {
    try {
      const response = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          "https://projects.propublica.org/nonprofits/api/v2/search.json?q=propublica"
        )}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const contents = JSON.parse(data.contents);
      const organizations = contents.organizations;
      const nameArray = organizations.map((org) => org["name"]);
      const names = nameArray.join(", ");
      console.log(names);
      // Display the data in HTML 
      document.getElementById("dataDisplay").textContent = JSON.stringify(
        names,
        null,
        2
      );
    } catch (error) {
      document.getElementById("dataDisplay").textContent =
        "Failed to fetch data: " + error.message;
    }
   }
   // Add event listener to the button
   document.getElementById("fetchButton").addEventListener("click", fetchData);   