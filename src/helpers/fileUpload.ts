export const fileUpload = async (file: File) => {
    if (!file) throw new Error('No file selected');
    const cloudUrl = `https://api.cloudinary.com/v1_1/${process.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`;
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);
    try {
        const res = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });
        if (!res.ok) throw new Error('Error while uploading file');
        const cloudRes = await res.json();
        return cloudRes.secure_url;
    } catch (error) {
        console.log(error)
        return null
    }
}