Project Setup & Folder Structure
<!-- structre  -->
I followed a clean folder structure:

components/: Reusable UI components like custom inputs and modals.

navigation/: App navigation is handled using MainNavigator.js.

screen/: All screens like login, auth loading, and user list are defined here.

utils/: Responsive font, color scheme, and screen functions are defined here.

services/: Firebase configuration and services.

assets/: App images used in the UI.



<!-- authentication -->
Authentication (Firebase)
Implemented Firebase Email & Password Authentication.

Users can log in using their credentials.

Auth credentials used for testing:

Email: test@gmail.com

Password: 123456

Successfully authenticated users are navigated to the User List screen.

Used AsyncStorage to persist the authentication state locally.

<!-- after login -->
After login, the app fetches data from:
https://randomuser.me/api/?results=1000

The response is stored once and rendered in a FlatList without pagination.

Each item in the list shows:

Full Name (Title + First + Last)

Age

Phone

Email

Location

Profile Picture

<!-- responsive UI -->

UI & Responsiveness
Designed a clean and beautiful UI using:

Linear Gradient backgrounds

Custom Input components

Responsive design techniques using utilities like ResponsiveFonts and ResponsiveScreen.

The app is optimized for smooth performance even with 1000 records.
<!-- logout  -->
Bonus Features Added
Logout functionality with confirmation modal

Loading indicators while fetching API data

Basic error handling for network and auth failures
