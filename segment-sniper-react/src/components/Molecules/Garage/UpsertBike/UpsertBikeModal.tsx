import { useState } from "react";
import { BikeModel, Maybe } from "../../../../graphql/generated";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { FormikErrors, useFormik } from "formik"
import * as Yup from 'yup'
import { ApolloError } from "@apollo/client";
import toast from "react-hot-toast";
import BikeFrameTypeSelect from "./BikeFrameTypeSelect";
import { FrameType } from "../../../../enums/FrameTypes";


export type UpsertBikeModalProps = {
    show: boolean;
    onClose: () => void;
    loading?: boolean;
    handleUpsertBike: (values: UpsertBikeFormValues) => Promise<void>;
    error: ApolloError | undefined
    bike?: BikeModel;
}


export interface UpsertBikeFormValues {
    bikeName: string;
    bikeFrameType: Maybe<number>;
    bikeBrand: Maybe<string>;
    bikeModel: Maybe<string>;
    bikeMetersLogged: number;
    bikeDescription: string;
    // bikeYear: number;
    // bikeWeight: number;
    // bikeSize: string;
    // bikeColor: string;
    // bikeNotes: string;
}

const UpsertBikeModal = ({
    show, onClose, loading, handleUpsertBike, error, bike }: UpsertBikeModalProps) => {
    const [validated, setValidated] = useState(false);
    const isEdit = bike !== undefined;
    const initialValues: UpsertBikeFormValues = {
        bikeName: bike?.name ?? "",
        bikeFrameType: bike?.frameType ?? null,
        bikeBrand: bike?.brandName ?? null,
        bikeModel: bike?.modelName ?? null,
        bikeMetersLogged: bike?.metersLogged ?? 0,
        bikeDescription: bike?.description ?? "",
        // bikeYear: 0,
        // bikeWeight: 0,
        // bikeSize: "",
        // bikeColor: "",
        // bikeNotes: "",
    }

    const validationSchema = Yup.object({
        bikeName: Yup.string().required('Required'),
        description: Yup.string().max(250, 'Description must be 250 characters or less'),
        milesLogged: Yup.number().min(0, 'Miles logged must be a positive number'),
    })

    const formik = useFormik<UpsertBikeFormValues>({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnBlur: validated,
        validateOnChange: validated,
        onSubmit: async (values: UpsertBikeFormValues) => {
            console.log("calling upsert");
            await handleUpsertBike(values).then(() => {
                if (!loading && !error) {
                    toast.success(`Bike ${isEdit ? 'updated' : 'added'} successfully`);
                    onClose();
                    formik.resetForm()
                }
            })
        }
    })

    return (
        <Modal show={show} onHide={() => onClose()} className="shadow">
            <Modal.Header closeButton>
                <Modal.Title>Add Bike</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col>
                    <Form
                        name="upsertBikeForm"
                        onSubmit={(event) => {
                            event.preventDefault();
                            setValidated(true);
                            formik.handleSubmit(event);
                        }}
                    >
                        <Row className="mb-2">
                            <Form.Group controlId="bikeName">
                                <Form.Label className="mb-0">Bike Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter bike name"
                                    value={formik.values.bikeName ?? ""}
                                    isValid={formik.touched.bikeName && !formik.errors.bikeName}

                                    name="bikeName"
                                    isInvalid={!!formik.errors.bikeName}
                                    onChange={(e) => {
                                        formik.setFieldValue("bikeName", e.target.value);
                                    }}
                                />

                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.bikeName as FormikErrors<string>}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row >
                            <BikeFrameTypeSelect
                                selection={formik.values.bikeFrameType?.toString() ?? FrameType.NONE.toString()}
                                onChange={(selection) => {
                                    formik.setFieldValue("bikeFrameType", selection)
                                }}
                                errors={formik.errors}
                            />
                        </Row>
                        <Row className="mb-2">
                            <Form.Group controlId="bikeBrand">
                                <Form.Label className="pb-0 mb-0">Bike Brand</Form.Label>
                                <Form.Control type="text" placeholder="Enter bike brand" />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.bikeBrand as FormikErrors<string>}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-1">
                            <Form.Group controlId="bikeModel">
                                <Form.Label className="mb-0">Bike Model</Form.Label>
                                <Form.Control type="text" placeholder="Enter bike model" />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.bikeModel as FormikErrors<string>}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-4">
                            <Form.Group controlId="bikeMetersLogged">
                                <Form.Label className="mb-0">Miles Logged</Form.Label>
                                <Form.Control type="number" placeholder="Enter miles logged" />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.bikeMetersLogged as FormikErrors<string>}
                                </Form.Control.Feedback>
                            </Form.Group>
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
                            <Col className="justify-content-between d-flex">
                                {!loading ? (
                                    <Button variant="primary" type="submit" onClick={() => {
                                        console.log("Submitting form", formik.values);
                                        console.log("Submitting form errors", formik.errors);


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
        </Modal>
    )
}

export default UpsertBikeModal;