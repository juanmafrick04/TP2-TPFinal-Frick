
import OptionController from "../controllers/OptionController.js";
import { firebaseController } from "../dbConnection/dbConnection.js";
import { validateLogin } from "../middlewares/validateLogin.js";
import { Option } from "../Models/Option.js"
import {Router} from "express";



const optionRoutes = Router();
const optionController = new OptionController(firebaseController)

optionRoutes.use(validateLogin);

optionRoutes.get("/genre/:genre/paginated", 
    async function (request,response) {
        try {
            const genre = request.params.genre;
            const pageSize = parseInt(request.query.pageSize, 10) || 10;
            const lastKey = request.query.lastKey;
            if (genre === undefined) throw Error("Es requerido un género para buscar opciones paginadas.");

            const data = await optionController.getOptionsByGenrePaginated(genre, pageSize, lastKey);
            response.status(200).send({success: true, message: data});
        } catch (error) {
            console.error('Error in /genre/:genre/paginated:', error); // Log the error for debugging
            response.status(400).send({ success: false, message: error.message });
        }
    }
);

optionRoutes.post("/create",
    async function (request, response) {
        try {
            const {title, value, image, genre} = request.body;
            console.log(title, value, image, genre)
            if (genre === undefined || value === undefined || image === undefined || title === undefined) throw Error("Es requerido un género, valor, imagen y título para crear una opción.");
            const option = new Option(title, value, image);
            const data = await optionController.createOption(option, genre);
            response.status(200).send({success: true, message: data});
        } catch (error) {
            response.status(400).send({success: false, message: error.message});
        }
    }
);

optionRoutes.post("/createBulk",
    async function (request, response) {
        try {
            const options = request.body;

            const createdOptionsIDs = [];
            for (const { title, value, image, genre } of options) {
                if (genre === undefined || value === undefined || image === undefined || title === undefined) {
                    console.error("Se ha encontrado una opcion con valores indefinidos");
                    continue
                }
                const option = new Option(title, value, image);
                const data = await optionController.createOption(option, genre);
                createdOptionsIDs.push(data);
            }
            response.status(200).send({success: true, message: createdOptionsIDs});
        } catch (error) {
            response.status(400).send({success: false, message: error.message});
        }
    }

)

// optionRoutes.put("/fixBlurhash/:genre",
//     async function (request, response) {
//         try {
//             const genre = request.params.genre;
//             await optionController.fixBlurhashForEveryOption(genre);
//             response.status(200).send({success: true, message: createdOptionsIDs});
//         } catch (error) {
//             response.status(400).send({success: false, message: error});
//         }
//     }
// )

export default optionRoutes;  
