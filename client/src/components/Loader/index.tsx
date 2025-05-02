import * as React from 'react';
import Lottie from 'lottie-react';
import LoaderAnimation from '../../assets/anim/loader.json';
import { Dialog, DialogContent } from '../ui/dialog';

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => (
  <Dialog
    open={isLoading}
  >
    <DialogContent>
      <div className='flex'>
        <Lottie animationData={LoaderAnimation} style={{ height: 50 }} />
      </div>
    </DialogContent>
  </Dialog>
);

export default Loader;
