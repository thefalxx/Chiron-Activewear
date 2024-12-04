import { query } from "../../../utility/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Category name is required." });
    }

    try {
      // Use the query helper to insert a new category
      const result = await query({
        query: "INSERT INTO categories (name) VALUES (?)",
        values: [name],
      });

      res.status(201).json({ message: "Category added successfully!", id: result.insertId });
    } catch (error) {
      console.error("Error inserting category:", error);
      res.status(500).json({ error: "Failed to add category." });
    }
  } else if (req.method === "GET") {
  //   try {
  //     // Use the query helper to fetch categories
  //     const rows = await query({
  //       query: "SELECT * FROM categories",
  //       values: [],
  //     });

  //     res.status(200).json({ categories: rows.map((row) => row.name) });
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //     res.status(500).json({ error: "Failed to fetch categories." });
  //   }
  // } else {
  //   res.setHeader("Allow", ["POST", "GET"]);
  //   res.status(405).end(`Method ${req.method} Not Allowed`);
  // }

  try {
    const rows = await query({
      query: "SELECT id, name FROM categories",
      values: [],
    });

    res.status(200).json({ categories: rows });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories." });
  }
} else {
  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
}
