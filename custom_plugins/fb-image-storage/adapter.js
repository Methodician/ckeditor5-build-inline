export default class Adapter {

	constructor(storageRef, loader, t) {
		this.storageRef = storageRef;
		this.loader = loader;
		this.t = t;
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
		const ref = this.storageRef;

		console.log('ref has authWrapper', !!ref.authWrapper)
		console.log('ref has location => path', !!ref.location.path);
		console.log('These could be a check to ensure the ref is valid');

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
