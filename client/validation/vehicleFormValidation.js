// validation/vehicleFormValidation.js
import * as Yup from 'yup';

export const vehicleFormSchema = Yup.object({
  vehicleNumber: Yup.string().min(10).max(10).required('Vehicle number is required'),
  vehicleType: Yup.string().required('Type is required'),
  ownerName: Yup.string().required('Owner name is required'),
  insuranceExpiry: Yup.date(),
  fitnessExpiry: Yup.date(),
  permitExpiry: Yup.date(),
  pollutionExpiry: Yup.date(),
  taxExpiry: Yup.string(),
  documentStatus: Yup.string().required('Status is required'),
  //createdBy: Yup.required('Created By is required'),
});
