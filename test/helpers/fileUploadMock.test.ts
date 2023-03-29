import {fileUpload} from "../../src/helpers/fileUpload"
import 'whatwg-fetch';
/* # Important:
    if you want to use fetch in your test 
    is necessary intall the package whatwg-fetch 
    and define it here in the test file  
*/
jest.mock("../../src/helpers/fileUpload", () => ({
    fileUpload: jest.fn(),
}));
describe('Test on fileUpload', () => { 
    beforeEach(() => jest.clearAllMocks())
    test('Should upload the file correctly', async () => {
        /* Mock the function to upload the image */
        (fileUpload as jest.Mock).mockReturnValue({"response":"file uploaded correctly"})
        const file = new File([], 'photo.png');
        const url = await fileUpload(file);
        expect(url).toEqual({"response":"file uploaded correctly"});
    })

    test('should return null if the user not provides an image', async() => { 
        (fileUpload as jest.Mock).mockReturnValue(null)
        const file = new File([], 'photo.png');
        const url = await fileUpload(file);
        expect(url).toBe(null)
     })

     test('should return null if has a trouble when upload the image', async() => { 
        (fileUpload as jest.Mock).mockReturnValue(null)
        const file = new File([], 'photo.png');
        const url = await fileUpload(file);
        expect(url).toBe(null)
     })

 })