import { Button, Col, Container, Row } from 'react-bootstrap';
import AddEquipmentForm, {
  UpsertEquipmentFormValues,
} from './AddEquipmentForm';
import { useEffect, useMemo, useState } from 'react';
import {
  BikeModel,
  EquipmentInput,
  EquipmentModel,
} from '../../../../../graphql/generated';
import styles from './Equipment.module.scss';
import { DateTime } from 'luxon';
import { MAX_DATE_TIME } from '../../../../../Constants/timeConstant';
import RetireEquipmentModal, {
  RetireBikeEquipmentBase,
} from './RetireEquipmentModal';
import { EquipmentAccordion } from './EquipmentAccordion';
import { useRetireBikeEquipmentMutation } from './GraphQl/useRetireBikeEquipment';
import GetBikeByIdQuery from '../../GraphQl/GetBikeById.graphql';
import { useUpsertBikeEquipmentMutation } from './GraphQl/useUpsertBikeEquipmentMutation';
import toast from 'react-hot-toast';
import DeleteEquipmentModal, {
  DeleteBikeEquipmentValues,
} from './DeleteEquipmentModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDeleteEquipmentMutation } from './GraphQl/useDeleteEquipment';

type EquipmentListProps = {
  bike: BikeModel;
  equipment: EquipmentModel[] | [];
};

export type EquipmentModalState =
  | { type: 'none' }
  | { type: 'retire'; item: EquipmentModel }
  | { type: 'addEdit'; item?: EquipmentModel }
  | { type: 'delete'; item?: EquipmentModel };

