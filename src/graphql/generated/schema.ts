import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
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
  __typename?: "Booking";
  bookingCode: Scalars["String"];
  car?: Maybe<Car>;
  createdAt: Scalars["DateTime"];
  endDate: Scalars["DateTime"];
  feedBack?: Maybe<Scalars["String"]>;
  homeDelivery?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  motorBike?: Maybe<MotorBike>;
  note?: Maybe<Scalars["String"]>;
  payment: Payment;
  rating?: Maybe<Scalars["Float"]>;
  startDate: Scalars["DateTime"];
  status: BookingStatus;
  totalPrice: Scalars["Float"];
  updatedAt: Scalars["DateTime"];
  user?: Maybe<User>;
  vehicleType: VehicleType;
};

export type BookingInputType = {
  bookingCode: Scalars["String"];
  car?: InputMaybe<CarInputType>;
  endDate: Scalars["DateTime"];
  feedBack?: InputMaybe<Scalars["String"]>;
  homeDelivery?: InputMaybe<Scalars["String"]>;
  motorBike?: InputMaybe<MotorBikeInputType>;
  note?: InputMaybe<Scalars["String"]>;
  payment: Payment;
  rating?: InputMaybe<Scalars["Float"]>;
  startDate: Scalars["DateTime"];
  status: BookingStatus;
  totalPrice: Scalars["Float"];
  user?: InputMaybe<UserInputType>;
  vehicleType: VehicleType;
};

export enum BookingStatus {
  Finished = "FINISHED",
  Pending = "PENDING",
  VehicleTaken = "VEHICLE_TAKEN",
}

export type Car = {
  __typename?: "Car";
  acceptedPayment: Array<Payment>;
  additionalDistancePrice: Scalars["Float"];
  bookings?: Maybe<Array<Booking>>;
  carBrand: CarBrand;
  carType: CarType;
  consumption: Scalars["Float"];
  createdAt: Scalars["DateTime"];
  engineType: EngineType;
  features: Array<Scalars["String"]>;
  id: Scalars["ID"];
  images?: Maybe<Array<StoredFile>>;
  manufactureYear: Scalars["Float"];
  maxDistance?: Maybe<Scalars["Float"]>;
  name: Scalars["String"];
  price: Scalars["Float"];
  procedures: Procedure;
  rating: Scalars["Float"];
  totalQuantity: Scalars["Float"];
  transmissionType: TransmissionType;
  updatedAt: Scalars["DateTime"];
  vehicleStatuses: Array<VehicleStatus>;
};

export enum CarBrand {
  Ford = "FORD",
  Honda = "HONDA",
  Huyndai = "HUYNDAI",
  Nissan = "NISSAN",
  Suzuki = "SUZUKI",
  Toyota = "TOYOTA",
  Vinfast = "VINFAST",
  Volvo = "VOLVO",
}

export type CarInputType = {
  acceptedPayment: Array<Payment>;
  additionalDistancePrice: Scalars["Float"];
  bookings?: InputMaybe<Array<BookingInputType>>;
  carBrand: CarBrand;
  carType: CarType;
  consumption: Scalars["Float"];
  engineType: EngineType;
  features: Array<Scalars["String"]>;
  images?: InputMaybe<Array<StoredFileInputType>>;
  manufactureYear: Scalars["Float"];
  maxDistance?: InputMaybe<Scalars["Float"]>;
  name: Scalars["String"];
  price: Scalars["Float"];
  procedures: ProcedureInputType;
  rating: Scalars["Float"];
  totalQuantity: Scalars["Float"];
  transmissionType: TransmissionType;
  vehicleStatuses: Array<VehicleStatusInputType>;
};

export enum CarType {
  LuxuryCar = "LUXURY_CAR",
  PickupTruck = "PICKUP_TRUCK",
  Seat7 = "SEAT7",
  Seat45 = "SEAT45",
}

export type ChangePasswordInput = {
  confirmPassword: Scalars["String"];
  currentPassword: Scalars["String"];
  password: Scalars["String"];
};

