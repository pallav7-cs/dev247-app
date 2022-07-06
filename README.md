# chatty-app
<h1> A realtime chat web application</h1>

<div>
<h3>tech stack used</h3>
<ul>
<li>HTML
<li>CSS
<li>Javascript
<li>node.js
<li>express
<li>socket.io
</ul>
<hr>
<div>
<h3>Working</h3>
Server is created on http protocol built on top of express js. Socket.io is used to handle bidirectional realtime event creation and handling among different client sockets and the server.Qs cdn has been used to record the user's choice of username and room .In the event of an unexpected server fault during messaging, whether or not user's socket is still connected to the server is checked to prevent crash.
</div>
