import { MongoClient } from "mongodb";
import { readFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env
try {
  const envPath = resolve(__dirname, ".env");
  const lines = readFileSync(envPath, "utf-8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    process.env[key] = val;
  }
  console.log("✅ .env file loaded");
} catch {
  console.log("❌ No .env file found");
}

const MONGO_URI = process.env.MONGODB_URI;
console.log("\n📍 MongoDB URI:", MONGO_URI?.substring(0, 50) + "...");

async function testConnection() {
  console.log("\n🔄 Testing MongoDB connection...\n");
  
  try {
    const client = new MongoClient(MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    await client.connect();
    console.log("✅ Successfully connected to MongoDB!");
    
    const db = client.db("mona_beauty");
    const collections = await db.listCollections().toArray();
    
    console.log("\n📦 Available collections:");
    collections.forEach(col => console.log(`   - ${col.name}`));
    
    // Test products
    const productsCount = await db.collection("products").countDocuments();
    console.log(`\n🛍️  Products in database: ${productsCount}`);
    
    // Test orders
    const ordersCount = await db.collection("orders").countDocuments();
    console.log(`📋 Orders in database: ${ordersCount}`);
    
    // Get sample product
    const sampleProduct = await db.collection("products").findOne({});
    if (sampleProduct) {
      console.log(`\n📦 Sample product: ${sampleProduct.name}`);
    }
    
    await client.close();
    console.log("\n✅ Test completed successfully!\n");
    
  } catch (error) {
    console.error("\n❌ MongoDB connection failed:");
    console.error(`   Error: ${error.message}`);
    console.error("\n💡 Solutions:");
    console.error("   1. Check your internet connection");
    console.error("   2. Verify MongoDB URI in .env file");
    console.error("   3. In MongoDB Atlas -> Network Access -> Add IP Address -> Allow 0.0.0.0/0");
    console.error("   4. Wait 1-2 minutes for MongoDB Atlas to apply changes\n");
  }
}

testConnection();
