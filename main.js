const appendData = document.getElementById("countries");
const query = document.getElementById("search");

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

        document.getElementById('search').addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const itemElements = document.querySelectorAll('.country');
            itemElements.forEach(item => {
                const itemName = item.textContent.toLowerCase();
                item.style.display = itemName.includes(searchTerm) ? 'block' : 'none';
            });
        });
  });
};

getData();
