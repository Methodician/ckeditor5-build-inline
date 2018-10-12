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

		const storageRef = this.editor.config.get('fbImageStorage.storageRef');

		this.editor.plugins.get('FileRepository').createUploadAdapter = loader => new Adapter(storageRef, loader, this.editor.t);

	}
}
