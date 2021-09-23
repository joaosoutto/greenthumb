const toTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

const createProductImageElement = (imageSource, classname) => {
  const img = document.createElement("img");
  img.className = classname;
  img.src = imageSource;
  return img;
};

const createIcon = (param, opt1, src1, opt2, src2, src3) => {
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

const createProductItemElement = ({
  image,
  name,
  price,
  sun,
  water,
  toxicity,
  favorite
}) => {
  const plantCard = document.createElement("div");
  plantCard.className = "card";
  console.log(favorite)



  const plantInfo = document.createElement("div");
  plantInfo.className = "info";
  plantInfo.appendChild(createCustomElement("h3", "plant-price", '$' + price));
  plantInfo.appendChild(
    createIcon(
      toxicity,
      "true",
      "images/icons/toxic.svg",
      "_",
      "_",
      "images/icons/pet.svg"
    )
  );
  plantInfo.appendChild(
    createIcon(
      sun,
      "no",
      "images/icons/no-sun.svg",
      "low",
      "images/icons/low-sun.svg",
      "images/icons/high-sun.svg"
    )
  );
  plantInfo.appendChild(
    createIcon(
      water,
      "rarely",
      "images/icons/1-drop.svg",
      "regularly",
      "images/icons/2-drops.svg",
      "images/icons/3-drops.svg"
    )
  );
  if(favorite) {
    plantInfo.appendChild(createProductImageElement("images/icons/fav.svg", "fav"));
  }

  plantCard.appendChild(createProductImageElement(image, "item-image"));
  plantCard.appendChild(createCustomElement("h3", "plant-name", name));
  plantCard.appendChild(plantInfo);
  return plantCard;
};

const returnProduct = (results) => {
  const product = {};
  results.sort((a,b) => (a === b) ? 0 : a ? -1 : 1).forEach((item) => {
    product.image = item.url;
    product.name = item.name;
    product.price = item.price;
    product.sun = item.sun;
    product.water = item.water;
    product.toxicity = item.toxicity;
    product.favorite = item.staff_favorite
    const section = createProductItemElement(product);
    document.getElementsByClassName("items")[0].appendChild(section);
  });

  if (results.length > 0) {
    document.getElementById("toHide").style.display = "none";
    document.getElementById("results").style.display = "block";
  }
};

const fetchAPI = (URL) => {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => returnProduct(data))
    .catch(console.error);
};

window.onload = function onload() {
  fetchAPI(
    "https://front-br-challenges.web.app/api/v2/green-thumb/?sun=no&water=regularly&pets=false"
  );
};
