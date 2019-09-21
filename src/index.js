const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const morgan=require('morgan');
const engine=require('ejs');
const multer=require('multer');
const app=express();

const storage = multer.diskStorage({
	destination: path.join(__dirname,'public/uploads'),
	filename: (req,file,cb)=>{
		cb(null,file.originalname);
	}
});

mongoose.connect('mongodb+srv://walter:3219329910@database1-wegwd.mongodb.net/test?retryWrites=true&w=majority')
	.then(db => console.log('conectado a la base de datos'))
	.catch(err => console.log(err));

app.set('puerto',process.env.PORT || 8000);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(multer({
	storage,
	dest: path.join(__dirname,'public/uploads'),
	limits: {fileSize: 2000000},
	fileFilter: (req,file,cb)=>{
		const filetypes = /jpeg|jpg|png|gif/;
		const mimetype = filetypes.test(file.mimetype);
		const extname = filetypes.test(path.extname(file.originalname));
		if(mimetype && extname){
			return cb(null,true);
		}
		cb("Error: EL archivo debe ser una imagen");

	}
}).single('image'));
app.use(require('./routes'))

app.use(express.static(path.join(__dirname,'./public')));

const server = app.listen(app.get('puerto'),()=>{
	console.log(`servidor ejecutandose en el puerto ${app.get('puerto')}`);
});
