import { Client, Account, ID, Avatars, Databases, Query } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.Andy.Aora",
  projectId: "66a37a67002a50c60297",
  databaseId: "66a37c35001fb94a855b",
  userCollectionId: "66a37c5f000decb1c3c0",
  videoCollectionId: "66a37c90003a5fd2a82c",
  storageId: "66a3baf4003987193855",
};
const { endpoint, platform, projectId, databaseId, userCollectionId, videoCollectionId, storageId } = config;
// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUsers = async (email, password, username) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);

    if (!newAccount) throw new Error("Failed to create account");

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(config.databaseId, config.userCollectionId, ID.unique(), {
      accountId: newAccount.$id,
      email,
      username,
      avatar: avatarUrl,
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error("No current account");

    const currentUser = await databases.listDocuments(config.databaseId, config.userCollectionId, [Query.equal("accountId", currentAccount.$id)]);

    if (!currentUser) throw new Error("No current user");

    return currentUser.documents[0];
  } catch (error) {
    console.error("Error getting current user:", error);
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId);
    console.log(posts); // Tambahkan ini untuk melihat data yang dikembalikan
    return posts.documents;
  } catch (error) {
    console.log(error);
  }
};
export const getLatestPosts = async () => {
  try {
    // Mengambil dokumen dengan urutan terbaru dan membatasi ke 7 dokumen
    const response = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt"), // Gunakan $createdAt sesuai dengan struktur data Appwrite
      Query.limit(7),
    ]);
    console.log(response); // Untuk memeriksa struktur data yang dikembalikan
    return response.documents; // Mengembalikan dokumen yang diambil
  } catch (error) {
    console.error("Failed to fetch latest posts:", error); // Menggunakan console.error untuk kesalahan
  }
};

export const searchPosts = async (query) => {
  try {
    // Mengambil dokumen dengan urutan terbaru dan membatasi ke 7 dokumen
    const response = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.search("tittle", query), // Gunakan $createdAt sesuai dengan struktur data Appwrite
    ]);
    console.log(response); // Untuk memeriksa struktur data yang dikembalikan
    return response.documents; // Mengembalikan dokumen yang diambil
  } catch (error) {
    console.error("Failed to fetch latest posts:", error); // Menggunakan console.error untuk kesalahan
  }
};
export const getUserPosts = async (userId) => {
  try {
    // Mengambil dokumen dengan urutan terbaru dan membatasi ke 7 dokumen
    const response = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.equal("creator", userId), // Gunakan $createdAt sesuai dengan struktur data Appwrite
    ]);
    console.log(response); // Untuk memeriksa struktur data yang dikembalikan
    return response.documents; // Mengembalikan dokumen yang diambil
  } catch (error) {
    console.error("Failed to fetch latest posts:", error); // Menggunakan console.error untuk kesalahan
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.error("Error during sign-out:", error.message);
    throw new Error(error);
  }
};
