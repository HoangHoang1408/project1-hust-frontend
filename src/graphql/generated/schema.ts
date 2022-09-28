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
  services?: Maybe<Array<Service>>;
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
  services?: InputMaybe<Array<ServiceInputType>>;
  startDate: Scalars['DateTime'];
  status: BookingStatus;
  totalPrice: Scalars['Float'];
  user?: InputMaybe<UserInputType>;
};

export enum BookingStatus {
  Cancel = 'CANCEL',
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
  manufactureYear: Scalars['Int'];
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
  manufactureYear: Scalars['Int'];
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
  Seat7 = 'SEAT7',
  Seat12 = 'SEAT12',
  Seat16 = 'SEAT16'
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
  serviceIds?: InputMaybe<Array<Scalars['ID']>>;
  startDate: Scalars['DateTime'];
};

export type CreateBookingOutput = {
  __typename?: 'CreateBookingOutput';
  bookingCode?: Maybe<Scalars['String']>;
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
};

export type CreateCarInput = {
  carBrand: CarBrand;
  carType?: InputMaybe<CarTypeEnum>;
  consumption: Scalars['Float'];
  engineType: EngineType;
  features: Array<Scalars['String']>;
  images?: InputMaybe<Array<StoredFileInputType>>;
  licensePlate: Scalars['String'];
  manufactureYear: Scalars['Int'];
  name: Scalars['String'];
  transmissionType: TransmissionType;
};

export type CreateCarOutput = {
  __typename?: 'CreateCarOutput';
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
};

export type CreateServiceInput = {
  description: Scalars['String'];
  perDay: Scalars['Boolean'];
  serviceName: Scalars['String'];
  servicePrice: Scalars['Float'];
};

export type CreateServiceOutput = {
  __typename?: 'CreateServiceOutput';
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
};

export type CustomError = {
  __typename?: 'CustomError';
  mainReason: Scalars['String'];
  message: Scalars['String'];
};

export type DayData = {
  __typename?: 'DayData';
  day: Scalars['DateTime'];
  status?: Maybe<BookingStatus>;
};

export type DeleteServiceInput = {
  id: Scalars['ID'];
};

export type DeleteServiceOutput = {
  __typename?: 'DeleteServiceOutput';
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
};

export enum EngineType {
  Electric = 'ELECTRIC',
  Gasoline = 'GASOLINE',
  Hibrid = 'HIBRID'
}

export type ForecastTableInput = {
  carType: CarTypeEnum;
  endDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
};

export type ForecastTableOutput = {
  __typename?: 'ForecastTableOutput';
  columnSummary?: Maybe<Array<Scalars['String']>>;
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
  tableData?: Maybe<Array<TableRowData>>;
};

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
  bookingCode?: InputMaybe<Scalars['String']>;
  bookingStatus?: InputMaybe<BookingStatus>;
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
  numOfCars?: Maybe<Scalars['Float']>;
  ok: Scalars['Boolean'];
};

export type GetCarTypesInput = {
  pagination: PaginationInput;
};

export type GetCarTypesOutput = {
  __typename?: 'GetCarTypesOutput';
  carTypes?: Maybe<Array<CarType>>;
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
  pagination?: Maybe<PaginationOutput>;
};

export type GetCarsByInput = {
  carBrand?: InputMaybe<CarBrand>;
  carType?: InputMaybe<CarTypeEnum>;
  licensePlate?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  pagination: PaginationInput;
};

export type GetCarsByOutput = {
  __typename?: 'GetCarsByOutput';
  cars?: Maybe<Array<Car>>;
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
  pagination?: Maybe<PaginationOutput>;
};

export type GetDetailUserOutput = {
  __typename?: 'GetDetailUserOutput';
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
  user: User;
};

export type GetServiceInput = {
  id: Scalars['ID'];
};

export type GetServiceOutput = {
  __typename?: 'GetServiceOutput';
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
  service?: Maybe<Service>;
};

export type GetServicesByInput = {
  pagination: PaginationInput;
  serviceName?: InputMaybe<Scalars['String']>;
};

export type GetServicesByOutput = {
  __typename?: 'GetServicesByOutput';
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
  pagination?: Maybe<PaginationOutput>;
  services?: Maybe<Array<Service>>;
};

export type GetUserByInput = {
  name?: InputMaybe<Scalars['String']>;
  pagination: PaginationInput;
  phoneNumber?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
};

export type GetUserByOutput = {
  __typename?: 'GetUserByOutput';
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
  pagination?: Maybe<PaginationOutput>;
  users?: Maybe<Array<User>>;
};

export type GetUserDetailInput = {
  useId: Scalars['ID'];
};

