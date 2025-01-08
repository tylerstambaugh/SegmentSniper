import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap"
import { FormikErrors, useFormik } from "formik"
import * as Yup from 'yup'
import { useState } from "react";
import CurrencyInput from 'react-currency-input-field';

export type AddEquipmentFormProps = {
    show: boolean;
    handleSubmit: (values: AddEquipmentFormValues) => void;
    onClose: () => void
}

export interface AddEquipmentFormValues {
    name: string;
    description: string;
    milesLogged: number;
    installDate: Date;
    retiredDate: Date;
    price: number;
    replaceAtMiles: number;
    milesUntilReplaceReminder: number;
}

const AddEquipmentFormUI = ({ show, handleSubmit, onClose }: AddEquipmentFormProps) => {
    const [validated, setValidated] = useState(false);

    const initialValues: AddEquipmentFormValues = {
        name: '',
        description: '',
        milesLogged: 0,
        installDate: new Date(),
        retiredDate: new Date(),
        price: 0,
        replaceAtMiles: 0,
        milesUntilReplaceReminder: 0,
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        milesLogged: Yup.number().required('Required'),
        installDate: Yup.date().required('Required'),
        retiredDate: Yup.date().required('Required'),
        price: Yup.number().required('Required'),
        replaceAtMiles: Yup.number().required('Required'),
        milesUntilReplaceReminder: Yup.number().required('Required'),
    })

    const formik = useFormik<AddEquipmentFormValues>({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnBlur: validated,
        validateOnChange: validated,
        onSubmit: (values) => {
            setValidated(true);
            handleSubmit(values)
        }
    })
    return (
        <Modal show={show} onHide={onClose} className="shadow">
            <Modal.Header closeButton>
                <Modal.Title>Add Equipment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col>
                    <Form name="addEquipmentForm" onSubmit={formik.handleSubmit}>
                        <Row>
                            <Form.Group controlId="name" className="mb-3">
                                <Form.Label className="mb-1">Name</Form.Label>
                                <Form.Control type="text" required
                                    onChange={(e) => formik.setFieldValue("name", e.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.name as FormikErrors<string>}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group controlId="description" className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text"
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
                                    <Form.Control type="date" required
                                        onChange={(e) => formik.setFieldValue("installDate", e.target.value)} />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.installDate as FormikErrors<string>}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="retiredDate" className="mb-3">
                                    <Form.Label>Retired Date</Form.Label>
                                    <Form.Control type="date"
                                        onChange={(e) => formik.setFieldValue("retireDate", e.target.value)} />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.retiredDate as FormikErrors<string>}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="milesLogged" className="mb-3">
                                    <Form.Label>Miles Logged</Form.Label>
                                    <Form.Control type="number"
                                        onChange={(e) => formik.setFieldValue("milesLogged", e.target.value)} />
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
                                        value={formik.values.price ?? 0}
                                        onValueChange={(e) => formik.setFieldValue("price", e)}
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
                                    <Form.Control type="number" placeholder="Miles"
                                        onChange={(e) => formik.setFieldValue("replaceAtMiles", e.target.value)} />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.replaceAtMiles as FormikErrors<string>}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="milesUntilReplaceReminder" className="mb-3">
                                    <Form.Label>Remind At</Form.Label>
                                    <Form.Control type="number" placeholder="Miles"
                                        onChange={(e) => formik.setFieldValue("milesUntilReplaceReminder", e.target.value)} />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.milesUntilReplaceReminder as FormikErrors<string>}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="justify-content-between">
                            <Col>
                                <Button variant="secondary" onClick={() => formik.resetForm()}>
                                    Reset
                                </Button>
                            </Col>
                            <Col className="justify-content-center">
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>

                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Modal.Body>
        </Modal>
    )
}

export default AddEquipmentFormUI