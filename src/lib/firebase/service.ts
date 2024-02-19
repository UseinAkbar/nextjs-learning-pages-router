import { getDocs, collection, getFirestore, getDoc, doc, query, where, addDoc, updateDoc } from "firebase/firestore";
import bcrypt from 'bcrypt'
import app from "./init";

const firestore = getFirestore(app);

const retrieveData = async (collectionName: string) => {
    const snapshot =  await getDocs(collection(firestore, collectionName))
    const data = snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    })
    return data
}

const retrieveDataById = async (collectionName: string, id: string) => {
    const snapshot = await getDoc(doc(firestore, collectionName, id))
    const data = snapshot.data()
    return data
}

const signIn = async (email: string) => {
    const q = query(collection(firestore, "users"), where("email", "==", email))
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    })

    if(data.length) {
        return data[0]
    } else {
        return null
    }
}

const signUp = async (userData: {email: string, fullname: string, password: string, role?: string}, callback: Function) => {
    const q = query(collection(firestore, "users"), where("email", "==", userData.email))
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    })
    
    if(data.length) {
        callback({status: false, message: "Email already exist"})
    } else {
        userData.password = bcrypt.hashSync(userData.password, 10)
        userData.role = 'member'
        await addDoc(collection(firestore, "users"), userData)
        .then(() => {
            callback({status: true, message: 'Register success'})
        })
        .catch((error) => {
            callback({status: false, message: error})
        })
    }
}

const signInWithGoogle = async (userData: any, callback: any) => {
    const q = query(collection(firestore, "users"), where("email", "==", userData.email))
    const snapshot = await getDocs(q)
    const data: any = snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    })

    if(data.length) {
        // jika datanya ada di db, maka update datanya di database dgn data dari Google supaya data di db tetap terupdate & update data utk session dgn data dari db
        userData.role = data[0].role
        await updateDoc(doc(firestore, "users", data[0].id), userData)
        .then(() => {
            callback({status: true, message: 'Sign in with Google success', data: userData})
        })
        .catch((error) => {
            callback({status: false, message: 'Sign in with Google failed'})
        })
    } else {
        // jika email dari googlenya tdk ada di db, maka daftarkan ke db sbg user baru
        userData.role = 'member'
        await addDoc(collection(firestore, "users"), userData)
        .then(() => {
            callback({status: true, message: 'Sign in with Google success', data: userData})
        })
        .catch((error) => {
            callback({status: false, message: 'Sign in with Google failed'})
        })
    }
}

export {retrieveData, retrieveDataById, signUp, signIn, signInWithGoogle}