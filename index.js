import express from "express";

const app = express();
// rest API=> restful API=>data is exchanged in json format
// to make app understand json
app.use(express.json());
// APIs
// Create Product Array
let productList = [
  {
    id: 1,
    name: "TV",
    price: 45000,
    category: "electronics",
    description: "This is a nice tv.",
  },
  {
    id: 2,
    name: "Bottle",
    price: 1000,
    category: "kitchen",
    description: "Handy and useful.",
  },
];

// add Product
app.post("/product/add", (req, res) => {
  //console.log(req.body);
  const newProduct = req.body;
  productList.push(newProduct);
  //console.log(productList);

  return res.status(201).send({ message: "Product Added Successfully" });
});

//get product list

app.get("/product/list", (req, res) => {
  return res.status(201).send({ message: "product list....", productList });
});

//? get product details, searching by id
app.get("/product/details/:id", (req, res) => {
  const productID = +req.params.id;

  const requiredProduct = productList.find((item) => {
    if (item.id === productID) {
      return item;
    }
  });
  if (!requiredProduct) {
    return res.status(404).send("Product Doesnt exist");
  }

  return res.status(200).send({ message: "Product Details", requiredProduct });
});

//? delete product
app.delete("/product/delete/:id", (req, res) => {
  // extract id from req.params
  const productID = Number(req.params.id);

  // find product
  const requiredProduct = productList.find((item) => {
    if (item.id === productID) {
      return item;
    }
  });

  // if not product, throw error

  if (!requiredProduct) {
    return res.status(200).send({ message: "Product doesnot exist" });
  }

  // delete product
  const newProductList = productList.filter((item) => {
    if (item.id !== productID) {
      return item;
    }
  });
  productList = structuredClone(newProductList);

  // send response
  return res.status(200).send({ message: "Product Deleted Successfully" });
});

//? edit product - update product
app.put("/product/edit/:id", (req, res) => {
  // extract id from req.params

  const productID = Number(req.params.id);
  // find product
  const requiredProduct = productList.find((item) => {
    if (item.id === productID) {
      return item;
    }
  });

  // if not product, throw error
  if (!requiredProduct) {
    return res.status(404).send({ message: "Product doesn't exist" });
  }
  // extract new values from req.body
  const newValues = req.body;

  // edit product
  const newProductList = productList.map((item, index, self) => {
    if (item.id === productID) {
      let newItem = { id: productID, ...newValues };

      return newItem;
    } else {
      return item;
    }
  });

  productList = structuredClone(newProductList);

  // send response

  return res.status(200).send({ message: "Updating Product...." });
});

// server and network port
const PORT = 4005;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
