if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// ---------------- APP -------------------
const express = require("express"); 
const ejsMate = require("ejs-mate"); // para crear Layouts
const methodOverride = require("method-override"); 
const flash = require("connect-flash");
var favicon = require('serve-favicon'); //favicon para express
const path = require("path"); 

// ---------------- session -------------------
const secret = process.env.SECRET || "supertopsecret";
const session = require("express-session"); 
const passport = require("passport");
const LocalStrategy = require('passport-local');
const User = require('./models/user');

// ---------------- MongoDB -------------------
const mongoose = require('mongoose'); // conecta con mongoDB
const morgan = require("morgan"); // status en consola
const mongoSanitize = require('express-mongo-sanitize');
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/mascotas";


// ---------------- Deploys -------------------
const helmet = require("helmet");
const MongoStore = require('connect-mongo');


// ---------------- Models / Utilities -------------------

const ExpressError = require("./utilities/ExpressError");


//----------------------------------------------------------
//----------------------------------------------------------
//-------------------    APP Config    ---------------------
//----------------------------------------------------------
//----------------------------------------------------------

const app = express(); // ejecuta express y forma app


app.set("views", path.join(__dirname, "views"));// serves views folder
app.set("view engine", "ejs"); // Ejs como engine
app.engine("ejs", ejsMate); // deja usar layouts con ejs


app.use(express.urlencoded({extended: true}));// vuelve Json el req.body de los formularios
app.use(methodOverride("_method")); // usar PATCH y DELETE
app.use(morgan("tiny")); // console.log(req.status)
app.use(express.static(path.join(__dirname, "public")));// Serves the Public!
app.use(flash()); // flash
app.use(mongoSanitize()); // seguridad, sanitiza mongo
app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')))

// Helmet Config
const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://unpkg.com/",
    "https://maps.googleapis.com/",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net/",
    "https://cdn.jsdelivr.net/",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
    "https://maps.googleapis.com/",
    "https://www.gstatic.com/",
];
const fontSrcUrls = [
    "https://use.fontawesome.com/",
    "https://fonts.gstatic.com/",
];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://images.unsplash.com/",
                "https://res.cloudinary.com/ysz1tft/", // mi cuenta
                "https://maps.gstatic.com/",
                "https://mt0.google.com/",
                "https://maps.googleapis.com/",
                "https://i.pinimg.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

// otras opciones de helmet
// app.use(helmet.crossOriginEmbedderPolicy());
// app.use(helmet.crossOriginOpenerPolicy());
// app.use(helmet.crossOriginResourcePolicy());

app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

// Session & Mongo Store Config

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 60 * 60 * 24, // en segundos
    crypto: {
        secret
    }
})

store.on("error", function(e){
    console.log("SESSION STORE ERROR!", e)
})

const sessionConfig = {
    name: "MaestroPokemon",
    store,
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + (1000 * 60 * 60 * 24 * 7),
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
};
app.use(session(sessionConfig)); // session

// session passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// define como se inicia y cierra sesion de passport
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// coneccion a mongoose
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Mongoose Connected!")
}).catch((e) => {
    console.log("Mongoose NOT connected :(")
    console.log(e)
}); 


// ------------ Routers y constantes ---------------
const petRoutes = require("./routes/pets");
const foundRoutes = require("./routes/found")
const commentRoutes = require("./routes/comments");
const commentFoundRoutes = require("./routes/commentsFound")
const userRoutes = require("./routes/users");
const generalRoutes = require("./routes/general")

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user || undefined;
    next();
});




//----------------------------------------------------------
//--------------------    REQUESTS    ----------------------
//----------------------------------------------------------
const Pet = require("./models/pets");

app.use("/", generalRoutes);
app.use("/mascotas", petRoutes);
app.use("/encontradas", foundRoutes);
app.use("/mascotas/:id/comentarios", commentRoutes);
app.use("/encontradas/:id/comentarios", commentFoundRoutes);
app.use("/", userRoutes);

app.get("/nueva", (req, res) => {
    res.render("newHome")
})

app.all("*", (req, res, next) => {
    next(new ExpressError("No se encontro la pagina", 404))
});

// error handler
app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = "Algo salio mal"
    res.status(statusCode).render("error", {err} )
 });

// listen del puerto 3000
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`puerto ${port} open`)
});

