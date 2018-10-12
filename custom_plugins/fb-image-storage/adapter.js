import firebase from 'firebase/app';
import 'firebase/storage'

const app = firebase.initializeApp({
	apiKey: 'AIzaSyAb3L-t-WB0rf6A9j8gVSRB9STJJvLUEfw',
	authDomain: 'cosourcerytest.firebaseapp.com',
	databaseURL: 'https://cosourcerytest.firebaseio.com',
	projectId: 'cosourcerytest',
	storageBucket: 'cosourcerytest.appspot.com',
	messagingSenderId: '146479623747'
});

const storage = app.storage();
const ref = storage.ref('articleBodyImages/');
export default class Adapter {

	constructor(loader, t) {
		this.loader = loader;
		// this.fbConfig = fbConfig;
		this.t = t;
		// this.app = firebase.initializeApp(this.fbConfig);
		// this.storage = app.storage();
		// this.ref = storage.ref(storagePath);
	}

	upload() {
		return new Promise((resolve, reject) => {
			this._sendFile(resolve, reject);
		});
	}

	abort() {
		this.uploadTask.cancel();
	}

	_sendFile(resolve, reject) {
		const file = this.loader.file;

		this.uploadTask = ref.put(file);
		this.uploadTask.on('state_changed', (snapshot) => {
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			this.loader.uploadTotal = progress;
		}, (err) => {
			return reject(err);
		}, () => {
			this.uploadTask.snapshot.ref.getDownloadURL().then((url) => {
				resolve({
					default: url
				});
			});
		});
	}
}
