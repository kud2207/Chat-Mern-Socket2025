
// Définition de l'interface pour le store
export interface AuthState {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers:[];
  checkAuth: () => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  updateProfile: (data: photoProfileData) => Promise<void>;
  logout: () => Promise<void>;

}

// Définition de l'interface pour l'utilisateur
export interface AuthUser {
  _id: string;
  fullName: string;
  email: string;
  profilePic?: string | null,
  createdAt?: string;
  updatedAt?: string;
}

//data sign
export interface SignupData {
  fullName: string;
  email: string;
  password: string;
}

//data login
export interface LoginData {
  email: string;
  password: string;
}

//data photo profile
export interface photoProfileData {
  profilePic: string;
}

//pour les theme
type ThemeStore = {
  theme: string;
  setTheme: (theme: string) => void;
};

/*
pour les message
*/
export interface IUser {
  _id: string;
  fullName: string;
  email?: string;
  profilePic?: string | null,
  createdAt?: string;
  updatedAt?: string;
}

// Type pour Message
export interface IMessage {
  _id: string;
  senderId: string;
  receiverId: string
  text?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface ChatState {
  messages: IMessage[];
  users: IUser[];
  selectedUser: IUser | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (id: string) => Promise<void>;
  setSelectedUser: (id: IUser | null) => Promise<void>;
  sendMessage: (data) => Promise<void>;
}
