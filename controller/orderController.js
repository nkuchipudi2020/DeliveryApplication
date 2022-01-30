/* import firebase from '../firebase/firebase'

export function addOrderTo(order, addComplete){
    firebase
        .firestore()
        .collection("Orders")
        .add(order)
        .then((snapshot) => {
            order.id = snapshot.id
            snapshot.set(order)
        })
        .then(() => addComplete(order))
        .catch((error) => console.log(error))
} */
