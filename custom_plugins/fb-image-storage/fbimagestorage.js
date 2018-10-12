import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';

import Adapter from './adapter';

export default class FbImageStorage extends Plugin {

	static get requires() {
		return [FileRepository];
	}

	static get pluginName() {
		return 'FbImageStorage';
	}

	init() {
		// const fbConfig = this.editor.config.get('fbImageStorage.fbConfig');
		// const storagePath = this.editor.config.get('fbImageStorage.storagePath');

		// if (!fbConfig) {
		// 	console.warn('FbImageStorage will not work without firebase configuration.');
		// 	return;
		// }


		// this.editor.plugins.get('FileRepository').createUploadAdapter = loader => new Adapter(loader, fbConfig, storagePath, this.editor.t);
		this.editor.plugins.get('FileRepository').createUploadAdapter = loader => new Adapter(loader, this.editor.t);
	}
}
