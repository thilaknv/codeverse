export interface AuthProps {
  currentUser: any;
  USER: any;
  signUpWithEmail: (
    username: string,
    email: string,
    password: string,
    setErrorMessage: (errorMessage: string) => void
  ) => Promise<boolean>;
  signInWithEmail: (
    email: string,
    password: string,
    setErrorMessage: (errorMessage: string) => void
  ) => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;
  logout: () => void;
  setUSER: React.Dispatch<React.SetStateAction<any>>;
}

export interface questionProps {
  qid: number;
  title: string;
  difficulty: 0 | 1 | 2;
  status?: 1;
}
