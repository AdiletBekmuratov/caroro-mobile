import React from 'react';

import { useAppSelector } from '@/redux/hooks';
import { InProgressMapScreenModal } from './InProgressMapScreenModal';
import { PendingMapScreenModal } from './PendingMapScreenModal';

export const MapModalsWrapper = () => {
  const { inprogressModalScreen, pendingModalScreen } = useAppSelector(
    state => state.mapModals,
  );
  return (
    <>
      {pendingModalScreen && <PendingMapScreenModal />}
      {inprogressModalScreen && <InProgressMapScreenModal />}
    </>
  );
};
