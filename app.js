// app.js
document.getElementById('file-upload-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const uploadStatus = document.getElementById('upload-status');
    uploadStatus.textContent = 'Uploading...';

    try {
        // Replace with your server URL for handling file uploads
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            uploadStatus.textContent = 'Upload successful!';
        } else {
            uploadStatus.textContent = 'Upload failed. Please try again.';
        }
    } catch (error) {
        uploadStatus.textContent = 'An error occurred. Please try again.';
    }
});
