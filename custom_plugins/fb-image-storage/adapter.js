import firebase from 'firebase/app';
import 'firebase/storage'



export default class Adapter {

	constructor(storagePath, loader, t) {
		const app = firebase.initializeApp({
			apiKey: 'AIzaSyAb3L-t-WB0rf6A9j8gVSRB9STJJvLUEfw',
			authDomain: 'cosourcerytest.firebaseapp.com',
			databaseURL: 'https://cosourcerytest.firebaseio.com',
			projectId: 'cosourcerytest',
			storageBucket: 'cosourcerytest.appspot.com',
			messagingSenderId: '146479623747'
		});

		const storage = app.storage();

		const ref = storage.ref();

		this.ref = ref;

		this.loader = loader;
		// this.fbConfig = fbConfig;
		this.t = t;
		// this.app = firebase.initializeApp(this.fbConfig);
		// this.storage = app.storage();
		this.storagePath = storagePath || 'imageUploads/';
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
		this.uploadTask = this.ref.child(this.storagePath).child(file.name).put(file);
		this.uploadTask.on('state_changed', (snapshot) => {
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			this.loader.uploadTotal = progress;
		}, (err) => {
			return reject(err);
		}, () => {
			this.uploadTask.snapshot.this.ref.getDownloadURL().then((url) => {
				resolve({
					default: url
				});
			});
		});
	}
}
