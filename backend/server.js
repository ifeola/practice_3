const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs").promises;
const path = require("path");
const { default: connectDB } = require("./config/db.js");
const cors = require("cors"); // Import the cors middleware
const { default: Product } = require("./model/products.model.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Option 1: Allow ALL origins (simple for development, but be more specific for production)
app.use(cors());

// --- Serve Static Files ---
// This line tells Express to serve any files found in the 'public' directory
// without you having to create specific routes for each file.
// path.join(__dirname, 'public') creates an absolute path to the public folder,
// which is safer than using a relative path.
// app.use(express.static(path.join(__dirname, "../frontend")));
app.use(express.static(path.join(__dirname, "../frontend")));

// Go to Homepage
app.get("/", (request, response) => {
	const index = path.join(__dirname, "../frontend/index.html");
	return response.sendFile(index);
});

// Serve all static files (HTML, CSS, JS, images) from frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Get all products
app.get("/api/products", async (request, response) => {
	try {
		const products = await Product.find({});
		if (products.length <= 0)
			return response.status(404).json({
				success: false,
				message: "No products found.",
			});
		return response.status(200).json(products);
	} catch (error) {
		return response.status(404).json({
			success: false,
			message: "Error fetching products from server.",
		});
	}
});

// Get Product by ID
app.get("/api/products/:id", (request, response) => {
	const { id: requestedId } = request.params; // requestedId is a string, e.g., "SKU20050"

	// Optional: Validate if the ID should not be empty
	// if (!requestedId || requestedId.trim() === "") {
	//     return response.status(400).json({ message: "Product ID cannot be empty." });
	// }

	// Find the product by its string ID.
	// This assumes 'product.id' in your 'products' array is also a string.
	const product = products.find((product) => product.id === requestedId);

	if (!product) {
		// If product is undefined, it means no product with that ID was found.
		return response.status(404).json({ message: "Product not found" });
	}

	// Product was found, send it in the response with a 200 OK status (default for .json).
	return response.json(product);
});

// Get all contacts
app.get("/api/contacts", (request, response) => {
	response.json(contacts);
});

// Get all posts
app.get("/api/posts", (request, response) => {
	response.json(posts);
});

// Get post by ID
app.get("/api/posts/:id", (request, response) => {
	const { id: requestedId } = request.params; // requestedId is a string, e.g., "SKU20050"

	// Optional: Validate if the ID should not be empty
	if (!requestedId || requestedId.trim() === "") {
		return response.status(400).json({ message: "Post ID cannot be empty." });
	}

	// Find the contact by its string ID.
	// This assumes 'post.id' in your 'posts' array is also a string.
	const post = posts.find((post) => post.id === requestedId);

	if (!post) {
		// If post is undefined, it means no post with that ID was found.
		return response.status(404).json({ message: "Post not found" });
	}

	// post was found, send it in the response with a 200 OK status (default for .json).
	return response.json(post);
});

// Get contact by ID
app.get("/api/contacts/:id", (request, response) => {
	const { id: requestedId } = request.params; // requestedId is a string, e.g., "SKU20050"

	// Optional: Validate if the ID should not be empty
	// if (!requestedId || requestedId.trim() === "") {
	//     return response.status(400).json({ message: "Contact ID cannot be empty." });
	// }

	// Find the contact by its string ID.
	// This assumes 'contact.id' in your 'contacts' array is also a string.
	const contact = contacts.find((contact) => contact.id === requestedId);

	if (!contact) {
		// If contact is undefined, it means no contact with that ID was found.
		return response.status(404).json({ message: "Contact not found" });
	}

	// contact was found, send it in the response with a 200 OK status (default for .json).
	return response.json(contact);
});

app.listen(PORT, () => {
	connectDB();
	console.log(`Server running on localhost:${PORT}`);
});
