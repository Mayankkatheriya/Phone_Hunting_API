let input = document.querySelector("#searchField");
const searchBtn = document.querySelector("#searchbtn");
let phoneContainer = document.querySelector("#phone-container");
let loading = document.querySelector("#loading");

async function pageload() {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=apple`
  );
  const data = await res.json();
  const phones = data.data;
  for (let i = 0; i < 5; i++) {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("phone");
    phoneDiv.innerHTML = `
    <img src="${phones[i].image}" alt="Phone_Image">
    <h1>${phones[i].phone_name}</h1>
    <p>There are many variations of passages of available, but the majority have suffered</p>
    <button class="btn" id="show-details" onclick="showDetailsHandler('${phones[i].slug}')">Show Details</button>`;
    phoneContainer.appendChild(phoneDiv);
  }
}
pageload();
async function appendPhones(searchphn) {
  loading.style.display = "block";
  while (phoneContainer.firstChild) {
    phoneContainer.removeChild(phoneContainer.firstChild);
  }
  setTimeout(async () => {
    loading.style.display = "none";
    try {
      const res = await fetch(
        `https://openapi.programming-hero.com/api/phones?search=${searchphn}`
      );
      const data = await res.json();
      const phones = data.data;
      for (let i = 0; i < phones.length; i++) {
        const phoneDiv = document.createElement("div");
        phoneDiv.classList.add("phone");
        phoneDiv.innerHTML = `
        <img src="${phones[i].image}" alt="Phone_Image">
        <h1>${phones[i].phone_name}</h1>
        <p>There are many variations of passages of available, but the majority have suffered</p>
        <button class="btn" id="show-details" onclick="showDetailsHandler('${phones[i].slug}')">Show Details</button>`;
        phoneContainer.appendChild(phoneDiv);
      }
    } catch (err) {
      alert("Try Another Brand");
    }
  }, 1500);
}
const showDetailsHandler = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();

  const phone = data.data;
  showPhoneDetails(phone);
};
const showPhoneDetails = (details) => {
  my_modal.showModal();
  const modelName = document.getElementById("detailsPhoneName");
  const brandName = document.getElementById("detailsBrand");
  const detailsSpec = document.getElementById("detailsSpec");
  const releaseDate = document.getElementById("releaseDate");
  const imageDiv = document.getElementById("imgContainer");

  imageDiv.innerHTML = `<img src="${details.image}" alt="">`;
  modelName.innerText = details.name;
  brandName.innerText = `Brand: ${details.brand}`;
  const features = details.mainFeatures;
  let string = "";
  for (const key in features) {
    string = string + `${key}: ${features[key]} \n`;
  }
  detailsSpec.innerText = string;
  releaseDate.innerText = `${details.releaseDate}`;
};
searchBtn.addEventListener("click", () => {
  const searchPhn = input.value;
  if (searchPhn == "") {
    alert("Please enter a valid brand");
  } else {
    appendPhones(searchPhn);
  }
});
