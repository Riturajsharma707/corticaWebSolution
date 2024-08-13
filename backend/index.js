// index.js
const express = require("express");
const cors = require("cors");
const connection = require("./config/database");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/item", (req, res) => {
  const sql = "SELECT * FROM item";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post("/api/cart-items", (req, res) => {
  const { item_id, quantity } = req.body;

  const query = "INSERT INTO cartItem (item_id, quantity) VALUES (?, ?)";
  connection.query(query, [item_id, quantity], (error, result) => {
    if (error) throw error;
    res.status(201).json({ id: result.insertId });
  });
});

app.get("/api/cart", (req, res) => {
  // const query = "SELECT * FROM ITEM I JOIN CARTITEM C ON I.ID=C.item_id";
  const query =
    "select i.name,i.image, c.item_id, count(c.item_id) quantity from item i inner join cartitem c on i.id=c.item_id group by c.item_id";
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

app.delete("/api/remove/:id", (req, res) => {
  console.log("request::", req.params.id);
  const query = "DELETE FROM CARTITEM WHERE ITEM_ID=?";
  connection.query(query, [req.params.id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    console.log("Item deleted");
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
