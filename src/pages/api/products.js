import pool from "../../../utility/db"; // Adjust the path if the db file is in a different location

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "POST") {
    const { productName, category, subCategory, price, description, sizes, status } = req.body;

    // Check for required fields
    if (!productName || !category || !price) {
      return res.status(400).json({ error: "Product name, category, and price are required." });
    }

    try {
      // Insert new product into the database
      const [result] = await pool.query(
        "INSERT INTO products (product_name, category, sub_category, price, description, sizes, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [productName, category, subCategory, price, description, sizes, status]
      );

      // Respond with success message and the new product ID
      res.status(201).json({
        message: "Product added successfully!",
        productId: result.insertId,
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Failed to save product." });
    }
  } else if (req.method === "GET") {
    if (id) {
      // Fetch a single product by its ID
      try {
        const [rows] = await pool.query(
          "SELECT id, product_name, category, sub_category, price, description, sizes, status FROM products WHERE id = ?",
          [id]
        );

        if (rows.length === 0) {
          return res.status(404).json({ error: "Product not found." });
        }

        res.status(200).json(rows[0]);
      } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Failed to fetch product." });
      }
    } else {
      // Fetch all products from the database
      try {
        const [rows] = await pool.query(
          "SELECT id, product_name, category, sub_category, price, description, sizes, status FROM products"
        );
        res.status(200).json({ products: rows });
      } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Failed to fetch products." });
      }
    }
  } else if (req.method === "PUT") {
    const { productName, category, subCategory, price, description, sizes, status } = req.body;

    // Check for required fields
    if (!id || !productName || !category || !price) {
      return res.status(400).json({ error: "Product ID, name, category, and price are required." });
    }

    try {
      // Update product details
      const [result] = await pool.query(
        "UPDATE products SET product_name = ?, category = ?, sub_category = ?, price = ?, description = ?, sizes = ?, status = ? WHERE id = ?",
        [productName, category, subCategory, price, description, sizes, status, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Product not found." });
      }

      res.status(200).json({ message: "Product updated successfully." });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Failed to update product." });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Product ID is required." });
    }

    try {
      // Perform the delete operation
      const [result] = await pool.query("DELETE FROM products WHERE id = ?", [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Product not found." });
      }

      res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Failed to delete product." });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
