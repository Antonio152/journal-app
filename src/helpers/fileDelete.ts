import sha1 from "sha1";

export function processUrlImg(imgUrl: string) {
  var cadReplace = imgUrl.substring(0, imgUrl.lastIndexOf("/"));
  const idImg = imgUrl.replace(cadReplace, "");
  var output = idImg.substring(1, idImg.lastIndexOf("."));
  return "journal/" + output;
}

export const deleteImage = async (urlImg: string) => {
  const public_id = processUrlImg(urlImg);
  const cloudURL = `https://api.cloudinary.com/v1_1/${process.env.VITE_CLOUDINARY_CLOUD_NAME}/image/destroy`;
  const timestamp = `${new Date().getTime()}`;
  const signature = `public_id=${public_id}&timestamp=${timestamp}${process.env.VITE_CLOUDINARY_API_SECRET}`;
  const shaCode = sha1(signature);

  const formData = new FormData();
  formData.append("public_id", public_id);
  formData.append("api_key", process.env.VITE_CLOUDINARY_API_KEY!);
  formData.append("signature", shaCode);
  formData.append("timestamp", timestamp);

  try {
    const resp = await fetch(cloudURL, {
      method: "POST",
      body: formData,
    });

    if (!resp.ok) throw new Error(" No se pudo eliminar la imagen");

    const cloudResp = await resp.json();
    return cloudResp;
  } catch (error) {
    console.log(error);
    throw new Error("Error al eliminar la imagen: " + error);
  }
};
