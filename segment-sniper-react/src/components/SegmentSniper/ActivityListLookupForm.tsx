import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import ActivityTypeEnum from "../../enums/ActivityTypes";

export interface ActivitySearchProps {
  activityId?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  activityType?: ActivityTypeEnum | null;
}

function ActivityListLookupForm() {
  const [validated, setValidated] = useState(false);

  interface ActivityListLookupForm {
    activityId?: string | null;
    startDate?: Date | null;
    endDate?: Date | null;
    activityType?: string | null;
  }

  const validationSchema = yup.object({});

  const initialValues = {
    activityId: undefined,
    activityType: "Ride",
    startDate: undefined,
    endDate: undefined,
  };

  const formik = useFormik<ActivityListLookupForm>({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values: ActivityListLookupForm) => {
      setValidated(true);
      const searchProps: ActivitySearchProps = {
        activityId: values.activityId ?? "",
        startDate: values.startDate,
        endDate: values.endDate,
        activityType: values.activityType as unknown as ActivityTypeEnum,
      };
      //handleSearch(searchProps);
    },
    validationSchema: validationSchema,
    validateOnBlur: validated,
    validateOnChange: validated,
  });
}

export default ActivityListLookupForm;
