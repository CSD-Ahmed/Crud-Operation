var form = document.getElementById("myForm"),
  imgInput = document.querySelector(".img"),
  file = document.getElementById("imgInput"),
  productName = document.getElementById("PName"),
  price = document.getElementById("Price"),
  quantity = document.getElementById("Quantity"),
  discount = document.getElementById("Discount"),
  barcode = document.getElementById("Barcode"),
  companyName = document.getElementById("ComName"),
  productionDate = document.getElementById("PRODDate"),
  expiryDate = document.getElementById("EXPDate"),
  submitBtn = document.querySelector(".submit"),
  productInfo = document.getElementById("data"),
  modal = document.getElementById("prdouctForm"),
  modalTitle = document.querySelector("#productForm .modal-title"),
  newProductBtn = document.querySelector(".newUser");

let getData = localStorage.getItem("productList")
  ? JSON.parse(localStorage.getItem("productList"))
  : [];

let isEdit = false,
  editId;
function openForm() {
  submitBtn.innerText = "Submit";
  modalTitle.innerText = "Add New Product";
  isEdit = false;
  imgInput.src = "./image/Product Placeholder.webp";
  form.reset();
  clearValidationErrors();
}
x;
// Assuming this is called when you need to open the form
showInfo();
openForm();

// double click do not work
newProductBtn.addEventListener("click", () => {
  submitBtn.innerText = "Submit";
  modalTitle.innerText = "Add New Product";
  isEdit = false;
  imgInput.src = "./image/Product Placeholder.webp";
  form.reset();
  clearValidationErrors();
});

file.onchange = function () {
  if (file.files[0].size < 1000000) {
    // 1MB = 1000000
    var fileReader = new FileReader();

    fileReader.onload = function (e) {
      imgUrl = e.target.result;
      imgInput.src = imgUrl;
    };

    fileReader.readAsDataURL(file.files[0]);
  } else {
    alert("This file is too large!");
  }
};

function showInfo() {
  document.querySelectorAll(".productDetails").forEach((info) => info.remove());
  getData.forEach((element, index) => {
    let createElement = `<tr class="productDetails">
            <td>${index + 1}</td>
            <td><img src="${
              element.picture
            }" alt="" width="50" height="50"></td>
            <td>${element.productName}</td>
            <td>${element.price}</td>
            <td>${element.quantity}</td>
            <td>${element.discount}%</td>
            <td>${element.barcode}</td>
            <td>${element.companyName}</td>
            <td>${element.productionDate}</td>
            <td>${element.expiryDate}</td>

            <td>
                <button class="btn btn-success" onclick="readInfo('${
                  element.picture
                }', '${element.productName}', '${element.price}', '${
      element.quantity
    }', '${element.discount}', '${element.barcode}', '${
      element.companyName
    }', '${element.productionDate}', '${
      element.expiryDate
    }')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <button class="btn btn-primary" onclick="editInfo(${index}, '${
      element.picture
    }', '${element.productName}', '${element.price}', '${element.quantity}', '${
      element.discount
    }', '${element.barcode}', '${element.companyName}', '${
      element.productionDate
    }', '${
      element.expiryDate
    }')" data-bs-toggle="modal" data-bs-target="#productForm"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
            </td>
        </tr>`;

    productInfo.innerHTML += createElement;
  });
}
showInfo();

function readInfo(
  pic,
  name,
  price,
  quantity,
  discount,
  barcode,
  company,
  prodDate,
  expDate
) {
  document.querySelector(".showImg").src = pic;
  document.getElementById("showPName").value = name;
  document.getElementById("showPrice").value = price;
  document.getElementById("showQuantity").value = quantity;
  document.getElementById("showDiscount").value = discount;
  document.getElementById("showBarcode").value = barcode;
  document.getElementById("showComName").value = company;
  document.getElementById("showPRODDate").value = prodDate;
  document.getElementById("showEXPDate").value = expDate;
}

function editInfo(
  index,
  pic,
  name,
  Price,
  Quantity,
  Discount,
  Barcode,
  ComName,
  PRODDate,
  EXPDate
) {
  isEdit = true;
  editId = index;
  imgInput.src = pic;
  productName.value = name;
  price.value = Price;
  quantity.value = Quantity;
  discount.value = Discount;
  barcode.value = Barcode;
  companyName.value = ComName;
  productionDate.value = PRODDate;
  expiryDate.value = EXPDate;

  submitBtn.innerText = "Update";
  modalTitle.innerText = "Update Product Details";
}
// show the button when you want the delete
function deleteInfo(index) {
  if (confirm("Are you sure you want to delete this product?")) {
    getData.splice(index, 1);
    localStorage.setItem("productList", JSON.stringify(getData));
    showInfo();
  }
}

function validateForm() {
  let isValid = true;
  clearValidationErrors();

  if (productName.value.trim() === "") {
    setError(productName, "Product name is required");
    isValid = false;
  }

  if (price.value.trim() === "" || isNaN(price.value) || price.value <= 0) {
    setError(price, "Valid price is required");
    isValid = false;
  }

  if (
    quantity.value.trim() === "" ||
    isNaN(quantity.value) ||
    quantity.value <= 0
  ) {
    setError(quantity, "Valid quantity is required");
    isValid = false;
  }

  if (
    discount.value.trim() !== "" &&
    (isNaN(discount.value) || discount.value < 0 || discount.value > 100)
  ) {
    setError(discount, "Discount must be between 0 and 100");
    isValid = false;
  }

  if (barcode.value.trim() === "") {
    setError(barcode, "Barcode is required");
    isValid = false;
  }

  if (companyName.value.trim() === "") {
    setError(companyName, "Company name is required");
    isValid = false;
  }

  if (productionDate.value === "") {
    setError(productionDate, "Production date is required");
    isValid = false;
  }

  if (expiryDate.value === "") {
    setError(expiryDate, "Expiry date is required");
    isValid = false;
  }

  return isValid;
}

function setError(element, message) {
  const errorElement = document.createElement("small");
  errorElement.classList.add("error-text");
  errorElement.style.color = "red";
  errorElement.innerText = message;
  element.parentNode.appendChild(errorElement);
  element.style.borderColor = "red";
}

function clearValidationErrors() {
  document.querySelectorAll(".error-text").forEach((el) => el.remove());
  document
    .querySelectorAll("input")
    .forEach((el) => (el.style.borderColor = ""));
}

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  // Perform form validation
  if (!validateForm()) {
    alert("Please correct the errors and try again.");
    return false; // Stop the submission if validation fails
  }

  // Gather form data
  const information = {
    picture:
      imgInput.src === undefined
        ? "./image/Product Placeholder.webp"
        : imgInput.src,
    productName: productName.value,
    price: price.value,
    quantity: quantity.value,
    discount: discount.value,
    barcode: barcode.value,
    companyName: companyName.value,
    productionDate: productionDate.value,
    expiryDate: expiryDate.value,
  };

  // Check if this is a new entry or an edit
  if (!isEdit) {
    getData.push(information); // Add new product
  } else {
    isEdit = false;
    getData[editId] = information; // Update existing product
  }

  // Save the updated list to localStorage
  localStorage.setItem("productList", JSON.stringify(getData));

  // Reset form elements to default state
  submitBtn.innerText = "Submit";
  modalTitle.innerHTML = "Add New Product";
  form.reset();
  imgInput.src = "./image/Product Placeholder.webp";

  // Refresh the displayed product list
  showInfo();
});
