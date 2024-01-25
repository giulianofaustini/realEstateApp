// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: "realestateweb-24c2c.firebaseapp.com",
//   projectId: "realestateweb-24c2c",
//   storageBucket: "realestateweb-24c2c.appspot.com",
//   messagingSenderId: "651348325758",
//   appId: "1:651348325758:web:e6d210906fa7eb0cb9af2f"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);



import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestateweb-24c2c.firebaseapp.com",
  projectId: "realestateweb-24c2c",
  storageBucket: "realestateweb-24c2c.appspot.com",
  messagingSenderId: "651348325758",
  appId: "1:651348325758:web:e6d210906fa7eb0cb9af2f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Firebase security rules (for testing purposes only)
const securityRules = {
  rules: {
    storage: {
      ".read": "auth != null",
      ".write": "auth != null",
      "your-images-folder": {
        // Allow read and write access to any user temporarily for testing
        ".read": "true",
        ".write": "true"
      }
    }
  }
};

// Temporary setting of security rules for testing
// NOTE: Ensure that these rules are only used for testing purposes
export const setFirebaseSecurityRulesForTesting = async () => {
  try {
    const database = getDatabase(app);
    const rulesRef = ref(database, ".settings/rules.json");
    await set(rulesRef, securityRules);
    console.log("Security rules set for testing");
  } catch (error) {
    console.error("Error setting security rules:", error);
  }
};

// Uncomment the following line when you want to set security rules for testing
setFirebaseSecurityRulesForTesting();






// rules 

// 2
// rules_version = '2';
// 3
// service firebase.storage {
// 4
//   match /b/{bucket}/o {
// 5
//     match /{allPaths=**} {
// 6
//       allow read, write: if request.auth != null;
// 7
//     }
// 8
//   }
// 9
// }
