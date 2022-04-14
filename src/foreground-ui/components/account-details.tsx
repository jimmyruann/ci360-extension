import { useQuery } from "react-query";
import { getAccountOverviewSummary } from "../../shared/api";

interface AccountSummaryProps {
  type: string;
  accountId: string;
}

export const AccountSummary = (props: AccountSummaryProps) => {
  const {
    data: accountSummary,
    isLoading,
    isError,
    isIdle,
  } = useQuery(["getAccountOverviewSummary", props], () =>
    getAccountOverviewSummary(props)
  );
  if (isLoading || isIdle) return <div>Currently is loading...</div>;
  if (isError) return <div>Has Error, close this and try again</div>;

  return (
    <div>
      <div>
        <b>{accountSummary.accountOwner.label}:</b>{" "}
        {accountSummary.accountOwner.value || `N/A`}
      </div>
      <div>
        <b>{accountSummary.dynatraceOneCsm.label}:</b>{" "}
        {accountSummary.dynatraceOneCsm.value || `N/A`}
      </div>
      <div>
        <b>{accountSummary.dynatraceOneSquad.label}:</b>{" "}
        {accountSummary.dynatraceOneSquad.value || `N/A`}
      </div>
      <div>
        <b>{accountSummary.geo.label}:</b> {accountSummary.geo.value || `N/A`}
      </div>
      <div>
        <b>{accountSummary.productSpecialist.label}:</b>{" "}
        {accountSummary.productSpecialist.value || `N/A`}
      </div>
      <div>
        <b>{accountSummary.salesRegion.label}:</b>{" "}
        {accountSummary.salesRegion.value || `N/A`}
      </div>
      <div>
        <b>{accountSummary.supportExpiration.label}:</b>{" "}
        {accountSummary.supportExpiration.value || `N/A`}
      </div>
      <div>
        <b>{accountSummary.supportType.label}:</b>{" "}
        {accountSummary.supportType.value || `N/A`}
      </div>
    </div>
  );
};

export default AccountSummary;
