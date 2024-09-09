
---

# PRECOGNOSIS A Medical App for 4 Chronic Disease Predictions

This project is a mobile application built with **React Native**, **Firebase**, and **Node.js**, aimed at predicting four chronic diseases: **liver disease**, **heart disease**, **diabetes**, and **kidney disease**. The app leverages machine learning models to assist users in monitoring their health and includes a healthcare bot powered by the **Gemini API**.

## Features

- **Chronic Disease Prediction**: AI models are integrated to predict the likelihood of:
  - Liver disease
  - Heart disease
  - Diabetes
  - Kidney disease
- **Healthcare Chatbot**: An intelligent healthcare bot built using the **Gemini API** helps users by asking questions, suggesting potential symptoms, and guiding them to appropriate healthcare actions.
- **Firebase Integration**: Firebase is used for user authentication, real-time database, and cloud functions.
- **User-Friendly Interface**: Designed using **React Native**, the app is compatible with both iOS and Android devices.

## Technologies Used

- **React Native**: For building the mobile app.
- **Firebase**: Backend services including authentication, database, and cloud functions.
- **Node.js**: Backend logic and API handling for the chatbot and other app functionalities.
- **Gemini API**: For building the healthcare chatbot.
- **AI Models**: Machine learning models built for predicting chronic diseases.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/yourprojectname.git
   ```
2. Install dependencies:
   ```bash
   cd yourprojectname
   npm install
   ```
3. Set up Firebase:
   - Create a Firebase project.
   - Add your `google-services.json` (for Android) or `GoogleService-Info.plist` (for iOS) in the appropriate directories.
   - Set up authentication, Firestore, and cloud functions as needed.
4. Start the application:
   ```bash
   npm start
   ```
5. Set up Node.js for chatbot:
   - Follow the instructions in the `/server` folder for Node.js setup.

## How It Works

- **Disease Prediction**: Users provide input regarding their symptoms, and the app uses pre-trained machine learning models to give a prediction on the likelihood of the chronic diseases mentioned above.
- **Healthcare Bot**: The bot interacts with users to gather relevant medical information and provides a list of potential symptoms and disease predictions based on user input.

## Screenshots

Include relevant screenshots of your app (e.g., the prediction page, chatbot interaction, etc.).

![photo_5960695492339942284_y](https://github.com/user-attachments/assets/579241da-ed90-49ca-990e-384f574f3cd1)
![photo_5960695492339942285_y](https://github.com/user-attachments/assets/545338f7-7c99-4f9c-a1a1-6e1d56bb46e5)
![photo_5960695492339942286_y](https://github.com/user-attachments/assets/5efcd805-a38e-4f76-ba8e-1e7c3c6a4580)
![photo_5960695492339942287_y](https://github.com/user-attachments/assets/076ab5e9-5a07-442d-8a4c-0ae0018a09cf)
![photo_5960695492339942290_y](https://github.com/user-attachments/assets/d2b1b7b9-16bd-4d1d-863c-f5571fa10c36)
![photo_5960695492339942289_y](https://github.com/user-attachments/assets/7533f809-bfdc-4359-8bd6-7e2dbd0ef8a7)





## License

[MIT License](LICENSE)

---