export type ChangePasswordOutput = {
  __typename?: "ChangePasswordOutput";
  error?: Maybe<CustomError>;
  ok: Scalars["Boolean"];
};

export type CheckVehicleAvailableInput = {
  endDate: Scalars["DateTime"];
  startDate: Scalars["DateTime"];
  vehicleId: Scalars["ID"];
  vehicleType: VehicleType;
};

export type CheckVehicleAvailableOutput = {
  __typename?: "CheckVehicleAvailableOutput";
  available?: Maybe<Scalars["Boolean"]>;
  error?: Maybe<CustomError>;
  ok: Scalars["Boolean"];
};

export type CreateBookingInput = {
  endDate: Scalars["DateTime"];
  homeDelivery?: InputMaybe<Scalars["String"]>;
  note?: InputMaybe<Scalars["String"]>;
  payment: Payment;
  startDate: Scalars["DateTime"];
  vehicleId: Scalars["ID"];
  vehicleType: VehicleType;
};

export type CreateBookingOutput = {
  __typename?: "CreateBookingOutput";
  bookingCode?: Maybe<Scalars["String"]>;
  error?: Maybe<CustomError>;
  ok: Scalars["Boolean"];
};

export type CreateCarInput = {
  acceptedPayment: Array<Payment>;
  additionalDistancePrice: Scalars["Float"];
  bookings?: InputMaybe<Array<BookingInputType>>;
  carBrand: CarBrand;
  carType: CarType;
  consumption: Scalars["Float"];
  engineType: EngineType;
  features: Array<Scalars["String"]>;
  images?: InputMaybe<Array<StoredFileInputType>>;
  manufactureYear: Scalars["Float"];
  maxDistance?: InputMaybe<Scalars["Float"]>;
  name: Scalars["String"];
  price: Scalars["Float"];
  procedures: ProcedureInputType;
  totalQuantity: Scalars["Float"];
  transmissionType: TransmissionType;
};

export type CreateCarOutput = {
  __typename?: "CreateCarOutput";
  error?: Maybe<CustomError>;
  ok: Scalars["Boolean"];
};

export type CreateMotorBikeInput = {
  acceptedPayment: Array<Payment>;
  additionalDistancePrice: Scalars["Float"];
  bookings?: InputMaybe<Array<BookingInputType>>;
  engineType: EngineType;
  images?: InputMaybe<Array<StoredFileInputType>>;
  manufactureYear: Scalars["Float"];
  maxDistance?: InputMaybe<Scalars["Float"]>;
  motorBikeBrand: MotorBikeBrand;
  name: Scalars["String"];
  price: Scalars["Float"];
  procedures: ProcedureInputType;
  rating: Scalars["Float"];
  totalQuantity: Scalars["Float"];
  transmissionType: TransmissionType;
  vehicleStatuses: Array<VehicleStatusInputType>;
};

export type CreateMotorBikeOutput = {
  __typename?: "CreateMotorBikeOutput";
  error?: Maybe<CustomError>;
  ok: Scalars["Boolean"];
};

export type CustomError = {
  __typename?: "CustomError";
  mainReason: Scalars["String"];
  message: Scalars["String"];
};

export type DeleteCarInput = {
  carId: Scalars["ID"];
};

export type DeleteCarOutput = {
  __typename?: "DeleteCarOutput";
  error?: Maybe<CustomError>;
  ok: Scalars["Boolean"];
};

export type DeleteMotorBikeInput = {
  motorBikeId: Scalars["ID"];
};

export type DeleteMotorBikeOutput = {
  __typename?: "DeleteMotorBikeOutput";
  error?: Maybe<CustomError>;
  ok: Scalars["Boolean"];
};

export enum EngineType {
  Electric = "ELECTRIC",
  Gasoline = "GASOLINE",
}

export type ForgotPasswordInput = {
  email: Scalars["String"];
};

