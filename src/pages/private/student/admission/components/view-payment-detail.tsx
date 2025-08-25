import { MobileResponsiveDialog } from "@/components";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/configs/axios";
import { FRONTEND_DATE_FORMAT, FRONTEND_DATE_TIME_FORMAT } from "@/constants";
import { useAuth } from "@/context/auth-context";
import {
  AdmissionInstalmentInterface,
  AdmissionOtherChargesInterface,
} from "@/interfaces";
import { cn, downloadFile, getWithOrdinalSuffix } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type Props = {
  selectedFeesData:
    | AdmissionInstalmentInterface
    | AdmissionOtherChargesInterface;
  onClose: () => void;
};

export function ViewPaymentDetail({ selectedFeesData, onClose }: Props) {
  const isInstalment = "installment_no" in selectedFeesData;

  return (
    <MobileResponsiveDialog
      autoOpen={true}
      heading={
        isInstalment
          ? getWithOrdinalSuffix(selectedFeesData.installment_no) +
            " Instalment"
          : selectedFeesData.description
      }
      onClose={onClose}
    >
      {({ onClose }) => (
        <ViewInstalmentPaymentDetail
          selectedFeesData={selectedFeesData}
          onClose={onClose}
        />
      )}
    </MobileResponsiveDialog>
  );
}

function ViewInstalmentPaymentDetail({
  className,
  selectedFeesData,
  onClose,
}: React.ComponentProps<"div"> & {
  selectedFeesData:
    | AdmissionInstalmentInterface
    | AdmissionOtherChargesInterface;
  onClose: () => void;
}) {
  const onlinePaymentEnabled = false;
  const isInstalment = "installment_no" in selectedFeesData;
  const {
    state: { userData },
  } = useAuth();

  function getFormatedDate(item: AdmissionInstalmentInterface) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const createdDate = new Date(
      currentYear,
      item.due_in_month - 1,
      item.due_date
    );
    return formatDate(createdDate, FRONTEND_DATE_FORMAT);
  }
  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return api.post("/print-receipt/", {
        adm_id: userData?.admission_id,
        [isInstalment ? "instalment_id" : "charge_id"]: selectedFeesData.id,
        type: isInstalment ? "instalment" : "form_fees",
      });
    },
    onSuccess: (data: { data: { path: string } }) => {
      console.log(data);
      downloadFile(data.data.path, isInstalment ? "Instalment" : "Form Fees");
      toast.success(
        (isInstalment ? "Instalment" : "Form Fees") +
          " Recipt downloaded successfully"
      );
    },
  });

  return (
    <div className={cn(className, "md:p-0 p-5 !pt-0")}>
      {onlinePaymentEnabled && (
        <Alert className='block mt-3'>
          <i className='ph-bold ph-info'></i>
          <AlertTitle>
            Note:- GST Amount is calculated on Transaction Fee (Transaction Fee
            is 2% of Total Amount to be Paid)
          </AlertTitle>
        </Alert>
      )}
      <div className='flex flex-col gap-2 py-5'>
        <div className='flex justify-between items-center gap-4'>
          <div className='font-satoshi text-sm text-gray-800'>
            {isInstalment ? "Instalment Amount" : "Amount"}
          </div>
          <div className='font-satoshi text-sm text-gray-900 font-medium'>
            &#8377; {selectedFeesData.amount}
          </div>
        </div>
        {isInstalment &&
          selectedFeesData.total_amount_breakup &&
          selectedFeesData.total_amount_breakup.map((item) => (
            <div
              className='flex justify-between items-center gap-4'
              key={item.id}
            >
              <div className='font-satoshi text-sm text-gray-800'>
                {item.description}
              </div>
              <div className='font-satoshi text-sm text-gray-900 font-medium'>
                &#8377; {item.amount}
              </div>
            </div>
          ))}
        {onlinePaymentEnabled && (
          <>
            <div className='flex justify-between items-center gap-4'>
              <div className='font-satoshi text-sm text-gray-800'>
                Transaction Fee (2%)
              </div>
              <div className='font-satoshi text-sm text-gray-900 font-medium'>
                &#8377; {selectedFeesData.payment_detail.transaction_fee}
              </div>
            </div>
            <div className='flex justify-between items-center gap-4'>
              <div className='font-satoshi text-sm text-gray-800'>
                GST Amount
              </div>
              <div className='font-satoshi text-sm text-gray-900 font-medium'>
                &#8377; {selectedFeesData.payment_detail.gst_amount}
              </div>
            </div>
          </>
        )}
        <div className='flex justify-between items-center gap-4 border-t border-0 border-dashed border-gray-200'>
          <div className='font-satoshi text-sm text-gray-800'>Total Amount</div>
          <div className='font-satoshi text-sm text-gray-900 font-medium'>
            &#8377; {selectedFeesData.payment_detail.total_amount}
          </div>
        </div>

        <div className='flex justify-between items-center gap-4'>
          <div className='font-satoshi text-sm text-gray-800'>Due Date</div>
          <div className='font-satoshi text-sm text-gray-900 font-medium'>
            {isInstalment
              ? selectedFeesData.is_first_instalment
                ? "Pay after admission"
                : "Before " + getFormatedDate(selectedFeesData)
              : "Pay while filling admission form"}
          </div>
        </div>
        <div className='flex justify-between items-center gap-4'>
          <div className='font-satoshi text-sm text-gray-800'>
            Payment Status
          </div>
          <Badge variant={!selectedFeesData.is_paid ? "warning" : "success"}>
            {!selectedFeesData.is_paid ? "Due" : "Paid"}
          </Badge>
        </div>
        <div className='flex justify-between items-center gap-4'>
          <div className='font-satoshi text-sm text-gray-800'>Payment Date</div>
          <div className='font-satoshi text-sm text-gray-900 font-medium'>
            {selectedFeesData.payment_date
              ? formatDate(
                  selectedFeesData.payment_date,
                  FRONTEND_DATE_TIME_FORMAT
                )
              : "-"}
          </div>
        </div>
        <div className='flex justify-between items-center gap-4'>
          <div className='font-satoshi text-sm text-gray-800'>Payment By</div>
          <div className='font-satoshi text-sm text-gray-900 font-medium'>
            {selectedFeesData.paid_by?.full_name || "-"}
          </div>
        </div>
        <div className='flex justify-between items-center gap-4'>
          <div className='font-satoshi text-sm text-gray-800'>Payment Mode</div>
          <div className='font-satoshi text-sm text-gray-900 font-medium'>
            {selectedFeesData.payment_method || "-"}
          </div>
        </div>
      </div>
      <div className='mb-4 border border-dashed border-gray-200 w-full'></div>
      <div className='flex gap-4 justify-end items-center md:flex-row flex-col-reverse'>
        {/* <button
                    *ngIf="onlinePaymentEnabled && !selectedFeesData.is_paid && selectedFeesData.is_active"
                    [loading]="isMutationLoading$ | async"
                    smsButton
                    type="submit"
                >
                    Pay Now
                </button> */}

        <Button
          type='button'
          variant='outline'
          className='font-normal w-auto rounded-md'
          size={"large"}
          onClick={() => onClose()}
        >
          Close
        </Button>
        {selectedFeesData.is_paid && (
          <Button
            onClick={() => mutate()}
            disabled={isPending}
            type='button'
            variant='primary-contained'
            className='font-normal w-auto rounded-md'
            size={"large"}
          >
            {isPending ? (
              <Loader2 className='animate-spin' />
            ) : (
              <i className='ph ph-download'></i>
            )}
            Download Recipt
          </Button>
        )}
      </div>
    </div>
  );
}
