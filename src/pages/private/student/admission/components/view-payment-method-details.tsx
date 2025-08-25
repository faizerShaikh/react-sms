import { Separator } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { schoolConfig } from "@/configs";

type Props = {};

export function ViewPaymentMethodDetails({}: Props) {
  const bankDetails = schoolConfig.bank_details;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' className='text-primary w-auto'>
          <i className='ph-duotone ph-bank text-lg'></i>
          View Payment Details
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] top-[45%]'>
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
          <DialogDescription>
            View the options available for payment. You can pay using below QR
            Code or direct NEFT/RTGS/IMPS.
          </DialogDescription>
        </DialogHeader>
        <div className='max-h-[60vh] overflow-y-auto'>
          {bankDetails ? (
            <div className='w-full md:h-[450px] md:px-0 px-5 flex justify-center items-center self-stretch my-5 gap-5 md:flex-row flex-col'>
              <div className='md:w-1/2 flex flex-col gap-5 justify-between items-center h-full'>
                <div className='font-satoshi font-semibold text-lg text-gray-700'>
                  FOR ONLINE
                </div>
                <div className='p-1 rounded-lg shadow border border-gray-100'>
                  <img
                    src={bankDetails.payment_qr_code}
                    width='250px'
                    height='250px'
                  />
                </div>
                <p className='my-0 text-gray-300 font-satoshi text-center normal-case'>
                  Kindly utilize this QR code for processing fee payments.
                </p>
              </div>
              <Separator
                className='h-full my-0 md:block hidden'
                orientation='vertical'
              >
                {" "}
                Or{" "}
              </Separator>
              <Separator className='w-full my-0 block md:hidden'>Or</Separator>
              <div className='md:w-1/2 md:gap-0 gap-5 flex flex-col justify-between items-center h-full'>
                <div className='font-satoshi font-semibold text-lg text-gray-700'>
                  FOR NEFT / RTGS / IMPS
                </div>
                <div className='flex flex-col justify-center gap-2 border border-gray-200 rounded-lg w-[280px]'>
                  <div className='w-full border-gray-200 border-b p-2'>
                    <div className='text-gray-400 text-sm font-satoshi'>
                      Bank Name:
                    </div>
                    <div className='text-gray-700 text-sm font-satoshi font-medium'>
                      {bankDetails.bank_name}
                    </div>
                  </div>
                  <div className='w-full border-gray-200 border-b p-2'>
                    <div className='text-gray-400 text-sm font-satoshi'>
                      Account Name:
                    </div>
                    <div className='text-gray-700 text-sm font-satoshi font-medium'>
                      {bankDetails.account_name}
                    </div>
                  </div>
                  <div className='w-full border-gray-200 border-b p-2'>
                    <div className='text-gray-400 text-sm font-satoshi'>
                      Account Number:
                    </div>
                    <div className='text-gray-700 text-sm font-satoshi font-medium'>
                      {bankDetails.account_number}
                    </div>
                  </div>
                  <div className='w-full border-gray-200 border-b p-2'>
                    <div className='text-gray-400 text-sm font-satoshi'>
                      IFSC code:
                    </div>
                    <div className='text-gray-700 text-sm font-satoshi font-medium'>
                      {bankDetails.ifsc_code}
                    </div>
                  </div>
                  <div className='w-full p-2'>
                    <div className='text-gray-400 text-sm font-satoshi'>
                      Branch Name:
                    </div>
                    <div className='text-gray-700 text-sm font-satoshi font-medium'>
                      {bankDetails.branch_name}
                    </div>
                  </div>
                </div>
                <p className='my-0 text-gray-300 font-satoshi text-center normal-case'>
                  Kindly utilize this Bank Account Details for processing fee
                  payments.
                </p>
              </div>
            </div>
          ) : (
            <div className='my-5 text-gray-300 font-satoshi text-center normal-case'>
              No payment Details available. Please contact your school
              administration for more information.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
