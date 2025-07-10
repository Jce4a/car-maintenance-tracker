export type ApiResponse<T> = {
  data: T;
  errors: ApiError[];
  hasErrors: boolean;
};

export type ApiError = {
  property: string;
  message: string;
};

export type AnyObject = {
  [index: string]: any;
};

// Users
export type UserDto = {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
};

// Maintenance Types
export type MaintenanceTypeGetDto = {
  create: any;
  id: number;
  name: string;
};

export type MaintenanceTypeCreateUpdateDto = {
  id?: number;
  name: string;
};

// Manufacturers & Models
export type ManufacturerGetDto = {
  id: number;
  name: string;
  models?: ModelGetDto[];
};

export type ManufacturerCreateUpdateDto = {
  id?: number;
  name: string;
};

export type ModelGetDto = {
  id: number;
  name: string;
  manufacturerId: number;
};

export type ModelCreateUpdateDto = {
  id?: number;
  name: string;
  manufacturerId: number;
};

// Maintenance Tasks
export type MaintenanceTaskGetDto = {
  create: any;
  id: number;
  name: string;
};

export type MaintenanceTaskCreateUpdateDto = {
  id?: number;
  name: string;
};

export type MaintenanceTaskDeleteDto = {
  id: number;
};

// Service Providers & Businesses
export type ServiceProviderGetDto = {
  id: number;
  name: string;
  phoneNumber: string;
  businessId: number;
};

export type ServiceProviderCreateUpdateDto = {
  id?: number;
  name: string;
  phoneNumber: string;
  businessId: number;
};

export type BusinessGetDto = {
  id: number;
  name: string;
  phoneNumber: string;
  address: string;
  serviceProviders?: ServiceProviderGetDto[];
};

export type BusinessCreateUpdateDto = {
  id?: number;
  name: string;
  phoneNumber: string;
  address: string;
};

// Cars
export type CarGetDto = {
  id: number;
  modelId: number;
  modelName: string;
  makeName: string;
  year: number;
  plateNumber: string;
  userId: number;
};

// Maintenance Records
export type MaintenanceRecordGetDto = {
  id: number;
  carId: number;
  serviceProviderId: number;
  maintenanceTaskId: number;
  date: string;
  mileage: number;
  labourCost: number;
  totalCost: number;
  notes: string;
  serviceProviderName: string;
  maintenanceTaskName: string;
};

export type MaintenanceRecordCreateDto = {
  carId: number;
  serviceProviderId: number;
  maintenanceTaskId: number;
  date: string;
  mileage: number;
  labourCost: number;
  totalCost: number;
  notes: string;
};

export type MaintenanceRecordCreateUpdateDto = {
  id?: number;
  carId: number;
  serviceProviderId: number;
  maintenanceTaskId: number;
  date: string;
  mileage: number;
  labourCost: number;
  totalCost: number;
  notes: string;
};