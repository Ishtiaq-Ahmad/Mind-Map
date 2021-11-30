import { db, app } from "../backend/firebase";
import React,{useContext} from 'react'
import { collection, getDocs, addDoc, doc, setDoc,deleteDoc,getDoc,onSnapshot,query,updateDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
  signOut,
    
} from "firebase/auth";
// import NodeContext from '../Context/auth/authContext'
// import NodeContext from "../Context/auth/authContext";
const auth = getAuth();
const user = auth.currentUser;


const _signOut = () =>{
signOut(auth).then(() => {
  // Sign-out successful.

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
const _deleteUser = (_collection, docID, ) =>{
    return new Promise(async( resolve, reject) => {
//      deleteUser(user).then(() => {
//   // User deleted.
//   alert('user deleted')
// }).catch((error) => {
//   // An error ocurred
//   // ...
//   alert('user not deleted')
// });


        try{
            const {docRef} = await getDocById(_collection,docID)

            // await deleteDoc(doc(db, "cities", "DC"));
           await deleteDoc(docRef)
            resolve("User deleted success")
            // alert('success')
        }catch(error){
            reject(error)
            // alert('error')
        }
    })
    // const userDoc = doc(db, _collection, docID);
    // deleteDoc(userDoc)
}

// const _delete = (email) =>{
//     return new Promise((resolve, reject) =>{

//     })
// return new Promise((resolve, reject) =>{
//     deleteUser(user).then(() => {
       
//           alert('user deleted')
//            resolve(true);
//         });
  
 
// }).catch((error) => {
//   alert('use did not delete')
//   // ...
//    reject(false);
// });
// })
// }

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
          full_name,
          uid:user.uid
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

// 
        // user  authenticated
        // authorize the user by getting its profile from user collection checking role 1 || 2

let {data}=await getDocById("users",user.uid)
console.log("userProfile got here >>>",{data});
// store role and user email to context store 
//  setProfileHandler({data})

// 
        resolve(data);

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(errorMessage);
      });
  });
};

const getAllData= async(_collection)=>{
let datalist=[]
       const query = collection(db,_collection );
 const querySnapshot = await getDocs(query);
 console.log({querySnapshot})
  datalist = querySnapshot.docs.map(doc => doc.data());
return datalist;

}

const getDocById = async (_collection, docId) => {
  return new Promise(async (resolve, reject) => {
    
       const docRef = doc(db, _collection, docId);
    const docSnap = await getDoc(docRef);
    // got a user doc here
    if (docSnap.exists()) {
      resolve({ docRef, data: docSnap.data() });
    } else {
      // doc.data() will be undefined in this case
      //   invalid DocId
      reject(false);
      console.log("No such document!");
    }
    

   
  });
};

const updateDocWithId=async (_collection,docId,updateObj)=>{
  const {docRef}= await getDocById(_collection,docId)
    setDoc(docRef, updateObj );

}

const snapShot = (_collection,)=>{
  const q = query(collection(db, _collection));
  let status=false;
 const unsubscribe = onSnapshot(q, (querySnapshot) => {
   status=true;

});

return status;
}

export { signup, login,getAllData,_signOut,_deleteUser ,createDocWithID,getDocById,updateDocWithId,snapShot};
