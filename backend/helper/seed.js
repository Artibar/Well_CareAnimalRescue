import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const seedData = [
  {
    name: 'Admin User',
    password: 'admin123',
    role: 'admin',
    userId: 'admin123',
    isActive: true,
  },
  {
    name: 'Volunteer User',
    email: 'volunteer@example.com',
    password: 'vol123',
    role: 'volunteer',
    userId: 'vol123',
    isActive: true,
  },
  {
    name: 'Normal User',
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
    isActive: true,
  },
];

const hashPasswords = async (users) => {
  return Promise.all(
    users.map(async (user) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      return { ...user, password: hashedPassword };
    })
  );
};

const seedDatabase = async () => {
  console.log('\n🌱 Starting database seed process...\n');

  const conn = mongoose.createConnection(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  conn.on('connected', () => console.log("MongoDB connected successfully"));

  try {
    const UserModel = conn.model('User', User.schema);

    console.log('🗑️ Clearing existing accounts...');
    await UserModel.deleteMany({ role: { $in: ['admin', 'volunteer', 'user'] } });

    console.log('🔒 Hashing passwords...');
    const secureData = await hashPasswords(seedData);

    console.log('📝 Inserting new accounts...');
    await UserModel.insertMany(secureData);

    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  } finally {
    await conn.close();
    console.log('🔌 Seed connection closed\n');
  }
};

seedDatabase();