const EquipmentList = ({ equipment, bike }: EquipmentListProps) => {
  const [modalState, setModalState] = useState<EquipmentModalState>({
    type: 'none',
  });
  const handleClosedModal = () => {
    setModalState({ type: 'none' });
  };

  function adaptEquipmentModelToEquipmentFormValues(
    selectedEquipment: EquipmentModel,
  ): UpsertEquipmentFormValues {
    return {
      name: selectedEquipment?.name,
      description: selectedEquipment?.description ?? '',
      totalMiles: selectedEquipment?.totalMiles,
      milesAtInstall: selectedEquipment?.milesAtInstall,
      installDate: selectedEquipment?.installDate
        ? DateTime.fromISO(selectedEquipment.installDate)
        : null,
      retiredDate: selectedEquipment?.retiredDate
        ? DateTime.fromISO(selectedEquipment.retiredDate)
        : null,
      price: selectedEquipment?.price,
      replaceAtMiles: selectedEquipment?.replaceAtMiles,
      milesUntilReplaceReminder: selectedEquipment?.milesUntilReplaceReminder,
    };
  }

  const activeEquipment = equipment.filter((e) => e.retiredDate === null);
  const retiredEquipment = equipment.filter((e) => e.retiredDate !== null);

  const [
    addEquipmentToBike,
    { loading: addEquipmentLoading, error: addEquipmentError },
  ] = useUpsertBikeEquipmentMutation({
    update(cache, { data }) {
      const updatedBike = data?.garage?.upsertBikeEquipment;
      if (!updatedBike) return;

      cache.writeQuery({
        query: GetBikeByIdQuery,
        variables: { bikeId: updatedBike.bikeId },
        data: {
          bikes: {
            __typename: 'BikeQuery',
            byBikeId: updatedBike,
          },
        },
      });
    },
  });

  const [retireBikeEquipment, { error: retireBikeEquipmentError }] =
    useRetireBikeEquipmentMutation({
      update(cache, { data }) {
        const updatedBike = data?.garage?.retireEquipmentOnBike;
        if (!updatedBike) return;

        cache.writeQuery({
          query: GetBikeByIdQuery,
          variables: { bikeId: updatedBike.bikeId },
          data: {
            bikes: {
              __typename: 'BikeQuery',
              byBikeId: updatedBike,
            },
          },
        });
      },
    });

  const [deleteBikeEquipment, { error: deleteBikeEquipmentError }] =
    useDeleteEquipmentMutation({
      update(cache, { data }) {
        const updatedBike = data?.garage?.deleteEquipment;
        if (!updatedBike) return;

        cache.writeQuery({
          query: GetBikeByIdQuery,
          variables: { bikeId: updatedBike.bikeId },
          data: {
            bikes: {
              __typename: 'BikeQuery',
              byBikeId: updatedBike,
            },
          },
        });
      },
    });

  async function handleUpsertEquipmentSubmit(
    values: UpsertEquipmentFormValues,
  ) {
    const installDate = values.installDate
      ? DateTime.fromISO(values.installDate as unknown as string).toISO()
      : null;

    const retiredDate = values.retiredDate
      ? DateTime.fromISO(values.retiredDate as unknown as string).toISO()
      : null;

    const equipmentInput: EquipmentInput = {
      name: values.name,
      description: values.description,
      milesAtInstall: values.milesAtInstall ?? 0,
      installDate: installDate,
      retiredDate: retiredDate,
      price: values.price ?? 0,
      replaceAtMiles: values.replaceAtMiles ?? 0,
      reminderDurationInMonths: values.reminderDurationInMonths ?? 0,
      milesUntilReplaceReminder: values.milesUntilReplaceReminder ?? 0,
      maxRemindersToSend: values.maxRemindersToSend ?? 1,
      equipmentId:
        modalState.type === 'addEdit' && modalState.item
          ? modalState.item.equipmentId
          : undefined,
    };
    addEquipmentToBike({
      variables: {
        bikeId: bike!.bikeId,
        equipment: equipmentInput,
      },
    });
  }

  async function handleRetireEquipment(values: RetireBikeEquipmentBase) {
    try {
      if (!values.equipmentId || !values.retireDate) {
        toast.error('Unable to process request', {
          duration: 5000,
        });
        console.error('No equipmentId or retireDate provided');
      }
      await retireBikeEquipment({
        variables: {
          bikeId: bike!.bikeId,
          equipmentId: values.equipmentId!,
          retireDate: values.retireDate?.toISODate() ?? '',
        },
      });
      handleClosedModal();
    } catch (e) {
      toast.error(`Error retiring equipment:${e}`, {
        duration: 5000,
      });
      console.error('Error retiring equipment', e);
    }
  }

  async function handleDeleteEquipment(values: EquipmentModel) {
    try {
      if (!values.equipmentId) {
        toast.error('Unable to process request', {
          duration: 5000,
        });
        console.error('No equipmentId provided');
      }
      await deleteBikeEquipment({
        variables: {
          equipmentId: values.equipmentId!,
        },
      });
      handleClosedModal();
    } catch (e) {
      toast.error('Error deleting equipment', {
        duration: 5000,
      });
      console.error('Error deleting equipment', e);
    }
  }

  // useEffect(() => {
  //     if (addEquipmentError && addEquipmentError.message.includes('Unauthorized')) {
  //         // Redirect to login or show an error message
  //         console.error('User is not authorized. Please log in.');
  //     }
  // }, [addEquipmentError]);

  useEffect(() => {
    if (
      retireBikeEquipmentError ||
      addEquipmentError ||
      deleteBikeEquipmentError
    ) {
      toast.error(
        'Dang. An error occurred: ' +
          (retireBikeEquipmentError?.message ||
            addEquipmentError?.message ||
            deleteBikeEquipmentError?.message),
        {
          duration: 5000,
        },
      );
    }
  }, [retireBikeEquipmentError, addEquipmentError, deleteBikeEquipmentError]);

  const stableEditValues = useMemo(() => {
    if (modalState.type !== 'addEdit' || !modalState.item) return undefined;
    return adaptEquipmentModelToEquipmentFormValues(modalState.item);
  }, [modalState]);

  return (
    <Container>
      <Col>
        <Row>
          <AddEquipmentForm
            show={modalState.type === 'addEdit'}
            handleSubmit={handleUpsertEquipmentSubmit}
            onClose={handleClosedModal}
            editEquipment={stableEditValues}
            loading={addEquipmentLoading}
            error={addEquipmentError}
          />
          <RetireEquipmentModal
            show={modalState.type === 'retire'}
            onClose={handleClosedModal}
            item={modalState.type === 'retire' ? modalState.item : null}
            handleRetireEquipment={handleRetireEquipment}
          />
          <DeleteEquipmentModal
            show={modalState.type === 'delete'}
            onClose={handleClosedModal}
            item={modalState.type === 'delete' ? modalState.item : null}
            handleDeleteEquipment={handleDeleteEquipment}
          />
        </Row>

        <Row className="justify-content-center ">
          <Col md={8}>
            <Row>
              <Col xs={8} className={styles.equipmentHeading}>
                Active Equipment
              </Col>
              <Col className="d-flex justify-content-end">
                <Button onClick={() => setModalState({ type: 'addEdit' })}>
                  {' '}
                  <FontAwesomeIcon icon={faPlus} />
                  Add
                </Button>
              </Col>
            </Row>
          </Col>
          <Row className="pt-1 p-1">
            <EquipmentAccordion
              equipment={activeEquipment}
              setModalState={setModalState}
            />
          </Row>
        </Row>

        <Row className="justify-content-center pt-2">
          <Col md={8}>
            <Row>
              <Col className={`${styles.equipmentHeading} mb-2`}>
                Retired Equipment
              </Col>
            </Row>
          </Col>
          <Row className="pt-1 p-1">
            <EquipmentAccordion
              equipment={retiredEquipment}
              setModalState={setModalState}
            />
          </Row>
        </Row>
      </Col>
    </Container>
  );
};

export default EquipmentList;
