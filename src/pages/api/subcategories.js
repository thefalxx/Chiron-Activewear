import { query } from "../../../utility/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "Sub-category name is required and must be a valid string." });
    }

    try {
      console.log("Inserting subcategory:", name);

      const result = await query({
        query: "INSERT INTO subcategories (name) VALUES (?)",
        values: [name],
      });

      console.log("Insert result:", result);

      res.status(201).json({ message: "Sub-category added successfully!", id: result.insertId });
    } catch (error) {
      console.error("Error inserting subcategory:", error);
      res.status(500).json({ error: "Failed to add subcategory due to a database error." });
    }
  } else if (req.method === "GET") {
    try {
      console.log("Fetching all subcategories...");

      const rows = await query({
        query: "SELECT id, name FROM subcategories",
        values: [],
      });

      console.log("Fetched subcategories:", rows);

      res.status(200).json({ subcategories: rows });
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      res.status(500).json({ error: "Failed to fetch subcategories due to a database error." });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
