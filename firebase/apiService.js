import {Auth, database, firestore} from '../Setup';

export const SignUpUser = (email, passswod) => {
  return new Promise(function (resolve, reject) {
    Auth()
      .createUserWithEmailAndPassword(email, passswod)
      .then(() => {
        resolve('Sign Up Successfully');
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const SignInUser = (email, passswod) => {
  return new Promise(function (resolve, reject) {
    Auth()
      .signInWithEmailAndPassword(email, passswod)
      .then(() => {
        resolve('Sign In Successfully');
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const SignOutUser = () => {
  return new Promise(function (resolve, reject) {
    Auth()
      .signOut()
      .then(() => {
        resolve('Sign Out Successfully');
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const submitUser = (Id, SchoolId, Name, state) => {
  return new Promise(function (resolve, reject) {
    let key;
    if (Id != null) {
      key = Id;
    } else {
      key = database().ref().push().key;
    }
    let dataToSave = {
      Id: key,
      SchoolId: SchoolId,
      Name: Name,
      Password: state.passsword,
      Email: state.emailAddress,
    };
    database()
      .ref('users/' + key)
      .update(dataToSave)
      .then(snapshot => {
        resolve(snapshot);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const submitOrder = (
  Orderer,
  ConfirmationNo,
  PickupLocation,
  DeliveryLocation,
  OrdererName,
  Deliverer,
  OrderStatus,
  OrderTime,
) => {
  return new Promise(function (resolve, reject) {
    let key;
    if (ConfirmationNo != null) {
      key = ConfirmationNo;
    } else {
      //key = database().ref().push().key;
      alert('Please input your Confirmation Code');
    }
    let dataToSave = {
      Orderer: Orderer,
      ConfirmationNo: ConfirmationNo,
      PickupLocation: PickupLocation,
      DeliveryLocation: DeliveryLocation,
      OrdererName: OrdererName,
      Deliverer: Deliverer,
      OrderStatus: OrderStatus,
      OrderTime: OrderTime,
    };
    database()
      .ref('order/' + key)
      .update(dataToSave)
      .then(snapshot => {
        resolve(snapshot);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const createOrder = (
  Orderer,
  ConfirmationNo,
  PickupLocation,
  DeliveryLocation,
  OrdererName,
  Deliverer,
  OrderStatus,
  OrderTime,
) => {
  return new Promise(function (resolve, reject) {
    let key;
    if (ConfirmationNo != null) {
      key = ConfirmationNo;
    } else {
      //key = database().ref().push().key;
      alert('Please input your Confirmation Code');
    }
    let dataToSave = {
      Orderer: Orderer,
      ConfirmationNo: ConfirmationNo,
      PickupLocation: PickupLocation,
      DeliveryLocation: DeliveryLocation,
      OrdererName: OrdererName,
      Deliverer: Deliverer,
      OrderStatus: OrderStatus,
      OrderTime: OrderTime,
    };
    firestore()
      .collection('AllOrder')
      .doc(key)
      .set(dataToSave)
      .then(snapshot => {
        resolve(snapshot);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getOrderListbyOrderer = Orderer => {
  return new Promise(function (resolve, reject) {
    firestore()
      .collection('AllOrder')
      .where('Orderer', '==', Orderer)
      .get()
      .then(snapshot => {
        resolve(snapshot);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const deleteOrder = ConfirmationNo => {
  return new Promise(function (resolve, reject) {
    firestore()
      .collection('AllOrder')
      .doc(ConfirmationNo)
      .delete()
      .then(snapshot => {
        resolve(snapshot);
      })
      .catch(err => {
        reject(err);
      });
  });
};
export const updateOrderStatusDeliverer = (
  ConfirmationNo,
  newStatus,
  newDeliverer,
) => {
  return new Promise(function (resolve, reject) {
    firestore()
      .collection('AllOrder')
      .doc(ConfirmationNo)
      .update({
        OrderStatus: newStatus,
        Deliverer: newDeliverer,
      })
      .then(snapshot => {
        resolve(snapshot);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const updateOrderStatus = (ConfirmationNo, newStatus) => {
  return new Promise(function (resolve, reject) {
    firestore()
      .collection('AllOrder')
      .doc(ConfirmationNo)
      .update({
        OrderStatus: newStatus,
      })
      .then(snapshot => {
        resolve(snapshot);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const updateOrderDeliverer = (ConfirmationNo, newDeliverer) => {
  return new Promise(function (resolve, reject) {
    firestore()
      .collection('AllOrder')
      .doc(ConfirmationNo)
      .update({
        Deliverer: newDeliverer,
      })
      .then(snapshot => {
        resolve(snapshot);
      })
      .catch(err => {
        reject(err);
      });
  });
};
