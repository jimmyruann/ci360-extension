import axios from "axios";
import { AccountOverviewSummary } from "../../../generated/AccountOverviewSummary.type";
import { HealthSummary } from "../../../generated/HealthSummary.type";
import { LicenseSummary } from "../../../generated/LicenseSummary.type";

export const ci360AxiosClient = axios.create({
	baseURL: "https://ci360.dynatrace.com/api",
	withCredentials: true,
});

interface CI360RequiredProps {
	accountId: string;
	type: string;
}

export const getLicenseSummary = async ({ accountId, type, contract }: CI360RequiredProps & { contract?: number }) => {
	const { data } = await ci360AxiosClient.get<LicenseSummary>(`/account/license/summary/${accountId}`, {
		params: {
			type,
			contract,
		},
	});

	return data;
};

export const getHealthSummary = async ({ accountId, type }: CI360RequiredProps) => {
	const { data } = await ci360AxiosClient.get<HealthSummary>(`/account/health/summary/${accountId}`, {
		params: {
			type,
		},
	});

	return data;
};

export const getAccountOverviewSummary = async ({ accountId, type }: CI360RequiredProps) => {
	const { data } = await ci360AxiosClient.get<AccountOverviewSummary>(`/account/overview/summary/${accountId}`, {
		params: {
			type,
		},
	});

	return data;
};
