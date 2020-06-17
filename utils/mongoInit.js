
const mongodb = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017/?compressors=zlib&readPreference=primary&gssapiServiceName=mongodb&appname=MongoDB%20Compass%20Community&ssl=false';
const client = new mongodb.MongoClient(uri, {useNewUrlParser: true,  useUnifiedTopology: true });

exports.mongoInit = () => {
  return new Promise((resolve) => {
    if (client.isConnected()) {
      console.log('Has connected');
      resolve(client);
    } else {
      client.connect((err) => {
        if (err) {
          throw err;
        }
        console.log('Connected');
        resolve(client);
      });
    }
  });
};
