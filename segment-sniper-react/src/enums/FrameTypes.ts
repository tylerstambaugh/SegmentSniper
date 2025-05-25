import { FrameTypeEnum } from '../graphql/generated';

export enum FrameType {
  NONE = 0,
  MTB = 1,
  CROSS = 2,
  ROAD = 3,
  TIMETRIAL = 4,
  GRAVEL = 5,
  EBIKE = 6,
  OTHER = 7,
}

export const FrameTypeToString = (frameType: number): string => {
  const mapping: { [key in FrameType]: string } = {
    [FrameType.NONE]: 'None',
    [FrameType.MTB]: 'Mountain Bike',
    [FrameType.CROSS]: 'Cross',
    [FrameType.ROAD]: 'Road',
    [FrameType.TIMETRIAL]: 'Time Trial',
    [FrameType.GRAVEL]: 'Gravel',
    [FrameType.EBIKE]: 'E-Bike',
    [FrameType.OTHER]: 'Other',
  };

  return mapping[frameType as FrameType] || 'Unknown';
};

export const FrameTypeToEnumMap: Record<FrameType, FrameTypeEnum> = {
  [FrameType.NONE]: FrameTypeEnum.None,
  [FrameType.MTB]: FrameTypeEnum.Mtb,
  [FrameType.CROSS]: FrameTypeEnum.Cross,
  [FrameType.ROAD]: FrameTypeEnum.Road,
  [FrameType.TIMETRIAL]: FrameTypeEnum.TimeTrial,
  [FrameType.GRAVEL]: FrameTypeEnum.Gravel,
  [FrameType.EBIKE]: FrameTypeEnum.Ebike,
  [FrameType.OTHER]: FrameTypeEnum.Other,
};
