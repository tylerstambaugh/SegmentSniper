import { FormikErrors, useFormik } from "formik";
import { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { CustomToast } from "../Toast/CustomToast";
import * as yup from "yup";

interface SegmentPredictorForm {
    segmentId: string | null
}

function SegmentPredictor() {
    const [validated, setValidated] = useState(false);

    const initialValues = {
        segmentId: null
    };

    // async function handleSegmentPrediction(request: SegmentPredictionRequest) {

    // }

    const validationSchema = yup
        .object({
            segmentId: yup
                .string()
                .nullable()
                .required()
        })

    // useEffect(() => {
    //     if (handleSegmentPrediction.error !== null) {
    //       const error = handleSegmentPrediction.error as Error;
    //       CustomToast({
    //         message: "Segment Prediction Failed",
    //         error: `Error: ${error.message}`,
    //         type: "error",
    //       });
    //     }
    //   }, [handleSegmentPrediction.error]);

    const formik = useFormik<SegmentPredictorForm>({
        initialValues,
        enableReinitialize: true,
        onSubmit: (values: SegmentPredictorForm) => {
            setValidated(true);

            //handlePredictSegment(segmentPredictionRequest)
        },
        validationSchema: validationSchema,
        validateOnBlur: validated,
        validateOnChange: validated,
    });
    return (
        <>
            <Row className="d-flex justify-content-center pt-3 ">
                <Col md={6} xs={10}>
                    <Card className="shadow">
                        <Card.Title>Segment Predictor </Card.Title>
                        <Card.Body>
                            <Form
                                name="segmentPRedictionForm"
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    setValidated(true);
                                    formik.handleSubmit(event);
                                }}
                            >
                                <Row className=" justify-content-center mb-3">
                                    <Col className="mb-2">
                                        <Form.Group controlId="formSegmentIdSearch">
                                            <Form.Label id="segmentIdSearchLabel">Segment Id:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder=""
                                                value={formik.values.segmentId ?? ""}
                                                name="segmentId"
                                                isInvalid={!!formik.errors.segmentId}
                                                onChange={(e) => {
                                                    formik.setFieldValue("segmentId", e.target.value);
                                                }}
                                            //className={`${styles.activityNameInput}`}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {formik.errors.segmentId as FormikErrors<string>}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}