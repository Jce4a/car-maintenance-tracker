import { Route, Routes as Switch, Navigate } from "react-router-dom";
import { LandingPage } from "../pages/landing-page/landing-page";
import { NotFoundPage } from "../pages/not-found";
import { useUser } from "../authentication/use-auth";
import { UserPage } from "../pages/user-page/user-page";
import { PageWrapper } from "../components/page-wrapper/page-wrapper";
import { routes } from ".";


import { Cars } from "../pages/myCars-page/Cars";

import { ServiceProviderListing } from "../pages/serviceProvider-page/serviceProvider-page";
import { ServiceProviderUpdate } from "../pages/serviceProvider-page/serviceProvider-update";
import { ServiceProviderCreate } from "../pages/serviceProvider-page/serviceProvider-create";
import { ServiceProviderDelete } from "../pages/serviceProvider-page/serviceProvider-delete";
import { BusinessCreate } from "../pages/business-page/business-create";
import { BusinessDelete } from "../pages/business-page/business-delete";
import { BusinessListing } from "../pages/business-page/business-page";
import { BusinessUpdate } from "../pages/business-page/business-update";
import { MaintenanceTypeListing } from "../pages/maintenancetype-page/maintenancetype-listing";
import { MaintenanceTypeUpdate } from "../pages/maintenancetype-page/maintenancetype-update";
import { MaintenanceTypeCreate } from "../pages/maintenancetype-page/maintenancetype-create";
import { MaintenanceTypeDelete } from "../pages/maintenancetype-page/maintenancetype-delete";
import { MaintenanceTaskUpdate } from "../pages/maintenancetask-page/maintenancetask-update";
import { MaintenanceTaskCreate } from "../pages/maintenancetask-page/maintenancetask-create";
import { MaintenanceTaskListing } from "../pages/maintenancetask-page/maintenancetask-listing";
import { MaintenanceTaskDelete } from "../pages/maintenancetask-page/maintenancetask-delete";
import { ManufacturerListing } from "../pages/manufacturer-page/manufacturer-listing";
import { ManufacturerUpdate } from "../pages/manufacturer-page/manufacturer-update";
import { ManufacturerCreate } from "../pages/manufacturer-page/manufacturer-create";
import { ManufacturerDelete } from "../pages/manufacturer-page/manufacturer-delete";
import { ModelListing } from "../pages/model-page/model-listing";
import { ModelUpdate } from "../pages/model-page/model-update";
import { ModelCreate } from "../pages/model-page/model-create";
import { ModelDelete } from "../pages/model-page/model-delete";
import { SettingsPage } from "../pages/settings-page/settings-page";
import MaintenanceRecord from "../pages/maintenanceRecord-page/maintenanceRecord";
import MaintenanceGuide from "../pages/maintenanceGuide-page/maintenanceGuide";export const Routes = () => {
  const user = useUser();

  return (
    <>
     
      <PageWrapper user={user}>
        <Switch>
         
          <Route path={routes.home} element={<LandingPage />} />
          <Route path={routes.maintenanceGuide} element={<MaintenanceGuide />} />
          <Route path={routes.user} element={<UserPage />} />
          <Route path={routes.user} element={<UserPage />} />
          <Route path={routes.maintenancetypeListing} element={<MaintenanceTypeListing />} />
          <Route path={routes.maintenancetypeUpdate} element={<MaintenanceTypeUpdate />}/>
          <Route path={routes.maintenancetypeCreate} element={<MaintenanceTypeCreate />}/>
          <Route path={routes.maintenancetypeDelete} element={<MaintenanceTypeDelete />}/>
          <Route path={routes.maintenancetaskListing} element={<MaintenanceTaskListing />} />
          <Route path={routes.maintenancetaskUpdate} element={<MaintenanceTaskUpdate />}/>
          <Route path={routes.maintenancetaskCreate} element={<MaintenanceTaskCreate />}/>
          <Route path={routes.maintenancetaskDelete} element={<MaintenanceTaskDelete />}/>
          <Route path={routes.myCars} element={<Cars />} />
          <Route path={routes.settings} element={<SettingsPage />} />
          <Route path="/cars/:carId/maintenance" element={<MaintenanceRecord />} />

          <Route
            path={routes.maintenancetypeListing}
            element={<MaintenanceTypeListing />}
          />
          <Route
            path={routes.maintenancetypeUpdate}
            element={<MaintenanceTypeUpdate />}
          />
          <Route
            path={routes.maintenancetypeCreate}
            element={<MaintenanceTypeCreate />}
          />
          <Route
            path={routes.maintenancetypeDelete}
            element={<MaintenanceTypeDelete />}
          />
          <Route
            path={routes.maintenancetaskListing}
            element={<MaintenanceTaskListing />}
          />
          <Route
            path={routes.maintenancetaskUpdate}
            element={<MaintenanceTaskUpdate />}
          />
          <Route
            path={routes.maintenancetaskCreate}
            element={<MaintenanceTaskCreate />}
          />
          <Route
            path={routes.maintenancetaskDelete}
            element={<MaintenanceTaskDelete />}
          />

          <Route
            path={routes.manufacturerListing}
            element={<ManufacturerListing />}
          />
          <Route
            path={routes.manufacturerUpdate}
            element={<ManufacturerUpdate />}
          />
          <Route
            path={routes.manufacturerCreate}
            element={<ManufacturerCreate />}
          />
          <Route
            path={routes.manufacturerDelete}
            element={<ManufacturerDelete />}
          />
          <Route path={routes.modelListing} element={<ModelListing />} />
          <Route path={routes.modelUpdate} element={<ModelUpdate />} />
          <Route path={routes.modelCreate} element={<ModelCreate />} />
          <Route path={routes.modelDelete} element={<ModelDelete />} />
          <Route path={routes.serviceProviderListing} element={<ServiceProviderListing />} />
          <Route path={routes.serviceProviderUpdate} element={<ServiceProviderUpdate />} />
          <Route path={routes.serviceProviderCreate} element={<ServiceProviderCreate />} />
          <Route path={routes.serviceProviderDelete} element={<ServiceProviderDelete />} />
          <Route path={routes.businessListing} element={<BusinessListing />} />
          <Route path={routes.businessUpdate} element={<BusinessUpdate />} />
          <Route path={routes.businessCreate} element={<BusinessCreate />} />
          <Route path={routes.businessDelete} element={<BusinessDelete />} />
         
          <Route path={routes.root} element={<Navigate to={routes.home} />} />

          

          
          <Route path="*" element={<NotFoundPage />} />
        </Switch>
      </PageWrapper>
    </>
  );
};
