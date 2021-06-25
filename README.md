IRC
===

Time:   2 weeks

Team:   2

Language:   JS (express, React & node.js)


Project
----

In this project, you need to create an IRC server in **NodeJS** and **ExpressJS**, and a client in **ReactJS**.

Your server will have to accept multiple simultaneous connections and implement the notion of channels:
* it must be possible to join several channels simultaneously.
* must be able to create, rename and delete channels.
* a message must be displayed when a user joins or leaves a channel.
* users must, of course, be able to speak in the channels they have joined.

Channels and messages must be persistently preserved. The persistence can be done with the method that you think is best: file,database, ...

Each user must give a nickname before they can use the application.

The client and the server must communicate with each other, with the protocol of your choice.


COMMANDS
----

On the client side, each user should be able to do the following actions (using the specified command inchat, and using the interface):
* **/nicknickname**: define the nickname of the user on the server.
* **/list[string]**: list the available channels from the server. If string is specified, only displays those whose name contains the string.
* **/createchannel**: create a channel with the specified name.
* **/deletechannel**: delete the channel with the specified name.
* **/joinchannel**: join the specified channel.
* **/quitchannel**: quit the specified channel.
* **/users**: list the users currently in the channel.
* **/msgnickname** message: send a private the message to the specified nickname.
* message: send a message the all the users on the channel.


Skills
----
* using relevant tools provided by frameworks 
* web app architecture (client and server)
* sockets
* API
