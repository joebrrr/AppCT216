const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
admin.initializeApp();