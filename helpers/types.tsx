export interface AuthProps {
  currentUser: object | null;
  signUpWithEmail: (
    email: string,
    password: string,
    setErrorMessage: (errorMessage: string) => void
  ) => Promise<true | undefined>;
  signInWithEmail: (
    email: string,
    password: string,
    setErrorMessage: (errorMessage: string) => void
  ) => Promise<true | undefined>;
  signInWithGoogle: () => Promise<true | undefined>;
  logout: () => void;
}

export interface questionProps {
  id: number;
  title: string;
  difficulty: 0 | 1 | 2;
  status?: 1;
}
