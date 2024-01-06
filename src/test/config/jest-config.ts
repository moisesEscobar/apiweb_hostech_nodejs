// jest-config.ts
import { resetDatabaseForTests, seedDatabase } from "./database-config";

module.exports = async () => {
    if (process.env.NODE_ENV === 'test') {
        await resetDatabaseForTests();
        await seedDatabase();
    }
};