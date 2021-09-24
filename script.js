const backToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

const createPlantImage = (imageSource, classname) => {
  const img = document.createElement("img");
  img.className = classname;
  img.src = imageSource;
  return img;
};

const createPlantIcon = (param, opt1, src1, opt2, src2, src3) => {
  const icon = document.createElement("img");
  icon.className = "item-icon";

  if (param === opt1) {
    icon.src = src1;
  } else if (param === opt2) {
    icon.src = src2;
  } else {
    icon.src = src3;
  }

  return icon;
};

const createCustomElement = (element, className, innerText) => {
  const el = document.createElement(element);
  el.className = className;
  el.innerText = innerText;

  return el;
};

const createPlantItemElement = ({
  image,
  name,
  price,
  sun,
  water,
  toxicity,
  favorite,
}) => {
  const plantCard = document.createElement("div");
  plantCard.className = "card flex-center-center";
  const plantInfo = document.createElement("div");
  plantInfo.className = "info";
  plantInfo.appendChild(createCustomElement("h3", "plant-price", "$" + price));
  plantInfo.appendChild(
    createPlantIcon(
      toxicity,
      "true",
      "images/icons/toxic.svg",
      "_",
      "_",
      "images/icons/pet.svg"
    )
  );
  plantInfo.appendChild(
    createPlantIcon(
      sun,
      "no",
      "images/icons/no-sun.svg",
      "low",
      "images/icons/low-sun.svg",
      "images/icons/high-sun.svg"
    )
  );
  plantInfo.appendChild(
    createPlantIcon(
      water,
      "rarely",
      "images/icons/1-drop.svg",
      "regularly",
      "images/icons/2-drops.svg",
      "images/icons/3-drops.svg"
    )
  );
  if (favorite) {
    plantInfo.appendChild(
      createPlantImage("images/icons/fav.svg", "fav")
    );
  }

  plantCard.appendChild(createPlantImage(image, "item-image"));
  plantCard.appendChild(createCustomElement("h3", "plant-name", name));
  plantCard.appendChild(plantInfo);
  return plantCard;
};

const returnPlant = (results) => {
  document.getElementById("results").style.display = "block";
  document.getElementById("loading").style.display = "none";

  const plant = {};
  results
    .sort((a, b) => (a === b ? 0 : a ? -1 : 1))
    .forEach((item) => {
      plant.image = item.url;
      plant.name = item.name;
      plant.price = item.price;
      plant.sun = item.sun;
      plant.water = item.water;
      plant.toxicity = item.toxicity;
      plant.favorite = item.staff_favorite;
      const section = createPlantItemElement(plant);
      document.getElementsByClassName("items")[0].appendChild(section);
    });

  if (results.length > 0) {
    document.getElementById("toHide").style.display = "none";
    document.getElementById("results").style.display = "block";
  }
};

const search = () => {
  const sun = document.getElementById("sun");
  var sunValue = sun.options[sun.selectedIndex].value;

  const water = document.getElementById("water");
  var waterValue = water.options[water.selectedIndex].value;

  const toxic = document.getElementById("toxic");
  var toxicValue = toxic.options[toxic.selectedIndex].value;

  return fetchAPI(
    `https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${
      sunValue ? sunValue : "no"
    }&water=${waterValue ? waterValue : "daily"}&pets=${
      toxicValue ? toxicValue : "false"
    }`
  );
};

const fetchAPI = (URL) => {
  const father = document.getElementById("results");
  father.style.display = "none";
  document.getElementById("loading").style.display = "flex";
  document.getElementById("no-results").style.display = "none";
  const childs = document.getElementById("items");
  childs.innerHTML = "";

  setTimeout(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => returnPlant(data))
      .catch(console.error);
  }, 1000);
};

window.onload = function onload() {};
