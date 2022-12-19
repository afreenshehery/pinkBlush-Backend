"use strict";

let	multer = require("multer");

let uploadUserProfileImage = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callback) {	
			callback(null, "uploads");
		},
		filename: function (req, file, callback) {			
			let fileName = Date.now() + Math.round(Math.random() * 10000) + '.' + file.originalname.split(".")[file.originalname.split(".").length - 1]
            callback(null, fileName);
            
		}
	})
});
module.exports = {
	uploadUserProfileImage: uploadUserProfileImage
};