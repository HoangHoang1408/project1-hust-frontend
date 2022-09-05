import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Booking = {
  __typename?: 'Booking';
  bookingCode: Scalars['String'];
  carType: CarType;
  cars: Array<Car>;
  createdAt: Scalars['DateTime'];
  customerName: Scalars['String'];
  customerPhone: Scalars['String'];
  endDate: Scalars['DateTime'];
  feedBack?: Maybe<Scalars['String']>;
  homeDelivery: Scalars['String'];
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  payment: Payment;
  quantity: Scalars['Float'];
  rating?: Maybe<Scalars['Int']>;
  startDate: Scalars['DateTime'];
  status: BookingStatus;
  totalPrice: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};

export type BookingFeedBackInput = {
  feedback?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  rating: Scalars['Int'];
};

export type BookingFeedBackOutput = {
  __typename?: 'BookingFeedBackOutput';
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
};

export type BookingInputType = {
  bookingCode: Scalars['String'];
  carType: CarTypeInput;
  cars: Array<CarInputType>;
  customerName: Scalars['String'];
  customerPhone: Scalars['String'];
  endDate: Scalars['DateTime'];
  feedBack?: InputMaybe<Scalars['String']>;
  homeDelivery: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  payment: Payment;
  quantity: Scalars['Float'];
  rating?: InputMaybe<Scalars['Int']>;
  startDate: Scalars['DateTime'];
  status: BookingStatus;
  totalPrice: Scalars['Float'];
  user?: InputMaybe<UserInputType>;
};

export enum BookingStatus {
  Deposited = 'DEPOSITED',
  Finished = 'FINISHED',
  NotDeposite = 'NOT_DEPOSITE',
  VehicleTaken = 'VEHICLE_TAKEN'
}

export type Car = {
  __typename?: 'Car';
  bookings?: Maybe<Array<Booking>>;
  carBrand: CarBrand;
  carType: CarType;
  consumption: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  engineType: EngineType;
  features: Array<Scalars['String']>;
  id: Scalars['ID'];
  images?: Maybe<Array<StoredFile>>;
  licensePlate: Scalars['String'];
  manufactureYear: Scalars['Float'];
  name: Scalars['String'];
  rating: Scalars['Float'];
  transmissionType: TransmissionType;
  updatedAt: Scalars['DateTime'];
  vehicleStatus: VehicleStatus;
};

export enum CarBrand {
  Ford = 'FORD',
  Honda = 'HONDA',
  Huyndai = 'HUYNDAI',
  Nissan = 'NISSAN',
  Suzuki = 'SUZUKI',
  Toyota = 'TOYOTA',
  Vinfast = 'VINFAST',
  Volvo = 'VOLVO'
}

export type CarInputType = {
  bookings?: InputMaybe<Array<BookingInputType>>;
  carBrand: CarBrand;
  carType: CarTypeInput;
  consumption: Scalars['Float'];
  engineType: EngineType;
  features: Array<Scalars['String']>;
  images?: InputMaybe<Array<StoredFileInputType>>;
  licensePlate: Scalars['String'];
  manufactureYear: Scalars['Float'];
  name: Scalars['String'];
  rating: Scalars['Float'];
  transmissionType: TransmissionType;
  vehicleStatus: VehicleStatusInputType;
};

export type CarType = {
  __typename?: 'CarType';
  acceptedPayment: Array<Payment>;
  additionalDistancePrice?: Maybe<Scalars['Float']>;
  bookings?: Maybe<Array<Booking>>;
  carType: CarTypeEnum;
  cars?: Maybe<Array<Car>>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  maxDistance?: Maybe<Scalars['Float']>;
  price: Scalars['Float'];
  procedures: Procedure;
  updatedAt: Scalars['DateTime'];
};

export enum CarTypeEnum {
  LuxuryCar = 'LUXURY_CAR',
  PickupTruck = 'PICKUP_TRUCK',
  Seat4 = 'SEAT4',
  Seat5 = 'SEAT5',
  Seat7 = 'SEAT7'
}

