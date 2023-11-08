import express from "express";

const app = express();

// to make our app understand json
app.use(express.json());

// customer list
let customers = [
  {
    id: 1,
    name: "Rohan Bhandari",
    address: "Baneswor",
  },
  {
    id: 2,
    name: "Milan Khaka",
    address: "Koteswor",
  },
];

// GET => Read
// POST => Create/Add
// PUT
// DELETE

// get all customers
app.get("/customers", (req, res) => {
  return res.status(200).send(customers);
});

// add a customer
app.post("/customers/add", (req, res) => {
  const newCustomer = req.body;

  //add new customer to the end of array
  customers.push(newCustomer);

  return res.status(201).send({ message: "Customer added successfully." });
});

// delete customer from list
app.delete("/customers/delete", (req, res) => {
  const customerIdToBeRemoved = req.body.id;

  //   check if customer with provided id exists
  const customer = customers.find((item, index, self) => {
    return item.id === customerIdToBeRemoved;
  });

  //   error first approach
  // if not customer, throw error
  if (!customer) {
    return res.status(404).send({ message: "Customer does not exist." });
  }

  // remove that customer from list
  const newCustomerList = customers.filter((item, index, self) => {
    return item.id !== customerIdToBeRemoved;
  });

  //   update old customer list by new customer list
  customers = [...newCustomerList];

  return res.status(200).send({ message: "Customer is removed successfully." });
});

// update customer
app.put("/customers/edit/:id", (req, res) => {
  const userIdToBeEdited = Number(req.params.id);

  const updatedValues = req.body;

  // find if the customer with provided id exists
  const customer = customers.find((item) => {
    return item.id === userIdToBeEdited;
  });

  // if not customer, throw error

  if (!customer) {
    return res.status(404).send({ message: "Customer does not exist." });
  }

  // edit customer
  const newCustomerList = customers.map((item, index, self) => {
    // if (item.id === userIdToBeEdited) {
    //   item = { ...item, ...updatedValues };
    // }

    // return item;

    return item.id === userIdToBeEdited ? { ...item, ...updatedValues } : item;
  });

  // update old customer list with new customer list
  customers = structuredClone(newCustomerList);

  return res.status(200).send({ message: "Customer is updated successfully." });
});
const port = 8000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
