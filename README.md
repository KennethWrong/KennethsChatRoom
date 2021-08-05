<h1 align="center"> KennethsChatRoom </h1>
An ongoing project to demonstrate my SCSS, React, html and node abilities.

Brief description of what is being done:
- Using React as the front end of my website
- Using SCSS and BootStrap to style React frontend and make it responsive
- Using node.js as a backend to redirect requets and general API calls
- MongoDB cluster to save information on users, messages
- Using socket.io to allow real-time chat messages
- Using redux-react for username and chat room identification
- BCrypt for encryption of password
- More socket.io for real-time refresh of friends status
- Real time friend adding, friend request

What will be implemented next:
- Scaling and deploying to the web (will look into NginX, Apache Tomcat, Heroku, AWS, Azure... all that backend stuff)

<h1 align="center"> What is in the app </h1>

## Landing Page
![Alt Text](https://github.com/KennethWrong/KennethsChatRoom/blob/main/gifs/landing%20page.gif)

This is the landing page, loaded with CSS animations and a login/register page. The top of the nav bar also has a .svg icon as an experient with svg icons. Believe that it went quite successfully.

## Chatting Method
![Alt Text](https://github.com/KennethWrong/KennethsChatRoom/blob/main/gifs/chatting.gif)

This is the bread and butter of the project, real-time chat. Basically just used socket.io and did a bunch of io.emit() and io.on() for each scenario to send different chat messages to people.
_viva websockets_.

## Unfriend and friend request
![Alt Text](https://github.com/KennethWrong/KennethsChatRoom/blob/main/gifs/unfriend.gif)

Watch this video carefully as I do an unfriend and a send of a friend request, _and of course real-time update_, what is a chat without real-time. Basically rules are that:
a. You can't send duplicate friend requests.
b. No sending friend request to yourself.
c. Can't send frien request to users that you are already friends with.

<h2 align="center"> Change room </h2>
There are two ways to change rooms.

### Change rooms #1
![Alt Text](https://github.com/KennethWrong/KennethsChatRoom/blob/main/gifs/change%20room.gif)
<br/>
A button is provided for you to change room, how convenient!

### Change rooms #2
![Alt Text](https://github.com/KennethWrong/KennethsChatRoom/blob/main/gifs/change%20room%232.gif)
<br/>
By checking what room your friend is in, we can change rooms by clicking on the room that they are currently in!


# How to run the code:
1. Git pull or download the project.
2. npm/yarn (_whatever package manager_) install to install libraries and dependencies
3. navigate to /frontend and run **npm start**
4. navigate to /backend and run **npm run dev**
5. Enjoy :)
