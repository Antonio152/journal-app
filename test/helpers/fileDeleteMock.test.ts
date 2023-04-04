import {deleteImage} from "../../src/helpers/fileDelete"
jest.mock("../../src/helpers/fileDelete", () => ({
    deleteImage: jest.fn(),
}));
describe('File delete in cloud', () => { 
    beforeEach(() => jest.clearAllMocks())
    test('should delete the file from cloudinary', async() => {
        (deleteImage as jest.Mock).mockReturnValue({"response":"file deleted correctly"})
        const res = await deleteImage("")
        expect(res).toEqual({"response":"file deleted correctly"});
    })
 })