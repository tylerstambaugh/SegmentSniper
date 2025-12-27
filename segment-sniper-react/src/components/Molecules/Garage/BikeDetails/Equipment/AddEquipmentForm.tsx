import { Button, Col, Form, Modal, Row, Spinner } from 'react-bootstrap';
import { FormikErrors, useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { DateTime } from 'luxon';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ApolloError } from '@apollo/client';
import toast from 'react-hot-toast';

export type UpsertEquipmentFormProps = {
  show: boolean;
  handleSubmit: (values: UpsertEquipmentFormValues) => Promise<void>;
  onClose: () => void;
  editEquipment?: Maybe<UpsertEquipmentFormValues> | undefined;
  loading?: boolean;
  error: ApolloError | undefined;
};

export interface UpsertEquipmentFormValues {
  name: string;
  description: string;
  totalMiles?: number | null;
  milesAtInstall?: number | null;
  installDate: DateTime | null;
  retiredDate: DateTime | null;
  price?: number | null;
  replaceAtMiles?: number | null;
  remindAtMiles?: number | null;
  reminderDate?: DateTime | null;
  reminderDurationInMonths?: number | null;
  maxRemindersToSend?: number | null;
  remindersSent?: number | null;
}

const UpsertEquipmentFormUI = ({
  show,
  handleSubmit,
  onClose,
  editEquipment,
  loading,
  error,
}: UpsertEquipmentFormProps) => {
  const [validated, setValidated] = useState(false);
  const isEdit = editEquipment !== undefined;
  const initialValues = useMemo(
    () => ({
      name: editEquipment?.name ?? '',
      description: editEquipment?.description ?? '',
      totalMiles: editEquipment?.totalMiles ?? null,
      milesAtInstall: editEquipment?.milesAtInstall ?? null,
      installDate: editEquipment?.installDate ?? null,
      retiredDate: editEquipment?.retiredDate ?? null,
      price: editEquipment?.price ?? null,
      replaceAtMiles: editEquipment?.replaceAtMiles ?? null,
      remindAtMiles: editEquipment?.remindAtMiles ?? null,
      reminderDate: editEquipment?.reminderDate ?? null,
      reminderDurationInMonths: editEquipment?.reminderDurationInMonths ?? null,
      maxRemindersToSend: editEquipment?.maxRemindersToSend ?? 2,
      remindersSent: editEquipment?.remindersSent ?? 0,
    }),
    [editEquipment],
  );

  //TODO add a validation that replace at miles must be greater than remind at miles.
  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    description: Yup.string(),
    totalMiles: Yup.number().nullable(),
    installDate: Yup.date()
      .required('Install date is required')
      .max(new Date(), 'Date must be in the past'),
    price: Yup.number().nullable().min(0, 'Price must be non-negative'),
    replaceAtMiles: Yup.number().nullable(),
    reminderDate: Yup.date()
      .nullable()
      .min(new Date(0), 'Reminder date must be after today.'),
    reminderDurationInMonths: Yup.number()
      .nullable()
      .positive('Must be positive'),
    maxRemindersToSend: Yup.number().nullable().min(0, 'Must be non-negative'),
    remindersSent: Yup.number().nullable().min(0, 'Must be non-negative'),
    remindAtMiles: Yup.number().nullable().min(0, 'Must be non-negative'),
  });

  const formik = useFormik<UpsertEquipmentFormValues>({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnBlur: validated,
    enableReinitialize: true,
    validateOnChange: validated,
    onSubmit: async (values: UpsertEquipmentFormValues) => {
      setValidated(true);
      await handleSubmit(values).then(() => {
        if (!loading && !error) {
          toast.success(
            `Equipment ${isEdit ? 'updated' : 'added'} successfully`,
          );
          onClose();
          formik.resetForm();
        }
      });
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error.message}`);
    }
  }, [error]);

  console.log('formik values', formik.values);
  console.log('equipment values', editEquipment);

  return (
    <Modal show={show} onHide={onClose} className="shadow">
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit' : 'Add'} Equipment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col>
          <Form name="addEquipmentForm" onSubmit={formik.handleSubmit}>
            <Row>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label className="mb-1">Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={formik.values.name}
                  onChange={(e) => {
                    formik.setFieldValue('name', e.target.value);
                  }}
                  isInvalid={formik.touched.name && !!formik.errors.name}
                  isValid={formik.touched.name && !formik.errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.name as FormikErrors<string>}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="description" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={formik.values.description}
                  onChange={(e) =>
                    formik.setFieldValue('description', e.target.value)
                  }
                  isInvalid={
                    formik.touched.description && !!formik.errors.description
                  }
                  isValid={
                    formik.touched.description && !formik.errors.description
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.description as FormikErrors<string>}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Col xs={6}>
                <Form.Group controlId="installDate" className="mb-3">
                  <Form.Label>Install Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formik.values.installDate?.toISODate() ?? ''}
                    onChange={(e) => {
                      const newDate = DateTime.fromFormat(
                        e.target.value,
                        'yyyy-MM-dd',
                      );
                      formik.setFieldValue('installDate', newDate);
                    }}
                    isInvalid={
                      formik.touched.installDate && !!formik.errors.installDate
                    }
                    isValid={
                      formik.touched.installDate && !formik.errors.installDate
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.installDate as FormikErrors<string>}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="price" className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <CurrencyInput
                    customInput={Form.Control}
                    name="price"
                    value={formik.values.price ?? ''}
                    onValueChange={(value) => {
                      formik.setFieldValue(
                        'price',
                        value !== undefined ? Number(value) : null,
                      );
                    }}
                    intlConfig={{ locale: 'en-US', currency: 'USD' }}
                    decimalScale={2}
                    fixedDecimalLength={2}
                    allowNegativeValue={false}
                    width={100}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.price as FormikErrors<string>}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="milesAtInstall" className="mb-3">
                  <Form.Label>Miles At Install</Form.Label>
                  <Form.Control
                    type="number"
                    value={formik.values.milesAtInstall ?? ''}
                    onChange={(e) => {
                      const value = e.target.value
                        ? parseFloat(e.target.value)
                        : null;
                      formik.setFieldValue('milesAtInstall', value);
                    }}
                    isInvalid={
                      formik.touched.milesAtInstall &&
                      !!formik.errors.milesAtInstall
                    }
                    isValid={
                      formik.touched.milesAtInstall &&
                      !formik.errors.milesAtInstall
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.milesAtInstall as FormikErrors<string>}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="totalMiles" className="mb-3">
                  <Form.Label>Total Miles</Form.Label>
                  <Form.Control
                    type="number"
                    value={
                      formik.values.totalMiles ??
                      formik.values.milesAtInstall ??
                      ''
                    }
                    disabled={true}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="reminderDate" className="mb-3">
                  <Form.Label>Remind At</Form.Label>
                  <Form.Control
                    type="date"
                    value={formik.values.reminderDate?.toISODate() ?? ''}
                    onChange={(e) => {
                      const newDate = DateTime.fromFormat(
                        e.target.value,
                        'yyyy-MM-dd',
                      );
                      formik.setFieldValue('reminderDate', newDate);
                    }}
                    isInvalid={
                      formik.touched.reminderDate &&
                      !!formik.errors.reminderDate
                    }
                    isValid={
                      formik.touched.reminderDate && !formik.errors.reminderDate
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.reminderDate as FormikErrors<string>}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  controlId="reminderDurationinMonths"
                  className="mb-3"
                >
                  <Form.Label>Reminder Duration</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="months"
                    value={formik.values.reminderDurationInMonths ?? undefined}
                    onChange={(e) => {
                      const value = e.target.value
                        ? parseFloat(e.target.value)
                        : null;
                      formik.setFieldValue('reminderDurationInMonths', value);
                    }}
                    isInvalid={
                      formik.touched.reminderDurationInMonths &&
                      !!formik.errors.reminderDurationInMonths
                    }
                    isValid={
                      formik.touched.reminderDurationInMonths &&
                      !formik.errors.reminderDurationInMonths
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {
                      formik.errors
                        .reminderDurationInMonths as FormikErrors<string>
                    }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="maxRemindersToSend" className="mb-3">
                  <Form.Label># Reminders To Send</Form.Label>
                  <Form.Control
                    type="number"
                    value={formik.values.maxRemindersToSend ?? ''}
                    onChange={(e) => {
                      const value = e.target.value
                        ? parseFloat(e.target.value)
                        : null;
                      formik.setFieldValue('maxRemindersToSend', value);
                    }}
                    isInvalid={
                      formik.touched.maxRemindersToSend &&
                      !!formik.errors.maxRemindersToSend
                    }
                    isValid={
                      formik.touched.maxRemindersToSend &&
                      !formik.errors.maxRemindersToSend
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.maxRemindersToSend as FormikErrors<string>}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="replaceAtMiles" className="mb-3">
                  <Form.Label>Replace At Miles</Form.Label>
                  <Form.Control
                    type="number"
                    value={formik.values.replaceAtMiles ?? ''}
                    onChange={(e) => {
                      const value = e.target.value
                        ? parseFloat(e.target.value)
                        : null;
                      formik.setFieldValue('replaceAtMiles', value);
                    }}
                    isInvalid={
                      formik.touched.replaceAtMiles &&
                      !!formik.errors.replaceAtMiles
                    }
                    isValid={
                      formik.touched.replaceAtMiles &&
                      !formik.errors.replaceAtMiles
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.replaceAtMiles as FormikErrors<string>}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="remindAtMiles" className="mb-3">
                  <Form.Label>Remind At Miles</Form.Label>
                  <Form.Control
                    type="number"
                    value={formik.values.remindAtMiles ?? undefined}
                    onChange={(e) => {
                      const value = e.target.value
                        ? parseFloat(e.target.value)
                        : null;
                      formik.setFieldValue('remindAtMiles', value);
                    }}
                    isInvalid={
                      formik.touched.remindAtMiles &&
                      !!formik.errors.remindAtMiles
                    }
                    isValid={
                      formik.touched.remindAtMiles &&
                      !formik.errors.remindAtMiles
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.remindAtMiles as FormikErrors<string>}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="justify-content-between">
              <Col>
                {isEdit ? (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setValidated(false);
                      formik.resetForm();
                    }}
                  >
                    Reset
                  </Button>
                )}
              </Col>
              <Col className="justify-content-center">
                {!loading ? (
                  <Button variant="primary" type="submit" onClick={() => {}}>
                    Submit
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="secondary"
                    style={{ width: '175px' }}
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
                )}
              </Col>
            </Row>
          </Form>
        </Col>
      </Modal.Body>
    </Modal>
  );
};

export default UpsertEquipmentFormUI;
