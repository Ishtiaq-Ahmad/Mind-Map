import { db, app } from "../backend/firebase";
import { collection, getDocs, addDoc, doc, setDoc,deleteDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
  signOut  
} from "firebase/auth";
const auth = getAuth();
const user = auth.currentUser;

const _signOut = () =>{
signOut(auth).then(() => {
  // Sign-out successful.
  alert('succesfully')
}).catch((error) => {
  // An error happened.
  alert('error occured')
});
}


const createDocWithID = (_collection, docID, docOBJ) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createdDoc = await setDoc(doc(db, _collection, docID), docOBJ);
      console.log({ createdDoc });

      resolve(createdDoc);
    } catch (error) {
      reject(error);
    }
  });
};
// ******************delete  user *******************
const _deleteUser = (_collection, docID, docOBJ) =>{
    return new Promise(async( resolve, reject) => {
        try{
            const userDoc = await setDoc(doc(db, _collection, docID), docOBJ);
            deleteDoc(userDoc)
            resolve(userDoc)
            alert('success')
        }catch(error){
            reject(error)
            alert('error')
        }
    })
    // const userDoc = doc(db, _collection, docID);
    // deleteDoc(userDoc)
}

const _delete = (email) =>{
return new Promise((resolve, reject) =>{
    deleteUser(user).then(() => {
           _deleteUser("users", user.uid, {
          role: 2,
          email,
          
        });
  alert('user deleted')
  resolve(true);
}).catch((error) => {
  alert('use did not delete')
  // ...
   reject(false);
});
})
}

// ****************delete user***************

const signup = (email, password , full_name) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        // user registered and authenticated

        console.log({ user });
        console.log('hello user id',user.uid);

        // get user UID

        // create users collection
        // store UID with user Role i.e 1 || 2
        // 1 for admin  and can also log  to dashboard ,add users ,
        // 2 for normal user

        await createDocWithID("users", user.uid, {
          role: 2,
          email,
          full_name
        });
        resolve(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(false);
      });
  });
};
const login = (email, password) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;

        console.log({ user });
        console.log('i am your user',user.uid);

        // user  authenticated
        // authorize the user by getting its profile from user collection checking role 1 || 2

        resolve(user);

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(errorMessage);
      });
  });
};

const getAllData= async(_collection)=>{

       const query = collection(db,_collection );
 const querySnapshot = await getDocs(query);
 console.log({querySnapshot})
 const datalist = querySnapshot.docs.map(doc => doc.data());
return datalist;

}

export { signup, login,getAllData, _delete,_signOut };
