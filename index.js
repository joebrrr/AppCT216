const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.updateInfo = functions.https.onRequest((request, response) => {
	// 1. Receive comment data in here from user POST request
	// 2. Connect to our Firestore database
	console.log("Request body", request.body);
	cors(request, response, () => {

		return admin.firestore().collection('userInfo').add(request.body).then(()=>{
			response.send("Saved in the database");
		}).then(function(docRef) { //the document ID needed to update it.
			console.log("Document written with ID: ", docRef.id);
		});


	})
});

exports.updateInfo1 = functions.https.onRequest((request, response) => {
	// 1. Receive comment data in here from user POST request
	// 2. Connect to our Firestore database
	console.log("Request body", request.body);
	cors(request, response, () => {




	})
});

 exports.postcomment = functions.https.onRequest((request, response) => {
	// 1. Receive comment data in here from user POST request
	// 2. Connect to our Firestore database
	console.log("Request body", request.body);
	cors(request, response, () => {

		const currentTime = admin.firestore.Timestamp.now();
		request.body.timestamp = currentTime;

	return admin.firestore().collection('comments').add(request.body).then(()=>{
	response.send("Saved in the database");
	});
	})
});

exports.getusers = functions.https.onRequest((request, response) =>
{
	// 1. Connect to our Firestore database
	cors(request, response, () => {
		let users = []
		return admin.firestore().collection('userInfo').get().then((snapshot) => {

			if (snapshot.empty) {
				console.log('No matching documents.');
				response.send('No data in database');
				return;
			}
			snapshot.forEach((doc) => {
				let docObj = {};
				docObj.id = doc.id;
				users.push(Object.assign(docObj, doc.data()));
			});

			// 2. Send data back to client
			response.send(users);
		});
	})
})

exports.getcomments = functions.https.onRequest((request, response) =>
{
	// 1. Connect to our Firestore database
	cors(request, response, () => {
		let myData = []
		return admin.firestore().collection('comments').orderBy("timestamp", "desc").get().then((snapshot) => {

		if (snapshot.empty) {
			console.log('No matching documents.');
			response.send('No data in database');
			return;
		}
		snapshot.forEach((doc) => {
			let docObj = {};
			docObj.id = doc.id;
			myData.push(Object.assign(docObj, doc.data()));
		});

		// 2. Send data back to client
		response.send(myData);
		});
	})
})

exports.deletecomment = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
	// your function body here - use the provided req and res from cors
	admin.firestore().collection("comments").doc(request.query.id).delete().then(function()
{
response.send("Document successfully deleted!");
})
});
});

exports.authorizedendpoint = functions.https.onRequest((request, response) => {
	// 1. Receive comment data in here from user POST request
	// 2. Connect to our Firestore database
	cors(request, response, () => {
		console.log('Check if request is authorized with Firebase ID token');
		if ((!request.headers.authorization || !request.headers.authorization.startsWith('Bearer '))) {
			console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
				'Make sure you authorize your request by providing the following HTTP header:',
				'Authorization: Bearer <Firebase ID Token>');
			response.status(403).send('Unauthorized');
			return;
		}
		let idToken;
		if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
			console.log('Found "Authorization" header');
			// Read the ID Token from the Authorization header.
			idToken = request.headers.authorization.split('Bearer ')[1];
		} else {
			// No cookie
			response.status(403).send('Unauthorized');
			return;
		}

		try {
			admin.auth().verifyIdToken(idToken).then((token) => {
				console.log('ID Token correctly decoded', token);
				// Use token.uid to get documents belonging to a user
				let myInfo = [];
				admin.firestore().collection('userInfo').where('uid', '==', token.uid).get().then((snapshot) => {

					if (snapshot.empty) {
						console.log('No matching documents.');
						response.send('No data ');
						return;
					}

					snapshot.forEach(doc => {
						let docObj = {};
						docObj.id = doc.id;
						myInfo.push(Object.assign(docObj, doc.data()));
					});

					// 2. Send data back to client
					response.send(myInfo);
				})
			});
		} catch (error) {
			console.error('Error while verifying Firebase ID token:', error);
			response.status(403).send('Unauthorized');
			return;
		}
	});
});


