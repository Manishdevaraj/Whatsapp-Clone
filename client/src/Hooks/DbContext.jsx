import { createContext,  useEffect} from "react";
import PropType from "prop-types"
import { useState } from "react";
import { auth, googleprovider, storage } from "../Services/firbaseConfig";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPhoneNumber, signInWithPopup } from "firebase/auth";
import { RecaptchaVerifier } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile, uploadFile, upload_Status, uploadaudio, uploadphotos, uploadvideo } from "../Services/api";
export const Usercontext=createContext()

export function UsercontextProvoider({children})
{
    const [user,setuser]=useState(null);
    const [isCalling,setisCalling]=useState(false);

    // async function signInWithEmailAndPassword(email,password)
    // {
    //    signInWithEmailAndPassword(auth, email, password);
    // }
     async function google()
     {
      signInWithPopup(auth, googleprovider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log("Token: "+token);
    // The signed-in user info.
    const user = result.user;
    console.log("user: "+user);

    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    console.log('errorCode :'+errorCode )

    const errorMessage = error.message;
    console.log('errormessge'+errorMessage)

    // The email of the user's account used.
    const email = error.customData.email;
    console.log(' email'+ email)

    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log('credential'+credential)

    // ...
  });
     } 

    async function logout()
    {
        try {
            await auth.signOut();
            console.log('User signed out successfully!');
            // Optionally, redirect or perform other actions after logout
          } catch (error) {
            console.error('Error signing out:', error);
            // Handle errors appropriately (e.g., display an error message to the user)
          }
        
    }
  const [disotp,setdisotp]= useState(false);
     
    function setuprecaptcha(number)
{
    const recaptcha = new RecaptchaVerifier(auth, 'recaptcha-container', {});
    recaptcha.render();
    console.log(number,"fro")
    return signInWithPhoneNumber(auth,number,recaptcha);

} 
     
     
     useEffect(()=>
    {
        const unsubscribe=onAuthStateChanged(auth, async (currentUser)=>
            {
                setuser(currentUser);
                
            })
            return ()=>
                {
                    unsubscribe();
                }
                
            },[])
            // =========================component functions=============
        const [msguser,setmsguser]=useState();
        const setcontactuser=(user)=>
            {
               setmsguser(user);
            }
// ============================================cureent whats app user====
const [currentwhatsappuser,setcurrentwhatsappuser]=useState();

     const setcurrentuser=(user)=>
        {
            setcurrentwhatsappuser(user);
        }
    // =========================pdf upods===========in firbase and docment ref
    async function uploadpdffirbase(file,id,conversationid,filetype)
    {
        const storageRef1 = ref(storage, 'files');
        const storageRef2 = ref(storageRef1, id);

        const uploadTask = uploadBytesResumable(storageRef2, file);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
   getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      console.log('File available at', downloadURL);
     await uploadFile({id:id,name:file.name,Firebaseid:id,url:downloadURL,senderId:currentwhatsappuser._id,reciverId:msguser._id,conversationId:conversationid,type:filetype});
      });
  }
);

    } 


 async function upload_img_firbase(file,id,conversationid,filetype)
    {
        const storageRef1 = ref(storage, 'images');
        const storageRef2 = ref(storageRef1, id);

        const uploadTask = uploadBytesResumable(storageRef2, file);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
   getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      console.log('File available at', downloadURL);
     await uploadphotos({id:id,name:file.name,Firebaseid:id,url:downloadURL,senderId:currentwhatsappuser._id,reciverId:msguser._id,conversationId:conversationid,type:filetype});
      });
  }
);

    } 

    async function upload_audio_firbase(file,id,conversationid,filetype)
    {
        const storageRef1 = ref(storage, 'Audios');
        const storageRef2 = ref(storageRef1, id);

        const uploadTask = uploadBytesResumable(storageRef2, file);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
   getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      console.log('File available at', downloadURL);
    await uploadaudio({id:id,Firebaseid:id,url:downloadURL,senderId:currentwhatsappuser._id,reciverId:msguser._id,conversationId:conversationid,type:filetype});
      });
       
  }
);
    }

    async function upload_video_firbase(file,id,conversationid,filetype)
    {
        const storageRef1 = ref(storage, 'videos');
        const storageRef2 = ref(storageRef1, id);

        const uploadTask = uploadBytesResumable(storageRef2, file);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
   getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      console.log('File available at', downloadURL);
    await uploadvideo({id:id,Firebaseid:id,url:downloadURL,senderId:currentwhatsappuser._id,reciverId:msguser._id,conversationId:conversationid,type:filetype});
      });
       
  }
);
    }    
// ---------------------upload Status-----------------------------------
async function upload_fb_Status(file,id,filetype)
    {
        const storageRef1 = ref(storage, 'profile');
        const storageRef2 = ref(storageRef1, id);

        const uploadTask = uploadBytesResumable(storageRef2, file);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
   getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      console.log('File available at', downloadURL);
     await upload_Status({id:id,Firebaseid:id,url:downloadURL,senderId:currentwhatsappuser._id,type:filetype});
      });
  }
);

    }

    async function upload_profile(file,id,userid)
    {
        const storageRef1 = ref(storage, 'status');
        const storageRef2 = ref(storageRef1, id);

        const uploadTask = uploadBytesResumable(storageRef2, file);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
   getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      console.log('File available at', downloadURL);
    await updateProfile({userid,downloadURL});
      });
  }
);

    }


// ------------------------fdilog-opening-----------
const [msgdilog,setmsgdilog]=useState(true);

   const setdialogtrue=()=>
    {
      setmsgdilog(true);
    }
    const setdilogfalse=()=>
      {
        setmsgdilog(false);
        setmsguser(null);

      }
const [smscreen,setsmscreen]=useState(true);
    
   const setscreensmflase=()=>
    {
      setsmscreen(false);
    }
   const setscreenfalse_to_see_contacts=()=>
    {
      setsmscreen(true);
      console.log("from sm sscren false");
      setmsguser(null);
    }


    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [calltype,setcalltype] = useState(null);

    const [statusview,setstatusview] =useState(false);
    const [c_statusview,c_setstatusview] =useState(false);
    const [statusitem,setstatusitem] = useState('');
    const [c_statusitem,c_setstatusitem] = useState('');
    const [mainrefresher,setmainrefresher] = useState(false);
    const [c_group,setc_group] = useState(false);
    const [newuser,setnewuser]=useState(false);
    const [newpno,setnewpno]=useState();

    const [MyStream,setMyStream] = useState();
    const [RemoteStream,setRemoteStream] = useState();
    
    return <Usercontext.Provider value={{user,google,setcontactuser,msguser,logout,setuprecaptcha,currentwhatsappuser,setcurrentuser,uploadpdffirbase,upload_img_firbase, upload_audio_firbase,upload_video_firbase,msgdilog,setdialogtrue, setdilogfalse,smscreen,setscreensmflase,setscreenfalse_to_see_contacts,setisCalling,isCalling,setRemoteSocketId,remoteSocketId,calltype,setcalltype,disotp,setdisotp,statusview,setstatusview,upload_fb_Status,statusitem,setstatusitem,c_statusitem,c_setstatusitem,c_statusview,c_setstatusview,mainrefresher,setmainrefresher,c_group,setc_group,upload_profile,newuser,setnewuser,newpno,setnewpno,MyStream,setMyStream,RemoteStream,setRemoteStream}}>{children}</Usercontext.Provider>
}

UsercontextProvoider.propTypes=
{
    children:PropType.node.isRequired
}
