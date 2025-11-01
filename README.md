# 📱 Essential Manager App

**Essential Manager** is a productivity management mobile app built with **React Native (Expo)**.  
It helps organize daily essentials, manage tasks, and provide quick access to utilities — all in one unified platform.

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository


git clone https://github.com/PRATHAMdeshkar/Essential-Manager-App.git

cd Essential-Manager-App


### 2️⃣ Install Dependencies


npm install

or


yarn install


### 3️⃣ Run the App

#### ▶️ Using Expo Go


- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


npx expo start

Scan the QR code using the **Expo Go** app (on Android or iOS).

#### ▶️ Using Development Build
If you’re using a development build and want to run it directly on your device via USB:


npx expo run:android


💡 **Tip:**  
If the app hangs on the splash screen when disconnected from USB, make sure your **Metro bundler** is still running and your device is connected to the **same Wi-Fi network**.

---

## 🧩 Tech Stack
- ⚛️ React Native (Expo)  
- 💡 JavaScript  
- 🧭 React Navigation  
- 🧰 Expo CLI  

---

## 🛠️ Troubleshooting

### ❌ If the app doesn’t load:
- Make sure the **Metro bundler** is running.  
- Rebuild the app using:


npx expo prebuild
npx expo run:android

- Clear cache:


npx expo start -c

---

## 👨‍💻 Author
**Pratham Deshkar**  
🔗 [GitHub Profile](https://github.com/PRATHAMdeshkar)

---

## 🪪 License
This project is open-source and available under the **MIT License**.

---

> ✨ *“Essential Manager — simplify your day, manage your essentials.”*


3. things to be added/enhanced in the app: 

in Remainder sectionn: the past remainder/alarm should be disabled or should move to history tab as we are doing for item list, we can make 2 pats of history as we are currently storing the history the of product that we check "puchesed" under the current date lable similary we can make the 2nd section in history tab for past notification (so it will also a type of task list or work done list for later referance), 
secondly, the app is currelty dont have theme swithch which make placeholders and btn look wired or even invisible and btn colour also, need to enhance more on theme side of the app for both dark and light.
UX & Visual Polish
Dark / Light Theme Support (useColorScheme() from React Native)

Smooth Animations with react-native-reanimated or framer-motion

Unified UI Components:
Create a design system — Button, Card, Input, etc.

Accessibility Support:
Add accessible and accessibilityLabel to key UI elements.