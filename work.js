import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA5EE9QtkuI8vrCdsvvcneKCBfMZIGTwnE",
  authDomain: "crud-2b41f.firebaseapp.com",
  projectId: "crud-2b41f",
  storageBucket: "crud-2b41f.firebasestorage.app",
  messagingSenderId: "140958608461",
  appId: "1:140958608461:web:517874ca3c93b0d57ac004"
};

const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
export{db,app}

// ye add user ka component hy
import React, { useState } from 'react'
import { collection, addDoc } from "firebase/firestore";
import {db} from "../assets/config/firebase"

function adduser() {
    const [name,setname]=useState("")
    const [price,setprice]=useState("")
 async function see (){
    if(!name||!price) return alert("please write some")
  try {
  const docRef = await addDoc(collection(db, "users"), {
    name,
    price
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);


 }
setname("")
setprice("")
}
 
  return (
    <div>
<div>
    <input placeholder='Name' type="text" name="" id=""
    value={name}
    onChange={(e)=>setname(e.target.value)}
    />
    <input placeholder='price' type="number" name="" id="" 
    value={price}

    onChange={(e)=>setprice(e.target.value)}/>
  <button onClick={see}>add   </button>
</div>

        
    </div>
  )
}

export default adduser
//user list ka component hy jisme read or delete ka kaam hy
import React, { useState } from 'react'
    import { collection, getDocs } from "firebase/firestore"; 
import {db} from "../assets/config/firebase"
import { deleteDoc, doc } from "firebase/firestore";

function userlist() {
    const [user,setuser]=useState([])
    // const [price,setprice]=useState()
// 
    
const see=async()=>{
const querySnapshot = await getDocs(collection(db, "users"));
const data = querySnapshot.docs.map((doc) => ({
  id: doc.id,      // 👈 id bhi le lo
  ...doc.data(),   // name & price
}));
setuser(data)
}
const handleDelete = async (id) => {
  // Step 1: Firestore me document ka reference lo
  const docRef = doc(db, "users", id);

  // Step 2: Firestore se delete karo
  await deleteDoc(docRef);

  // Step 3: UI se bhi remove kar do (state update)
  setuser(user.filter((u) => u.id !== id));

  alert("🗑️ Deleted successfully!");
};
  return (
    <div>
       {user.map((u) => (
  <div key={u.id}>
    <h3>{u.name}</h3>
    <p>Price: {u.price}</p>
    <button onClick={() => handleDelete(u.id)}>Delete</button>
  </div>
))}

        <br /><br /><br />
        <button onClick={see}>See add data </button>
    </div>
  )
}

//export default //userlist
// end
