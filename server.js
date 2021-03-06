const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/angular-fabric-multicanvas-demo'));

app.get('/*', function(req,res) {

  res.sendFile(path.join(__dirname+'/dist/angular-fabric-multicanvas-demo/index.html'));
});

app.listen(process.env.PORT || 8080, () => {
  console.log('Angular Fabric Demo running on http://localhost:8080');
});
