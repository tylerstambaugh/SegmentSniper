import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { EquipmentModel } from "../../../../../graphql/generated"
import { Maybe } from "graphql/jsutils/Maybe"
import { DateTime } from "luxon"
import { FormikErrors, useFormik } from "formik"
import * as Yup from 'yup'
import { RetireBikeEquipmentBase } from "../../../../../pages/Garage/BikeDetails"
import { useState } from "react"
import styles from "./Equipment.module.scss"

type RetireEquipmentModalProps = {
    show: boolean
    item: Maybe<EquipmentModel>
    onClose: () => void
    handleRetireEquipment: (values: RetireBikeEquipmentBase) => void
}

const RetireEquipmentModal = ({ show, item, onClose, handleRetireEquipment }: RetireEquipmentModalProps) => {

    const [validated, setValidated] = useState(false);
    const initialValues: RetireBikeEquipmentBase = {

        equipmentId: item?.equipmentId ?? "",
        retireDate: null
    }

    const validationSchema = Yup.object({
        retiredDate: Yup.date().required(),
    })

    const formik = useFormik<RetireBikeEquipmentBase>({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnBlur: validated,
        validateOnChange: validated,
        onSubmit: async (values) => {
            setValidated(true);
            await handleRetireEquipment(values)
        }
    })
    return (
        <Modal show={show} onHide={onClose} className="shadow">
            <Modal.Header closeButton>
                <Modal.Title>Retire Equipment?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col>
                    <Row className="justify-content-center">
                        {`When would you like to retire ${item?.name}?`}
                    </Row>
                    <Form>
                        <Row className="justify-content-center">
                            <Col sm={6}>

                                <Form.Group controlId="retireDate" className="mb-3 d-flex">
                                    <Form.Control

                                        name="retireDate"
                                        type="date"
                                        value={formik.values.retireDate?.toISODate() ?? ""}
                                        onChange={(e) => {
                                            const newDate = DateTime.fromFormat(
                                                e.target.value,
                                                "yyyy-MM-dd"
                                            );
                                            formik.setFieldValue("retireDate", newDate)
                                        }
                                        } />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.retireDate as FormikErrors<string>}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className={styles.modal_button_row}>
                            <Col>
                                <Button onClick={() => onClose}>Cancel</Button>
                            </Col>
                            <Col>
                                <Button variant="primary" type="submit">
                                    Retire
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Modal.Body>
        </Modal>
    )
}

export default RetireEquipmentModal