import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap"
import { FormikErrors, useFormik } from "formik"
import * as Yup from 'yup'
import { useEffect, useState } from "react";
import CurrencyInput from 'react-currency-input-field';
import { DateTime } from "luxon";
import { Maybe } from "graphql/jsutils/Maybe";
import { ApolloError } from "@apollo/client";
import toast from "react-hot-toast";

export type UpsertEquipmentFormProps = {
    show: boolean;
    handleSubmit: (values: UpsertEquipmentFormValues) => Promise<void>;
    onClose: () => void
    editEquipment?: Maybe<UpsertEquipmentFormValues> | undefined;
    loading?: boolean;
    error: ApolloError | undefined
}

export interface UpsertEquipmentFormValues {
    name: string;
    description: string;
    milesLogged?: number | null;
    installDate: DateTime | null;
    retiredDate: DateTime | null;
    price?: number | null;
    replaceAtMiles?: number | null;
    milesUntilReplaceReminder?: number | null;
}

const UpsertEquipmentFormUI = ({ show, handleSubmit, onClose, editEquipment, loading, error }: UpsertEquipmentFormProps) => {
    console.log("AddEquipmentFormUI", editEquipment);

    const [validated, setValidated] = useState(false);
    const isEdit = editEquipment !== undefined;
    const initialValues: UpsertEquipmentFormValues = {
        name: editEquipment?.name ?? '',
        description: editEquipment?.description ?? '',
        milesLogged: editEquipment?.milesLogged ?? undefined,
        installDate: editEquipment?.installDate ?? null,
        retiredDate: editEquipment?.retiredDate ?? null,
        price: editEquipment?.price ?? null,
        replaceAtMiles: editEquipment?.replaceAtMiles ?? undefined,
        milesUntilReplaceReminder: editEquipment?.milesUntilReplaceReminder ?? undefined,
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        description: Yup.string(),
        milesLogged: Yup.number(),
        installDate: Yup.date().nullable()
            .max(new Date(), "Date must be in the past"),
        retiredDate: Yup.date().nullable()
            .max(new Date(), "Date must be in the past"),
        price: Yup.number().nullable(),
        replaceAtMiles: Yup.number(),
        milesUntilReplaceReminder: Yup.number(),
    })

    const formik = useFormik<UpsertEquipmentFormValues>({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnBlur: validated,
        validateOnChange: validated,
        onSubmit: async (values: UpsertEquipmentFormValues) => {
            setValidated(true);
            await handleSubmit(values).then(() => {
                if (!loading && !error) {
                    toast.success(`Equipment ${isEdit ? 'updated' : 'added'} successfully`);
                    onClose();
                    formik.resetForm()
                }
            })
        }
    })

    useEffect(() => {
        if (error) {
            toast.error(`Error: ${error.message}`);
        }
    }, [error])


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
                                    value={editEquipment?.name ?? formik.values.name}
                                    onChange={(e) => {
                                        formik.setFieldValue("name", e.target.value);
                                    }

                                    } />
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
                                    value={editEquipment?.description ?? formik.values.description}
                                    onChange={(e) => formik.setFieldValue("description", e.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.description as FormikErrors<string>}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="installDate" className="mb-3">
                                    <Form.Label>Install Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={
                                            editEquipment?.installDate?.toISODate()
                                            ?? formik.values.installDate?.toISODate()
                                            ?? ""}
                                        onChange={(e) => {
                                            const newDate = DateTime.fromFormat(
                                                e.target.value,
                                                "yyyy-MM-dd"
                                            );
                                            formik.setFieldValue("installDate", newDate)
                                        }
                                        } />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.installDate as FormikErrors<string>}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            {/* <Col>
                                <Form.Group controlId="retiredDate" className="mb-3">
                                    <Form.Label>Retired Date</Form.Label>
                                    <Form.Control type="date"
                                        value={editEquipment?.retiredDate?.toISODate()
                                            ?? formik.values.retiredDate?.toISODate()
                                            ?? ""}
                                        onChange={(e) => {
                                            const newDate = DateTime.fromFormat(
                                                e.target.value,
                                                "yyyy-MM-dd"
                                            );
                                            formik.setFieldValue("retiredDate", newDate)
                                        }
                                        } />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.retiredDate as FormikErrors<string>}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col> */}
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="milesLogged" className="mb-3">
                                    <Form.Label>Miles Logged</Form.Label>
                                    <Form.Control type="number"
                                        value={editEquipment?.milesLogged
                                            ?? formik.values.milesLogged
                                            ?? ""}
                                        onChange={(e) => {
                                            const value = e.target.value ? parseFloat(e.target.value) : null;
                                            formik.setFieldValue("milesLogged", value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.milesLogged as FormikErrors<string>}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="price" className="mb-3">
                                    <Form.Label>Price</Form.Label>
                                    <CurrencyInput
                                        id="input-price"
                                        name="Price"
                                        value={editEquipment?.price
                                            ?? formik.values.price
                                            ?? 0}
                                        onValueChange={(value) => {
                                            const numericValue = parseFloat(value ?? "0.00") || 0;
                                            formik.setFieldValue("price", numericValue);
                                        }}
                                        intlConfig={{ locale: 'en-US', currency: 'USD' }}
                                        decimalScale={2}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.price as FormikErrors<string>}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="replaceAtMiles" className="mb-3">
                                    <Form.Label>Replace At</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Miles"
                                        value={editEquipment?.replaceAtMiles
                                            ?? formik.values.replaceAtMiles
                                            ?? ""}
                                        onChange={(e) => {
                                            const value = e.target.value ? parseFloat(e.target.value) : null;
                                            formik.setFieldValue("replaceAtMiles", value)
                                        }} />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.replaceAtMiles as FormikErrors<string>}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="milesUntilReplaceReminder" className="mb-3">
                                    <Form.Label>Remind At</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Miles"
                                        value={editEquipment?.milesUntilReplaceReminder
                                            ?? formik.values.milesUntilReplaceReminder
                                            ?? undefined}
                                        onChange={(e) => {
                                            const value = e.target.value ? parseFloat(e.target.value) : null;
                                            formik.setFieldValue("milesUntilReplaceReminder", value)
                                        }} />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.milesUntilReplaceReminder as FormikErrors<string>}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="justify-content-between">
                            <Col>
                                {isEdit ? (

                                    <Button variant="secondary" onClick={() => {
                                        onClose();
                                    }}>
                                        Cancel
                                    </Button>
                                ) : (
                                    <Button variant="secondary" onClick={() => {
                                        setValidated(false)
                                        formik.resetForm()
                                    }}>
                                        Reset
                                    </Button>
                                )}
                            </Col>
                            <Col className="justify-content-center">
                                {!loading ? (

                                    <Button variant="primary" type="submit" onClick={() => {
                                        console.log("formik errors", formik.errors);
                                    }}>
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
        </Modal >
    )
}

export default UpsertEquipmentFormUI