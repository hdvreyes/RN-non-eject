const functions = require("firebase-functions");
const cors = require("cors")({origin: true});
const fs = require("fs");
const UUID = require("uuid/v4");

const gcconfig = {
    projectId: "skeleton-dev-27913",
    keyFilename: "keyfile.json"
};
const {Storage} = require("@google-cloud/storage");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.storeImage = functions.https.onRequest((request, response) => {

    cors(request, response, () => {
        const body = JSON.parse(request.body);
        fs.writeFileSync("/tmp/uploaded-image.jpg", body.image, "base64", err => {
            return response.status(500).json({error: err});
        });

        const gcs = new Storage(gcconfig);

        // Create a new bucket.
        gcs.createBucket("gs://skeleton-dev-27913.appspot.com", (err, bucket) => {
            if (!err) {
                // "my-new-bucket" was successfully created.
                console.log("Bucket created!");
            }
        });

        const bucket = gcs.bucket("gs://skeleton-dev-27913.appspot.com");
        const uuid = UUID();
        bucket.upload("/tmp/uploaded-image.jpg", {
            uploadType: "media",
            destination: "/places/" + uuid + ".jpg",
            metadata: {
                metadata: {
                    contentType: "image/jpeg",
                    firebaseStorageDownloadTokens: uuid
                }
            }
        }, (err, file) => {
            if (!err) {
                response.status(201).json({
                    imageUrl: "https://firebasestorage.googleapis.com/v0/b/" +
                    bucket.name +
                    "/o/" + 
                    encodeURIComponent(file.name) + 
                    "?alt=media&token=" + 
                    uuid
                });
            } else {
                response.status(500).json({error: err});
            }
        });
    });
    
});
