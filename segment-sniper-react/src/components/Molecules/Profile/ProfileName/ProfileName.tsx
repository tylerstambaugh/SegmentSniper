import { faCheck, faX, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Modal, Col, Button, Form, Spinner } from "react-bootstrap";
import { FormikErrors, useFormik } from "formik";
import * as yup from "yup";
import styles from "../ProfileName/ProfileName.module.scss";
import useProfileStore from "../../../../stores/useProfileStore";
import { useState } from "react";
import useHandleUpdateFirstName from "../../../../hooks/Api/Profile/Handlers/useHandleUpdateFirstName";

export type ProfileNameProps = {
  editMode: boolean;
  changeEditMode: (isEditMode: boolean) => void;
};

interface EditNameForm {
  firstName: string;
}

const ProfileName: React.FC<ProfileNameProps> = ({
  editMode,
  changeEditMode,
}) => {
  const [profile] = useProfileStore((state) => [state.profileData]);
  const [updatedFirstName, setUpdatedFirstName] = useState<string>("");
  const {
    handle: handleUpdateFirstName,
    isLoading: updateFirstNameIsLoading,
    error: updateFirstNameError,
  } = useHandleUpdateFirstName();
  const [validated, setValidated] = useState(false);

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .required("First name is required")
      .nonNullable()
      .typeError("First name must be a string"),
  });

  const initialValues = {
    firstName: profile?.firstName,
  };

  const formik = useFormik<EditNameForm>({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values: EditNameForm) => {
      setValidated(true);
      await handleUpdateFirstName(values.firstName!);
      changeEditMode(false);
    },
    validationSchema: validationSchema,
    validateOnBlur: validated,
    validateOnChange: validated,
  });

  return (
    <Row>
      <Col className="p-0">
        <div>
          <p className={styles.profileLabel}>First name</p>
          {editMode ? (
            <span className="d-flex my-0">
              <Form
                name="editFirstNameForm"
                onSubmit={(event) => {
                  event.preventDefault();
                  setValidated(true);
                  formik.handleSubmit(event);
                }}
              >
                <Form.Group controlId="formEditName">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={formik.values.firstName ?? ""}
                    name="firstName"
                    isInvalid={!!formik.errors.firstName}
                    onChange={(e) => {
                      formik.setFieldValue("firstName", e.target.value);
                    }}
                    className={`${styles.firstNameInput} ${styles.profileValue}`}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.firstName as FormikErrors<string>}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form>
              {updateFirstNameIsLoading ? (
                <>
                  <Button
                    variant="secondary"
                    className={`me-1 ${styles.editProfileFaButton} `}
                  >
                    <Spinner
                      as="span"
                      variant="light"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      animation="border"
                    />
                  </Button>
                </>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  className={`mx-2 ${styles.editProfileFaButton}`}
                  onClick={(e) => {
                    formik.handleSubmit();
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} className="fa-md" />
                </Button>
              )}
              <Button
                variant="third"
                className={` ${styles.editProfileFaButton} mx-2`}
                onClick={() => {
                  changeEditMode(false);
                }}
              >
                <FontAwesomeIcon icon={faX} className="fa-md" />
              </Button>
            </span>
          ) : (
            <span className="d-flex my-0">
              <p className={styles.profileValue}>{profile?.firstName}</p>{" "}
              <Button
                variant="secondary"
                className={`px-1 py-0 my-0 ${styles.editProfileFaButton}`}
                onClick={() => {
                  changeEditMode(true);
                }}
              >
                <FontAwesomeIcon icon={faEdit} className="fa-md" />
              </Button>
            </span>
          )}
          <hr className={styles.hrCentered} />
        </div>
      </Col>
    </Row>
  );
};

export default ProfileName;