export type GetUserDetailOutput = {
  __typename?: 'GetUserDetailOutput';
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
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
  createService: CreateServiceOutput;
  deleteService: DeleteServiceOutput;
  signup: SignUpOutPut;
  updateBookingStatus: UpdateBookingStatusOutput;
  updateCar: UpdateCarOutput;
  updateCarType: UpdateCarTypeOutput;
  updateService: UpdateServiceOutput;
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


export type MutationCreateServiceArgs = {
  input: CreateServiceInput;
};


export type MutationDeleteServiceArgs = {
  input: DeleteServiceInput;
};


export type MutationSignupArgs = {
  input: SignUpInput;
};


export type MutationUpdateBookingStatusArgs = {
  input: UpdateBookingStatusInput;
};


export type MutationUpdateCarArgs = {
  input: UpdateCarInput;
};


export type MutationUpdateCarTypeArgs = {
  input: UpdateCarTypeInput;
};


export type MutationUpdateServiceArgs = {
  input: UpdateServiceInput;
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
  forecastTable: ForecastTableOutput;
  forgotPassword: ForgotPasswordOutput;
  getBookingDetail: GetBookingDetailOutput;
  getBookingsBy: GetBookingsByOutput;
  getCarDetail: GetCarDetailOutput;
  getCarType: GetCarTypeOutput;
  getCarTypes: GetCarTypesOutput;
  getCarsBy: GetCarsByOutput;
  getDetailUser: GetDetailUserOutput;
  getService: GetServiceOutput;
  getServices: GetServicesByOutput;
  getUserBy: GetUserByOutput;
  getUserDetail: GetUserDetailOutput;
  login: LoginOutPut;
  newAccessToken: NewAccessTokenOutput;
  verifyEmail: VerifyEmailOutput;
};


export type QueryCheckCarAvailableArgs = {
  input: CheckCarAvailableInput;
};


export type QueryForecastTableArgs = {
  input: ForecastTableInput;
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


export type QueryGetCarTypesArgs = {
  input: GetCarTypesInput;
};


export type QueryGetCarsByArgs = {
  input: GetCarsByInput;
};


export type QueryGetServiceArgs = {
  input: GetServiceInput;
};


export type QueryGetServicesArgs = {
  input: GetServicesByInput;
};


export type QueryGetUserByArgs = {
  input: GetUserByInput;
};


export type QueryGetUserDetailArgs = {
  input: GetUserDetailInput;
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

export type Service = {
  __typename?: 'Service';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  perDay: Scalars['Boolean'];
  serviceName: Scalars['String'];
  servicePrice: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type ServiceInputType = {
  description: Scalars['String'];
  perDay: Scalars['Boolean'];
  serviceName: Scalars['String'];
  servicePrice: Scalars['Float'];
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

export type TableRowData = {
  __typename?: 'TableRowData';
  car: Car;
  dayDatas: Array<DayData>;
  rowSumary: Scalars['String'];
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

export type UpdateCarInput = {
  carBrand?: InputMaybe<CarBrand>;
  carId: Scalars['ID'];
  carType?: InputMaybe<CarTypeEnum>;
  consumption?: InputMaybe<Scalars['Float']>;
  engineType?: InputMaybe<EngineType>;
  features?: InputMaybe<Array<Scalars['String']>>;
  images?: InputMaybe<Array<StoredFileInputType>>;
  licensePlate?: InputMaybe<Scalars['String']>;
  manufactureYear?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  transmissionType?: InputMaybe<TransmissionType>;
  vehicleStatus?: InputMaybe<VehicleStatusInputType>;
};

export type UpdateCarOutput = {
  __typename?: 'UpdateCarOutput';
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
};

export type UpdateCarTypeInput = {
  acceptedPayment: Array<Payment>;
  additionalDistancePrice?: InputMaybe<Scalars['Float']>;
  carType: CarTypeEnum;
  maxDistance?: InputMaybe<Scalars['Float']>;
  price: Scalars['Float'];
  procedures: ProcedureInputType;
};

export type UpdateCarTypeOutput = {
  __typename?: 'UpdateCarTypeOutput';
  error?: Maybe<CustomError>;
  ok: Scalars['Boolean'];
};

export type UpdateServiceInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  perDay?: InputMaybe<Scalars['Boolean']>;
  serviceName?: InputMaybe<Scalars['String']>;
  servicePrice?: InputMaybe<Scalars['Float']>;
};

export type UpdateServiceOutput = {
  __typename?: 'UpdateServiceOutput';
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

export type BookingFragmentFragment = { __typename?: 'Booking', id: string, createdAt: any, payment: Payment, status: BookingStatus, rating?: number | null, feedBack?: string | null, bookingCode: string, totalPrice: number, startDate: any, endDate: any, quantity: number, customerName: string, customerPhone: string, note?: string | null, homeDelivery: string, user?: { __typename?: 'User', id: string, name: string, avatar?: { __typename?: 'StoredFile', fileUrl: string, filePath: string } | null } | null, carType: { __typename?: 'CarType', carType: CarTypeEnum, price: number, maxDistance?: number | null, additionalDistancePrice?: number | null, acceptedPayment: Array<Payment>, procedures: { __typename?: 'Procedure', mortgateProperty?: Array<string> | null, mortgatePaper?: Array<string> | null, verificationPaper?: Array<string> | null } }, services?: Array<{ __typename?: 'Service', id: string, serviceName: string, servicePrice: number, description: string, perDay: boolean }> | null };

export type CarFragmentFragment = { __typename?: 'Car', id: string, carBrand: CarBrand, transmissionType: TransmissionType, consumption: number, features: Array<string>, name: string, rating: number, engineType: EngineType, manufactureYear: number, licensePlate: string, carType: { __typename?: 'CarType', carType: CarTypeEnum, price: number, maxDistance?: number | null, additionalDistancePrice?: number | null, acceptedPayment: Array<Payment>, procedures: { __typename?: 'Procedure', mortgateProperty?: Array<string> | null, mortgatePaper?: Array<string> | null, verificationPaper?: Array<string> | null } }, images?: Array<{ __typename?: 'StoredFile', fileUrl: string, filePath: string }> | null, vehicleStatus: { __typename?: 'VehicleStatus', booked: boolean, goodCondition: boolean } };

export type CarTypeFragmentFragment = { __typename?: 'CarType', carType: CarTypeEnum, price: number, maxDistance?: number | null, additionalDistancePrice?: number | null, acceptedPayment: Array<Payment>, procedures: { __typename?: 'Procedure', mortgateProperty?: Array<string> | null, mortgatePaper?: Array<string> | null, verificationPaper?: Array<string> | null } };

export type ServiceFragmentFragment = { __typename?: 'Service', id: string, serviceName: string, servicePrice: number, description: string, perDay: boolean };

export type UserFragmentFragment = { __typename?: 'User', id: string, email: string, verified: boolean, name: string, role: UserRole, address?: string | null, phoneNumber?: string | null, avatar?: { __typename?: 'StoredFile', fileUrl: string, filePath: string } | null };

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

export type CreateCarMutationVariables = Exact<{
  input: CreateCarInput;
}>;


export type CreateCarMutation = { __typename?: 'Mutation', createCar: { __typename?: 'CreateCarOutput', ok: boolean, error?: { __typename?: 'CustomError', mainReason: string, message: string } | null } };

export type CreateServiceMutationVariables = Exact<{
  input: CreateServiceInput;
}>;


export type CreateServiceMutation = { __typename?: 'Mutation', createService: { __typename?: 'CreateServiceOutput', ok: boolean, error?: { __typename?: 'CustomError', mainReason: string, message: string } | null } };

export type DeleteServiceMutationVariables = Exact<{
  input: DeleteServiceInput;
}>;


export type DeleteServiceMutation = { __typename?: 'Mutation', deleteService: { __typename?: 'DeleteServiceOutput', ok: boolean, error?: { __typename?: 'CustomError', mainReason: string, message: string } | null } };

export type ResetPasswordMutationVariables = Exact<{
  input: VerifyForgotPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', verifyForgotPassword: { __typename?: 'VerifyForgotPasswordOutput', ok: boolean, error?: { __typename?: 'CustomError', message: string } | null } };

export type SignupMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'SignUpOutPut', ok: boolean, error?: { __typename?: 'CustomError', message: string } | null } };

export type UpdateBookingStatusMutationVariables = Exact<{
  input: UpdateBookingStatusInput;
}>;


export type UpdateBookingStatusMutation = { __typename?: 'Mutation', updateBookingStatus: { __typename?: 'UpdateBookingStatusOutput', ok: boolean, error?: { __typename?: 'CustomError', mainReason: string, message: string } | null } };

export type UpdateCarMutationVariables = Exact<{
  input: UpdateCarInput;
}>;


export type UpdateCarMutation = { __typename?: 'Mutation', updateCar: { __typename?: 'UpdateCarOutput', ok: boolean, error?: { __typename?: 'CustomError', mainReason: string, message: string } | null } };

export type UpdateCarTypeMutationVariables = Exact<{
  input: UpdateCarTypeInput;
}>;


export type UpdateCarTypeMutation = { __typename?: 'Mutation', updateCarType: { __typename?: 'UpdateCarTypeOutput', ok: boolean, error?: { __typename?: 'CustomError', mainReason: string, message: string } | null } };

export type UpdateServiceMutationVariables = Exact<{
  input: UpdateServiceInput;
}>;


export type UpdateServiceMutation = { __typename?: 'Mutation', updateService: { __typename?: 'UpdateServiceOutput', ok: boolean, error?: { __typename?: 'CustomError', mainReason: string, message: string } | null } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UpdateUserOutput', ok: boolean, error?: { __typename?: 'CustomError', mainReason: string, message: string } | null } };

export type BookingDetailQueryVariables = Exact<{
  input: GetBookingDetailInput;
}>;


export type BookingDetailQuery = { __typename?: 'Query', getBookingDetail: { __typename?: 'GetBookingDetailOutput', ok: boolean, error?: { __typename?: 'CustomError', message: string } | null, booking?: { __typename?: 'Booking', id: string, createdAt: any, payment: Payment, status: BookingStatus, rating?: number | null, feedBack?: string | null, bookingCode: string, totalPrice: number, startDate: any, endDate: any, quantity: number, customerName: string, customerPhone: string, note?: string | null, homeDelivery: string, user?: { __typename?: 'User', id: string, name: string, avatar?: { __typename?: 'StoredFile', fileUrl: string, filePath: string } | null } | null, carType: { __typename?: 'CarType', carType: CarTypeEnum, price: number, maxDistance?: number | null, additionalDistancePrice?: number | null, acceptedPayment: Array<Payment>, procedures: { __typename?: 'Procedure', mortgateProperty?: Array<string> | null, mortgatePaper?: Array<string> | null, verificationPaper?: Array<string> | null } }, services?: Array<{ __typename?: 'Service', id: string, serviceName: string, servicePrice: number, description: string, perDay: boolean }> | null } | null } };

export type CarDetailQueryVariables = Exact<{
  input: GetCarDetailInput;
}>;


export type CarDetailQuery = { __typename?: 'Query', getCarDetail: { __typename?: 'GetCarDetailOutput', ok: boolean, error?: { __typename?: 'CustomError', mainReason: string, message: string } | null, car?: { __typename?: 'Car', id: string, carBrand: CarBrand, transmissionType: TransmissionType, consumption: number, features: Array<string>, name: string, rating: number, engineType: EngineType, manufactureYear: number, licensePlate: string, carType: { __typename?: 'CarType', carType: CarTypeEnum, price: number, maxDistance?: number | null, additionalDistancePrice?: number | null, acceptedPayment: Array<Payment>, procedures: { __typename?: 'Procedure', mortgateProperty?: Array<string> | null, mortgatePaper?: Array<string> | null, verificationPaper?: Array<string> | null } }, images?: Array<{ __typename?: 'StoredFile', fileUrl: string, filePath: string }> | null, vehicleStatus: { __typename?: 'VehicleStatus', booked: boolean, goodCondition: boolean } } | null } };

export type CheckCarAvailableQueryVariables = Exact<{
  input: CheckCarAvailableInput;
}>;


export type CheckCarAvailableQuery = { __typename?: 'Query', checkCarAvailable: { __typename?: 'CheckCarAvailableOutput', ok: boolean, available?: boolean | null, error?: { __typename?: 'CustomError', mainReason: string, message: string } | null } };

export type ForecastTableQueryVariables = Exact<{
  input: ForecastTableInput;
}>;


export type ForecastTableQuery = { __typename?: 'Query', forecastTable: { __typename?: 'ForecastTableOutput', ok: boolean, columnSummary?: Array<string> | null, error?: { __typename?: 'CustomError', mainReason: string, message: string } | null, tableData?: Array<{ __typename?: 'TableRowData', rowSumary: string, car: { __typename?: 'Car', id: string, name: string, licensePlate: string }, dayDatas: Array<{ __typename?: 'DayData', status?: BookingStatus | null, day: any }> }> | null } };

export type ForgotPasswordQueryVariables = Exact<{
  input: ForgotPasswordInput;
}>;


export type ForgotPasswordQuery = { __typename?: 'Query', forgotPassword: { __typename?: 'ForgotPasswordOutput', ok: boolean, error?: { __typename?: 'CustomError', message: string, mainReason: string } | null } };

export type GetBookingByQueryVariables = Exact<{
  input: GetBookingsByInput;
}>;


export type GetBookingByQuery = { __typename?: 'Query', getBookingsBy: { __typename?: 'GetBookingsByOutput', ok: boolean, error?: { __typename?: 'CustomError', message: string, mainReason: string } | null, bookings?: Array<{ __typename?: 'Booking', id: string, createdAt: any, payment: Payment, status: BookingStatus, rating?: number | null, feedBack?: string | null, bookingCode: string, totalPrice: number, startDate: any, endDate: any, quantity: number, customerName: string, customerPhone: string, note?: string | null, homeDelivery: string, user?: { __typename?: 'User', id: string, name: string, avatar?: { __typename?: 'StoredFile', fileUrl: string, filePath: string } | null } | null, carType: { __typename?: 'CarType', carType: CarTypeEnum, price: number, maxDistance?: number | null, additionalDistancePrice?: number | null, acceptedPayment: Array<Payment>, procedures: { __typename?: 'Procedure', mortgateProperty?: Array<string> | null, mortgatePaper?: Array<string> | null, verificationPaper?: Array<string> | null } }, services?: Array<{ __typename?: 'Service', id: string, serviceName: string, servicePrice: number, description: string, perDay: boolean }> | null }> | null, pagination?: { __typename?: 'PaginationOutput', totalPages?: number | null, totalResults?: number | null } | null } };

export type GetCarTypeQueryVariables = Exact<{
  input: GetCarTypeInput;
}>;


export type GetCarTypeQuery = { __typename?: 'Query', getCarType: { __typename?: 'GetCarTypeOutput', ok: boolean, numOfCars?: number | null, error?: { __typename?: 'CustomError', mainReason: string, message: string } | null, carType?: { __typename?: 'CarType', carType: CarTypeEnum, price: number, maxDistance?: number | null, additionalDistancePrice?: number | null, acceptedPayment: Array<Payment>, procedures: { __typename?: 'Procedure', mortgateProperty?: Array<string> | null, mortgatePaper?: Array<string> | null, verificationPaper?: Array<string> | null } } | null } };

export type GetCarTypesQueryVariables = Exact<{
  input: GetCarTypesInput;
}>;


export type GetCarTypesQuery = { __typename?: 'Query', getCarTypes: { __typename?: 'GetCarTypesOutput', ok: boolean, error?: { __typename?: 'CustomError', mainReason: string, message: string } | null, pagination?: { __typename?: 'PaginationOutput', totalPages?: number | null, totalResults?: number | null } | null, carTypes?: Array<{ __typename?: 'CarType', carType: CarTypeEnum, price: number, maxDistance?: number | null, additionalDistancePrice?: number | null, acceptedPayment: Array<Payment>, procedures: { __typename?: 'Procedure', mortgateProperty?: Array<string> | null, mortgatePaper?: Array<string> | null, verificationPaper?: Array<string> | null } }> | null } };

export type GetCarsByQueryVariables = Exact<{
  input: GetCarsByInput;
}>;


export type GetCarsByQuery = { __typename?: 'Query', getCarsBy: { __typename?: 'GetCarsByOutput', ok: boolean, error?: { __typename?: 'CustomError', mainReason: string, message: string } | null, cars?: Array<{ __typename?: 'Car', id: string, carBrand: CarBrand, transmissionType: TransmissionType, consumption: number, features: Array<string>, name: string, rating: number, engineType: EngineType, manufactureYear: number, licensePlate: string, carType: { __typename?: 'CarType', carType: CarTypeEnum, price: number, maxDistance?: number | null, additionalDistancePrice?: number | null, acceptedPayment: Array<Payment>, procedures: { __typename?: 'Procedure', mortgateProperty?: Array<string> | null, mortgatePaper?: Array<string> | null, verificationPaper?: Array<string> | null } }, images?: Array<{ __typename?: 'StoredFile', fileUrl: string, filePath: string }> | null, vehicleStatus: { __typename?: 'VehicleStatus', booked: boolean, goodCondition: boolean } }> | null, pagination?: { __typename?: 'PaginationOutput', totalPages?: number | null, totalResults?: number | null } | null } };

export type GetServiceQueryVariables = Exact<{
  input: GetServiceInput;
}>;


export type GetServiceQuery = { __typename?: 'Query', getService: { __typename?: 'GetServiceOutput', ok: boolean, error?: { __typename?: 'CustomError', mainReason: string, message: string } | null, service?: { __typename?: 'Service', id: string, serviceName: string, servicePrice: number, description: string, perDay: boolean } | null } };

export type GetServicesByQueryVariables = Exact<{
  input: GetServicesByInput;
}>;


export type GetServicesByQuery = { __typename?: 'Query', getServices: { __typename?: 'GetServicesByOutput', ok: boolean, error?: { __typename?: 'CustomError', mainReason: string, message: string } | null, pagination?: { __typename?: 'PaginationOutput', totalPages?: number | null, totalResults?: number | null } | null, services?: Array<{ __typename?: 'Service', id: string, serviceName: string, servicePrice: number, description: string, perDay: boolean }> | null } };

export type GetUserByQueryVariables = Exact<{
  input: GetUserByInput;
}>;


export type GetUserByQuery = { __typename?: 'Query', getUserBy: { __typename?: 'GetUserByOutput', ok: boolean, error?: { __typename?: 'CustomError', mainReason: string, message: string } | null, users?: Array<{ __typename?: 'User', id: string, email: string, verified: boolean, name: string, role: UserRole, address?: string | null, phoneNumber?: string | null, avatar?: { __typename?: 'StoredFile', fileUrl: string, filePath: string } | null }> | null, pagination?: { __typename?: 'PaginationOutput', totalPages?: number | null, totalResults?: number | null } | null } };

export type GetUserDetailQueryVariables = Exact<{
  input: GetUserDetailInput;
}>;


export type GetUserDetailQuery = { __typename?: 'Query', getUserDetail: { __typename?: 'GetUserDetailOutput', ok: boolean, error?: { __typename?: 'CustomError', message: string, mainReason: string } | null, user?: { __typename?: 'User', id: string, email: string, verified: boolean, name: string, role: UserRole, address?: string | null, phoneNumber?: string | null, avatar?: { __typename?: 'StoredFile', fileUrl: string, filePath: string } | null } | null } };

export type LoginQueryVariables = Exact<{
  input: LoginInput;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'LoginOutPut', ok: boolean, accessToken?: string | null, error?: { __typename?: 'CustomError', message: string } | null, user?: { __typename?: 'SimpleUser', id: string, name: string, email: string, role: UserRole } | null } };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', getDetailUser: { __typename?: 'GetDetailUserOutput', ok: boolean, error?: { __typename?: 'CustomError', message: string } | null, user: { __typename?: 'User', id: string, email: string, verified: boolean, name: string, role: UserRole, address?: string | null, phoneNumber?: string | null, avatar?: { __typename?: 'StoredFile', fileUrl: string, filePath: string } | null } } };

export type VerifyEmailQueryVariables = Exact<{
  input: VerifyEmailInput;
}>;


export type VerifyEmailQuery = { __typename?: 'Query', verifyEmail: { __typename?: 'VerifyEmailOutput', ok: boolean, error?: { __typename?: 'CustomError', mainReason: string, message: string } | null } };

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
export const ServiceFragmentFragmentDoc = gql`
    fragment ServiceFragment on Service {
  id
  serviceName
  servicePrice
  description
  perDay
}
    `;
export const BookingFragmentFragmentDoc = gql`
    fragment BookingFragment on Booking {
  id
  createdAt
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
  services {
    ...ServiceFragment
  }
}
    ${CarTypeFragmentFragmentDoc}
${ServiceFragmentFragmentDoc}`;
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
  licensePlate
  vehicleStatus {
    booked
    goodCondition
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
}
    `;
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
export const CreateCarDocument = gql`
    mutation CreateCar($input: CreateCarInput!) {
  createCar(input: $input) {
    ok
    error {
      mainReason
      message
    }
  }
}
    `;
export type CreateCarMutationFn = Apollo.MutationFunction<CreateCarMutation, CreateCarMutationVariables>;

/**
 * __useCreateCarMutation__
 *
 * To run a mutation, you first call `useCreateCarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCarMutation, { data, loading, error }] = useCreateCarMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCarMutation(baseOptions?: Apollo.MutationHookOptions<CreateCarMutation, CreateCarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCarMutation, CreateCarMutationVariables>(CreateCarDocument, options);
      }
export type CreateCarMutationHookResult = ReturnType<typeof useCreateCarMutation>;
export type CreateCarMutationResult = Apollo.MutationResult<CreateCarMutation>;
export type CreateCarMutationOptions = Apollo.BaseMutationOptions<CreateCarMutation, CreateCarMutationVariables>;
export const CreateServiceDocument = gql`
    mutation CreateService($input: CreateServiceInput!) {
  createService(input: $input) {
    ok
    error {
      mainReason
      message
    }
  }
}
    `;
export type CreateServiceMutationFn = Apollo.MutationFunction<CreateServiceMutation, CreateServiceMutationVariables>;

/**
 * __useCreateServiceMutation__
 *
 * To run a mutation, you first call `useCreateServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServiceMutation, { data, loading, error }] = useCreateServiceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateServiceMutation(baseOptions?: Apollo.MutationHookOptions<CreateServiceMutation, CreateServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateServiceMutation, CreateServiceMutationVariables>(CreateServiceDocument, options);
      }
export type CreateServiceMutationHookResult = ReturnType<typeof useCreateServiceMutation>;
export type CreateServiceMutationResult = Apollo.MutationResult<CreateServiceMutation>;
export type CreateServiceMutationOptions = Apollo.BaseMutationOptions<CreateServiceMutation, CreateServiceMutationVariables>;
export const DeleteServiceDocument = gql`
    mutation DeleteService($input: DeleteServiceInput!) {
  deleteService(input: $input) {
    ok
    error {
      mainReason
      message
    }
  }
}
    `;
export type DeleteServiceMutationFn = Apollo.MutationFunction<DeleteServiceMutation, DeleteServiceMutationVariables>;

/**
 * __useDeleteServiceMutation__
 *
 * To run a mutation, you first call `useDeleteServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteServiceMutation, { data, loading, error }] = useDeleteServiceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteServiceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteServiceMutation, DeleteServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteServiceMutation, DeleteServiceMutationVariables>(DeleteServiceDocument, options);
      }
export type DeleteServiceMutationHookResult = ReturnType<typeof useDeleteServiceMutation>;
export type DeleteServiceMutationResult = Apollo.MutationResult<DeleteServiceMutation>;
export type DeleteServiceMutationOptions = Apollo.BaseMutationOptions<DeleteServiceMutation, DeleteServiceMutationVariables>;
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
export const UpdateBookingStatusDocument = gql`
    mutation UpdateBookingStatus($input: UpdateBookingStatusInput!) {
  updateBookingStatus(input: $input) {
    ok
    error {
      mainReason
      message
    }
  }
}
    `;
export type UpdateBookingStatusMutationFn = Apollo.MutationFunction<UpdateBookingStatusMutation, UpdateBookingStatusMutationVariables>;

/**
 * __useUpdateBookingStatusMutation__
 *
 * To run a mutation, you first call `useUpdateBookingStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBookingStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBookingStatusMutation, { data, loading, error }] = useUpdateBookingStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBookingStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBookingStatusMutation, UpdateBookingStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBookingStatusMutation, UpdateBookingStatusMutationVariables>(UpdateBookingStatusDocument, options);
      }
export type UpdateBookingStatusMutationHookResult = ReturnType<typeof useUpdateBookingStatusMutation>;
export type UpdateBookingStatusMutationResult = Apollo.MutationResult<UpdateBookingStatusMutation>;
export type UpdateBookingStatusMutationOptions = Apollo.BaseMutationOptions<UpdateBookingStatusMutation, UpdateBookingStatusMutationVariables>;
export const UpdateCarDocument = gql`
    mutation UpdateCar($input: UpdateCarInput!) {
  updateCar(input: $input) {
    ok
    error {
      mainReason
      message
    }
  }
}
    `;
export type UpdateCarMutationFn = Apollo.MutationFunction<UpdateCarMutation, UpdateCarMutationVariables>;

/**
 * __useUpdateCarMutation__
 *
 * To run a mutation, you first call `useUpdateCarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCarMutation, { data, loading, error }] = useUpdateCarMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCarMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCarMutation, UpdateCarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCarMutation, UpdateCarMutationVariables>(UpdateCarDocument, options);
      }
export type UpdateCarMutationHookResult = ReturnType<typeof useUpdateCarMutation>;
export type UpdateCarMutationResult = Apollo.MutationResult<UpdateCarMutation>;
export type UpdateCarMutationOptions = Apollo.BaseMutationOptions<UpdateCarMutation, UpdateCarMutationVariables>;
export const UpdateCarTypeDocument = gql`
    mutation UpdateCarType($input: UpdateCarTypeInput!) {
  updateCarType(input: $input) {
    ok
    error {
      mainReason
      message
    }
  }
}
    `;
export type UpdateCarTypeMutationFn = Apollo.MutationFunction<UpdateCarTypeMutation, UpdateCarTypeMutationVariables>;

/**
 * __useUpdateCarTypeMutation__
 *
 * To run a mutation, you first call `useUpdateCarTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCarTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCarTypeMutation, { data, loading, error }] = useUpdateCarTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCarTypeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCarTypeMutation, UpdateCarTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCarTypeMutation, UpdateCarTypeMutationVariables>(UpdateCarTypeDocument, options);
      }
export type UpdateCarTypeMutationHookResult = ReturnType<typeof useUpdateCarTypeMutation>;
export type UpdateCarTypeMutationResult = Apollo.MutationResult<UpdateCarTypeMutation>;
export type UpdateCarTypeMutationOptions = Apollo.BaseMutationOptions<UpdateCarTypeMutation, UpdateCarTypeMutationVariables>;
export const UpdateServiceDocument = gql`
    mutation UpdateService($input: UpdateServiceInput!) {
  updateService(input: $input) {
    ok
    error {
      mainReason
      message
    }
  }
}
    `;
export type UpdateServiceMutationFn = Apollo.MutationFunction<UpdateServiceMutation, UpdateServiceMutationVariables>;

/**
 * __useUpdateServiceMutation__
 *
 * To run a mutation, you first call `useUpdateServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateServiceMutation, { data, loading, error }] = useUpdateServiceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateServiceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateServiceMutation, UpdateServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateServiceMutation, UpdateServiceMutationVariables>(UpdateServiceDocument, options);
      }
export type UpdateServiceMutationHookResult = ReturnType<typeof useUpdateServiceMutation>;
export type UpdateServiceMutationResult = Apollo.MutationResult<UpdateServiceMutation>;
export type UpdateServiceMutationOptions = Apollo.BaseMutationOptions<UpdateServiceMutation, UpdateServiceMutationVariables>;
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
export const CarDetailDocument = gql`
    query CarDetail($input: GetCarDetailInput!) {
  getCarDetail(input: $input) {
    ok
    error {
      mainReason
      message
    }
    car {
      ...CarFragment
    }
  }
}
    ${CarFragmentFragmentDoc}`;

/**
 * __useCarDetailQuery__
 *
 * To run a query within a React component, call `useCarDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useCarDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCarDetailQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCarDetailQuery(baseOptions: Apollo.QueryHookOptions<CarDetailQuery, CarDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CarDetailQuery, CarDetailQueryVariables>(CarDetailDocument, options);
      }
export function useCarDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CarDetailQuery, CarDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CarDetailQuery, CarDetailQueryVariables>(CarDetailDocument, options);
        }
export type CarDetailQueryHookResult = ReturnType<typeof useCarDetailQuery>;
export type CarDetailLazyQueryHookResult = ReturnType<typeof useCarDetailLazyQuery>;
export type CarDetailQueryResult = Apollo.QueryResult<CarDetailQuery, CarDetailQueryVariables>;
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
export const ForecastTableDocument = gql`
    query ForecastTable($input: ForecastTableInput!) {
  forecastTable(input: $input) {
    ok
    error {
      mainReason
      message
    }
    tableData {
      car {
        id
        name
        licensePlate
      }
      dayDatas {
        status
        day
      }
      rowSumary
    }
    columnSummary
  }
}
    `;

/**
 * __useForecastTableQuery__
 *
 * To run a query within a React component, call `useForecastTableQuery` and pass it any options that fit your needs.
 * When your component renders, `useForecastTableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useForecastTableQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useForecastTableQuery(baseOptions: Apollo.QueryHookOptions<ForecastTableQuery, ForecastTableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ForecastTableQuery, ForecastTableQueryVariables>(ForecastTableDocument, options);
      }
export function useForecastTableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ForecastTableQuery, ForecastTableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ForecastTableQuery, ForecastTableQueryVariables>(ForecastTableDocument, options);
        }
export type ForecastTableQueryHookResult = ReturnType<typeof useForecastTableQuery>;
export type ForecastTableLazyQueryHookResult = ReturnType<typeof useForecastTableLazyQuery>;
export type ForecastTableQueryResult = Apollo.QueryResult<ForecastTableQuery, ForecastTableQueryVariables>;
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
    numOfCars
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
export const GetCarTypesDocument = gql`
    query GetCarTypes($input: GetCarTypesInput!) {
  getCarTypes(input: $input) {
    ok
    error {
      mainReason
      message
    }
    pagination {
      totalPages
      totalResults
    }
    carTypes {
      ...CarTypeFragment
    }
  }
}
    ${CarTypeFragmentFragmentDoc}`;

/**
 * __useGetCarTypesQuery__
 *
 * To run a query within a React component, call `useGetCarTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarTypesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCarTypesQuery(baseOptions: Apollo.QueryHookOptions<GetCarTypesQuery, GetCarTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarTypesQuery, GetCarTypesQueryVariables>(GetCarTypesDocument, options);
      }
export function useGetCarTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarTypesQuery, GetCarTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarTypesQuery, GetCarTypesQueryVariables>(GetCarTypesDocument, options);
        }
export type GetCarTypesQueryHookResult = ReturnType<typeof useGetCarTypesQuery>;
export type GetCarTypesLazyQueryHookResult = ReturnType<typeof useGetCarTypesLazyQuery>;
export type GetCarTypesQueryResult = Apollo.QueryResult<GetCarTypesQuery, GetCarTypesQueryVariables>;
export const GetCarsByDocument = gql`
    query GetCarsBy($input: GetCarsByInput!) {
  getCarsBy(input: $input) {
    ok
    error {
      mainReason
      message
    }
    cars {
      ...CarFragment
    }
    pagination {
      totalPages
      totalResults
    }
  }
}
    ${CarFragmentFragmentDoc}`;

/**
 * __useGetCarsByQuery__
 *
 * To run a query within a React component, call `useGetCarsByQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarsByQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarsByQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCarsByQuery(baseOptions: Apollo.QueryHookOptions<GetCarsByQuery, GetCarsByQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarsByQuery, GetCarsByQueryVariables>(GetCarsByDocument, options);
      }
export function useGetCarsByLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarsByQuery, GetCarsByQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarsByQuery, GetCarsByQueryVariables>(GetCarsByDocument, options);
        }
export type GetCarsByQueryHookResult = ReturnType<typeof useGetCarsByQuery>;
export type GetCarsByLazyQueryHookResult = ReturnType<typeof useGetCarsByLazyQuery>;
export type GetCarsByQueryResult = Apollo.QueryResult<GetCarsByQuery, GetCarsByQueryVariables>;
export const GetServiceDocument = gql`
    query GetService($input: GetServiceInput!) {
  getService(input: $input) {
    ok
    error {
      mainReason
      message
    }
    service {
      ...ServiceFragment
    }
  }
}
    ${ServiceFragmentFragmentDoc}`;

/**
 * __useGetServiceQuery__
 *
 * To run a query within a React component, call `useGetServiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetServiceQuery(baseOptions: Apollo.QueryHookOptions<GetServiceQuery, GetServiceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServiceQuery, GetServiceQueryVariables>(GetServiceDocument, options);
      }
export function useGetServiceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServiceQuery, GetServiceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServiceQuery, GetServiceQueryVariables>(GetServiceDocument, options);
        }
export type GetServiceQueryHookResult = ReturnType<typeof useGetServiceQuery>;
export type GetServiceLazyQueryHookResult = ReturnType<typeof useGetServiceLazyQuery>;
export type GetServiceQueryResult = Apollo.QueryResult<GetServiceQuery, GetServiceQueryVariables>;
export const GetServicesByDocument = gql`
    query GetServicesBy($input: GetServicesByInput!) {
  getServices(input: $input) {
    ok
    error {
      mainReason
      message
    }
    pagination {
      totalPages
      totalResults
    }
    services {
      ...ServiceFragment
    }
  }
}
    ${ServiceFragmentFragmentDoc}`;

/**
 * __useGetServicesByQuery__
 *
 * To run a query within a React component, call `useGetServicesByQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServicesByQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServicesByQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetServicesByQuery(baseOptions: Apollo.QueryHookOptions<GetServicesByQuery, GetServicesByQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServicesByQuery, GetServicesByQueryVariables>(GetServicesByDocument, options);
      }
export function useGetServicesByLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServicesByQuery, GetServicesByQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServicesByQuery, GetServicesByQueryVariables>(GetServicesByDocument, options);
        }
export type GetServicesByQueryHookResult = ReturnType<typeof useGetServicesByQuery>;
export type GetServicesByLazyQueryHookResult = ReturnType<typeof useGetServicesByLazyQuery>;
export type GetServicesByQueryResult = Apollo.QueryResult<GetServicesByQuery, GetServicesByQueryVariables>;
export const GetUserByDocument = gql`
    query GetUserBy($input: GetUserByInput!) {
  getUserBy(input: $input) {
    ok
    error {
      mainReason
      message
    }
    users {
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
    }
    pagination {
      totalPages
      totalResults
    }
  }
}
    `;

/**
 * __useGetUserByQuery__
 *
 * To run a query within a React component, call `useGetUserByQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUserByQuery(baseOptions: Apollo.QueryHookOptions<GetUserByQuery, GetUserByQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByQuery, GetUserByQueryVariables>(GetUserByDocument, options);
      }
export function useGetUserByLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByQuery, GetUserByQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByQuery, GetUserByQueryVariables>(GetUserByDocument, options);
        }
export type GetUserByQueryHookResult = ReturnType<typeof useGetUserByQuery>;
export type GetUserByLazyQueryHookResult = ReturnType<typeof useGetUserByLazyQuery>;
export type GetUserByQueryResult = Apollo.QueryResult<GetUserByQuery, GetUserByQueryVariables>;
export const GetUserDetailDocument = gql`
    query GetUserDetail($input: GetUserDetailInput!) {
  getUserDetail(input: $input) {
    ok
    error {
      message
      mainReason
    }
    user {
      ...UserFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useGetUserDetailQuery__
 *
 * To run a query within a React component, call `useGetUserDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDetailQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUserDetailQuery(baseOptions: Apollo.QueryHookOptions<GetUserDetailQuery, GetUserDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserDetailQuery, GetUserDetailQueryVariables>(GetUserDetailDocument, options);
      }
export function useGetUserDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserDetailQuery, GetUserDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserDetailQuery, GetUserDetailQueryVariables>(GetUserDetailDocument, options);
        }
export type GetUserDetailQueryHookResult = ReturnType<typeof useGetUserDetailQuery>;
export type GetUserDetailLazyQueryHookResult = ReturnType<typeof useGetUserDetailLazyQuery>;
export type GetUserDetailQueryResult = Apollo.QueryResult<GetUserDetailQuery, GetUserDetailQueryVariables>;
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
export const VerifyEmailDocument = gql`
    query VerifyEmail($input: VerifyEmailInput!) {
  verifyEmail(input: $input) {
    ok
    error {
      mainReason
      message
    }
  }
}
    `;

/**
 * __useVerifyEmailQuery__
 *
 * To run a query within a React component, call `useVerifyEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyEmailQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyEmailQuery(baseOptions: Apollo.QueryHookOptions<VerifyEmailQuery, VerifyEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VerifyEmailQuery, VerifyEmailQueryVariables>(VerifyEmailDocument, options);
      }
export function useVerifyEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VerifyEmailQuery, VerifyEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VerifyEmailQuery, VerifyEmailQueryVariables>(VerifyEmailDocument, options);
        }
export type VerifyEmailQueryHookResult = ReturnType<typeof useVerifyEmailQuery>;
export type VerifyEmailLazyQueryHookResult = ReturnType<typeof useVerifyEmailLazyQuery>;
export type VerifyEmailQueryResult = Apollo.QueryResult<VerifyEmailQuery, VerifyEmailQueryVariables>;