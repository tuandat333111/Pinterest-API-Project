const express=require('express');
const app=express();
app.use(express.json());
app.use(express.static("."));
const cors = require('cors');
app.use(cors());
app.listen(8080);

const rootRouter = require('./Routers/rootRouter');
app.use("/api",rootRouter);


// yarn add swagger-ui-express swagger-jsdoc
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        info: {
            title: "api",
            version: "1.0.100",
            description: "abc"
        }
    },
    apis: ["src/Swaggers/index.js"]
}

const specs = swaggerJsDoc(options);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));