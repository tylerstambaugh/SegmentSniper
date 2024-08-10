import { FormikErrors, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import { CustomToast } from '../Toast/CustomToast';
import * as yup from 'yup';
import { usePostPredictSegment } from '../../../hooks/Api/SegmentPrediction/usePostPredictSegment';
import { SegmentPredictionRequest } from '../../../services/Api/SegmentPrediction/postPredictSegment';

interface SegmentPredictorForm {
  segmentId: string | null;
}

function SegmentPredictor() {
  const [validated, setValidated] = useState(false);
  const {mutateAsync: handle, isLoading: predictSegmentIsLoading, error: predictSegmentIsError, data: predictSegmentData} = usePostPredictSegment();
  const [requestData, setRequestData] = useState<SegmentPredictionRequest | null>(null);

  const initialValues = {
    segmentId: null,
  };



  const validationSchema = yup.object({
    segmentId: yup.string().nullable().required(),
  });

  useEffect(() => {
      if (predictSegmentIsError !== null) {
        const error = predictSegmentIsError as Error;
        CustomToast({
          message: "Segment Prediction Failed",
          error: `Error: ${error.message}`,
          type: "error",
        });
      }
    }, [predictSegmentIsError]);

  const handleFormReset = () => {
    formik.resetForm({
      values: {
        segmentId: null,
      },
    });
    formik.setErrors({});
    formik.setFieldValue("segmentId", null);
    setValidated(false);
  };

  const formik = useFormik<SegmentPredictorForm>({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values: SegmentPredictorForm) => {
      setValidated(true);
    const request: SegmentPredictionRequest = {
        segmentId: values.segmentId!
    }
      await handle(request)
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
                      <Form.Label id="segmentIdSearchLabel">
                        Segment Id:
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder=""
                        value={formik.values.segmentId ?? ''}
                        name="segmentId"
                        isInvalid={!!formik.errors.segmentId}
                        onChange={(e) => {
                          formik.setFieldValue('segmentId', e.target.value);
                        }}
                        //className={`${styles.activityNameInput}`}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.segmentId as FormikErrors<string>}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-flex justify-content-center mb-2">
                  <Row>
                    <Col>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          handleFormReset();
                        }}
                        className="px-2"
                      >
                        Reset
                      </Button>
                    </Col>
                    <Col>
                      {predictSegmentIsLoading ? (
                        <Button
                          type="submit"
                          variant="secondary"
                          style={{ width: "75px" }}
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
                      ) : (
                        <Button
                          type="submit"
                          variant="primary"
                          disabled={predictSegmentIsLoading}
                        >
                          Predict
                        </Button>
                      )}
                    </Col>
                  </Row>
                </div>
              </Form>
              <Row>
                Segment Time Prediction: {predictSegmentData?.predictedTime}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default SegmentPredictor;