export type CarTypeInput = {
  acceptedPayment: Array<Payment>;
  additionalDistancePrice?: InputMaybe<Scalars['Float']>;
  bookings?: InputMaybe<Array<BookingInputType>>;
  carType: CarTypeEnum;
  cars?: InputMaybe<Array<CarInputType>>;
  maxDistance?: InputMaybe<Scalars['Float']>;
  price: Scalars['Float'];
  procedures: ProcedureInputType;
};

export type ChangePasswordInput = {
  confirmPassword: Scalars['String'];
  currentPassword: Scalars['String'];
  password: Scalars['String'];
};

export type ChangePasswordOutput = {
  __typename?: 'ChangePasswordOutput';
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
};

export type CheckCarAvailableInput = {
  carType: CarTypeEnum;
  endDate: Scalars['DateTime'];
  quantity: Scalars['Float'];
  startDate: Scalars['DateTime'];
};

export type CheckCarAvailableOutput = {
  __typename?: 'CheckCarAvailableOutput';
  available?: Maybe<Scalars['Boolean']>;
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
};

export type CreateBookingInput = {
  carTypeName: CarTypeEnum;
  customerName: Scalars['String'];
  customerPhone: Scalars['String'];
  endDate: Scalars['DateTime'];
  homeDelivery: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  payment: Payment;
  quantity: Scalars['Float'];
  startDate: Scalars['DateTime'];
};

export type CreateBookingOutput = {
  __typename?: 'CreateBookingOutput';
  bookingCode?: Maybe<Scalars['String']>;
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
};

export type CreateCarInput = {
  bookings?: InputMaybe<Array<BookingInputType>>;
  carBrand: CarBrand;
  carType: CarTypeInput;
  consumption: Scalars['Float'];
  engineType: EngineType;
  features: Array<Scalars['String']>;
  images?: InputMaybe<Array<StoredFileInputType>>;
  licensePlate: Scalars['String'];
  manufactureYear: Scalars['Float'];
  name: Scalars['String'];
  transmissionType: TransmissionType;
};

export type CreateCarOutput = {
  __typename?: 'CreateCarOutput';
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
};

export type CustomError = {
  __typename?: 'CustomError';
  mainReason: Scalars['String'];
  message: Scalars['String'];
};

export enum EngineType {
  Electric = 'ELECTRIC',
  Gasoline = 'GASOLINE',
  Hibrid = 'HIBRID'
}

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export type ForgotPasswordOutput = {
  __typename?: 'ForgotPasswordOutput';
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
};

export type GetBookingDetailInput = {
  bookingId: Scalars['ID'];
};

export type GetBookingDetailOutput = {
  __typename?: 'GetBookingDetailOutput';
  booking?: Maybe<Booking>;
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
};

