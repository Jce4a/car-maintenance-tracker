import { MaintenanceTaskListing } from "../pages/maintenancetask-page/maintenancetask-listing";

//This is where you will declare all of your routes (the ones that show up in the search bar)
export const routes = {
  root: `/`,
  home: `/home`,
  user: `/user`,
  settings: `/settings`,

  maintenancetypeListing: `/maintenancetypes`,
  maintenancetypeUpdate: `/maintenancetypes/:id`,
  maintenancetypeCreate: `/maintenancetypes/create`,
  maintenancetypeDelete: `/maintenancetypes/:id/delete`,

  maintenancetaskListing: `/maintenancetasks`,
  maintenancetaskUpdate: `/maintenancetasks/:id`,
  maintenancetaskCreate: `/maintenancetasks/create`,
  maintenancetaskDelete: `/maintenancetasks/:id/delete`,

  manufacturerListing: `/manufacturers`,
  manufacturerUpdate: `/manufacturers/:id`,
  manufacturerCreate: `/manufacturers/create`,
  manufacturerDelete: `/manufacturers/delete/:id`,
  modelListing: `/models`,
  modelUpdate: `/models/:id`,
  modelCreate: `/models/create`,
  modelDelete: `/models/delete/:id`,

  serviceProviderListing: '/service-provider',
  serviceProviderUpdate: '/service-provider/:id',
  serviceProviderCreate: '/service-provider/create',
  serviceProviderDelete: '/service-provider/:id/delete',

  businessListing: '/business',
  businessUpdate: '/business/:id',
  businessCreate: '/business/create',
  businessDelete: '/business/:id/delete',
  
  maintenanceGuide: "/maintenance-guide",

  
  myCars: '/cars',
};