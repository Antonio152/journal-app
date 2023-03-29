import {fileUpload} from "../../src/helpers/fileUpload"
import 'whatwg-fetch';
/* # Important:
    if you want to use fetch in your test 
    is necessary intall the package whatwg-fetch 
    and define it here in the test file  
*/
// jest.mock("../../src/helpers/fileUpload", () => ({
//     fileUpload: jest.fn(),
// }));
describe('Test on fileUpload', () => { 
    
    test('Should upload the file correctly', async () => {
        const imageUrl = "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80"
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'photo.png');
        const url = await fileUpload(file);
        expect(typeof url).toBe("string");
    })

    // test('should return null if the user not provides an image', async() => { 
    //     (fileUpload as jest.Mock).mockReturnValue(null)
    //     const file = new File([], 'photo.png');
    //     const url = await fileUpload(file);
    //     expect(url).toBe(null)
    //  })

    //  test('should return null if has a trouble when upload the image', async() => { 
    //     (fileUpload as jest.Mock).mockReturnValue(null)
    //     const file = new File([], 'photo.png');
    //     const url = await fileUpload(file);
    //     expect(url).toBe(null)
    //  })

 })