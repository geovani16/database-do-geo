import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export default async function handler(req, res) {
  const databaseId = process.env.DATABASE_ID;

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const data = response.results.map((item) => {
      return {
        id: item.id,
        nama: item.properties.Nama?.title?.[0]?.text?.content || "",
        stok: item.properties.Stok?.number || 0,
        kategori: item.properties.Kategori?.select?.name || "",
      };
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("Notion error:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
{
  "name": "notion-api",
  "dependencies": {
    "@notionhq/client": "^2.2.3"
  }
}

