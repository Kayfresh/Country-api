const appendData = document.getElementById("countries");
const query = document.getElementById("search");
const msg = document.querySelector('.msg')

const getData = () => {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      displayCountries(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
};

const displayCountries = (countries) => {
  countries.forEach((country) => {
    const countryDiv = document.createElement("div");
    console.log(country);
    countryDiv.className = "country";
    countryDiv.innerHTML = `
            <h2>${country.name.common}</h2>
            <img src="${country.flags.png}" alt="Flag of ${
      country.name.common
    }" style="width: 100px;">
            <p><strong>Capital</strong>: ${country.capital}</p>
            <p><strong>Region</strong>: ${country.region}</p>
            <p><strong>Subregion</strong>: ${country.subregion}</p>
            <p><strong>Population</strong>: ${country.population.toLocaleString()}.</p>
        `;

    appendData.appendChild(countryDiv);

    msg.style.display = "none"


    document.getElementById("search").addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const itemElements = document.querySelectorAll(".country");
      itemElements.forEach((item) => {
        const itemName = item.textContent.toLowerCase();
        item.style.display = itemName.includes(searchTerm) ? "block" : "none";
      });
    });
  });


  function checkPosition() {
    const countrye = document.querySelectorAll(".country");
  
    const windowHeight = window.innerHeight;
    
    // Check if the div is at the centerline of the viewport
    countrye.forEach((country) => {
        const rect = country.getBoundingClientRect();
      if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
        country.classList.add('active');
      } else {
        country.classList.remove("active");
      }
    });
  }
  
  window.addEventListener("scroll", checkPosition);
  window.addEventListener("resize", checkPosition); // Check on resize as well
  checkPosition(); // Initial check
};

getData();


