var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bookmarksdb', function (err) {
    if (err) throw err;
     console.log('Successfully connected');
     });
var Schema = mongoose.Schema;
var TagsSchema = new Schema({
_id: mongoose.Schema.Types.ObjectId,
title: {type:String,
        unique: true,
        required: true}
},
{
    timestamps: true
});

var BookmarkSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  link:{type:String,
        unique: true,
        required: true},
  title:{type:String,
        required: true},
  publisher:{type:String,
        required: true},
  tags:[]
},
{
    timestamps: true
});

var Tag= mongoose.model('Tag', TagsSchema);
var Bookmark= mongoose.model('Bookmark', BookmarkSchema);
var path = require ('path');
var http=require("http");
var express = require('express');
const expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.set('view engine', 'html');
app.set('trust proxy', 1);
var link,title,tags,flag;
app.post('/addbookmark', function(req, res){
link=req.body.link;
title=req.body.title;
var pub=req.body.publisher;
Bookmark.exists({ link:link}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      if(result==true)
      res.send("Similar bookmark exists");
    else{
var myobj = new Bookmark({_id: new mongoose.Types.ObjectId(),link:link,title:title,publisher:pub});
  var myobjtags=[];
  myobj.tags=myobjtags;
  myobj.save(function(err,data) {
    if (err) throw err;
    res.send("1 bookmark inserted");
  });
}
}
});
});
app.post('/addtag', function(req, res){
title=req.body.title;
var errors = req.validationErrors();
   if(errors){
    res.send(errors);
   }
   else{
     Tag.exists({ title:title}, function(err, result) {
    if (err) {
      res.send(err);
    } 
    else {
      if(result==true)
        res.send("Similar tag exists");
        else{
        var myobj = new Tag({_id: new mongoose.Types.ObjectId(),title:title});
  myobj.save(function(err,data) {
    if (err) throw err;
    res.send("1 tag inserted");
  });
}
    }
  });
    }
});

app.post('/addtagtobookmark', function(req, res){
link=req.body.link;
title=req.body.title;
var errors = req.validationErrors();
   if(errors){
    res.send(errors);
   }
   else{
var arr;
Bookmark.findOne({link:link},function(err,doc) {
    if (err)
      res.send(err);
    if(doc==null){
res.send("Bookmark not found");
}
    else{
    arr=doc.tags;
    Tag.findOne({title:title},function(err,tag){
if(err) 
res.send(err);
if(tag==null){
res.send("Tag not found");
}
else{
arr.push(tag._id);
Bookmark.updateOne({link:link}, {tags:arr}, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.send("Tag added to bookmark");
    }
  });
}
});
    }
    });
}
});
app.post('/deletetagfrombookmark', function(req, res){
link=req.body.link;
title=req.body.title;
var errors = req.validationErrors();
   if(errors){
    res.send(errors);
   }
   else{
var arr;
Bookmark.findOne({link:link},function(err,doc) {
    if (err)
      res.send(err);
    if(doc==null){
res.send("Bookmark not found");
}
else{
    arr=doc.tags;
    Tag.findOne({title:title},function(err,tag){
if(err) 
res.send(err);
if(tag==null){
res.send("Tag not found");
}
else
{
var pos=-1;
for(var i=0;i<arr.length;i++){
if(arr[i].toString()===tag._id.toString()){
pos=i;
break;
}
}
if(pos<0)
res.send("Tag not found in bookmark");
else{
arr.splice(pos, 1);
Bookmark.updateOne({link:link}, {tags:arr}, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.send("Tag deleted from bookmark");
    }
  });
}
}
});
      }
    });
}
});


app.post('/deletebookmark', function(req, res){
link=req.body.link;
var errors = req.validationErrors();
   if(errors){
    res.send(errors);
   }
   else{
    Bookmark.exists({ link:link}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      if(result==false)
      res.send("No such bookmark exists");
    else{
   Bookmark.deleteOne({ link:link}, function (err,doc) {
  if(err) res.send(err);
  res.send("Bookmark successfully deleted");
});
    }
    }
  });
}
});


app.post('/deletetag', function(req, res){
title=req.body.title;
var errors = req.validationErrors();
   if(errors){
    res.send(errors);
   }
   else{
     Tag.exists({title:title}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      if(result==false)
      res.send("No such Tag exists");
    else{
    var id;
    Tag.findOne({title:title}, function(err,tag) {
    if (err) {
      res.send(err);
    } 
  id=tag._id.toString();
  Bookmark.find().stream()
  .on('data', function(myDoc){
  var arr=myDoc.tags;
  var pos=-1;
for(var i=0;i<arr.length;i++){
if(arr[i].toString()==id){
pos=i;
break;
}
}
if(pos>=0){
arr.splice(pos, 1);
var link=myDoc.link;
Bookmark.updateOne({link,link}, {tags:arr}, function(err) {
    if (err) {
      res.send(err);
    } 
  });
} 
} );
  });
Tag.deleteOne({title:title}, function (err) {
  if(err) res.send(err);
  res.send("Tag successfully deleted");
});
    }
    }
  });
}
});


app.get('/displaytags', function(req, res){
Tag.countDocuments({}, function(err, c) {
        if(err){
    res.send(err);
   }
  var count=0;
  var tmap= {};
   Tag.find().stream()
  .on('data', function(myDoc){
  tmap[myDoc._id] =myDoc;
  count+=1;
  if(count==c)
    res.send(tmap);
  });   
});
});


app.get('/displayBookmarks', function(req, res){
Bookmark.countDocuments({}, function(err, c) {
  if(err){
    res.send(err);
   }
  var count=0;
  var bmap= {};
   Bookmark.find().stream()
  .on('data', function(myDoc){
  bmap[myDoc._id] =myDoc;
  count+=1;
  if(count==c)
    res.send(bmap);
  });    
 
      });
});
app.listen(5000,function(){
console.log('Listening on port 5000');
});