import firebase from 'firebase/app';
import 'firebase/storage'


export default class Adapter {

	constructor(loader, fbConfig, storagePath, t) {
		this.loader = loader;
		this.fbConfig = fbConfig;
		this.t = t;
		this.app = firebase.initializeApp(this.fbConfig);
		this.storage = app.storage();
		this.ref = storage.ref(storagePath);
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
		const loader = this.loader;
		const file = loader.file;

		this.uploadTask = this.ref.put(file);
		this.uploadTask.on('state_changed', (snapshot) => {
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			loader.uploadTotal = progress;
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
