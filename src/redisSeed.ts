import { redisClient } from "./config/redisClient";
import { hashApiKey } from "./utils/hash";
import dotenv from "dotenv";

dotenv.config();

async function seed() {
  try {
    //  REQUIRED in Redis v4+
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    const studentKey = "sk_student_123";
    const adminKey = "sk_admin_456";

    const studentHash = hashApiKey(studentKey);
    const adminHash = hashApiKey(adminKey);

    await redisClient.set(
      `apikey:store:${studentHash}`,
      JSON.stringify({
        owner: "student-service",
        roles: ["read"],
        isActive: true
      })
    );

    await redisClient.set(
      `apikey:store:${adminHash}`,
      JSON.stringify({
        owner: "admin-service",
        roles: ["read", "write"],
        isActive: true
      })
    );

    const invalidKey = "sk_invalid_999";
    const invalidHash = hashApiKey(invalidKey);

    await redisClient.set(
      `apikey:cache:invalid:${invalidHash}`,
      "1"
    );

    console.log("Keys inserted");
  } catch (err) {
    console.error(" Seed failed:", err);
  } finally {
    //  Graceful shutdown
    await redisClient.quit();
  }
}

seed();
