
import Swal from 'sweetalert2';

export const showSuccessAlert = (title: string, text?: string) => {
  return Swal.fire({
    title,
    text,
    icon: 'success',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'OK'
  });
};

export const showErrorAlert = (title: string, text?: string) => {
  return Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonColor: '#d33',
    confirmButtonText: 'OK'
  });
};

export const showConfirmationAlert = (title: string, text: string, confirmButtonText: string = 'Yes') => {
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText
  });
};

export const showInputAlert = (title: string, inputPlaceholder: string) => {
  return Swal.fire({
    title,
    input: 'text',
    inputPlaceholder,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Submit'
  });
};
