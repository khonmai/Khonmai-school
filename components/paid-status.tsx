interface PaidStatusProps {
  status: boolean;
  paydate?: Date;
}

export const PaidStatus = ({ status, paydate }: PaidStatusProps) => {
  if (status) {
    return (
      <div className="bg-tidal-600 rounded-xl text-center text-sea-green-50 font-semibold p-1">
        Paid
      </div>
    );
  } else {
    return (
      <div className="bg-destructive rounded-xl text-center text-sea-green-50 font-semibold px-2 py-1">
        Unpaid
      </div>
    );
  }
};
