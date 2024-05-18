import { db } from "./firebase";
import {
  getDocs,
  collection,
  updateDoc,
  doc,
  query,
  where,
  setDoc,
  getDoc,
} from "firebase/firestore";

// import { testQuestions } from "../../bin/questions";
// import { codes } from "../../bin/codes";

const addUser = async (
  username: string,
  email: string,
  uid: string,
  photoURL?: string | null
) => {
  if (await getUser("email", email)) return;

  const newUser = {
    username,
    email,
    uid,
    photoURL: `${photoURL}` || "",
    stats: {
      points: 0,
      solvedDifficultyCount: [0, 0, 0],
      solvedQuestionsSet: [],
      uniqueAcceptence: 0,
      uniqueRejections: 0,
    },
  };

  try {
    const usersRef = collection(db, "users");
    const userDocRef = doc(usersRef, uid);
    await setDoc(userDocRef, newUser);
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (name: string, value: string) => {
  try {
    const userSnapshot = await getDocs(
      query(collection(db, "users"), where(name, "==", value))
    );
    return userSnapshot.empty ? null : userSnapshot.docs[0].data();
  } catch (error) {
    return null;
  }
};

const getAllUsers = async () => {
  const usersList: object[] = [];
  const usersSnapshot = await getDocs(collection(db, "users"));
  usersSnapshot.forEach((doc) => usersList.push(doc.data()));
  return usersList;
};

const getAllQuestions = async () => {
  const qList: object[] = [];
  const questionsSnapShot = await getDocs(collection(db, "questions"));
  questionsSnapShot.forEach((doc) => qList.push(doc.data()));
  return qList;
};

const getQuestion = async (qid: number) => {
  try {
    const qDocRef = doc(db, "questions", `${qid}`);
    const questionSnapShot = await getDoc(qDocRef);
    if (questionSnapShot.exists()) return questionSnapShot.data();
    return false;
  } catch (error) {
    return false;
  }
};

const updateQuestionSolved = async (
  USER: any,
  qid: number,
  difficulty: number,
  status: boolean
) => {
  try {
    if (USER.stats.solvedQuestionsSet.includes(qid)) return false;

    if (status) {
      USER.stats.solvedQuestionsSet.push(qid);
      USER.stats.solvedDifficultyCount[difficulty]++;
      USER.stats.points += (difficulty + 1) * 2;
      USER.stats.uniqueAcceptence++;
    } else {
      USER.stats.uniqueRejections++;
    }
    const qDocRef = doc(db, "users", `${USER.uid}`);
    await updateDoc(qDocRef, USER);
    return USER;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// -- METHOD TO ADD NEW QUESTIONS
// export const addQuestion = async (Q: any) => {
//   console.log("addQ" + Q.qid + " method called");
//   const questionsRef = collection(db, "questions");
//   const qDocRef = doc(questionsRef, `${Q.qid}`);
//   const questionSnapShot = await getDoc(qDocRef);
//   if (!questionSnapShot.exists()) await setDoc(qDocRef, Q);
// };

// const addQuestionHelper = async () => {
//   testQuestions.forEach(async (Q, index) => {
//     Q.boilerPlateCode.python = btoa(codes[index].actualBoilerPlateCode.python);
//     Q.solutionCode.python = btoa(codes[index].actualSolutionCode.python);
//     Q.driverCode.python = btoa(codes[index].actualDriverCode.python);

//     Q.boilerPlateCode.java = btoa(codes[index].actualBoilerPlateCode.java);
//     Q.solutionCode.java = btoa(codes[index].actualSolutionCode.java);
//     Q.driverCode.java = btoa(codes[index].actualDriverCode.java);

//     Q.boilerPlateCode.cpp = btoa(codes[index].actualBoilerPlateCode.cpp);
//     Q.solutionCode.cpp = btoa(codes[index].actualSolutionCode.cpp);
//     Q.driverCode.cpp = btoa(codes[index].actualDriverCode.cpp);

//     // console.log(Q);
//     await addQuestion(Q);
//   });
// };

// setTimeout(async () => {
//   console.log("start");
//   await addQuestionHelper();
//   console.log("end");
// }, 5000);

export {
  addUser,
  getAllUsers,
  getUser,
  getQuestion,
  getAllQuestions,
  updateQuestionSolved,
};
