import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap"
import { FormikErrors, useFormik } from "formik"
import * as Yup from 'yup'
import { useState } from "react";

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
                    <Row>
                        <Form name="addEquipmentForm" onSubmit={formik.handleSubmit}>
                            <Form.Group controlId="name" className="mb-3">
                                <Form.Label className="mb-1">Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" required />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.name as FormikErrors<string>}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label >Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter description" />
                            </Form.Group>
                            <Form.Group controlId="milesLogged">
                                <Form.Label>Miles Logged</Form.Label>
                                <Form.Control type="number" placeholder="Enter miles logged" />
                            </Form.Group>
                            <Form.Group controlId="installDate">
                                <Form.Label>Install Date</Form.Label>
                                <Form.Control type="date" required />
                            </Form.Group>
                            <Form.Group controlId="retiredDate">
                                <Form.Label>Retired Date</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>
                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" placeholder="Enter price" />
                            </Form.Group>
                            <Form.Group controlId="replaceAtMiles">
                                <Form.Label>Replace At Miles</Form.Label>
                                <Form.Control type="number" placeholder="Enter replace at miles" />
                            </Form.Group>
                            <Form.Group controlId="milesUntilReplaceReminder">
                                <Form.Label>Miles Until Replace Reminder</Form.Label>
                                <Form.Control type="number" placeholder="Enter miles until replace reminder" />
                            </Form.Group>
                            <Row className="justify-content-around">
                                <Col>
                                    <Button variant="secondary" onClick={() => formik.resetForm()}>
                                        Reset
                                    </Button>
                                </Col>
                                <Col>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>

                                </Col>
                            </Row>
                        </Form>
                    </Row>
                </Col>
            </Modal.Body>
        </Modal>
    )
}

export default AddEquipmentFormUI