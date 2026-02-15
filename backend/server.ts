import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

let products: Product[] = [
  {
    id: 1,
    name: "Karishma Salwaar",
    description: "Stay stylish, comfortable, and beautiful.",
    image: "https://images.pexels.com/photos/25185000/pexels-photo-25185000/free-photo-of-model-in-embroidered-gray-dress-and-scarf.jpeg?auto=compress&cs=tinysrgb&w=1200",
    price: 2499,
  },
  {
    id: 2,
    name: "Elegant Embroidered Set",
    description: "Traditional design with modern comfort for everyday wear.",
    image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1200",
    price: 2999,
  },
  {
    id: 3,
    name: "Festive Silk Salwaar",
    description: "Premium silk fabric perfect for special occasions.",
    image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1200",
    price: 3499,
  },
  {
    id: 4,
    name: "Casual Cotton Suit",
    description: "Breathable cotton blend for daily comfort.",
    image: "https://images.pexels.com/photos/2955376/pexels-photo-2955376.jpeg?auto=compress&cs=tinysrgb&w=1200",
    price: 1999,
  },
  {
    id: 5,
    name: "Designer Chikankari",
    description: "Handcrafted with traditional Chikankari embroidery.",
    image: "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=1200",
    price: 4299,
  },
  {
    id: 6,
    name: "Printed Rayon Suit",
    description: "Vibrant prints with soft rayon fabric for a modern look.",
    image: "https://images.pexels.com/photos/1044993/pexels-photo-1044993.jpeg?auto=compress&cs=tinysrgb&w=1200",
    price: 2199,
  },
];

// Routes
app.get("/api/products", (req: Request, res: Response) => {
  res.json(products);
});

app.get("/api/products/:id", (req: Request, res: Response) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.post("/api/products", (req: Request, res: Response) => {
  const { name, description, image, price } = req.body;

  if (!name || !description || !image || !price) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const newProduct: Product = {
    id: Math.max(...products.map((p) => p.id), 0) + 1,
    name,
    description,
    image,
    price,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put("/api/products/:id", (req: Request, res: Response) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  if (req.body.name) product.name = req.body.name;
  if (req.body.description) product.description = req.body.description;
  if (req.body.image) product.image = req.body.image;
  if (req.body.price) product.price = req.body.price;

  res.json(product);
});

app.delete("/api/products/:id", (req: Request, res: Response) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));

  if (index === -1) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  const deletedProduct = products.splice(index, 1);
  res.json(deletedProduct);
});

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "OK", timestamp: new Date() });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  Salwaar Backend Server Running        ║
╠════════════════════════════════════════╣
║  Port: ${PORT}                             ║
║  API: http://localhost:${PORT}/api/products ║
║  Health: http://localhost:${PORT}/health   ║
╚════════════════════════════════════════╝
  `);
});