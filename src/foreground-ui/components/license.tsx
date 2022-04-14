import { Box } from "@mantine/core";
import { useQuery } from "react-query";
import { getLicenseSummary } from "../../shared/api";

interface LicenseProps {
  type: string;
  accountId: string;
}

export const License = (props: LicenseProps) => {
  const {
    data: licenseSummary,
    isLoading,
    isError,
    isIdle,
  } = useQuery(["getLicenseSummary", props], () => getLicenseSummary(props));

  if (isLoading || isIdle) return <div>Currently is loading...</div>;
  if (isError) return <div>Has Error, close this and try again</div>;

  return (
    <Box>
      {licenseSummary.measurements.map((measurement, i) => {
        return (
          <div key={i}>
            <b>{measurement.title}:</b> {measurement.quota.value}/
            {measurement.quota.limit}
          </div>
        );
      })}
    </Box>
  );
};

export default License;