export type ForgotPasswordOutput = {
  __typename?: "ForgotPasswordOutput";
  error?: Maybe<CustomError>;
  ok: Scalars["Boolean"];
};

export type GetBookingDetailInput = {
  bookingId: Scalars["ID"];
};

export type GetBookingDetailOutput = {
  __typename?: "GetBookingDetailOutput";
  booking?: Maybe<Booking>;
  error?: Maybe<CustomError>;
  ok: Scalars["Boolean"];
};

export type GetBookingsByInput = {
  endDate?: InputMaybe<Scalars["DateTime"]>;
  pagination?: InputMaybe<PaginationInput>;
  startDate?: InputMaybe<Scalars["DateTime"]>;
  vehicleType: VehicleType;
};

export type GetBookingsByOutput = {
  __typename?: "GetBookingsByOutput";
  bookings?: Maybe<Array<Booking>>;
  error?: Maybe<CustomError>;
  ok: Scalars["Boolean"];
  pagination?: Maybe<PaginationOutput>;
};

export type GetCarDetailInput = {
  carId: Scalars["ID"];
};

export type GetCarDetailOutput = {
  __typename?: "GetCarDetailOutput";
  car?: Maybe<Car>;
  error?: Maybe<CustomError>;
  ok: Scalars["Boolean"];
};

export type GetCarsByInput = {
  carBrand?: InputMaybe<CarBrand>;
  carType?: InputMaybe<CarType>;
  endDate?: InputMaybe<Scalars["DateTime"]>;
  engineType?: InputMaybe<EngineType>;
  pagination: PaginationInput;
  startDate?: InputMaybe<Scalars["DateTime"]>;
  transmissionType?: InputMaybe<TransmissionType>;
};

export type GetCarsByOutput = {
  __typename?: "GetCarsByOutput";
  cars?: Maybe<Array<Car>>;
  error?: Maybe<CustomError>;
  ok: Scalars["Boolean"];
  pagination?: Maybe<PaginationOutput>;
};

export type GetDetailUserOutput = {
  __typename?: "GetDetailUserOutput";
  error?: Maybe<CustomError>;
  ok: Scalars["Boolean"];
  user: User;
};

export type GetMotorBikeDetailInput = {
  motorBikeId: Scalars["ID"];
};

export type GetMotorBikeDetailOutput = {
  __typename?: "GetMotorBikeDetailOutput";
  error?: Maybe<CustomError>;
  motorBike?: Maybe<MotorBike>;
  ok: Scalars["Boolean"];
};

export type GetMotorBikesByInput = {
  endDate?: InputMaybe<Scalars["DateTime"]>;
  engineType?: InputMaybe<EngineType>;
  pagination: PaginationInput;
  startDate?: InputMaybe<Scalars["DateTime"]>;
};

export type GetMotorBikesByOutput = {
  __typename?: "GetMotorBikesByOutput";
  error?: Maybe<CustomError>;
  motorBikes?: Maybe<Array<MotorBike>>;
  ok: Scalars["Boolean"];
  pagination?: Maybe<PaginationOutput>;
};

export type LoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginOutPut = {
  __typename?: "LoginOutPut";
  accessToken?: Maybe<Scalars["String"]>;
  error?: Maybe<CustomError>;
  ok: Scalars["Boolean"];
  user?: Maybe<SimpleUser>;
};

export type MotorBike = {
  __typename?: "MotorBike";
  acceptedPayment: Array<Payment>;
  additionalDistancePrice: Scalars["Float"];
  bookings?: Maybe<Array<Booking>>;
  createdAt: Scalars["DateTime"];
  engineType: EngineType;
  id: Scalars["ID"];
  images?: Maybe<Array<StoredFile>>;
  manufactureYear: Scalars["Float"];
  maxDistance?: Maybe<Scalars["Float"]>;
  motorBikeBrand: MotorBikeBrand;
  name: Scalars["String"];
  price: Scalars["Float"];
  procedures: Procedure;
  rating: Scalars["Float"];
  totalQuantity: Scalars["Float"];
  transmissionType: TransmissionType;
  updatedAt: Scalars["DateTime"];
  vehicleStatuses: Array<VehicleStatus>;
};

