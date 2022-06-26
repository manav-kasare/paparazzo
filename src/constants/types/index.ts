import {ImageSourcePropType} from 'react-native';
import {ITheme} from './theme';

export * from './components';
export * from './theme';

export interface IUser {
  id: string;
  username: string;
  avatar: string;
  email: string;
  followers: number;
  following: number;
  friends: number;
  isPrivate: boolean;
}

export interface IRelation {
  isFollowing: boolean;
  isFriend: boolean;
  followRequested: boolean;
  friendRequested: boolean;
}

export interface ICategory {
  id?: number;
  name?: string;
}
export interface IArticleOptions {
  id?: number;
  title?: string;
  description?: string;
  type?: 'room' | 'apartment' | 'house'; // private room | entire apartment | entire house
  sleeping?: {total?: number; type?: 'sofa' | 'bed'};
  guests?: number;
  price?: number;
  user?: IUser;
  image?: string;
}
export interface IArticle {
  id?: number;
  title?: string;
  description?: string;
  category?: ICategory;
  image?: string;
  location?: ILocation;
  rating?: number;
  user?: IUser;
  offers?: IProduct[];
  options?: IArticleOptions[];
  timestamp?: number;
  onPress?: (event?: any) => void;
}

export interface IProduct {
  id?: number;
  title?: string;
  description?: string;
  image?: string;
  timestamp?: number;
  linkLabel?: string;
  type: 'vertical' | 'horizontal';
}
export interface ILocation {
  id?: number;
  city?: string;
  country?: string;
}
export interface IUseData {
  theme: ITheme;
  setTheme: (theme?: ITheme) => void;
  token: String;
  setToken: (token?: string) => void;
  user: IUser;
  handleUser: (data?: IUser | any) => void;
  notifications: INotification[];
  handleNotifications: (data?: INotification[]) => void;
  following: Array<any>;
  setFollowing: (user: any) => void;
  followers: Array<any>;
  setFollowers: (user: any) => void;
  friends: Array<any>;
  setFriends: (user: any) => void;
  requests: Array<any>;
  setRequests: (user: any) => void;
}

export interface IExtra {
  id?: number;
  name?: string;
  time?: string;
  image: ImageSourcePropType;
  saved?: boolean;
  booked?: boolean;
  available?: boolean;
  onBook?: () => void;
  onSave?: () => void;
  onTimeSelect?: (id?: number) => void;
}

export interface INotification {
  id?: number;
  subject?: string;
  message?: string;
  read?: boolean;
  business?: boolean;
  createdAt?: number | Date;
  type:
    | 'document'
    | 'documentation'
    | 'payment'
    | 'notification'
    | 'profile'
    | 'extras'
    | 'office';
}

export type AuthStackParamList = {
  Onboard: undefined;
  ProfileSetup: {email: string};
  Verification: {code: string; email: string; password: string};
};

export type ScreensStackParamList = {
  Settings: undefined;
  Followers: undefined;
  Following: undefined;
  Friends: undefined;
  Requests: undefined;
  User: {userParam: any};
};

export type IPost = {
  id: string;
  user: {
    id: string;
    username: string;
    avatar: string;
  };
  image: string;
  caption?: string;
  postedBy: {
    id: string;
    username: string;
  };
};

export type IConfig = {
  API_URL: string;
};
