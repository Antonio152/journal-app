import {
    loginWithEmailPassword,
  logoutFirebase,
  registerWithEmailPassword,
  singiInWithGoogle,
} from "../../../src/firebase/providers";
import {
  checkingCredentials,
  login,
  logout,
} from "../../../src/store/auth/authSlice";
import {
  checkingAuthentication,
  createUserWithEmailPassword,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout,
} from "../../../src/store/auth/thunks";
import { clearNoteOnLogout } from "../../../src/store/journal/journalSlice";
import { demoUser, notAuthenticatedState } from "../../fixtures/authFixtures";
jest.mock("../../../src/firebase/providers");
describe("Testing of thunks", () => {
  const dispatch = jest.fn();
  beforeEach(() => jest.clearAllMocks());
  test("should return that is calling the checkingCredentials function", async () => {
    await checkingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });
  /* Start login */
  test("should call checkingCredencials and login - sucess", async () => {
    const successLogin = { success: true, ...demoUser };
    (singiInWithGoogle as jest.Mock).mockReturnValue(successLogin);

    await startGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(successLogin));
  });

  test("should call checkingCredentials and logout - error message", async () => {
    const errorLogin = { success: false, errorMessage: "Error de prueba" };
    (singiInWithGoogle as jest.Mock).mockReturnValue(errorLogin);
    await startGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      logout({ errorMessage: errorLogin.errorMessage })
    );
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  /* Create user with email and password */
  test("should create a new user and call login function", async () => {
    (registerWithEmailPassword as jest.Mock).mockReturnValue({
      success: true,
      uid: "123",
      photoURL: "https://demo.png",
      errorMessage: null,
    });
    // createUserWithEmailPassword
    await createUserWithEmailPassword({
      email: "prueba@mail.com",
      fullName: "prueba antonio",
      password: "123",
    })(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(registerWithEmailPassword).toHaveBeenCalledWith({
      email: "prueba@mail.com",
      fullName: "prueba antonio",
      password: "123",
    });
    expect(dispatch).toHaveBeenCalledWith(
      login({
        uid: "123",
        email: "prueba@mail.com",
        displayName: "prueba antonio",
        photoURL: "https://demo.png",
      })
    );
  });
  test("should call logout if an error occurs when the account is created", async () => {
    (registerWithEmailPassword as jest.Mock).mockReturnValue({
      success: false,
      uid: "123",
      photoURL: "https://demo.png",
      errorMessage: "Error login",
    });
    await createUserWithEmailPassword({
      email: "prueba@mail.com",
      fullName: "prueba antonio",
      password: "123",
    })(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(registerWithEmailPassword).toHaveBeenCalledWith({
      email: "prueba@mail.com",
      fullName: "prueba antonio",
      password: "123",
    });
    expect(dispatch).toHaveBeenCalledWith(
      logout({ errorMessage: "Error login" })
    );
  });

  /* startLoginWithEmailPassword */
  test('should init login with email and password - success',async () => { 
    (loginWithEmailPassword as jest.Mock).mockReturnValue({
        success:true, uid:"123", photoURL:"https://image.com", errorMessage:null, displayName:"antonio"
    });
    await startLoginWithEmailPassword("prueba@mail.com","123")(dispatch);
    
    expect(loginWithEmailPassword).toHaveBeenCalledWith({"email": "prueba@mail.com", "password": "123"})
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login({uid:"123",email:"prueba@mail.com", photoURL:"https://image.com", displayName:"antonio"}))
   })

   test('should call the logout function if the mail or password is incorrect', async () => { 
    (loginWithEmailPassword as jest.Mock).mockReturnValue({
        success:false, uid:null, photoURL:null, errorMessage:"Error de mail", displayName:null
    });
    await startLoginWithEmailPassword("prueba@mail.com","123")(dispatch);
    expect(loginWithEmailPassword).toHaveBeenCalledWith({"email": "prueba@mail.com", "password": "123"})
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout({errorMessage:"Error de mail"}))
    })
    /* startLogout */
    test('should call logout - success', async() => { 
        (logoutFirebase as jest.Mock).mockReturnValue({success:true, errorMessage:null});
        await startLogout()(dispatch);
        expect(logoutFirebase).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(clearNoteOnLogout());
        expect(dispatch).toHaveBeenCalledWith(logout({errorMessage:null}));
     })
});
