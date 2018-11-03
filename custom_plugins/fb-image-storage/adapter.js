export default class Adapter {

	constructor(storageRef, loader, t) {
		this.storageRef = storageRef;
		this.loader = loader;
		this.t = t;
	}

	upload() {
		return new Promise((resolve, reject) => {
			try {
				this._sendFile(resolve, reject);
			} catch (error) {
				console.log('error in upload tryCatch', error);
				return reject(error);
			}
		});
	}

	abort() {
		this.uploadTask.cancel();
	}

	_sendFile(resolve, reject) {
		const file = this.loader.file;
		const ref = this.storageRef;
		this.uploadTask = ref.child(file.name).put(file);
		this.uploadTask.on('state_changed', (snapshot) => {
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			this.loader.uploadTotal = progress;
		}, (err) => {
			console.log('error in _sendFile uploadTask.on()', err);
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
