
import { ReactElement } from 'react';

export interface Option {
  value: ReactElement;
  onClick: () => void;

}

import {
  FaEdit,
} from 'react-icons/fa';

import {
  GiCancel
} from 'react-icons/gi'

export const editIcon = FaEdit;
export const deleteIcon = GiCancel;