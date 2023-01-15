/* import cloudinary from "cloudinary/lib/cloudinary"; */
//TODO: IMPLEMENT DELETE FUNCTION
import cloudinary from "cloudinary";
cloudinary.v2.config({
    cloud_name: "dmvy2o9vv",
    api_key: "485537737814332",
    api_secret: "Qfr0k7FeTii_bB3d21_p1RNrmzs"
});

function processUrlImg(imgUrl: string) {
    var cadReplace = imgUrl.substring(0, imgUrl.lastIndexOf('/'));
    const idImg = imgUrl.replace(cadReplace, "")
    var output = idImg.substring(1, idImg.lastIndexOf('.'));
    return "journal/" + output
}
 
export const deleteImage = async (image: string) => {
    const idImg = processUrlImg(image)
    try {
        const res = await cloudinary.v2.uploader.destroy(idImg, { invalidate: true });
        console.log(res)
        return res
        /* cloudinary.v2.uploader.destroy(idImg, function (error, result) {
            console.log(result, error)
        })
            .then(resp => console.log(resp))
            .catch(_err => console.log("Something went wrong, please try again later.")); */
    } catch (error) {
        console.log(error)
        throw new Error('Unknow error');        
    }
}

const deteleImage2 = async (image: string) => {
    const idImg = processUrlImg(image)
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dmvy2o9vv/:resource_type/destroy';
    const timestamp = new Date().getTime()
    const string = `public_id=${idImg}&timestamp=${timestamp}<add your api secret>`
    const signature = await sha1(string)
    const formData = new FormData()
    formData.append("public_id",idImg)
    formData.append("signature",signature)
    formData.append("api_key","485537737814332")
    formData.append("timestamp",`${timestamp}`)
    try {
        const res = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });
        console.log("test res :",res)
        const cloudRes = await res.json();
        return cloudRes.secure_url;
    } catch (error) {
        console.log(error)
        throw new Error('Unknow error');
    }
}
}

///cc