export type GetBookingsByInput = {
  carType?: InputMaybe<CarTypeEnum>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  pagination: PaginationInput;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type GetBookingsByOutput = {
  __typename?: 'GetBookingsByOutput';
  bookings?: Maybe<Array<Booking>>;
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
  pagination?: Maybe<PaginationOutput>;
};

export type GetCarDetailInput = {
  carId: Scalars['ID'];
};

export type GetCarDetailOutput = {
  __typename?: 'GetCarDetailOutput';
  car?: Maybe<Car>;
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
};

export type GetCarTypeInput = {
  carType: CarTypeEnum;
};

export type GetCarTypeOutput = {
  __typename?: 'GetCarTypeOutput';
  carType?: Maybe<CarType>;
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
};

export type GetDetailUserOutput = {
  __typename?: 'GetDetailUserOutput';
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
  user: User;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginOutPut = {
  __typename?: 'LoginOutPut';
  accessToken?: Maybe<Scalars['String']>;
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
  user?: Maybe<SimpleUser>;
};

export type Mutation = {
  __typename?: 'Mutation';
  bookingFeedback: BookingFeedBackOutput;
  changePassword: ChangePasswordOutput;
  createBooking: CreateBookingOutput;
  createCar: CreateCarOutput;
  signup: SignUpOutPut;
  updateBookingStatus: UpdateBookingStatusOutput;
  updateUser: UpdateUserOutput;
  verifyForgotPassword: VerifyForgotPasswordOutput;
};


export type MutationBookingFeedbackArgs = {
  input: BookingFeedBackInput;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationCreateBookingArgs = {
  input: CreateBookingInput;
};


export type MutationCreateCarArgs = {
  input: CreateCarInput;
};


export type MutationSignupArgs = {
  input: SignUpInput;
};


export type MutationUpdateBookingStatusArgs = {
  input: UpdateBookingStatusInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationVerifyForgotPasswordArgs = {
  input: VerifyForgotPasswordInput;
};

export type NewAccessTokenInput = {
  accessToken: Scalars['String'];
};

export type NewAccessTokenOutput = {
  __typename?: 'NewAccessTokenOutput';
  accessToken?: Maybe<Scalars['String']>;
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
};

export type PaginationInput = {
  page?: InputMaybe<Scalars['Int']>;
  resultsPerPage?: InputMaybe<Scalars['Int']>;
};

export type PaginationOutput = {
  __typename?: 'PaginationOutput';
  totalPages?: Maybe<Scalars['Int']>;
  totalResults?: Maybe<Scalars['Int']>;
};

export enum Payment {
  After = 'AFTER',
  BankTransfer = 'BANK_TRANSFER',
  Before = 'BEFORE'
}

export type Procedure = {
  __typename?: 'Procedure';
  mortgatePaper?: Maybe<Array<Scalars['String']>>;
  mortgateProperty?: Maybe<Array<Scalars['String']>>;
  verificationPaper?: Maybe<Array<Scalars['String']>>;
};

export type ProcedureInputType = {
  mortgatePaper?: InputMaybe<Array<Scalars['String']>>;
  mortgateProperty?: InputMaybe<Array<Scalars['String']>>;
  verificationPaper?: InputMaybe<Array<Scalars['String']>>;
};

export type Query = {
  __typename?: 'Query';
  checkCarAvailable: CheckCarAvailableOutput;
  forgotPassword: ForgotPasswordOutput;
  getBookingDetail: GetBookingDetailOutput;
  getBookingsBy: GetBookingsByOutput;
  getCarDetail: GetCarDetailOutput;
  getCarType: GetCarTypeOutput;
  getDetailUser: GetDetailUserOutput;
  login: LoginOutPut;
  newAccessToken: NewAccessTokenOutput;
  verifyEmail: VerifyEmailOutput;
};


export type QueryCheckCarAvailableArgs = {
  input: CheckCarAvailableInput;
};


export type QueryForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type QueryGetBookingDetailArgs = {
  input: GetBookingDetailInput;
};


export type QueryGetBookingsByArgs = {
  input: GetBookingsByInput;
};


export type QueryGetCarDetailArgs = {
  input: GetCarDetailInput;
};


export type QueryGetCarTypeArgs = {
  input: GetCarTypeInput;
};


export type QueryLoginArgs = {
  input: LoginInput;
};


export type QueryNewAccessTokenArgs = {
  input: NewAccessTokenInput;
};


export type QueryVerifyEmailArgs = {
  input: VerifyEmailInput;
};

export type SignUpInput = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
};

export type SignUpOutPut = {
  __typename?: 'SignUpOutPut';
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
};

export type SimpleUser = {
  __typename?: 'SimpleUser';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  role: UserRole;
};

export type StoredFile = {
  __typename?: 'StoredFile';
  filePath: Scalars['String'];
  fileUrl: Scalars['String'];
};

export type StoredFileInputType = {
  filePath: Scalars['String'];
  fileUrl: Scalars['String'];
};

export enum TransmissionType {
  AutomaticTransmission = 'AUTOMATIC_TRANSMISSION',
  ManualTransmission = 'MANUAL_TRANSMISSION'
}

export type UpdateBookingStatusInput = {
  bookingId: Scalars['Int'];
  status: BookingStatus;
};

export type UpdateBookingStatusOutput = {
  __typename?: 'UpdateBookingStatusOutput';
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<StoredFileInputType>;
  name: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type UpdateUserOutput = {
  __typename?: 'UpdateUserOutput';
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']>;
  avatar?: Maybe<StoredFile>;
  bookings?: Maybe<Array<Booking>>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  password: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  role: UserRole;
  updatedAt: Scalars['DateTime'];
  verified: Scalars['Boolean'];
};

export type UserInputType = {
  address?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<StoredFileInputType>;
  bookings?: InputMaybe<Array<BookingInputType>>;
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  role: UserRole;
  verified: Scalars['Boolean'];
};

export enum UserRole {
  Admin = 'Admin',
  Normal = 'Normal'
}

export type VehicleStatus = {
  __typename?: 'VehicleStatus';
  booked: Scalars['Boolean'];
  goodCondition: Scalars['Boolean'];
};

export type VehicleStatusInputType = {
  booked: Scalars['Boolean'];
  goodCondition: Scalars['Boolean'];
};

export type VerifyEmailInput = {
  verificationToken: Scalars['String'];
};

export type VerifyEmailOutput = {
  __typename?: 'VerifyEmailOutput';
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
};

export type VerifyForgotPasswordInput = {
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
  verificationToken: Scalars['String'];
};

export type VerifyForgotPasswordOutput = {
  __typename?: 'VerifyForgotPasswordOutput';
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
};

export type BookingFragmentFragment = { __typename?: 'Booking', id: string, payment: Payment, status: BookingStatus, rating?: number | null, feedBack?: string | null, bookingCode: string, totalPrice: number, startDate: any, endDate: any, quantity: number, customerName: string, customerPhone: string, note?: string | null, homeDelivery: string, user?: { __typename?: 'User', id: string, name: string, avatar?: { __typename?: 'StoredFile', fileUrl: string, filePath: string } | null } | null, carType: { __typename?: 'CarType', carType: CarTypeEnum, price: number, maxDistance?: number | null, additionalDistancePrice?: number | null, acceptedPayment: Array<Payment>, procedures: { __typename?: 'Procedure', mortgateProperty?: Array<string> | null, mortgatePaper?: Array<string> | null, verificationPaper?: Array<string> | null } } };

export type CarFragmentFragment = { __typename?: 'Car', id: string, carBrand: CarBrand, transmissionType: TransmissionType, consumption: number, features: Array<string>, name: string, rating: number, engineType: EngineType, manufactureYear: number, carType: { __typename?: 'CarType', carType: CarTypeEnum, price: number, maxDistance?: number | null, additionalDistancePrice?: number | null, acceptedPayment: Array<Payment>, procedures: { __typename?: 'Procedure', mortgateProperty?: Array<string> | null, mortgatePaper?: Array<string> | null, verificationPaper?: Array<string> | null } }, images?: Array<{ __typename?: 'StoredFile', fileUrl: string, filePath: string }> | null };

export type CarTypeFragmentFragment = { __typename?: 'CarType', carType: CarTypeEnum, price: number, maxDistance?: number | null, additionalDistancePrice?: number | null, acceptedPayment: Array<Payment>, procedures: { __typename?: 'Procedure', mortgateProperty?: Array<string> | null, mortgatePaper?: Array<string> | null, verificationPaper?: Array<string> | null } };

export type UserFragmentFragment = { __typename?: 'User', id: string, email: string, verified: boolean, name: string, role: UserRole, address?: string | null, phoneNumber?: string | null, avatar?: { __typename?: 'StoredFile', fileUrl: string, filePath: string } | null, bookings?: Array<{ __typename?: 'Booking', id: string, payment: Payment, status: BookingStatus, rating?: number | null, feedBack?: string | null, bookingCode: string, totalPrice: number, startDate: any, endDate: any, quantity: number, customerName: string, customerPhone: string, note?: string | null, homeDelivery: string, user?: { __typename?: 'User', id: string, name: string, avatar?: { __typename?: 'StoredFile', fileUrl: string, filePath: string } | null } | null, carType: { __typename?: 'CarType', carType: CarTypeEnum, price: number, maxDistance?: number | null, additionalDistancePrice?: number | null, acceptedPayment: Array<Payment>, procedures: { __typename?: 'Procedure', mortgateProperty?: Array<string> | null, mortgatePaper?: Array<string> | null, verificationPaper?: Array<string> | null } } }> | null };

export type BookingFeedbackMutationVariables = Exact<{
  input: BookingFeedBackInput;
}>;


export type BookingFeedbackMutation = { __typename?: 'Mutation', bookingFeedback: { __typename?: 'BookingFeedBackOutput', ok: boolean, error?: { __typename?: 'CustomError', mainReason: string, message: string } | null } };

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'ChangePasswordOutput', ok: boolean, error?: { __typename?: 'CustomError', message: string, mainReason: string } | null } };

export type CreateBookingMutationVariables = Exact<{
  input: CreateBookingInput;
}>;


export type CreateBookingMutation = { __typename?: 'Mutation', createBooking: { __typename?: 'CreateBookingOutput', ok: boolean, bookingCode?: string | null, error?: { __typename?: 'CustomError', mainReason: string, message: string } | null } };

export type ResetPasswordMutationVariables = Exact<{
  input: VerifyForgotPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', verifyForgotPassword: { __typename?: 'VerifyForgotPasswordOutput', ok: boolean, error?: { __typename?: 'CustomError', message: string } | null } };

export type SignupMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'SignUpOutPut', ok: boolean, error?: { __typename?: 'CustomError', message: string } | null } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UpdateUserOutput', ok: boolean, error?: { __typename?: 'CustomError', mainReason: string, message: string } | null } };

export type BookingDetailQueryVariables = Exact<{
  input: GetBookingDetailInput;
}>;


export type BookingDetailQuery = { __typename?: 'Query', getBookingDetail: { __typename?: 'GetBookingDetailOutput', ok: boolean, error?: { __typename?: 'CustomError', message: string } | null, booking?: { __typename?: 'Booking', id: string, payment: Payment, status: BookingStatus, rating?: number | null, feedBack?: string | null, bookingCode: string, totalPrice: number, startDate: any, endDate: any, quantity: number, customerName: string, customerPhone: string, note?: string | null, homeDelivery: string, user?: { __typename?: 'User', id: string, name: string, avatar?: { __typename?: 'StoredFile', fileUrl: string, filePath: string } | null } | null, carType: { __typename?: 'CarType', carType: CarTypeEnum, price: number, maxDistance?: number | null, additionalDistancePrice?: number | null, acceptedPayment: Array<Payment>, procedures: { __typename?: 'Procedure', mortgateProperty?: Array<string> | null, mortgatePaper?: Array<string> | null, verificationPaper?: Array<string> | null } } } | null } };

export type CheckCarAvailableQueryVariables = Exact<{
  input: CheckCarAvailableInput;
}>;


export type CheckCarAvailableQuery = { __typename?: 'Query', checkCarAvailable: { __typename?: 'CheckCarAvailableOutput', ok: boolean, available?: boolean | null, error?: { __typename?: 'CustomError', mainReason: string, message: string } | null } };

export type ForgotPasswordQueryVariables = Exact<{
  input: ForgotPasswordInput;
}>;


export type ForgotPasswordQuery = { __typename?: 'Query', forgotPassword: { __typename?: 'ForgotPasswordOutput', ok: boolean, error?: { __typename?: 'CustomError', message: string, mainReason: string } | null } };

export type GetBookingByQueryVariables = Exact<{
  input: GetBookingsByInput;
}>;


export type GetBookingByQuery = { __typename?: 'Query', getBookingsBy: { __typename?: 'GetBookingsByOutput', ok: boolean, error?: { __typename?: 'CustomError', message: string, mainReason: string } | null, bookings?: Array<{ __typename?: 'Booking', id: string, payment: Payment, status: BookingStatus, rating?: number | null, feedBack?: string | null, bookingCode: string, totalPrice: number, startDate: any, endDate: any, quantity: number, customerName: string, customerPhone: string, note?: string | null, homeDelivery: string, user?: { __typename?: 'User', id: string, name: string, avatar?: { __typename?: 'StoredFile', fileUrl: string, filePath: string } | null } | null, carType: { __typename?: 'CarType', carType: CarTypeEnum, price: number, maxDistance?: number | null, additionalDistancePrice?: number | null, acceptedPayment: Array<Payment>, procedures: { __typename?: 'Procedure', mortgateProperty?: Array<string> | null, mortgatePaper?: Array<string> | null, verificationPaper?: Array<string> | null } } }> | null, pagination?: { __typename?: 'PaginationOutput', totalPages?: number | null, totalResults?: number | null } | null } };

export type GetCarTypeQueryVariables = Exact<{
  input: GetCarTypeInput;
}>;


export type GetCarTypeQuery = { __typename?: 'Query', getCarType: { __typename?: 'GetCarTypeOutput', ok: boolean, error?: { __typename?: 'CustomError', mainReason: string, message: string } | null, carType?: { __typename?: 'CarType', carType: CarTypeEnum, price: number, maxDistance?: number | null, additionalDistancePrice?: number | null, acceptedPayment: Array<Payment>, procedures: { __typename?: 'Procedure', mortgateProperty?: Array<string> | null, mortgatePaper?: Array<string> | null, verificationPaper?: Array<string> | null } } | null } };

export type LoginQueryVariables = Exact<{
  input: LoginInput;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'LoginOutPut', ok: boolean, accessToken?: string | null, error?: { __typename?: 'CustomError', message: string } | null, user?: { __typename?: 'SimpleUser', id: string, name: string, email: string, role: UserRole } | null } };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', getDetailUser: { __typename?: 'GetDetailUserOutput', ok: boolean, error?: { __typename?: 'CustomError', message: string } | null, user: { __typename?: 'User', id: string, email: string, verified: boolean, name: string, role: UserRole, address?: string | null, phoneNumber?: string | null, avatar?: { __typename?: 'StoredFile', fileUrl: string, filePath: string } | null, bookings?: Array<{ __typename?: 'Booking', id: string, payment: Payment, status: BookingStatus, rating?: number | null, feedBack?: string | null, bookingCode: string, totalPrice: number, startDate: any, endDate: any, quantity: number, customerName: string, customerPhone: string, note?: string | null, homeDelivery: string, user?: { __typename?: 'User', id: string, name: string, avatar?: { __typename?: 'StoredFile', fileUrl: string, filePath: string } | null } | null, carType: { __typename?: 'CarType', carType: CarTypeEnum, price: number, maxDistance?: number | null, additionalDistancePrice?: number | null, acceptedPayment: Array<Payment>, procedures: { __typename?: 'Procedure', mortgateProperty?: Array<string> | null, mortgatePaper?: Array<string> | null, verificationPaper?: Array<string> | null } } }> | null } } };

export const CarTypeFragmentFragmentDoc = gql`
    fragment CarTypeFragment on CarType {
  carType
  price
  maxDistance
  additionalDistancePrice
  procedures {
    mortgateProperty
    mortgatePaper
    verificationPaper
  }
  acceptedPayment
}
    `;
export const CarFragmentFragmentDoc = gql`
    fragment CarFragment on Car {
  id
  carType {
    ...CarTypeFragment
  }
  images {
    fileUrl
    filePath
  }
  carBrand
  transmissionType
  consumption
  features
  name
  rating
  engineType
  manufactureYear
}
    ${CarTypeFragmentFragmentDoc}`;
export const BookingFragmentFragmentDoc = gql`
    fragment BookingFragment on Booking {
  id
  payment
  status
  rating
  feedBack
  bookingCode
  totalPrice
  startDate
  endDate
  quantity
  customerName
  customerPhone
  note
  homeDelivery
  user {
    id
    name
    avatar {
      fileUrl
      filePath
    }
  }
  carType {
    ...CarTypeFragment
  }
}
    ${CarTypeFragmentFragmentDoc}`;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  avatar {
    fileUrl
    filePath
  }
  email
  verified
  name
  role
  address
  phoneNumber
  bookings {
    ...BookingFragment
  }
}
    ${BookingFragmentFragmentDoc}`;
export const BookingFeedbackDocument = gql`
    mutation BookingFeedback($input: BookingFeedBackInput!) {
  bookingFeedback(input: $input) {
    ok
    error {
      mainReason
      message
    }
  }
}
    `;
export type BookingFeedbackMutationFn = Apollo.MutationFunction<BookingFeedbackMutation, BookingFeedbackMutationVariables>;

/**
 * __useBookingFeedbackMutation__
 *
 * To run a mutation, you first call `useBookingFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBookingFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookingFeedbackMutation, { data, loading, error }] = useBookingFeedbackMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBookingFeedbackMutation(baseOptions?: Apollo.MutationHookOptions<BookingFeedbackMutation, BookingFeedbackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BookingFeedbackMutation, BookingFeedbackMutationVariables>(BookingFeedbackDocument, options);
      }
