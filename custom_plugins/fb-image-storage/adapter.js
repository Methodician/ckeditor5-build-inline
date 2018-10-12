import firebase from 'firebase/app';
import 'firebase/storage'

const self = this;
const app = firebase.initializeApp({
	apiKey: 'AIzaSyAb3L-t-WB0rf6A9j8gVSRB9STJJvLUEfw',
	authDomain: 'cosourcerytest.firebaseapp.com',
	databaseURL: 'https://cosourcerytest.firebaseio.com',
	projectId: 'cosourcerytest',
	storageBucket: 'cosourcerytest.appspot.com',
	messagingSenderId: '146479623747'
});

const storage = app.storage();
// const ref = storage.ref('articleBodyImages/');
export default class Adapter {

	constructor(storagePath, loader, t) {
		self.loader = loader;
		// self.fbConfig = fbConfig;
		self.t = t;
		// self.app = firebase.initializeApp(self.fbConfig);
		// self.storage = app.storage();
		self.ref = storage.ref(storagePath || 'imageUploads/');
	}

	upload() {
		return new Promise((resolve, reject) => {
			self._sendFile(resolve, reject);
		});
	}

	abort() {
		self.uploadTask.cancel();
	}

	_sendFile(resolve, reject) {
		const file = self.loader.file;
		console.log(file);
		self.uploadTask = self.ref.child(file.name).put(file);
		self.uploadTask.on('state_changed', (snapshot) => {
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			self.loader.uploadTotal = progress;
		}, (err) => {
			return reject(err);
		}, () => {
			self.uploadTask.snapshot.self.ref.getDownloadURL().then((url) => {
				resolve({
					default: url
				});
			});
		});
	}
}
