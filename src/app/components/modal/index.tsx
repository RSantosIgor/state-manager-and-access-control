'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '60%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
    children,
    open,
    setOpen
  }: {
    children: React.ReactNode,
    open: boolean,
    setOpen: any
  }) {

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:shadow-none dark:!bg-navy-800 dark:text-white">
          {children}
        </Box>
      </Modal>
    </div>
  );
}