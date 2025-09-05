import React, { useState } from "react";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";
import { FormikErrors, useFormik } from "formik";
import { Col, Form, Row } from "react-bootstrap";
import styles from "./BikeLookup.module.scss"
import { BikeLookupHelpModal } from "./HelpModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export interface BikeLookupForm {
    bikeId?: string | null;
}

export const BikeLookup = () => {
    const [helpModalShow, setHelpModalShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const initialValues = {
        bikeId: null,
    }

    const validationSchema = yup
        .object({
            bikeId: yup
                .string().required()
        })

    const formik = useFormik<BikeLookupForm>({
        initialValues,
        enableReinitialize: true,
        onSubmit: (values: BikeLookupForm) => {
            setValidated(true);
        },
        validationSchema: validationSchema,
        validateOnBlur: validated,
        validateOnChange: validated,
    })

    const handleHelpModalClose = () => setHelpModalShow(false);
    const handleHelpModalShow = () => setHelpModalShow(true);

    return (
        <>
            <Form
                name="activityLookupForm"
                onSubmit={(event) => {
                    event.preventDefault();
                    setValidated(true);
                    formik.handleSubmit(event);
                }}
            >
                <Row className=" justify-content-center mb-3">
                    <Col className="mb-2">
                        <Form.Group controlId="formNameSearch">
                            <Form.Label id="bikeLookupLabel">Search by ID:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Bike Id:"
                                value={formik.values.bikeId ?? ""}
                                name="bikeId"
                                isInvalid={!!formik.errors.bikeId}
                                onChange={(e) => {
                                    formik.setFieldValue("bikeId", e)
                                }}
                                className={`${styles.bikeIdInput}`}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.bikeId as FormikErrors<string>}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Link onClick={handleHelpModalShow} to="">
                            <FontAwesomeIcon
                                icon={faQuestionCircle}
                                size="sm"
                                style={{
                                    color: "#ffca14",
                                    paddingTop: ".6rem",
                                    font: "black",
                                }}
                            />
                        </Link>
                    </Col>
                </Row>
            </Form>
            <BikeLookupHelpModal show={helpModalShow} handleClose={handleHelpModalClose} />
        </>
    )
}