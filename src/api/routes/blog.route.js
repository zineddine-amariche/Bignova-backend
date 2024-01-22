const express = require("express");
const blogControlleur = require("../controllers/blog.con");
const router = express.Router();
const upload = require("../middlewares/upload");
/**
 *  @swagger
 *  /api/Blog:
 *    post:
 *      description: Enregistrement d'un nouveau blog
 *      parameters:
 *        - in : body
 *          name: blog
 *          schema:
 *            type: object
 *            required:
 *              - title
 *              - description
 *              - image
 *            properties:
 *              title:
 *                type: string
 *              description:
 *                type: string
 *              image:
 *                type: string
 *      responses:
 *        '400':
 *          description: No file uploaded
 *        '404':
 *          description: write the title and description
 */
router.post("/Blog", upload.single("image"), blogControlleur.Blog);
/**
 *  @swagger
 *  /api/Blog:
 *    get:
 *      description: Affichage des différents blogs
 *      responses:
 *        '200':
 *          description: Successfuly
 */
router.get("/Blog", blogControlleur.getBlog);
/**
 *  @swagger
 *  /api/Blog/:title:
 *    get:
 *      description: Affichage d'un blog byTitle
 *      parameters:
 *        - in : params
 *          name: blog
 *          schema:
 *            type: object
 *            required:
 *              - title
 *            properties:
 *              title:
 *                type: String
 *      responses:
 *        '200':
 *          description: Successfuly
 */
router.get("/Blog/:title", blogControlleur.BlogTitle);
module.exports = router;
