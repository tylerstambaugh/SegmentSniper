import { useState } from "react";
import { BikeModel, Maybe } from "../../../../graphql/generated";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { FormikErrors, useFormik } from "formik"
import * as Yup from 'yup'
import { ApolloError } from "@apollo/client";
import toast from "react-hot-toast";
import BikeFrameTypeSelect from "./GraphQl/BikeFrameTypeSelect";


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
    bikeBrand: string;
    bikeModel: string;
    bikeMtersLogged: number;
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
        bikeBrand: bike?.brandName ?? "",
        bikeModel: bike?.modelName ?? "",
        bikeMtersLogged: bike?.metersLogged ?? 0,
        bikeDescription: bike?.description ?? "",
        // bikeYear: 0,
        // bikeWeight: 0,
        // bikeSize: "",
        // bikeColor: "",
        // bikeNotes: "",
    }

    const validationSchema = Yup.object({
        bikeName: Yup.string().required('Required'),
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

    const formik = useFormik<UpsertBikeFormValues>({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnBlur: validated,
        validateOnChange: validated,
        onSubmit: async (values: UpsertBikeFormValues) => {
            setValidated(true);
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
        <Modal show={show} onHide={() => { }} className="shadow">
            <Modal.Header closeButton>
                <Modal.Title>Add Bike</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col>
                    <Row className="mb-3">
                        <Form.Group controlId="bikeName">
                            <Form.Label>Bike Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter bike name" />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.bikeName as FormikErrors<string>}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <BikeFrameTypeSelect
                            selection={formik.values.bikeFrameType?.toString() ?? ""}
                            onChange={(selection) => {
                                formik.setFieldValue("bikeFrameType", selection)
                            }}
                            errors={formik.errors}
                        />
                    </Row>
                    <Row className="mb-3">
                        <Form.Group controlId="bikeBrand">
                            <Form.Label>Bike Brand</Form.Label>
                            <Form.Control type="text" placeholder="Enter bike brand" />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.bikeBrand as FormikErrors<string>}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group controlId="bikeModel">
                            <Form.Label>Bike Model</Form.Label>
                            <Form.Control type="text" placeholder="Enter bike model" />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.bikeModel as FormikErrors<string>}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>


                </Col>
            </Modal.Body>
        </Modal>
    )
}

export default UpsertBikeModal;