export default class FileHelper {

    static download(content, filename, contentType)
    {
        if(!contentType) contentType = 'application/octet-stream';
        let a = document.createElement('a');
        let blob = new Blob([content], {'type':contentType});
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        a.click();
    }
}

// https://stackoverflow.com/questions/4184944/javascript-download-data-to-file-from-content-within-the-page
