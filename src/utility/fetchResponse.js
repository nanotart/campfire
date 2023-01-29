import { addDoc, collection } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

const fetchResponse = async () => {
  await getDocs(collection(db, "todos")).then((querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setResponse(newData);
    console.log(todos, newData);
  });
};

export default fetchResponse;