export type BookingFeedbackMutationHookResult = ReturnType<typeof useBookingFeedbackMutation>;
export type BookingFeedbackMutationResult = Apollo.MutationResult<BookingFeedbackMutation>;
export type BookingFeedbackMutationOptions = Apollo.BaseMutationOptions<BookingFeedbackMutation, BookingFeedbackMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($input: ChangePasswordInput!) {
  changePassword(input: $input) {
    ok
    error {
      message
      mainReason
    }
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateBookingDocument = gql`
    mutation CreateBooking($input: CreateBookingInput!) {
  createBooking(input: $input) {
    ok
    error {
      mainReason
      message
    }
    bookingCode
  }
}
    `;
export type CreateBookingMutationFn = Apollo.MutationFunction<CreateBookingMutation, CreateBookingMutationVariables>;

/**
 * __useCreateBookingMutation__
 *
 * To run a mutation, you first call `useCreateBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookingMutation, { data, loading, error }] = useCreateBookingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBookingMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookingMutation, CreateBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookingMutation, CreateBookingMutationVariables>(CreateBookingDocument, options);
      }
export type CreateBookingMutationHookResult = ReturnType<typeof useCreateBookingMutation>;
export type CreateBookingMutationResult = Apollo.MutationResult<CreateBookingMutation>;
export type CreateBookingMutationOptions = Apollo.BaseMutationOptions<CreateBookingMutation, CreateBookingMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($input: VerifyForgotPasswordInput!) {
  verifyForgotPassword(input: $input) {
    ok
    error {
      message
    }
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($input: SignUpInput!) {
  signup(input: $input) {
    ok
    error {
      message
    }
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    ok
    error {
      mainReason
      message
    }
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const BookingDetailDocument = gql`
    query BookingDetail($input: GetBookingDetailInput!) {
  getBookingDetail(input: $input) {
    ok
    error {
      message
    }
    booking {
      ...BookingFragment
    }
  }
}
    ${BookingFragmentFragmentDoc}`;

/**
 * __useBookingDetailQuery__
 *
 * To run a query within a React component, call `useBookingDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookingDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookingDetailQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBookingDetailQuery(baseOptions: Apollo.QueryHookOptions<BookingDetailQuery, BookingDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BookingDetailQuery, BookingDetailQueryVariables>(BookingDetailDocument, options);
      }
export function useBookingDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookingDetailQuery, BookingDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BookingDetailQuery, BookingDetailQueryVariables>(BookingDetailDocument, options);
        }
export type BookingDetailQueryHookResult = ReturnType<typeof useBookingDetailQuery>;
export type BookingDetailLazyQueryHookResult = ReturnType<typeof useBookingDetailLazyQuery>;
export type BookingDetailQueryResult = Apollo.QueryResult<BookingDetailQuery, BookingDetailQueryVariables>;
export const CheckCarAvailableDocument = gql`
    query CheckCarAvailable($input: CheckCarAvailableInput!) {
  checkCarAvailable(input: $input) {
    ok
    error {
      mainReason
      message
    }
    available
  }
}
    `;

/**
 * __useCheckCarAvailableQuery__
 *
 * To run a query within a React component, call `useCheckCarAvailableQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckCarAvailableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckCarAvailableQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCheckCarAvailableQuery(baseOptions: Apollo.QueryHookOptions<CheckCarAvailableQuery, CheckCarAvailableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckCarAvailableQuery, CheckCarAvailableQueryVariables>(CheckCarAvailableDocument, options);
      }
export function useCheckCarAvailableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckCarAvailableQuery, CheckCarAvailableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckCarAvailableQuery, CheckCarAvailableQueryVariables>(CheckCarAvailableDocument, options);
        }
export type CheckCarAvailableQueryHookResult = ReturnType<typeof useCheckCarAvailableQuery>;
export type CheckCarAvailableLazyQueryHookResult = ReturnType<typeof useCheckCarAvailableLazyQuery>;
export type CheckCarAvailableQueryResult = Apollo.QueryResult<CheckCarAvailableQuery, CheckCarAvailableQueryVariables>;
export const ForgotPasswordDocument = gql`
    query ForgotPassword($input: ForgotPasswordInput!) {
  forgotPassword(input: $input) {
    ok
    error {
      message
      mainReason
    }
  }
}
    `;

/**
 * __useForgotPasswordQuery__
 *
 * To run a query within a React component, call `useForgotPasswordQuery` and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useForgotPasswordQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useForgotPasswordQuery(baseOptions: Apollo.QueryHookOptions<ForgotPasswordQuery, ForgotPasswordQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ForgotPasswordQuery, ForgotPasswordQueryVariables>(ForgotPasswordDocument, options);
      }
export function useForgotPasswordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ForgotPasswordQuery, ForgotPasswordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ForgotPasswordQuery, ForgotPasswordQueryVariables>(ForgotPasswordDocument, options);
        }
export type ForgotPasswordQueryHookResult = ReturnType<typeof useForgotPasswordQuery>;
export type ForgotPasswordLazyQueryHookResult = ReturnType<typeof useForgotPasswordLazyQuery>;
export type ForgotPasswordQueryResult = Apollo.QueryResult<ForgotPasswordQuery, ForgotPasswordQueryVariables>;
export const GetBookingByDocument = gql`
    query GetBookingBy($input: GetBookingsByInput!) {
  getBookingsBy(input: $input) {
    ok
    error {
      message
      mainReason
    }
    bookings {
      ...BookingFragment
    }
    pagination {
      totalPages
      totalResults
    }
  }
}
    ${BookingFragmentFragmentDoc}`;

/**
 * __useGetBookingByQuery__
 *
 * To run a query within a React component, call `useGetBookingByQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookingByQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookingByQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetBookingByQuery(baseOptions: Apollo.QueryHookOptions<GetBookingByQuery, GetBookingByQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookingByQuery, GetBookingByQueryVariables>(GetBookingByDocument, options);
      }
export function useGetBookingByLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookingByQuery, GetBookingByQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookingByQuery, GetBookingByQueryVariables>(GetBookingByDocument, options);
        }
export type GetBookingByQueryHookResult = ReturnType<typeof useGetBookingByQuery>;
export type GetBookingByLazyQueryHookResult = ReturnType<typeof useGetBookingByLazyQuery>;
export type GetBookingByQueryResult = Apollo.QueryResult<GetBookingByQuery, GetBookingByQueryVariables>;
export const GetCarTypeDocument = gql`
    query getCarType($input: GetCarTypeInput!) {
  getCarType(input: $input) {
    ok
    error {
      mainReason
      message
    }
    carType {
      ...CarTypeFragment
    }
  }
}
    ${CarTypeFragmentFragmentDoc}`;

/**
 * __useGetCarTypeQuery__
 *
 * To run a query within a React component, call `useGetCarTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarTypeQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCarTypeQuery(baseOptions: Apollo.QueryHookOptions<GetCarTypeQuery, GetCarTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarTypeQuery, GetCarTypeQueryVariables>(GetCarTypeDocument, options);
      }
export function useGetCarTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarTypeQuery, GetCarTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarTypeQuery, GetCarTypeQueryVariables>(GetCarTypeDocument, options);
        }
export type GetCarTypeQueryHookResult = ReturnType<typeof useGetCarTypeQuery>;
export type GetCarTypeLazyQueryHookResult = ReturnType<typeof useGetCarTypeLazyQuery>;
export type GetCarTypeQueryResult = Apollo.QueryResult<GetCarTypeQuery, GetCarTypeQueryVariables>;
export const LoginDocument = gql`
    query Login($input: LoginInput!) {
  login(input: $input) {
    ok
    error {
      message
    }
    user {
      id
      name
      email
      role
    }
    accessToken
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const UserDocument = gql`
    query User {
  getDetailUser {
    ok
    error {
      message
    }
    user {
      ...UserFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;