export enum MotorBikeBrand {
  Ducati = "DUCATI",
  Honda = "HONDA",
  Suzuki = "SUZUKI",
  Syw = "SYW",
  Vinfast = "VINFAST",
  Yamaha = "YAMAHA",
}

export type MotorBikeInputType = {
  acceptedPayment: Array<Payment>;
  additionalDistancePrice: Scalars["Float"];
  bookings?: InputMaybe<Array<BookingInputType>>;
  engineType: EngineType;
  images?: InputMaybe<Array<StoredFileInputType>>;
  manufactureYear: Scalars["Float"];
  maxDistance?: InputMaybe<Scalars["Float"]>;
  motorBikeBrand: MotorBikeBrand;
  name: Scalars["String"];
  price: Scalars["Float"];
  procedures: ProcedureInputType;
  rating: Scalars["Float"];
  totalQuantity: Scalars["Float"];
  transmissionType: TransmissionType;
  vehicleStatuses: Array<VehicleStatusInputType>;
};

export type Mutation = {
  __typename?: "Mutation";
  changePassword: ChangePasswordOutput;
  createBooking: CreateBookingOutput;
  createCar: CreateCarOutput;
  createMotorBike: CreateMotorBikeOutput;
  deleteCar: DeleteCarOutput;
  deleteMotorBike: DeleteMotorBikeOutput;
  signup: SignUpOutPut;
  updateBookingStatus: UpdateBookingStatusOutput;
  updateCar: UpdateCarOutput;
  updateMotorBike: UpdateMotorBikeOutput;
  updateUser: UpdateUserOutput;
  verifyForgotPassword: VerifyForgotPasswordOutput;
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

export type MutationCreateMotorBikeArgs = {
  input: CreateMotorBikeInput;
};

export type MutationDeleteCarArgs = {
  input: DeleteCarInput;
};

export type MutationDeleteMotorBikeArgs = {
  input: DeleteMotorBikeInput;
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

export type MutationUpdateMotorBikeArgs = {
  input: UpdateMotorBikeInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type MutationVerifyForgotPasswordArgs = {
  input: VerifyForgotPasswordInput;
};

export type PaginationInput = {
  page?: InputMaybe<Scalars["Int"]>;
  resultsPerPage?: InputMaybe<Scalars["Int"]>;
};

export type PaginationOutput = {
  __typename?: "PaginationOutput";
  totalPages?: Maybe<Scalars["Int"]>;
  totalResults?: Maybe<Scalars["Int"]>;
};

export enum Payment {
  After = "AFTER",
  BankTransfer = "BANK_TRANSFER",
  Before = "BEFORE",
}

export type Procedure = {
  __typename?: "Procedure";
  mortgatePaper?: Maybe<Array<Scalars["String"]>>;
  mortgateProperty?: Maybe<Array<Scalars["String"]>>;
  verificationPaper?: Maybe<Array<Scalars["String"]>>;
};

export type ProcedureInputType = {
  mortgatePaper?: InputMaybe<Array<Scalars["String"]>>;
  mortgateProperty?: InputMaybe<Array<Scalars["String"]>>;
  verificationPaper?: InputMaybe<Array<Scalars["String"]>>;
};

export type Query = {
  __typename?: "Query";
  checkVehicleAvailable: CheckVehicleAvailableOutput;
  forgotPassword: ForgotPasswordOutput;
  getBookingDetail: GetBookingDetailOutput;
  getBookingsBy: GetBookingsByOutput;
  getCarDetail: GetCarDetailOutput;
  getCarsBy: GetCarsByOutput;
  getDetailUser: GetDetailUserOutput;
  getMotorBikeDetail: GetMotorBikeDetailOutput;
  getMotorBikesBy: GetMotorBikesByOutput;
  login: LoginOutPut;
  verifyEmail: VerifyEmailOutput;
};

export type QueryCheckVehicleAvailableArgs = {
  input: CheckVehicleAvailableInput;
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

export type QueryGetCarsByArgs = {
  input: GetCarsByInput;
};

export type QueryGetMotorBikeDetailArgs = {
  input: GetMotorBikeDetailInput;
};

export type QueryGetMotorBikesByArgs = {
  input: GetMotorBikesByInput;
};

export type QueryLoginArgs = {
  input: LoginInput;
};

export type QueryVerifyEmailArgs = {
  input: VerifyEmailInput;
};

export type SignUpInput = {
  confirmPassword: Scalars["String"];
  email: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
  role: UserRole;
};

export type SignUpOutPut = {
  __typename?: "SignUpOutPut";
  error?: Maybe<CustomError>;
  ok: Scalars["Boolean"];
};

export type SimpleUser = {
  __typename?: "SimpleUser";
  email: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  role: UserRole;
};

export type StoredFile = {
  __typename?: "StoredFile";
  filePath: Scalars["String"];
  fileUrl: Scalars["String"];
};

export type StoredFileInputType = {
  filePath: Scalars["String"];
  fileUrl: Scalars["String"];
};

export enum TransmissionType {
  AutomaticTransmission = "AUTOMATIC_TRANSMISSION",
  ManualTransmission = "MANUAL_TRANSMISSION",
}

export type UpdateBookingStatusInput = {
  bookingId: Scalars["Int"];
  status: BookingStatus;
};

export type UpdateBookingStatusOutput = {
  __typename?: "UpdateBookingStatusOutput";
  error?: Maybe<CustomError>;
  ok: Scalars["Boolean"];
};

export type UpdateCarInput = {
  acceptedPayment?: InputMaybe<Array<Payment>>;
  additionalDistancePrice?: InputMaybe<Scalars["Float"]>;
  bookings?: InputMaybe<Array<BookingInputType>>;
  carBrand?: InputMaybe<CarBrand>;
  carId: Scalars["ID"];
  carType?: InputMaybe<CarType>;
  consumption?: InputMaybe<Scalars["Float"]>;
  engineType?: InputMaybe<EngineType>;
  features?: InputMaybe<Array<Scalars["String"]>>;
  images?: InputMaybe<Array<StoredFileInputType>>;
  manufactureYear?: InputMaybe<Scalars["Float"]>;
  maxDistance?: InputMaybe<Scalars["Float"]>;
  name?: InputMaybe<Scalars["String"]>;
  price?: InputMaybe<Scalars["Float"]>;
  procedures?: InputMaybe<ProcedureInputType>;
  totalQuantity?: InputMaybe<Scalars["Float"]>;
  transmissionType?: InputMaybe<TransmissionType>;
};

export type UpdateCarOutput = {
  __typename?: "UpdateCarOutput";
  error?: Maybe<CustomError>;
  ok: Scalars["Boolean"];
};

export type UpdateMotorBikeInput = {
  acceptedPayment?: InputMaybe<Array<Payment>>;
  additionalDistancePrice?: InputMaybe<Scalars["Float"]>;
  bookings?: InputMaybe<Array<BookingInputType>>;
  engineType?: InputMaybe<EngineType>;
  images?: InputMaybe<Array<StoredFileInputType>>;
  manufactureYear?: InputMaybe<Scalars["Float"]>;
  maxDistance?: InputMaybe<Scalars["Float"]>;
  motorBikeBrand?: InputMaybe<MotorBikeBrand>;
  motorBikeId: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
  price?: InputMaybe<Scalars["Float"]>;
  procedures?: InputMaybe<ProcedureInputType>;
  rating?: InputMaybe<Scalars["Float"]>;
  totalQuantity?: InputMaybe<Scalars["Float"]>;
  transmissionType?: InputMaybe<TransmissionType>;
  vehicleStatuses?: InputMaybe<Array<VehicleStatusInputType>>;
};

export type UpdateMotorBikeOutput = {
  __typename?: "UpdateMotorBikeOutput";
  error?: Maybe<CustomError>;
  ok: Scalars["Boolean"];
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars["String"]>;
  avatar?: InputMaybe<StoredFileInputType>;
  name: Scalars["String"];
  phoneNumber?: InputMaybe<Scalars["String"]>;
};

export type UpdateUserOutput = {
  __typename?: "UpdateUserOutput";
  error?: Maybe<CustomError>;
  ok: Scalars["Boolean"];
};

export type User = {
  __typename?: "User";
  address?: Maybe<Scalars["String"]>;
  avatar?: Maybe<StoredFile>;
  bookings?: Maybe<Array<Booking>>;
  createdAt: Scalars["DateTime"];
  email: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  password: Scalars["String"];
  phoneNumber?: Maybe<Scalars["String"]>;
  role: UserRole;
  updatedAt: Scalars["DateTime"];
  verified: Scalars["Boolean"];
};

export type UserInputType = {
  address?: InputMaybe<Scalars["String"]>;
  avatar?: InputMaybe<StoredFileInputType>;
  bookings?: InputMaybe<Array<BookingInputType>>;
  email: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
  phoneNumber?: InputMaybe<Scalars["String"]>;
  role: UserRole;
  verified: Scalars["Boolean"];
};

export enum UserRole {
  Admin = "Admin",
  Normal = "Normal",
}

export type VehicleStatus = {
  __typename?: "VehicleStatus";
  booked: Scalars["Boolean"];
  goodCondition: Scalars["Boolean"];
  vehicleNumber: Scalars["Float"];
};

export type VehicleStatusInputType = {
  booked: Scalars["Boolean"];
  goodCondition: Scalars["Boolean"];
  vehicleNumber: Scalars["Float"];
};

export enum VehicleType {
  Car = "CAR",
  MotorBike = "MOTOR_BIKE",
}

export type VerifyEmailInput = {
  verificationToken: Scalars["String"];
};

export type VerifyEmailOutput = {
  __typename?: "VerifyEmailOutput";
  error?: Maybe<CustomError>;
  ok: Scalars["Boolean"];
};

export type VerifyForgotPasswordInput = {
  confirmPassword: Scalars["String"];
  password: Scalars["String"];
  verificationToken: Scalars["String"];
};

export type VerifyForgotPasswordOutput = {
  __typename?: "VerifyForgotPasswordOutput";
  error?: Maybe<CustomError>;
  ok: Scalars["Boolean"];
};

export type LoginQueryVariables = Exact<{
  input: LoginInput;
}>;

export type LoginQuery = {
  __typename?: "Query";
  login: {
    __typename?: "LoginOutPut";
    ok: boolean;
    accessToken?: string | null;
    error?: { __typename?: "CustomError"; message: string } | null;
    user?: {
      __typename?: "SimpleUser";
      id: string;
      name: string;
      email: string;
      role: UserRole;
    } | null;
  };
};

export type SignupMutationVariables = Exact<{
  input: SignUpInput;
}>;

export type SignupMutation = {
  __typename?: "Mutation";
  signup: {
    __typename?: "SignUpOutPut";
    ok: boolean;
    error?: { __typename?: "CustomError"; message: string } | null;
  };
};

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
export function useLoginQuery(
  baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LoginQuery, LoginQueryVariables>(
    LoginDocument,
    options
  );
}
export function useLoginLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(
    LoginDocument,
    options
  );
}
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<
  LoginQuery,
  LoginQueryVariables
>;
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
export type SignupMutationFn = Apollo.MutationFunction<
  SignupMutation,
  SignupMutationVariables
>;

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
export function useSignupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignupMutation,
    SignupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignupMutation, SignupMutationVariables>(
    SignupDocument,
    options
  );
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<
  SignupMutation,
  SignupMutationVariables
>;
