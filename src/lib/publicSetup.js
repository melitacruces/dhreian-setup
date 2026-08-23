import { cache } from 'react';
import { getSetupData } from '@/lib/actions';

export const getPublicSetup = cache(getSetupData);
